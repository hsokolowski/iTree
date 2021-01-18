import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import { Icon, useDisclosure, Collapse, Box } from '@chakra-ui/react';
import { GiLightningTree } from 'react-icons/gi';
import {
  IconButton,
  Button,
  Stack,
  Textarea,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from '@chakra-ui/icons';
import FileReader from './FileReader';
import { Search as SearchBar } from './SearchBar';
import { builder } from '../services/Playground';

function Navigation() {
  const [size, setSize] = useState('md');
  const [decisionAttribute, setDecisionAttribute] = useState(null);
  const [ignoredAttributes, setIgnoredAttributes] = useState([]);
  const [minItems, setMinItems] = useState(4);
  const [entropy, setEntropy] = useState(0.1);
  const [maxDepth, setMaxDepth] = useState(15);
  const [options, setOptions] = useState([
    { value: 'hamburger', name: 'Hamburger' },
    { value: 'fries', name: 'Fries' },
    { value: 'milkshake', name: 'Milkshake' },
  ]);

  useEffect(() => {
    setOptions(handleSetAttributes());
    window.addEventListener('resize', () => handleResize());
  }, []);
  const handleSetAttributes = () => {
    let array = [];
    builder.allAttributes.forEach(element => {
      if (decisionAttribute != null && element == decisionAttribute)
        array.push({ value: element, name: element, disabled: true });
      else array.push({ value: element, name: element });
    });
    return array;
  };
  const handleResize = () => {
    const windowSize = window.innerWidth;
    if (windowSize < 6000) setSize('xl');
    if (windowSize < 3000) setSize('lg');
    if (windowSize < 1900) setSize('md');
    if (windowSize < 1200) setSize('sm');
    if (windowSize < 530) setSize('xs');
  };
  function handleSelectIgnore(value) {
    setIgnoredAttributes(value);
  }
  function handleSetMinItems(value) {
    setMinItems(value);
  }
  function handleSetEntropy(value) {
    setEntropy(value);
  }
  function handleSetMaxDepth(value) {
    setMaxDepth(value);
  }

  function ShowIgnoredAttributes({ ignoredAttributes, size }) {
    const { isOpen, onToggle } = useDisclosure();

    return (
      <>
        <Button onClick={onToggle} size={size}>
          Show all ignore attributes
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box position="absolute" p="5px" color="white" mt="1" bg="#342545" rounded="md">
            {ignoredAttributes ? ignoredAttributes.toString() : <div></div>}
          </Box>
        </Collapse>
      </>
    );
  }
  function ShowBuilder() {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
      <>
        <Collapse startingHeight={20} in={show}>
          <Textarea isDisabled placeholder="Here is a sample placeholder" />
        </Collapse>
        <Button size={size} onClick={handleToggle} mt="1rem">
          Show {show ? 'Less' : 'More'}
        </Button>
      </>
    );
  }

  return (
    <div id="navigation-navbar" className="center-horizontal">
      <div style={{ padding: '10px' }}>
        <Stack spacing={4} direction="row" align="center" alignContent="center" justify="center">
          <FormControl id="deploySet" width="auto">
            <FormLabel>Deploy Set</FormLabel>
            <FileReader size={size} />
          </FormControl>
          <FormControl id="decisionAttr" width="auto">
            <FormLabel>Decision attribute</FormLabel>
            <SearchBar
              placeholder="Select decision attribute"
              onChange={handleSelectIgnore}
              options={options}
              multiple={false}
            />
          </FormControl>
          <FormControl id="ignoreAttr" width="auto">
            <FormLabel>Ignore attributes</FormLabel>
            <SearchBar
              placeholder="Select ignore attributes"
              onChange={handleSelectIgnore}
              options={options}
              multiple={true}
            />
            {ignoredAttributes.length != 0 ? (
              <FormHelperText width={size}>
                <ShowIgnoredAttributes size={size} ignoredAttributes={ignoredAttributes} />
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
