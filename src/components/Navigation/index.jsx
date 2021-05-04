import React, { useState } from 'react';
import '../../css/main.scss';
import '../../css/inputs.scss';
import { Checkbox, Collapse, Icon, useDisclosure } from '@chakra-ui/react';
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

/**
 * @typedef {import('../../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

function Navigation({ onPrepareConfig }) {
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
  /**
   * @param {Object<Array,Array>} allAttributes
   *
   */
  function handleGetAllAttributes({ allAttributes, data }) {
    setDecisionAttribute(null);
    setIgnoredAttributes([]);
    console.log(allAttributes, data);
    setAllAttributes(allAttributes);
    onAttributesChange(allAttributes);
    setDataSet(data);
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
    const config = prepareConfig();
    setConfig(config);
    onPrepareConfig(config);
    setBuilderConfig(config);
  }

  function handleSetAlgorithm(value) {
    console.log(value);
    setAlgorithm(value);
  }

  return (
    <Box
      boxShadow="md"
      p={1}
      //borderBottom={'1px solid #1b1b1eff'}
      borderBottomLeftRadius={'0.975rem'}
      borderBottomRightRadius={'0.975rem'}
      backgroundColor={'#a9bcd0ff'}
      fontSize={['xs', 'xs', 'sm', 'sm', 'md']}
    >
      <Collapse in={isOpen} animateOpacity style={{ overflow: 'visible' }}>
        <Stack
          spacing={2}
          direction={['column', 'column', 'row']}
          align="center"
          alignContent="center"
          justify="center"
          px={2}
          py={3}
          zIndex={2}
        >
          <Box w={'100%'}>
            <FormControl id="deploySet" width="auto">
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Deploy Set</FormLabel>
              <FileReader onChange={handleGetAllAttributes} isHeaders={isHeaders} />
            </FormControl>
            <Checkbox
              colorScheme="green"
              defaultIsChecked={isHeaders}
              onChange={e => setIsHeaders(e.target.checked)}
            >
              Headers?
            </Checkbox>
          </Box>
          <Box w={'100%'}>
            <FormControl id="algorithm" width="auto" zIndex={2}>
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Algorithm</FormLabel>
              <SearchBar
                placeholder="Select algorithm"
                //onChange={setAlgorithm}
                onChange={handleSetAlgorithm}
                value={algorithm}
                options={['c45', 'tsp', 'tspw'].map(v => ({ value: v, name: v.toUpperCase() }))}
                multiple={true}
                closeOnSelect={false}
              />
              {/* <FormHelperText width={size}>
              <Builder size={size} builder={prepareConfig()} />
            </FormHelperText> */}
            </FormControl>
          </Box>
          <Box w={'100%'}>
            <FormControl id="decisionAttr" width="auto" zIndex={2}>
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Decision attribute</FormLabel>
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
            </FormControl>
          </Box>
          <Box w={'100%'}>
            <FormControl id="ignoreAttr" width="auto">
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Ignore attributes</FormLabel>
              <SearchBar
                placeholder="Select ignore attributes"
                onChange={handleSelectIgnore}
                options={options}
                multiple={true}
                closeOnSelect={false}
                value={ignoredAttributes}
              />
            </FormControl>
          </Box>
          <Box w={'100%'}>
            <FormControlNumberInput
              htmlId="minItemsCount"
              label="Min node size"
              defaultValue={minItems}
              min={1}
              onChange={handleSetMinItems}
            />
          </Box>
          <Box w={'100%'}>
            <FormControlNumberInput
              htmlId="maxDepth"
              label="Max tree depth"
              defaultValue={maxDepth}
              min={1}
              onChange={handleSetMaxDepth}
            />
          </Box>
          <Box w={'100%'}>
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
          <Box w={'100%'}>
            <FormControl id="drawTree" width="auto">
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Draw tree</FormLabel>
              <Button
                leftIcon={<Icon as={GiLightningTree} />}
                colorScheme="teal"
                variant="outline"
                aria-label="Deploy set"
                onClick={handleDrawTree}
                w="100%"
                h={10}
                isLoading={isLoading}
                disabled={decisionAttribute == null}
              >
                Draw
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Collapse>
      <Stack spacing={2} direction={['row']} align="center" alignContent="center" justify="center">
        <Button onClick={onToggle}>{isOpen ? 'HIDE' : 'SHOW'}</Button>
        <DrawerMemo ignoredAttributes={ignoredAttributes} />
      </Stack>
    </Box>
  );
}

export default Navigation;
