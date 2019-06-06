import { MnistData } from './fetchmnist'
const tfvis = require("@tensorflow/tfjs-vis")
const tf = require("@tensorflow/tfjs")

async function showExamples(data) {

  const surface = tfvis.visor().surface({ name: 'Input data examples', tab: 'Input data' })

  // get examples 
  const examples = data.nextTestBatch(20)
  const numExamples = examples.xs.shape[0]

  // render examples
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // to 28x28px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1])
    })

    // create canvas elem to render each example
    const canvas = document.createElement('canvas')
    canvas.width = 28
    canvas.height = 28
    canvas.style = 'margin: 4px'
    // put image into canvas
    await tf.browser.toPixels(imageTensor, canvas)
    surface.drawArea.appendChild(canvas)

    imageTensor.dispose()
  }
}

async function run() {
  const data = new MnistData()
  console.log("fetching images...")
  await data.load()
  await showExamples(data)
  
  console.log("training model")
  const model = getModel()
  tfvis.show.modelSummary({ name: 'Model architecture'}, model)
  await train(model, data)

  console.log("predicting...")

  await showAccuracy(model, data)
  await showConfusion(model, data)
 
}

function getModel() {
  const model = tf.sequential()

  const IMAGE_WIDTH = 28
  const IMAGE_HEIGHT = 28
  const IMAGE_CHANNELS = 1

  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }))

  //downsample using max pooling
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }))

  // another conv + maxpooling stack ( with more filters )
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }))
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }))

  // from 2D filter to 1D vector
  // to prepare for classification layer ( last layer )
  model.add(tf.layers.flatten())

  // 10 outputs for likelihood that observed number is a one thru 10
  const NUM_OUTPUT_CLASSES = 10;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }))

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })

  return model
}


async function train(model, data) {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc']
  const container = {
    name: 'Model training', styles: { height: '1000px' }
  }

  const BATCH_SIZE = 512
  const TRAIN_DATA_SIZE = 5500
  const TEST_DATA_SIZE = 1000

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE)
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
      d.labels
    ]
  })

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Model training', styles: { height: '1000px' }},
      ['loss', 'val_loss', 'acc', 'val_acc']  
    )
  })
}

// predict

const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function doPrediction(model, data, testDataSize = 500){
  const IMG_WIDTH = 28
  const IMG_HEIGHT = 28
  const testData = data.nextTestBatch(testDataSize)
  const testxs = testData.xs.reshape([testDataSize, IMG_WIDTH, IMG_HEIGHT, 1])
  const labels = testData.labels.argMax([-1])
  const preds =  model.predict(testxs).argMax([-1])

  testxs.dispose()
  return [preds, labels]
}


async function showAccuracy(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  const container = {name: 'Accuracy', tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}

async function showConfusion(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
  tfvis.render.confusionMatrix(
      container, {values: confusionMatrix}, classNames);

  labels.dispose();
}


document.addEventListener('DOMContentLoaded', run)