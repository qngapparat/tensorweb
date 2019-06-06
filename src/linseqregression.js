const tf = require("@tensorflow/tfjs")
const tfvis = require("@tensorflow/tfjs-vis")

async function run() {
  // create model
  console.log("starting")
  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
  model.add(tf.layers.dense({ units: 1 }))

  // create data 
  const { inputs, labels } = tf.tidy(() => {

    const data = [...Array(100).keys()].map(x => ({ x, y: 2 * x - 1 }))
    tf.util.shuffle(data)
    const xs = data.map(d => d.x)
    const ys = data.map(d => d.y)

    const inputTensor = tf.tensor2d(
      xs,
      [xs.length, 1]
    )
    const labelTensor = tf.tensor2d(
      ys,
      [ys.length, 1]
    )
    return {
      inputs: inputTensor,
      labels: labelTensor
    }
  })

  // compile 
  model.compile({
    optimizer: "adam",
    loss: tf.losses.meanSquaredError,
    metrics: ['mse']
  })

  // train
  await model.fit(inputs, labels, {
    epochs: 200,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "performance" },
      ["mse"],
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  })

  console.log("predicting 10 to be")
  console.log(model.predict(tf.tensor2d([10], [1, 1])).dataSync())
}

document.addEventListener('DOMContentLoaded', run)