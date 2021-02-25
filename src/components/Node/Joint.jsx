import {
  Badge,
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
import React, { useState } from 'react';
import Configurator from './Configurator';

function Joint({ children, attr2, predicateName, pivot, match, notMatch, onChange }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('lg');

  const handleOpenModalClick = () => {
    buildNewNode();
    onOpen();
  };
  const buildNewNode = () => {
    onChange();
  };
  return (
    <Box>
      <Badge
        borderRadius="full"
        px="2"
        py="1"
        colorScheme="teal"
        onClick={handleOpenModalClick}
        className={'badge'}
      >
        {attr2} <b>{predicateName}</b> {pivot}
      </Badge>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {attr2} <b>{predicateName}</b> {pivot}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Text ( kolejny komponent z konfiguratorem)
            <Configurator />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <div>
        Match
        {JSON.stringify(match)}
      </div>
      <div>
        notMatch
        {JSON.stringify(notMatch)}
      </div> */}
      {children}
    </Box>
  );
}

export default Joint;
