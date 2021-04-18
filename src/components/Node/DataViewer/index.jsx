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
import { CgDatabase } from 'react-icons/cg';
import DataViewerTable from './DataViewerTable';

function DataViewer({ node, side }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const scrollBehavior = 'inside';
  const sideSubTitle = side ? 'Matched' : 'Not Matched';

  return (
    <Box>
      <Tooltip hasArrow label="View data in node" bg="blue.600" placement="right">
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
          {sideSubTitle}
        </Button>
      </Tooltip>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior={scrollBehavior}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Data Viewer [ {sideSubTitle} ]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DataViewerTable data={node.nodeSet ? node.nodeSet : node.trainingSet2} />
          </ModalBody>

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
