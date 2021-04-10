const workersMap = {
  c45: 'c45',
  tsp: 'tsp',
  tspw: 'tsp-weight',
};

export function executeAlgorithm(options, changeOptions = {}) {
  console.log(options);
  return new Promise((resolve, reject) => {
    const worker = new Worker(`algorithms/${workersMap[options.algorithm]}-tree.js`);
    worker.onmessage = ({ data }) => {
      console.log('got a result', data);
      resolve(data);
      worker.terminate();
    };
    worker.onerror = reject;
    worker.postMessage({ _builder: { ...options }, ...changeOptions });
  });
}
