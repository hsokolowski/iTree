import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io';

function DataViewer({ hide, onChange }) {
  return (
    <Button
      mt={1}
      px={2}
      py={3}
      onClick={() => onChange(!hide)}
      colorScheme="teal"
      variant="outline"
      size="sm"
      fontSize="14px"
      //color="white"
      mr={1}
    >
      {hide ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
    </Button>
  );
}

export default DataViewer;
