import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, HStack, Spinner } from '@chakra-ui/react';
import { GrTechnology, GrDocumentUpload } from 'react-icons/gr';
import { GiWaterDivinerStick } from 'react-icons/gi';
import Node from './Node';
import { useLoadingContext } from '../contexts/LoadingContext';
import { executeAlgorithm } from '../utils/algorithm-executor';
import TestSetFileReader from './TestSetFileReader';

/**
 * @typedef {import('../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

const logTree = root => console.log('ROOT', root);

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
  const [testSet, setTestSet] = useState([]);
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    setRoot(null);
    setIsLoading(true);
    let terminated = false;
    executeAlgorithm(options)
      .then(value => {
        if (terminated) {
          return;
        }
        setRoot(value);
      })
      .catch(e => console.error(e))
      .finally(() => {
        if (!terminated) setIsLoading(false);
        terminated = true;
      });
    return () => {
      if (terminated) {
        return;
      }
      terminated = true;
    };
  }, [options, setIsLoading]);

  useEffect(() => logTree(root), [root]);

  const requestChildChange = newRoot => setRoot(newRoot);

  function handleGetTestSet({ data }) {
    setTestSet(data);
    console.log(data);
  }
  function predict(root) {
    console.log('predict');
  }

  return (
    <div id="tree">
      <HStack spacing="24px">
        <Box>
          <p>
            <Button leftIcon={<GrTechnology />} onClick={() => logTree(root)}>
              Log tree
            </Button>
          </p>
        </Box>
        <Box>
          <p>
            <TestSetFileReader onChange={handleGetTestSet} isHeaders={false} />
          </p>
        </Box>
        <Box>
          <p>
            <Button leftIcon={<GiWaterDivinerStick />} onClick={() => predict(root)}>
              Predict
            </Button>
          </p>
        </Box>
      </HStack>
      {isLoading && <Spinner size="xl" />}
      <h1>Tree nodes:</h1>
      <Box>
        {!root ? (
          <p>No tree to show</p>
        ) : (
          <Node node={root} onChange={() => {}} requestChildChange={requestChildChange} side={true} />
        )}
      </Box>
    </div>
  );
};

export default Tree;
