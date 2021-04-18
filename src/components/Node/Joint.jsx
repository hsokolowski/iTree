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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import Configurator from './Configurator';
import ModalPopup from './ModalPopup';

function Joint({ children, attr2, predicateName, pivot, weight, requestFoldToLeaf, onChange, nodeSet }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('lg');

  const handleOpenModalClick = () => {
    buildNewNode(); // to na inny guzik i o
    onOpen();
  };
  const buildNewNode = () => {
    onChange();
  };

  const foldToLeaf = () => requestFoldToLeaf();

  return (
    <Box mt={1}>
      <ButtonGroup size="md" isAttached variant="solid" className="tree-branch">
        <Tooltip hasArrow label="Changes at attribute" bg="red.600" placement="top">
          <Button size="xs" colorScheme="green" onClick={handleOpenModalClick}>
            {attr2} <b>{predicateName}</b> {weight} {pivot}
          </Button>
        </Tooltip>
        <Tooltip hasArrow label="Fold a leaf" bg="orange.600" placement="right">
          <Button size="xs" borderRadius="0.375rem" rightIcon={<CloseIcon />} onClick={foldToLeaf}>
            Fold
          </Button>
        </Tooltip>
      </ButtonGroup>
      {/* <Badge
        borderRadius="0.375rem"
        px="3"
        py="2"
        variant="subtle"
        colorScheme="green"
        onClick={handleOpenModalClick}
        className={'badge'}
        marginRight={3}
        fontSize={16}
      >
        {attr2} <b>{predicateName}</b> {weight} {pivot}
      </Badge> */}
      {/* <Button size="xs" borderRadius="0.375rem" rightIcon={<CloseIcon />} onClick={foldToLeaf}>
        Fold
      </Button> */}
      <ModalPopup
        isOpen={isOpen}
        nodeSet={nodeSet}
        attr2={attr2}
        predicateName={predicateName}
        pivot={pivot}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
        weight={weight}
      />
      {children}
    </Box>
  );
}

export default Joint;
