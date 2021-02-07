import React, { useState, useEffect } from 'react';
import '../../css/main.scss';
import { Icon } from '@chakra-ui/react';
import { GiLightningTree } from 'react-icons/gi';
import {
  Button,
  Stack,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import FileReader from '../FileReader';
import { Search as SearchBar } from '../SearchBar';
import { getAllClasses } from '../../utils/config-builder';
import { builder } from '../../services/Playground';

import IgnoredAttributes from './IgnoredAttributes';
import Builder from './Builder';

/**
 * @typedef {import('../../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

function Navigation({ onPrepareConfig }) {
  const [size, setSize] = useState('md');
  const [dataSet, setDataSet] = useState(null);
  const [decisionAttribute, setDecisionAttribute] = useState(null);
  const [ignoredAttributes, setIgnoredAttributes] = useState([]);
  const [minItems, setMinItems] = useState(4);
  const [entropy, setEntropy] = useState(0.1);
  const [maxDepth, setMaxDepth] = useState(15);
  const [allAttrs, setAllAttributes] = useState([]);
  const [allClazz, setAllClasses] = useState([]);
  const [config, setConfig] = useState({});
  const [options, setOptions] = useState([
    { value: 'hamburger', name: 'Hamburger' },
    { value: 'fries', name: 'Fries' },
    { value: 'milkshake', name: 'Milkshake' },
  ]);

  useEffect(() => {
    window.addEventListener('resize', () => handleResizeButtonsStyle());
  }, []);

  const handleSetAttributes = () => {
    let array = [];
    builder.allAttributes.forEach(element => {
      if (decisionAttribute != null && element === decisionAttribute)
        array.push({ value: element, name: element, disabled: true });
      else array.push({ value: element, name: element });
    });
    return array;
  };
  const handleResizeButtonsStyle = () => {
    const windowSize = window.innerWidth;
    if (windowSize < 6000) setSize('xl');
    if (windowSize < 3000) setSize('lg');
    if (windowSize < 1900) setSize('md');
    if (windowSize < 1200) setSize('sm');
    if (windowSize < 530) setSize('xs');
  };

  function handleSelectDecision(value) {
    //console.log(value);
    setDecisionAttribute(value);
    setAllClasses(getAllClasses(dataSet, value));
  }
  function handleSelectIgnore(value) {
    //console.log(value);
    setIgnoredAttributes(value);
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
    //console.log(allAttributes, data);
    let array = [];
    allAttributes.forEach(element => {
      array.push({ value: element, name: element });
    });
    setAllAttributes(allAttributes);
    setOptions(array);
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
      ignoredAttributes: ignoredAttributes,
      entropyThrehold: entropy,
      maxTreeDepth: maxDepth,
      minItemsCount: minItems,
      trainingSet: dataSet || [],
    };
  }

  function handleDrawTree() {
    setConfig(prepareConfig());
    onPrepareConfig(prepareConfig());
  }

  return (
    <div id="navigation-navbar" className="center-horizontal">
      <div style={{ padding: '10px' }}>
        <Stack spacing={4} direction="row" align="center" alignContent="center" justify="center">
          <FormControl id="deploySet" width="auto">
            <FormLabel>Deploy Set</FormLabel>
            <FileReader size={size} onChange={handleGetAllAttributes} isHeaders={false} />
          </FormControl>
          <FormControl id="decisionAttr" width="auto">
            <FormLabel>Decision attribute</FormLabel>
            <SearchBar
              placeholder="Select decision attribute"
              onChange={handleSelectDecision}
              options={options}
              multiple={false}
              closeOnSelect={true}
            />
            <FormHelperText width={size}>
              <Builder size={size} builder={prepareConfig()} />
            </FormHelperText>
          </FormControl>
          <FormControl id="ignoreAttr" width="auto">
            <FormLabel>Ignore attributes</FormLabel>
            <SearchBar
              placeholder="Select ignore attributes"
              onChange={handleSelectIgnore}
              options={options}
              multiple={true}
              closeOnSelect={false}
            />
            {ignoredAttributes.length != 0 ? (
              <FormHelperText width={size}>
                <IgnoredAttributes size={size} ignoredAttributes={ignoredAttributes} />
              </FormHelperText>
            ) : (
              <div></div>
            )}
          </FormControl>
          <FormControl id="minItemsCount" width="auto">
            <FormLabel>Min items count</FormLabel>
            <NumberInput
              defaultValue={minItems}
              min={1}
              size={size}
              width="auto"
              variant="solid"
              onChange={handleSetMinItems}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="maxDepth" width="auto">
            <FormLabel>Max tree depth</FormLabel>
            <NumberInput
              defaultValue={maxDepth}
              min={1}
              size={size}
              width="auto"
              variant="solid"
              onChange={handleSetMaxDepth}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="entropy" width="auto">
            <FormLabel>Entropy threshold</FormLabel>
            <NumberInput
              max={1}
              min={0}
              step={0.1}
              defaultValue={entropy}
              size={size}
              width="auto"
              variant="solid"
              onChange={handleSetEntropy}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="drawTree" width="auto">
            <FormLabel>Draw tree</FormLabel>
            <Button
              leftIcon={<Icon as={GiLightningTree} />}
              size={size}
              colorScheme="teal"
              variant="outline"
              aria-label="Deploy set"
              onClick={handleDrawTree}
            >
              Draw
            </Button>
          </FormControl>
        </Stack>
      </div>
    </div>
  );
}

export default Navigation;
