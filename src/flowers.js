const tf = require("@tensorflow/tfjs")
const tfvis = require("@tensorflow/tfjs-vis")

const trainData = [
  {
    "sepal_length": 5.1,
    "sepal_width": 3.5,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 3,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.7,
    "sepal_width": 3.2,
    "petal_length": 1.3,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.6,
    "sepal_width": 3.1,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.6,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.6,
    "sepal_width": 3.4,
    "petal_length": 1.4,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.4,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.4,
    "sepal_width": 2.9,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 3.1,
    "petal_length": 1.5,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 5.4,
    "sepal_width": 3.7,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.8,
    "sepal_width": 3.4,
    "petal_length": 1.6,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.8,
    "sepal_width": 3,
    "petal_length": 1.4,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 4.3,
    "sepal_width": 3,
    "petal_length": 1.1,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 4,
    "petal_length": 1.2,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 4.4,
    "petal_length": 1.5,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 5.4,
    "sepal_width": 3.9,
    "petal_length": 1.3,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.5,
    "petal_length": 1.4,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 3.8,
    "petal_length": 1.7,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.8,
    "petal_length": 1.5,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 5.4,
    "sepal_width": 3.4,
    "petal_length": 1.7,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.7,
    "petal_length": 1.5,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 4.6,
    "sepal_width": 3.6,
    "petal_length": 1,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.3,
    "petal_length": 1.7,
    "petal_width": 0.5,
    "species": "setosa"
  },
  {
    "sepal_length": 4.8,
    "sepal_width": 3.4,
    "petal_length": 1.9,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3,
    "petal_length": 1.6,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.4,
    "petal_length": 1.6,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 5.2,
    "sepal_width": 3.5,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.2,
    "sepal_width": 3.4,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.7,
    "sepal_width": 3.2,
    "petal_length": 1.6,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.8,
    "sepal_width": 3.1,
    "petal_length": 1.6,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.4,
    "sepal_width": 3.4,
    "petal_length": 1.5,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 5.2,
    "sepal_width": 4.1,
    "petal_length": 1.5,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 4.2,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 3.1,
    "petal_length": 1.5,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.2,
    "petal_length": 1.2,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 3.5,
    "petal_length": 1.3,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 3.1,
    "petal_length": 1.5,
    "petal_width": 0.1,
    "species": "setosa"
  },
  {
    "sepal_length": 4.4,
    "sepal_width": 3,
    "petal_length": 1.3,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.4,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.5,
    "petal_length": 1.3,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 4.5,
    "sepal_width": 2.3,
    "petal_length": 1.3,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 4.4,
    "sepal_width": 3.2,
    "petal_length": 1.3,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.5,
    "petal_length": 1.6,
    "petal_width": 0.6,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.8,
    "petal_length": 1.9,
    "petal_width": 0.4,
    "species": "setosa"
  },
  {
    "sepal_length": 4.8,
    "sepal_width": 3,
    "petal_length": 1.4,
    "petal_width": 0.3,
    "species": "setosa"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.8,
    "petal_length": 1.6,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5.3,
    "sepal_width": 3.7,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 5,
    "sepal_width": 3.3,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 7,
    "sepal_width": 3.2,
    "petal_length": 4.7,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 3.2,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 2.3,
    "petal_length": 4,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.5,
    "sepal_width": 2.8,
    "petal_length": 4.6,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 2.8,
    "petal_length": 4.5,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 3.3,
    "petal_length": 4.7,
    "petal_width": 1.6,
    "species": "versicolor"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 2.4,
    "petal_length": 3.3,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.6,
    "sepal_width": 2.9,
    "petal_length": 4.6,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.2,
    "sepal_width": 2.7,
    "petal_length": 3.9,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 5,
    "sepal_width": 2,
    "petal_length": 3.5,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.9,
    "sepal_width": 3,
    "petal_length": 4.2,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 6,
    "sepal_width": 2.2,
    "petal_length": 4,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 2.9,
    "petal_length": 4.7,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 2.9,
    "petal_length": 3.6,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3.1,
    "petal_length": 4.4,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 3,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.7,
    "petal_length": 4.1,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.2,
    "sepal_width": 2.2,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 2.5,
    "petal_length": 3.9,
    "petal_width": 1.1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.9,
    "sepal_width": 3.2,
    "petal_length": 4.8,
    "petal_width": 1.8,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 2.8,
    "petal_length": 4,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.5,
    "petal_length": 4.9,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 2.8,
    "petal_length": 4.7,
    "petal_width": 1.2,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 2.9,
    "petal_length": 4.3,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.6,
    "sepal_width": 3,
    "petal_length": 4.4,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.8,
    "sepal_width": 2.8,
    "petal_length": 4.8,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3,
    "petal_length": 5,
    "petal_width": 1.7,
    "species": "versicolor"
  },
  {
    "sepal_length": 6,
    "sepal_width": 2.9,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 2.6,
    "petal_length": 3.5,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 2.4,
    "petal_length": 3.8,
    "petal_width": 1.1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 2.4,
    "petal_length": 3.7,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.7,
    "petal_length": 3.9,
    "petal_width": 1.2,
    "species": "versicolor"
  },
  {
    "sepal_length": 6,
    "sepal_width": 2.7,
    "petal_length": 5.1,
    "petal_width": 1.6,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.4,
    "sepal_width": 3,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 6,
    "sepal_width": 3.4,
    "petal_length": 4.5,
    "petal_width": 1.6,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3.1,
    "petal_length": 4.7,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.3,
    "petal_length": 4.4,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 3,
    "petal_length": 4.1,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 2.5,
    "petal_length": 4,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.5,
    "sepal_width": 2.6,
    "petal_length": 4.4,
    "petal_width": 1.2,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 3,
    "petal_length": 4.6,
    "petal_width": 1.4,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.6,
    "petal_length": 4,
    "petal_width": 1.2,
    "species": "versicolor"
  },
  {
    "sepal_length": 5,
    "sepal_width": 2.3,
    "petal_length": 3.3,
    "petal_width": 1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 2.7,
    "petal_length": 4.2,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 3,
    "petal_length": 4.2,
    "petal_width": 1.2,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.2,
    "sepal_width": 2.9,
    "petal_length": 4.3,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 2.5,
    "petal_length": 3,
    "petal_width": 1.1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 2.8,
    "petal_length": 4.1,
    "petal_width": 1.3,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 3.3,
    "petal_length": 6,
    "petal_width": 2.5,
    "species": "virginica"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.7,
    "petal_length": 5.1,
    "petal_width": 1.9,
    "species": "virginica"
  },
  {
    "sepal_length": 7.1,
    "sepal_width": 3,
    "petal_length": 5.9,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.9,
    "petal_length": 5.6,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.5,
    "sepal_width": 3,
    "petal_length": 5.8,
    "petal_width": 2.2,
    "species": "virginica"
  },
  {
    "sepal_length": 7.6,
    "sepal_width": 3,
    "petal_length": 6.6,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 2.5,
    "petal_length": 4.5,
    "petal_width": 1.7,
    "species": "virginica"
  },
  {
    "sepal_length": 7.3,
    "sepal_width": 2.9,
    "petal_length": 6.3,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 2.5,
    "petal_length": 5.8,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 7.2,
    "sepal_width": 3.6,
    "petal_length": 6.1,
    "petal_width": 2.5,
    "species": "virginica"
  },
  {
    "sepal_length": 6.5,
    "sepal_width": 3.2,
    "petal_length": 5.1,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 2.7,
    "petal_length": 5.3,
    "petal_width": 1.9,
    "species": "virginica"
  },
  {
    "sepal_length": 6.8,
    "sepal_width": 3,
    "petal_length": 5.5,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 5.7,
    "sepal_width": 2.5,
    "petal_length": 5,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.8,
    "petal_length": 5.1,
    "petal_width": 2.4,
    "species": "virginica"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 3.2,
    "petal_length": 5.3,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6.5,
    "sepal_width": 3,
    "petal_length": 5.5,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 7.7,
    "sepal_width": 3.8,
    "petal_length": 6.7,
    "petal_width": 2.2,
    "species": "virginica"
  },
  {
    "sepal_length": 7.7,
    "sepal_width": 2.6,
    "petal_length": 6.9,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6,
    "sepal_width": 2.2,
    "petal_length": 5,
    "petal_width": 1.5,
    "species": "virginica"
  },
  {
    "sepal_length": 6.9,
    "sepal_width": 3.2,
    "petal_length": 5.7,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 2.8,
    "petal_length": 4.9,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 7.7,
    "sepal_width": 2.8,
    "petal_length": 6.7,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.7,
    "petal_length": 4.9,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3.3,
    "petal_length": 5.7,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 7.2,
    "sepal_width": 3.2,
    "petal_length": 6,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.2,
    "sepal_width": 2.8,
    "petal_length": 4.8,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 3,
    "petal_length": 4.9,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 2.8,
    "petal_length": 5.6,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 7.2,
    "sepal_width": 3,
    "petal_length": 5.8,
    "petal_width": 1.6,
    "species": "virginica"
  },
  {
    "sepal_length": 7.9,
    "sepal_width": 3.8,
    "petal_length": 6.4,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 2.8,
    "petal_length": 5.6,
    "petal_width": 2.2,
    "species": "virginica"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.8,
    "petal_length": 5.1,
    "petal_width": 1.5,
    "species": "virginica"
  },
  {
    "sepal_length": 6.1,
    "sepal_width": 2.6,
    "petal_length": 5.6,
    "petal_width": 1.4,
    "species": "virginica"
  },
  {
    "sepal_length": 7.7,
    "sepal_width": 3,
    "petal_length": 6.1,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6,
    "sepal_width": 3,
    "petal_length": 4.8,
    "petal_width": 1.8,
    "species": "virginica"
  }

]

const testData = [
  {
    "sepal_length": 6.9,
    "sepal_width": 3.1,
    "petal_length": 5.4,
    "petal_width": 2.1,
    "species": "virginica"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3.1,
    "petal_length": 5.6,
    "petal_width": 2.4,
    "species": "virginica"
  },
  {
    "sepal_length": 6.9,
    "sepal_width": 3.1,
    "petal_length": 5.1,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 5.8,
    "sepal_width": 2.7,
    "petal_length": 5.1,
    "petal_width": 1.9,
    "species": "virginica"
  },
  {
    "sepal_length": 6.8,
    "sepal_width": 3.2,
    "petal_length": 5.9,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3.3,
    "petal_length": 5.7,
    "petal_width": 2.5,
    "species": "virginica"
  },
  {
    "sepal_length": 6.7,
    "sepal_width": 3,
    "petal_length": 5.2,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 2.5,
    "petal_length": 5,
    "petal_width": 1.9,
    "species": "virginica"
  },
  {
    "sepal_length": 6.2,
    "sepal_width": 2.2,
    "petal_length": 4.5,
    "petal_width": 1.5,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.6,
    "sepal_width": 2.5,
    "petal_length": 3.9,
    "petal_width": 1.1,
    "species": "versicolor"
  },
  {
    "sepal_length": 5.9,
    "sepal_width": 3.2,
    "petal_length": 4.8,
    "petal_width": 1.8,
    "species": "versicolor"
  },
  {
    "sepal_length": 6.5,
    "sepal_width": 3,
    "petal_length": 5.2,
    "petal_width": 2,
    "species": "virginica"
  },
  {
    "sepal_length": 6.2,
    "sepal_width": 3.4,
    "petal_length": 5.4,
    "petal_width": 2.3,
    "species": "virginica"
  },
  {
    "sepal_length": 6.3,
    "sepal_width": 3.4,
    "petal_length": 5.6,
    "petal_width": 2.4,
    "species": "virginica"
  },
  {
    "sepal_length": 6.4,
    "sepal_width": 3.1,
    "petal_length": 5.5,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 6,
    "sepal_width": 3,
    "petal_length": 4.8,
    "petal_width": 1.8,
    "species": "virginica"
  },
  {
    "sepal_length": 5.1,
    "sepal_width": 3.5,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.9,
    "sepal_width": 3,
    "petal_length": 1.4,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.7,
    "sepal_width": 3.2,
    "petal_length": 1.3,
    "petal_width": 0.2,
    "species": "setosa"
  },
  {
    "sepal_length": 4.6,
    "sepal_width": 3.1,
    "petal_length": 1.5,
    "petal_width": 0.2,
    "species": "setosa"
  }
]

async function run() {
  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 20, inputShape: [4], activation: "sigmoid" }))
  model.add(tf.layers.dense({ units: 10, activation: "sigmoid" }))
  model.add(tf.layers.dense({ units: 3, activation: "softmax" }))

  const { inputs, labels } = tf.tidy(() => {

    tf.util.shuffle(trainData)

    const inp = trainData.map(t => (
      [t.sepal_length, t.sepal_width, t.petal_length, t.petal_width]
    ))

    const lab = trainData.map(t => (
      [
        t.species === "virginica" ? 1 : 0,
        t.species === "versicolor" ? 1 : 0,
        t.species === "setosa" ? 1 : 0
      ]
    ))

    const inputTensor = tf.tensor2d(
      inp,
      [inp.length, 4]
    )

    const labelTensor = tf.tensor2d(
      lab,
      [lab.length, 3]
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

  tfvis.show.modelSummary({ name: "summary of model" }, model)

  // train
  await model.fit(inputs, labels, {
    epochs: 200,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Performance" },
      ["mse"],
      { height: 300, callbacks: ['onEpochEnd'] }
    )
  })
  console.log("done training")

  // predict
  console.log("Legend: likelihood[virginica, versicolor, setosa]")
  // data & shape
  const testd = [6.2, 3.4, 5.4, 2.3]
  const testsh = [1, 4]

  console.log(model.predict(tf.tensor2d(testd, testsh)).dataSync())

  //test
  testData.forEach(t => {
    const testd = [t.sepal_length, t.sepal_width, t.petal_length, t.petal_width]
    const testsh = [1, 4]
    const predictions = Array.from(model.predict(tf.tensor2d(testd, testsh)).dataSync())
    const winnerIndex = predictions.indexOf(Math.max(...predictions))

    console.log("winner: ", winnerIndex)
    switch (winnerIndex) {
      case 0: // predicted virginica
        t.species === "virginica"
          ? console.log(":)) Correctly predicted virginica")
          : console.log(":(( Inorrectly predicted virginica")
        break;
      case 1: // predicted vertise
        t.species === "versicolor"
          ? console.log(":)) Correctly predicted versicolor")
          : console.log(":(( Inorrectly predicted versicolor")
        break;
      case 2: // predicted secola
        t.species === "setosa"
          ? console.log(":)) Correctly predicted setosa")
          : console.log(":(( Inorrectly predicted setosa")
        break;
      default: // INVALID
        console.log("INVALID SWITCH CASE")
    }

    console.log("with likelihood: ", predictions)

  })
}

document.addEventListener('DOMContentLoaded', run)