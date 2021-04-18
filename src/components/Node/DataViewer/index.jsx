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
  useDisclosure,
} from '@chakra-ui/react';
import { CgDatabase } from 'react-icons/cg';

function DataViewer({ node, side }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const scrollBehavior = 'inside';
  const sideSubTitle = side ? 'Matched' : 'Not Matched';

  return (
    <Box>
      <Button
        mt={1}
        px={2}
        py={3}
        onClick={onOpen}
        leftIcon={<CgDatabase />}
        colorScheme="teal"
        variant="solid"
        size="sm"
        fontSize="14px"
        fontWeight="semibold"
      >
        {/* View Data */}
        {/* <CgDatabase /> */}
        {sideSubTitle}
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior={scrollBehavior}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Data Viewer [ {sideSubTitle} ]</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DataViewer;
