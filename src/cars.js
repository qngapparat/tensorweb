const tf = require('@tensorflow/tfjs')
const tfvis = require("@tensorflow/tfjs-vis")

"use strict"

async function getData() {
  const carsDataReq = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json")
  const carsData = await carsDataReq.json()
  console.log(carsData)
  const cleaned = carsData.map(car => ({
    mpg: car.Miles_per_Gallon,
    horsepower: car.Horsepower
  }))


  //.filter(car => car.mpg != null && car.horsepower != null)
  console.log(cleaned)
  return cleaned
}

async function run() {
  const data = await getData()
  const values = data.map(car => ({
    x: car.horsepower,
    y: car.mpg
  }))

  
  tfvis.render.scatterplot(
    { name: "horsepower vs mpg" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  )

  const model = createModel()
  tfvis.show.modelSummary({ name: "summary" }, model)

  const tensorData = convertToTensor(data)
  const { inputs, labels } = tensorData
  await trainModel(model, inputs, labels)
  console.log("done training")

  testModel(model, data, tensorData)

}

function createModel() {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [1], units: 50, activation: "sigmoid" }))
  model.add(tf.layers.dense({ units: 1 }))
  return model
}

function convertToTensor(data) {
  // tidy cleans up unneeded alloc afterwards
  return tf.tidy(() => {
    // shuffle
    tf.util.shuffle(data)

    const inputs = data.map(d => d.horsepower)
    const labels = data.map(d => d.mpg)

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1])
    const labelTensor = tf.tensor2d(labels, [labels.length, 1])

    // normalize to 0-1 using minmax
    const inputMax = inputTensor.max()
    const inputMin = inputTensor.min()
    const labelMax = labelTensor.max()
    const labelMin = labelTensor.min()

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      inputMax,
      inputMin,
      labelMax,
      labelMin
    }
  })
}


async function trainModel(model, inputs, labels){
  model.compile({
    optimizer: "adam",
    loss: tf.losses.meanSquaredError,
    metrics: ['mse']
  })

  const batchSize = 28
  const epochs = 50 

  console.log("starting to trai n " + epochs + " epochs")
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      {name: "Performance"},
      ["loss", "mse"],
      { height: 200, callbacks: ['onEpochEnd']}
    )
  })
}

function testModel(model, inputData, normalizationData){
  console.log("starting to test..")
  const { inputMin, inputMax, labelMin, labelMax } = normalizationData

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling 
  // that we did earlier.

  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100)
    const preds = model.predict(xs.reshape([100, 1]))

    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin)

    const unNormPreds = preds 
      .mul(labelMax.sub(labelMin))
      .add(labelMin)
    
      // unnormalize data 
    return [unNormXs.dataSync(), unNormPreds.dataSync()]
  })

  const predictedPoints = Array.from(xs).map((val, i) => (
    { x: val, y: preds[i]}
  ))

  const originalPoints = inputData.map(d => (
    { x: d.horsepower, y: d.mpg }
  ))

  tfvis.render.scatterplot(
    { name: "Predictions vs Original data" },
    { values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  )
}

document.addEventListener('DOMContentLoaded', run)