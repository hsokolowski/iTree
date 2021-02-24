import React, { useState, useEffect } from 'react';
import '../../css/main.scss';
import '../../css/inputs.scss';
import { Collapse, Icon, useDisclosure } from '@chakra-ui/react';
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
  Box,
} from '@chakra-ui/react';
import FileReader from '../FileReader';
import { Search as SearchBar } from '../SearchBar';
import { getAllClasses } from '../../utils/config-builder';
import { builder } from '../../services/Playground';

import IgnoredAttributes from './IgnoredAttributes';
import Builder from './Builder';
import FormControlNumberInput from './FormControlNumberInput';
import DrawerRoll from './DrawerRoll';

/**
 * @typedef {import('../../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

function Navigation({ onPrepareConfig }) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
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

  // useEffect(() => {
  //   //window.addEventListener('resize', () => handleResizeButtonsStyle());
  // }, []);

  const handleSetAttributes = () => {
    let array = [];
    builder.allAttributes.forEach(element => {
      if (decisionAttribute != null && element === decisionAttribute)
        array.push({ value: element, name: element, disabled: true });
      else array.push({ value: element, name: element });
    });
    return array;
  };
  // const handleResizeButtonsStyle = () => {
  //   const windowSize = window.innerWidth;
  //   if (windowSize < 6000) setSize('xl');
  //   if (windowSize < 3000) setSize('lg');
  //   if (windowSize < 1900) setSize('md');
  //   if (windowSize < 1200) setSize('sm');
  //   if (windowSize < 530) setSize('xs');
  // };

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
    <Box
      boxShadow="md"
      p={1}
      //borderBottom={'1px solid #1b1b1eff'}
      borderBottomLeftRadius={'0.975rem'}
      borderBottomRightRadius={'0.975rem'}
      backgroundColor={'#a9bcd0ff'}
      fontSize={['xs', 'xs', 'sm', 'sm', 'md']}
    >
      <Collapse in={isOpen} animateOpacity>
        <Stack
          spacing={2}
          direction={['column', 'column', 'row']}
          align="center"
          alignContent="center"
          justify="center"
          px={2}
          py={3}
        >
          <Box w={'100%'}>
            <FormControl id="deploySet" width="auto">
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Deploy Set</FormLabel>
              <FileReader onChange={handleGetAllAttributes} isHeaders={false} />{' '}
            </FormControl>
          </Box>
          <Box w={'100%'}>
            <FormControl id="decisionAttr" width="auto">
              <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>Decision attribute</FormLabel>
              <SearchBar
                placeholder="Select decision attribute"
                onChange={handleSelectDecision}
                options={options}
                multiple={false}
                closeOnSelect={true}
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
              />
            </FormControl>
          </Box>
          <Box w={'100%'}>
            <FormControlNumberInput
              htmlId="minItemsCount"
              label="Min items count"
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
              >
                Draw
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Collapse>
      <Stack spacing={2} direction={['row']} align="center" alignContent="center" justify="center">
        <Button onClick={onToggle}>{isOpen ? 'HIDE' : 'SHOW'}</Button>
        <DrawerRoll />
      </Stack>
    </Box>
    // <div id="navigation-navbar" className="center-horizontal">
    //   <div style={{ padding: '10px' }}>
    //     <Stack spacing={4} direction="row" align="center" alignContent="center" justify="center">
    //       <FormControl id="deploySet" width="auto">
    //         <FormLabel>Deploy Set</FormLabel>
    //         <FileReader size={size} onChange={handleGetAllAttributes} isHeaders={false} />
    //       </FormControl>
    //       <FormControl id="decisionAttr" width="auto">
    //         <FormLabel>Decision attribute</FormLabel>
    //         <SearchBar
    //           placeholder="Select decision attribute"
    //           onChange={handleSelectDecision}
    //           options={options}
    //           multiple={false}
    //           closeOnSelect={true}
    //         />
    //         <FormHelperText width={size}>
    //           <Builder size={size} builder={prepareConfig()} />
    //         </FormHelperText>
    //       </FormControl>
    //       <FormControl id="ignoreAttr" width="auto">
    //         <FormLabel>Ignore attributes</FormLabel>
    //         <SearchBar
    //           placeholder="Select ignore attributes"
    //           onChange={handleSelectIgnore}
    //           options={options}
    //           multiple={true}
    //           closeOnSelect={false}
    //         />
    //         {ignoredAttributes.length != 0 ? (
    //           <FormHelperText width={size}>
    //             <IgnoredAttributes size={size} ignoredAttributes={ignoredAttributes} />
    //           </FormHelperText>
    //         ) : (
    //           <div></div>
    //         )}
    //       </FormControl>
    //       <FormControlNumberInput
    //         size={size}
    //         htmlId="minItemsCount"
    //         label="Min items count"
    //         defaultValue={minItems}
    //         min={1}
    //         onChange={handleSetMinItems}
    //       />
    //       <FormControlNumberInput
    //         size={size}
    //         htmlId="maxDepth"
    //         label="Max tree depth"
    //         defaultValue={maxDepth}
    //         min={1}
    //         onChange={handleSetMaxDepth}
    //       />
    //       <FormControlNumberInput
    //         size={size}
    //         htmlId="entropy"
    //         label="Entropy threshold"
    //         defaultValue={entropy}
    //         min={0}
    //         max={1}
    //         step={0.1}
    //         onChange={handleSetEntropy}
    //       />
    //       <FormControl id="drawTree" width="auto">
    //         <FormLabel>Draw tree</FormLabel>
    //         <Button
    //           leftIcon={<Icon as={GiLightningTree} />}
    //           size={size}
    //           colorScheme="teal"
    //           variant="outline"
    //           aria-label="Deploy set"
    //           onClick={handleDrawTree}
    //         >
    //           Draw
    //         </Button>
    //       </FormControl>
    //     </Stack>
    //   </div>
    // </div>
  );
}

export default Navigation;
