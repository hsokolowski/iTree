import React from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { CgMathEqual } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { Search as SearchBar } from '../../SearchBar';
import './alg-style.scss';
import { useAttributesContext } from '../../../contexts/AttributesContext';

export default function TabC45({ attribute, value, changeValues }) {
  const { attributes: options } = useAttributesContext();

  const onAttributeChange = value => changeValues({ attribute: value });
  const onPivotChange = event => changeValues({ pivot: +event.target.value });

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

      <IconContext.Provider value={{ style: { height: 10 } }}>
        <Stack direction="row" spacing={0}>
          <ChevronRightIcon w={10} h={10} />
        </Stack>
      </IconContext.Provider>

      <Input value={value} size="md" name="c45-value" onChange={onPivotChange} />
    </Stack>
  );
}
