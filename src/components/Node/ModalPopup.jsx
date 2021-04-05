import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Configurator from './Configurator';

function ModalPopup({ attr2, predicateName, pivot, isOpen, nodeSet, onOpen, onClose }) {
  function handleChange(value) {
    console.log(value);
    onClose();
  }

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {attr2} <b>{predicateName}</b> {pivot}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Text ( kolejny komponent z konfiguratorem){' '}
          {nodeSet.map(x => (
            <div>
              {x.attr1001} {x[attr2]}-{x[pivot]} {x[attr2] < x[pivot] ? 'Match' : 'NotMatch'}
            </div>
          ))}
          <Configurator onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPopup;