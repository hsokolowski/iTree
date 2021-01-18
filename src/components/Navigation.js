import React from "react";
import "../css/main.scss";
import {
  IconButton,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import FileReader from "./FileReader";

function Navigation() {
  return (
    <div id="navigation-navbar" className="center-horizontal">
      <div style={{ padding: "10px" }}>
        <Stack spacing={4} direction="row" align="center">
          <FormControl id="deploySet" width="auto">
            <FormLabel>Deploy Set</FormLabel>
            <FileReader />
          </FormControl>
          {/* <InputGroup>
              <InputLeftAddon children="Decision attribute" />
              <Select placeholder="Select decision" size="md">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </InputGroup> */}
          <FormControl id="decisionAttr" variant="outline">
            <FormLabel>Decision attribute</FormLabel>
            <Select placeholder="Select decision attribute" variant="outline">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <FormControl id="ignoreAttr">
            <FormLabel>Ignore attributes</FormLabel>
            <Select placeholder="Select attributes to ignore..">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <FormControl id="maxDepth">
            <FormLabel>Max tree depth</FormLabel>
            <NumberInput defaultValue = {15} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="entropy">
            <FormLabel>Entropy threshold</FormLabel>
            <NumberInput max={1} min={0} step={0.1} defaultValue={0.1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="drawTree" width="auto">
            <FormLabel>Draw tree</FormLabel>
            <Button leftIcon={<AddIcon />} size="md" colorScheme="teal" variant="outline" aria-label="Deploy set">
              Draw
            </Button>
          </FormControl>
        </Stack>
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<AddIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<WarningIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<PhoneIcon />} />
        Hello there
      </div>
    </div>
  );
}

export default Navigation;
