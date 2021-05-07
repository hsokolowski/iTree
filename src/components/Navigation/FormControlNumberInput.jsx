import React from 'react';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

/**
 * @param {Object} props
 * @param {number} props.defaultValue
 * @param {number} props.min
 * @param {number} [props.max]
 * @param {number} [props.step]
 * @param {function} props.onChange
 * @param {string} props.label
 * @param {string} props.htmlId
 *
 */
function FormControlNumberInput({ defaultValue, min, max, step, onChange, label, htmlId }) {
  function handleChange(e) {
    console.log(e);
    onChange(e);
  }

  return (
    // <FormControl id={htmlId}>
    //   <FormLabel fontSize={['xs', 'sm', 'md']}>{label}</FormLabel>
    <NumberInput
      defaultValue={defaultValue}
      min={min}
      step={step}
      max={max}
      size="sm"
      onChange={handleChange}
      bg="white"
      borderRadius="0.375rem"
      w={100}
      // _hover={{
      //   borderColor: '#2fcc8b',
      // }}
    >
      <NumberInputField borderRadius="0.375rem" />
      <NumberInputStepper borderRadius="0.375rem">
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    // {/* </FormControl> */}
  );
}

export default FormControlNumberInput;
