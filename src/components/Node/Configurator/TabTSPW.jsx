import React from 'react';
import { Icon, Input, Stack } from '@chakra-ui/react';
import { FaLessThan, FaTimes } from 'react-icons/fa';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';
import { IconContext } from 'react-icons';

export default function TabTSPW({ attribute, value, weight, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onWeightChange = event => {
    let w = event.target.value;
    w = w.replace(',', '.');
    changeValues({ weight: w });
  };
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
      <IconContext.Provider value={{ style: { height: 32 } }}>
        <FaLessThan size={50} />
      </IconContext.Provider>
      <Input
        variant="filled"
        value={weight}
        size="sm"
        onChange={onWeightChange}
        w={70}
        borderRadius={'0.375rem'}
      />
      <IconContext.Provider value={{ style: { height: 32 } }}>
        <FaTimes size={50} />
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
