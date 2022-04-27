import React, { useEffect, useState } from 'react';
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
 */
const Tree = ({ TREE, testDataset, options }) => {
  const [accuracyTraining, setAccuracyTraining] = useState(0);
  const [accuracyTest, setAccuracyTest] = useState(0);
  const [root, setRoot] = useState(null);
  const [secondRoot, setSecondRoot] = useState(null);
  const [sizeTree, setSizeTree] = useState({ joints: 0, leafs: 0 });
  const [testSet, setTestSet] = useState(null);
  const [showTestTree, setShowTestTree] = useState(false);
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    console.log(TREE);
    setRoot(TREE);
    setTestSet(testDataset);
    updateTestTree(TREE);
  }, [TREE, options, setIsLoading, testDataset]);

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

  function updateTestTree(newRoot) {
    console.log(newRoot);
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
        </Stack>
        <Stack spacing={2} direction="row">
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
            <Box width="100%">
              Test tree
              <Node node={secondRoot} onChange={() => {}} side={true} isNotModify />
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Tree;
