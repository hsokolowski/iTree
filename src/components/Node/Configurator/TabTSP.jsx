import React from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { FaLessThan } from 'react-icons/fa';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';
import { IconContext } from 'react-icons';

export default function TabTSP({ attribute, value, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onPivotChange = value => changeValues({ pivot: value });

  return (
    <Stack spacing={3} direction="row">
      <SearchBar
        value={attribute}
        onChange={onAttributeChange}
        options={options}
        multiple={false}
        closeOnSelect={true}
      />
      <IconContext.Provider value={{ style: { height: 40 } }}>
        <FaLessThan size={50} />
      </IconContext.Provider>
      <SearchBar
        value={value}
        onChange={onPivotChange}
        options={options}
        multiple={false}
        closeOnSelect={true}
      />
    </Stack>
  );
}
