import React from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';

export default function TabTSP({ attribute, value, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onPivotChange = value => changeValues({ pivot: value });

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
      {/* </div> */}
      <ChevronLeftIcon w={10} h={10} />
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
