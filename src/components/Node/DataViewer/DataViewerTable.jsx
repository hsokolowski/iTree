import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAttributesContext } from '../../../contexts/AttributesContext';
import { Search as SearchBar } from '../../SearchBar';

function DataViewerTable({ data }) {
  console.log(data);
  const [highlighted, setHighlighted] = useState(false);
  const [columns, setColumns] = useState([]);
  const { attributes } = useAttributesContext();
  function handleSetColumns(value) {
    console.log(value);
  }
  function onRowClicked() {
    setHighlighted(!highlighted);
  }
  const objKeys = Object.keys(data[0]);
  return (
    <Box pr={4}>
      <Box bg="gray.200" p={3}>
        <SearchBar
          placeholder="Select columns"
          onChange={handleSetColumns}
          options={attributes}
          multiple={true}
          closeOnSelect={false}
          value={columns}
        />
      </Box>
      <Table size="sm" bg="gray.200">
        <Thead>
          <Tr>
            {objKeys.map(th => (
              <Th fontSize={11}>{th}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => {
            let tds = [];
            for (const [key, value] of Object.entries(item)) {
              tds.push(<Td fontSize={10}>{value}</Td>);
            }
            return (
              <Tr bg={highlighted ? 'gray.300' : 'gray.200'} onClick={onRowClicked}>
                {tds.map(el => el)}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default DataViewerTable;
