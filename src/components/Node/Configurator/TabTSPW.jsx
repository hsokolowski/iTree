import React from 'react';
import { Icon, Input, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';

export default function TabTSPW({ attribute, value, weight, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onWeightChange = event => changeValues({ weight: +event.target.value });
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
      <Input value={weight} size="sm" name="c45-value" onChange={onWeightChange} />
      <Icon viewBox="0 0 200 200" color="black.500">
        <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
      </Icon>
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
