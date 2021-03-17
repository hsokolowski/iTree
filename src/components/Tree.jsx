import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
// import { start } from '../services/Playground';
// import { dt } from '../services/TSP';
import Node from './Node';
import { useLoadingContext } from '../contexts/LoadingContext';

/**
 * @typedef {import('../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

const logTree = root => console.log(root);

/**
 * @param {Object} props
 * @param {DecisionTreeBuilder} props.options
 */
const Tree = ({ options }) => {
  // const root = useMemo(() => {
  //   //return dt.TSPDecisionTree(options)
  //   var t0 = performance.now();
  //   var r = buildDecisionTree(options);
  //   var t1 = performance.now();
  //   console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
  //   return r;
  // }, [options]);

  const [root, setRoot] = useState(null);
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    setRoot(null);
    setIsLoading(true);
    let terminated = false;
    const worker = new Worker('decision-tree.js');
    worker.onmessage = ({ data }) => {
      console.log('got a result', data);
      if (terminated) return;
      setRoot(data);
      worker.terminate();
      terminated = true;
      setIsLoading(false);
    };
    worker.postMessage({ _builder: { ...options } });
    return () => {
      if (terminated) {
        return;
      }
      worker.terminate();
      terminated = true;
    };
  }, [options]);

  useEffect(() => logTree(root), [root]);

  return (
    <div id="tree">
      <h1>Tree</h1>
      <p>
        <button onClick={logTree}>Log tree</button>
      </p>
      {isLoading && <Spinner size="xl" />}
      <h2>Nodes:</h2>
      <Box>{!root ? <p>No tree to show</p> : <Node node={root} onChange={() => {}} />}</Box>
    </div>
  );
};

export default Tree;
