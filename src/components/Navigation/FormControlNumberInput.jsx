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
    <FormControl id={htmlId} width="auto">
      <FormLabel fontSize={['md', 'md', 'xs', 'sm', 'md']}>{label}</FormLabel>
      <NumberInput
        defaultValue={defaultValue}
        min={min}
        step={step}
        max={max}
        variant="solid"
        onChange={handleChange}
        shadow={'md'}
        //border="1px solid #E2E8F0"
        borderRadius="0.375rem"
        _hover={{
          borderColor: '#2fcc8b',
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default FormControlNumberInput;
