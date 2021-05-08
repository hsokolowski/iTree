import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CgDatabase } from 'react-icons/cg';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import DataViewerTable from './DataViewerTable';

function DataViewer({ node, side, onChange, hide }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const scrollBehavior = 'inside';
  const sideSubTitle = side ? 'Matched' : 'Not Matched';
  const nodeSize = node.nodeSet ? node.nodeSet.length : node.trainingSet2.length;

  return (
    <Box>
      <ButtonGroup isAttached>
        <Button
          mt={1}
          // px={2}
          // py={3}
          onClick={() => onChange(!hide)}
          // bg={'#444'}
          // color="white"
          // _hover={{
          //   bg: '#333',
          //   color: 'white',
          // }}
          variant="outline"
          colorScheme="facebook"
          size="xs"
        >
          {hide ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
        </Button>
        <Tooltip hasArrow label="View data in node" bg="purple.600" placement="right">
          <Button
            mt={1}
            colorScheme="facebook"
            border={'1px solid #333'}
            disabled={nodeSize ? false : true}
            onClick={onOpen}
            leftIcon={<CgDatabase />}
            variant="outline"
            size="xs"
            fontSize="14px"
            fontWeight="semibold"
          >
            {sideSubTitle} ({nodeSize})
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior={scrollBehavior}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box ml="3">
              <Box fontWeight="bold" d="flex" alignItems="center">
                Data Viewer
                <Badge ml="1" variant="subtle" colorScheme="green" fontSize={14}>
                  {sideSubTitle}
                </Badge>
              </Box>
              <Text fontSize="sm">
                {node.nodeSet ? node.nodeSet.length : node.trainingSet2.length} elements
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton mr={3} />
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
