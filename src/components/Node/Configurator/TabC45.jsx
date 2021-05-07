import React from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { FaGreaterThan, FaEquals } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';

export default function TabC45({ attribute, value, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onPivotChange = event => changeValues({ pivot: event.target.value });

  return (
    <Stack spacing={3} direction="row">
      {/* <div className="alg-search"> */}
      <SearchBar
        value={attribute}
        onChange={onAttributeChange}
        options={options}
        multiple={false}
        closeOnSelect={true}
      />
      <IconContext.Provider value={{ style: { height: 32 } }}>
        <FaGreaterThan size={50} />
        <FaEquals size={50} />
      </IconContext.Provider>

      <Input
        variant="filled"
        value={value}
        size="sm"
        name="c45-value"
        onChange={onPivotChange}
        borderRadius={'0.375rem'}
      />
    </Stack>
  );
}
