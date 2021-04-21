import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAttributesContext } from '../../../contexts/AttributesContext';
import { Search as SearchBar } from '../../SearchBar';
import { CloseIcon } from '@chakra-ui/icons';

function DataViewerTable({ data }) {
  console.log(data);
  const [columns, setColumns] = useState([]);
  const [selected, setSelected] = useState([]);
  const { attributes } = useAttributesContext();
  function handleSetColumns(value) {
    setColumns(value);
  }
  function clearColumns() {
    setColumns([]);
  }
  function handleSelect(idx) {
    console.log(idx);
    let tmp = selected;
    if (!tmp.includes(idx)) {
      tmp.push(idx);
    } else {
      let index = tmp.indexOf(idx);
      if (index !== -1) {
        tmp.splice(index, 1);
      }
    }
    console.log(tmp);
    setSelected(tmp);
  }

  return (
    <Box>
      <Box bg="gray.200" p={2} d="flex">
        <SearchBar
          placeholder="Select columns"
          onChange={handleSetColumns}
          options={attributes}
          multiple={true}
          closeOnSelect={false}
          value={columns}
        />
        <Button
          rightIcon={<CloseIcon />}
          bg="gray.600"
          color="white"
          h={10}
          ml={3}
          _hover={{
            background: 'gray.900',
            color: 'white',
          }}
          size="xs"
          p={4}
          onClick={clearColumns}
        >
          Clear columns
        </Button>
      </Box>
      <Box overflow="auto" bg="gray.200" d="flex" justifyContent="center">
        <Table size="sm" bg="gray.200" w="auto">
          <Thead>
            <Tr>
              {columns.length !== 0 ? (
                <Th fontSize={11} p={1}>
                  ID
                </Th>
              ) : (
                <></>
              )}
              {columns.sort().map(th => (
                <Th fontSize={11} p={1}>
                  {th}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {columns.length !== 0 ? (
              data.map((item, index) => {
                let tds = [
                  <Td fontSize={10} p={1}>
                    {index + 1}
                  </Td>,
                ];
                for (const key of columns) {
                  tds.push(
                    <Td fontSize={10} p={1}>
                      {item[key]}
                    </Td>
                  );
                }
                return (
                  <Tr
                    id={index}
                    _hover={{
                      background: 'gray.400',
                      fontWeight: 'bolder',
                    }}
                    onClick={() => handleSelect(index)}
                    bg={selected.includes(index) ? 'gray.300' : 'gray.200'}
                  >
                    {tds.map(el => el)}
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td>Select columns to see data</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default DataViewerTable;
