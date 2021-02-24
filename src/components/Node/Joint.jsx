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

function Joint({ children, attr2, predicateName, pivot, match, notMatch, onChange }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('lg');

  const handleSizeClick = () => {
    onOpen();
  };
  return (
    <Box onClick={handleSizeClick}>
      <Badge borderRadius="full" px="2" py="1" colorScheme="teal">
        {attr2} <b>{predicateName}</b> {pivot}
      </Badge>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {attr2} <b>{predicateName}</b> {pivot}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Text ( kolejny komponent z konfiguratorem)</ModalBody>
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
