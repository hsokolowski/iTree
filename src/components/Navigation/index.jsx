import React, { useState } from 'react';
import '../../css/main.scss';
import '../../css/inputs.scss';
import { Checkbox, Collapse, FormHelperText, Icon, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { GiLightningTree } from 'react-icons/gi';
import { Button, Stack, FormControl, FormLabel, Box } from '@chakra-ui/react';
import FileReader from '../FileReader';
import { Search as SearchBar } from '../SearchBar';
import { getAllClasses } from '../../utils/config-builder';
import FormControlNumberInput from './FormControlNumberInput';
import { DrawerMemo } from './DrawerRoll';
import { useLoadingContext } from '../../contexts/LoadingContext';
import { useAttributesContext } from '../../contexts/AttributesContext';
import { useBuilderConfigContext } from '../../contexts/BuilderConfigContext';
import { shuffleAndChunkArray } from '../../utils/cross-valid';

/**
 * @typedef {import('../../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

function Navigation({ onPrepareConfig, setHeaders, onCrossValidation }) {
  const { setBuilderConfig } = useBuilderConfigContext();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const [dataSet, setDataSet] = useState(null);
  const [algorithm, setAlgorithm] = useState(['c45']);
  const [decisionAttribute, setDecisionAttribute] = useState(null);
  const [ignoredAttributes, setIgnoredAttributes] = useState([]);
  const [minItems, setMinItems] = useState(4);
  const [entropy, setEntropy] = useState(0.1);
  const [maxDepth, setMaxDepth] = useState(15);
  const [allAttrs, setAllAttributes] = useState([]);
  const [allClazz, setAllClasses] = useState([]);
  const [config, setConfig] = useState({});
  const [isHeaders, setIsHeaders] = useState(true);
  const [isCrossValid, setIsCrossValid] = useState(true);
  const [folds, setFolds] = useState(10);
  const { attributes: options, onAttributesChange } = useAttributesContext();
  //const { attributes: ignoredAttributes, onIgnoredChange } = useIgnoredContext();
  const { isLoading } = useLoadingContext();

  function handleSelectDecision(value) {
    //console.log(value);
    setDecisionAttribute(value);
    setAllClasses(getAllClasses(dataSet, value));
  }
  function handleSelectIgnore(value) {
    console.log(value);
    setIgnoredAttributes(value);
    //onIgnoredChange(value)
  }
  function handleSetMinItems(value) {
    //console.log(value);
    setMinItems(value);
  }
  function handleSetEntropy(value) {
    //console.log(value);
    setEntropy(value);
  }
  function handleSetMaxDepth(value) {
    //console.log(value);
    setMaxDepth(value);
  }
  function handleSetFolds(value) {
    //console.log(value);
    setFolds(value);
  }
  /**
   * @param {Object<Array,Array>} allAttributes
   *
   */
  function handleGetAllAttributes({ allAttributes, data }) {
    setDecisionAttribute(null);
    setIgnoredAttributes([]);
    //console.log(allAttributes, data);
    setAllAttributes(allAttributes);
    onAttributesChange(allAttributes);
    setDataSet(data);
    shuffleAndChunkArray(data);
  }
  /**
   * @returns {DecisionTreeBuilder}
   */
  function prepareConfig() {
    return {
      allAttributes: allAttrs,
      allClasses: allClazz || [],
      categoryAttr: decisionAttribute,
      entropyThrehold: entropy,
      maxTreeDepth: maxDepth,
      minItemsCount: minItems,
      trainingSet: dataSet || [],
      ignoredAttributes,
      algorithm,
    };
  }

  function handleDrawTree() {
    //
    if (isCrossValid) {
      onCrossValidation(folds);
    }

    const config = prepareConfig();
    setConfig(config);
    onPrepareConfig(config);
    setBuilderConfig(config);
  }

  function handleSetAlgorithm(value) {
    console.log(value);
    setAlgorithm(value);
  }

  function handleHeaders(e) {
    setIsHeaders(e.target.checked);
    setHeaders(e.target.checked);
  }

  function handleCrossValid(e) {
    setIsCrossValid(e.target.checked);
  }

  return (
    <Box
      boxShadow="lg"
      p={2}
      pb={3}
      borderBottom={'0.5px solid lightgray'}
      // borderBottomLeftRadius={'0.975rem'}
      // borderBottomRightRadius={'0.975rem'}
      // backgroundColor={'#a9bcd0ff'}
      //fontSize={['xs', 'xs', 'sm', 'sm', 'md']}
    >
      <Collapse in={isOpen} animateOpacity style={{ overflow: 'visible' }}>
        <Wrap spacing={2} align="center" alignContent="center" justify="center" px={2} py={3} zIndex={2}>
          <WrapItem border={'1px solid black'} borderRadius={'5px'} padding={2}>
            <FormControl id="cross-validation-input" width="auto">
              <FormHelperText mb={2} mt={0}>
                Run with Cross-validation?
              </FormHelperText>
              <Box flexDirection={'row'} display={'flex'} justifyContent={'space-around'}>
                <Checkbox
                  size="sm"
                  colorScheme="linkedin"
                  defaultIsChecked={isCrossValid}
                  onChange={e => handleCrossValid(e)}
                >
                  CV
                </Checkbox>
                <FormControlNumberInput
                  htmlId="foldCount"
                  label="Set folds"
                  defaultValue={folds}
                  min={1}
                  onChange={handleSetFolds}
                />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="deploySet" width="auto">
              <FormHelperText mb={2} mt={0}>
                File has a headers?
              </FormHelperText>
              <Checkbox
                size="sm"
                colorScheme="linkedin"
                defaultIsChecked={isHeaders}
                onChange={e => handleHeaders(e)}
              >
                Headers?
              </Checkbox>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="deploySet">
              <FormHelperText mb={2} mt={0}>
                Deploy file
              </FormHelperText>
              <Box>
                {/* <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Deploy Set</FormLabel> */}

                <FileReader onChange={handleGetAllAttributes} isHeaders={isHeaders} />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="algorithm" zIndex={2} w={100}>
              <FormHelperText mb={2} mt={0}>
                Algorithm
              </FormHelperText>
              <Box>
                {/* <FormLabel fontSize={['xs', 'sm', 'md']}>Algorithm</FormLabel> */}
                <SearchBar
                  placeholder="Select algorithm"
                  onChange={handleSetAlgorithm}
                  value={algorithm}
                  options={['c45', 'tsp', 'tspw'].map(v => ({ value: v, name: v.toUpperCase() }))}
                  multiple={true}
                  closeOnSelect={false}
                />
                {/* <FormHelperText width={size}>
              <Builder size={size} builder={prepareConfig()} />
            </FormHelperText> */}
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="decisionAttr" width="auto" zIndex={2} w={130}>
              <FormHelperText mb={2} mt={0}>
                Decision attr.
              </FormHelperText>
              <Box>
                {/* <FormLabel fontSize={['xs', 'sm', 'md']}>Decision attribute</FormLabel> */}
                <SearchBar
                  placeholder="Select decision attribute"
                  onChange={handleSelectDecision}
                  options={options}
                  multiple={false}
                  closeOnSelect={true}
                  value={decisionAttribute}
                />
                {/* <FormHelperText width={size}>
              <Builder size={size} builder={prepareConfig()} />
            </FormHelperText> */}
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="ignoreAttr" width="auto">
              <FormHelperText mb={2} mt={0}>
                Ignored attrs.
              </FormHelperText>
              <Box>
                {/* <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Ignore attributes</FormLabel> */}
                <SearchBar
                  placeholder="Select ignore attributes"
                  onChange={handleSelectIgnore}
                  options={options}
                  multiple={true}
                  closeOnSelect={false}
                  value={ignoredAttributes}
                />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="ignoreAttr" width="auto">
              <FormHelperText mb={2} mt={0}>
                Min node size
              </FormHelperText>
              <Box>
                <FormControlNumberInput
                  htmlId="minItemsCount"
                  label="Min node size"
                  defaultValue={minItems}
                  min={1}
                  onChange={handleSetMinItems}
                />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="ignoreAttr" width="auto">
              <FormHelperText mb={2} mt={0}>
                Max tree depth
              </FormHelperText>
              <Box w={'100%'}>
                <FormControlNumberInput
                  htmlId="maxDepth"
                  label="Max tree depth"
                  defaultValue={maxDepth}
                  min={1}
                  onChange={handleSetMaxDepth}
                />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl id="entropy" width="auto">
              <FormHelperText mb={2} mt={0}>
                Entropy thres.
              </FormHelperText>
              <Box>
                <FormControlNumberInput
                  htmlId="entropy"
                  label="Entropy threshold"
                  defaultValue={entropy}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={handleSetEntropy}
                />
              </Box>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <Box w={'100%'}>
              <FormControl id="drawTree">
                {/* <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Draw tree</FormLabel> */}
                <FormHelperText mb={2} mt={0}>
                  Draw tree
                </FormHelperText>
                <Button
                  leftIcon={<Icon as={GiLightningTree} />}
                  colorScheme="blue"
                  variant="solid"
                  aria-label="Deploy set"
                  onClick={handleDrawTree}
                  isLoading={isLoading}
                  disabled={decisionAttribute == null}
                  w={100}
                  size="sm"
                >
                  Draw
                </Button>
              </FormControl>
            </Box>
          </WrapItem>
        </Wrap>
      </Collapse>
      <Stack spacing={2} direction={['row']} align="center" alignContent="center" justify="center">
        <Button size="xs" onClick={onToggle} variant="outline">
          {isOpen ? 'HIDE' : 'SHOW'}
        </Button>
        <DrawerMemo ignoredAttributes={ignoredAttributes} />
      </Stack>
    </Box>
  );
}

export default Navigation;
