import React, { useEffect, useState } from 'react';
import {
  Button,
  Textarea,
  Box,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import { predict } from '../../utils/predict';

/**
 * @param {Object} props
 * @param {Array[]} props.confusionMatrix
 * @param {string[]} props.headers
 */
function TableComponent({ confusionMatrix, headers }) {
  return (
    <Table size="sm" w="auto" d="block">
      <Thead>
        <Tr>
          <Th colSpan={confusionMatrix.length + 2} textAlign="center">
            PREDICT
          </Th>
        </Tr>
        <Tr>
          <Th></Th>
          <Th></Th>
          {headers.map(x => (
            <Th key={uuidv4()}>{x}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {confusionMatrix.map((x, idx) => {
          console.log(x, idx);
          return (
            <Tr key={uuidv4()}>
              {idx === 0 ? (
                <Th
                  rowSpan={confusionMatrix.length}
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(-90deg)',
                    //padding: '2px',
                  }}
                >
                  ACTUAL
                </Th>
              ) : (
                <></>
              )}
              <Th>{headers[idx]}</Th>
              {x.map(y => (
                <Td key={uuidv4()}>{y}</Td>
              ))}
            </Tr>
          );
        })}
        {/* <Tr>
          <Td
            rowSpan={confusionMatrix.length}
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'revert',
            }}
          >
            Predict
          </Td>
          <Td>millimetres (mm)</Td>
          <Td>25.4</Td>
        </Tr> */}
      </Tbody>
      {/* <Tfoot mt={2}>
        <Tr fontSize={20}>
          <Th></Th>
          <Th></Th>
          <Tr>Accuracy:</Tr>
          <Tr>{acc.toFixed(3)}%</Tr>
        </Tr>
      </Tfoot> */}
    </Table>
  );
}

export default TableComponent;
