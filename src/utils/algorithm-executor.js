const workersMap = {
  c45: 'c45',
  tsp: 'tsp',
  tspw: 'tsp-weight',
  mix: 'mix',
  update: 'updater',
};

export function executeAlgorithm(options, changeOptions = {}) {
  //console.log(changeOptions);
  return new Promise((resolve, reject) => {
    console.time('options.unfold.Once', options.unfoldOnce);
    let worker = new Worker(`algorithms/${workersMap.mix}-tree.js`);
    // if (options.algorithm.length > 1) {
    //   console.log('mix');
    //   worker = new Worker(`algorithms/${workersMap.mix}-tree.js`);
    // } else {
    //   worker = new Worker(`algorithms/${workersMap[options.algorithm[0]]}-tree.js`);
    // }
    worker.onmessage = ({ data }) => {
      console.log('got a result', data);
      resolve(data);
      worker.terminate();
    };
    worker.onerror = reject;
    worker.postMessage({ _builder: { ...options }, ...changeOptions });
  }).then(data => {
    console.timeEnd(options.algorithm);
    return data;
  });
}

function countUniqueValues(items, attr) {
  var counter = {};

  // detecting different values of attribute
  for (var i = items.length - 1; i >= 0; i--) {
    // items[i][attr] - value of attribute
    counter[items[i][attr]] = 0;
  }

  // counting number of occurrences of each of values
  // of attribute
  for (var j = items.length - 1; j >= 0; j--) {
    counter[items[j][attr]] += 1;
  }

  return counter;
}

export function mostFrequentValue(items, attr) {
  const counter = countUniqueValues(items, attr);

  var mostFrequentCount = 0;
  var mostFrequentValue;

  for (var value in counter) {
    if (counter[value] > mostFrequentCount) {
      mostFrequentCount = counter[value];
      mostFrequentValue = value;
    }
  }

  const _positiveCounter = items.filter(element => element[attr] === mostFrequentValue).length;
  const _negativeCounter = items.length - _positiveCounter;
  const _quality = 100 * (_positiveCounter / items.length);

  return {
    category: mostFrequentValue,
    quality: _quality.toFixed(2),
    matchedCount: _positiveCounter,
    notMatchedCount: _negativeCounter,
    trainingSet2: items,
  };
}
