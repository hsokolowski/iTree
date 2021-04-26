// @ts-nocheck
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useRowSelect } from 'react-table';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

function ReactTable({ set, cols }) {
  console.log(set, cols);
  const data = React.useMemo(() => set, []);

  var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  function prepareHeaders(cols) {
    let tmp = [];
    for (let item of cols.sort(collator.compare)) {
      tmp.push({
        Header: item,
        accessor: item,
      });
    }
    console.log(tmp);
    return tmp;
  }
  const columns = React.useMemo(() => prepareHeaders(cols), [cols]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              {cols.length !== 0 ? (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              ) : (
                <div>Select columns to see rows</div>
              )}
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <Table {...getTableProps()} size="sm" bg="gray.200" w="auto" overflowX="auto" d="block">
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            <Th fontSize={11} p={1}>
              {cols.length !== 0 ? 'ID' : ''}
            </Th>
            {headerGroup.headers.map(column => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
                fontSize={11}
                p={1}
              >
                {column.render('Header')}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <TriangleDownIcon aria-label="sorted descending" />
                  ) : (
                    <TriangleUpIcon aria-label="sorted ascending" />
                  )
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
              _hover={{
                background: 'green.400',
                fontWeight: 'bolder',
              }}
              bg={Object.keys(selectedRowIds).includes(i.toString()) ? 'gray.400' : 'gray.200'}
            >
              <Td fontSize={10} p={1}>
                {i + 1}
              </Td>
              {row.cells.map(cell => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric} fontSize={10} p={1}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default ReactTable;
