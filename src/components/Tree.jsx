import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { GrTechnology, GrDocumentUpload } from 'react-icons/gr';
import { AiOutlinePercentage } from 'react-icons/ai';
import Node from './Node';
import { useLoadingContext } from '../contexts/LoadingContext';
import { executeAlgorithm } from '../utils/algorithm-executor';
import TestSetFileReader from './TestSetFileReader';
import Predicter from './Predicter';
import ConfusionMatrix from './ConfusionMatrix';

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
  const [accuracy, setAccuracy] = useState(0);
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

  useEffect(() => {
    logTree(root);
    //setAccuracy(Math.random() * 10);
  }, [root]);

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
      <Stack spacing={5} direction="row" justifyContent="flex-end" wrap={'wrap'} pr={5}>
        <Box>
          <InputGroup size="sm">
            <InputLeftAddon
              children="Accuracy:"
              fontWeight={700}
              bg={'#ddd'}
              color="#black"
              borderRadius="0.375rem"
            />
            <Input value={accuracy.toFixed(3)} readOnly textAlign="center" />
            <InputRightAddon
              children="%"
              fontWeight={700}
              bg={'#ddd'}
              color="#black"
              borderRadius="0.375rem"
            />
          </InputGroup>
        </Box>
        <Box>
          {/* <Button
            bg={'#ddd'}
            color="#black"
            _hover={{ bg: '#aaa' }}
            onClick={() => console.log('confusion matrix')}
            size="sm"
          >
            Confusion Matrix
          </Button> */}
          <ConfusionMatrix
            tree={root}
            data={options.trainingSet}
            allClasses={options.allClasses}
            categoryAttr={options.categoryAttr}
            onChange={setAccuracy}
            disabled={isLoading}
          />
        </Box>
        <Box>
          <Button
            leftIcon={<GrTechnology />}
            bg={'#ddd'}
            color="#black"
            _hover={{ bg: '#aaa' }}
            onClick={() => logTree(root)}
            size="sm"
          >
            Log tree
          </Button>
        </Box>
        {/* <Box>
          <TestSetFileReader onChange={handleGetTestSet} isHeaders={false} />
        </Box>
        <Predicter tree={root} testSet={testSet} onChange={predict} /> */}
      </Stack>
      {isLoading && <Spinner size="xl" />}
      <h1>Tree nodes:</h1>
      <Box>
        {!root ? (
          <p>No tree to show</p>
        ) : (
          <Box d="flex" flexDirection="row">
            <Node node={root} onChange={() => {}} requestChildChange={requestChildChange} side={true} />
            {/* <Node node={root} onChange={() => {}} requestChildChange={requestChildChange} side={true} /> */}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Tree;
