import React from 'react';
import SelectSearch from 'react-select-search';
import '../css/searchBar.scss';

export const Search = props => (
  <SelectSearch
    className={props.className}
    onChange={props.onChange}
    options={props.options}
    search
    multiple={props.multiple}
    printOptions="on-focus"
    closeOnSelect={props.closeOnSelect}
    placeholder={props.placeholder}
    value={props.value}
  />
);
