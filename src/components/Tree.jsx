import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { GrTechnology } from 'react-icons/gr';
import Node from './Node';
import { useLoadingContext } from '../contexts/LoadingContext';
import { executeAlgorithm } from '../utils/algorithm-executor';
import TestSetFileReader from './TestSetFileReader';
import ConfusionMatrix from './ConfusionMatrix';
import { getSizeTree } from '../utils/size-checker';
import { rebuildTestTree } from '../utils/rebuilderTestTree';

/**
 * @typedef {import('../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

const logTree = root => console.log('ROOT', root);

/**
 * @param {Object} props
 * @param {DecisionTreeBuilder} props.options
 * @param {boolean} props.headers
 */
const Tree = ({ options, headers }) => {
  // const root = useMemo(() => {
  //   //return dt.TSPDecisionTree(options)
  //   var t0 = performance.now();
  //   var r = buildDecisionTree(options);
  //   var t1 = performance.now();
  //   console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
  //   return r;
  // }, [options]);
  const [accuracyTraining, setAccuracyTraining] = useState(0);
  const [accuracyTest, setAccuracyTest] = useState(0);
  const [root, setRoot] = useState(null);
  const [secondRoot, setSecondRoot] = useState(null);
  const [sizeTree, setSizeTree] = useState({ joints: 0, leafs: 0 });
  const [testSet, setTestSet] = useState(null);
  const [showTestTree, setShowTestTree] = useState(false);
  const { isLoading, setIsLoading } = useLoadingContext();

  const updateTestTree = useCallback(
    newRoot => {
      console.log(options.categoryAttr);
      let tmpRoot = JSON.parse(JSON.stringify(newRoot));
      if (testSet == null) {
        rebuildTestTree(tmpRoot, options.trainingSet, options.categoryAttr);
        console.log(tmpRoot);
        setSecondRoot(tmpRoot);
      } else {
        rebuildTestTree(tmpRoot, testSet, options.categoryAttr);
        //console.log(tmpRoot);
        setSecondRoot(tmpRoot);
      }
    },
    [options.categoryAttr, options.trainingSet, testSet]
  );

  useEffect(() => {
    setRoot(null);
    setIsLoading(true);
    setTestSet(null);
    let terminated = false;
    executeAlgorithm(options)
      .then(value => {
        if (terminated) {
          return;
        }
        setRoot(value);
        updateTestTree(value);
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
  }, [options, setIsLoading, updateTestTree]);

  useEffect(() => {
    if (root !== null) {
      setSizeTree(getSizeTree(root));
    }
  }, [root]);

  const requestChildChange = newRoot => {
    setRoot(newRoot);
    updateTestTree(newRoot);
  };

  function handleGetTestSet({ data }) {
    setTestSet(data);
  }

  // function updateTestTree(newRoot) {
  //   console.log(options.categoryAttr);
  //   let tmpRoot = JSON.parse(JSON.stringify(newRoot));
  //   if (testSet == null) {
  //     rebuildTestTree(tmpRoot, options.trainingSet, options.categoryAttr);
  //     console.log(tmpRoot);
  //     setSecondRoot(tmpRoot);
  //   } else {
  //     rebuildTestTree(tmpRoot, testSet, options.categoryAttr);
  //     //console.log(tmpRoot);
  //     setSecondRoot(tmpRoot);
  //   }
  // }

  function handleShowTestTree(e) {
    //console.log(e);
    setShowTestTree(e.target.checked);
    updateTestTree(root);
  }

  return (
    <div id="tree">
      <Stack spacing={5} direction="row" justifyContent="space-between" pr={5} pl={5}>
        <Stack id={'trainingTree'} spacing={5} direction="row" justifyContent="space-between">
          <Box>
            <InputGroup size="sm">
              <InputLeftAddon
                children="Accuracy:"
                fontWeight={700}
                bg={'#ddd'}
                color="#black"
                borderRadius="0.375rem"
              />
              <Input
                value={accuracyTraining.toFixed(3)}
                readOnly
                textAlign="center"
                width={70}
                pl={1}
                pr={1}
              />
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
            <ConfusionMatrix
              tree={root}
              data={options.trainingSet}
              allClasses={options.allClasses}
              categoryAttr={options.categoryAttr}
              onChange={setAccuracyTraining}
              disabled={isLoading}
            />
          </Box>
        </Stack>
        <Stack spacing={2} direction="row">
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
            {/* tree size */}
          </Box>
          <Box>
            <ButtonGroup size="sm" isAttached>
              <Button mr="-px" disabled>
                Joints: {sizeTree.joints}
              </Button>
              <Button mr="-px" disabled>
                Leafs: {sizeTree.leafs}
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            <TestSetFileReader onChange={handleGetTestSet} isHeaders={headers} />
          </Box>
        </Stack>
        <Stack id={'testTree'} spacing={5} direction="row" justifyContent="space-between">
          {testSet !== null ? (
            <>
              <Box>
                <InputGroup size="sm">
                  <InputLeftAddon
                    children="Accuracy:"
                    fontWeight={700}
                    bg={'#ddd'}
                    color="#black"
                    borderRadius="0.375rem"
                  />
                  <Input
                    value={accuracyTest.toFixed(3)}
                    readOnly
                    textAlign="center"
                    width={70}
                    pl={1}
                    pr={1}
                  />
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
                <ConfusionMatrix
                  tree={root}
                  data={testSet}
                  allClasses={options.allClasses}
                  categoryAttr={options.categoryAttr}
                  onChange={setAccuracyTest}
                  disabled={isLoading}
                />
              </Box>
              <Box>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="show-tree" mb="0">
                    Show test tree
                  </FormLabel>
                  <Switch
                    id="show-tree-switch"
                    disabled={testSet !== null}
                    onChange={e => handleShowTestTree(e)}
                  />
                </FormControl>
              </Box>
            </>
          ) : (
            <div></div>
          )}
        </Stack>
      </Stack>
      {isLoading && <Spinner size="xl" />}
      <Box p={5}>
        <h1>Tree nodes:</h1>
        {!root ? (
          <p>No tree to show</p>
        ) : (
          <Box d="flex" flexDirection="row">
            <Box width="100%">
              Training tree
              <Node node={root} onChange={() => {}} requestChildChange={requestChildChange} side={true} />
            </Box>
            <Box width="100%" d={showTestTree ? '' : 'none'}>
              Test tree
              {showTestTree ? (
                <Node node={secondRoot} onChange={() => {}} side={true} isNotModify />
              ) : (
                <div></div>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Tree;
