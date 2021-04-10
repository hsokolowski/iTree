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

function ModalPopup({ attr2, predicateName, pivot, weight, isOpen, nodeSet, onOpen, onChange, onClose }) {
  const handleOnChange = value => {
    onClose();
    onChange(value);
  };

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {attr2} <b>{predicateName}</b> {pivot}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Text ( kolejny komponent z konfiguratorem){' '}
          {nodeSet.map((x, index) => (
            <div key={index}>
              {x.attr1001} {x[attr2]}-{x[pivot]} {x[attr2] < x[pivot] ? 'Match' : 'NotMatch'}
            </div>
          ))} */}
          <Configurator onChange={handleOnChange} attribute={attr2} pivot={pivot} weight={weight} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPopup;
