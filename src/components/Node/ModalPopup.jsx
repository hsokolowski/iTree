import React, { useState } from 'react';
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

function ModalPopup({ attr2, predicateName, pivot }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModalClick = () => {
    onOpen();
  };

  <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {attr2} <b>{predicateName}</b> {pivot}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>Text ( kolejny komponent z konfiguratorem) attr3 attr4 </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}

export default ModalPopup;
