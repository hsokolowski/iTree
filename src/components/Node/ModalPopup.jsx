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
  Stack,
} from '@chakra-ui/react';
import Configurator from './Configurator';

function ModalPopup({ attr2, predicateName, pivot, weight, isOpen, nodeSet, onOpen, onChange, onClose }) {
  const [state, setState] = useState({});
  const handleOnChange = value => {
    setState(value);
  };
  const handleConfirm = () => {
    onClose();
    onChange({ ...state, isUpdate: false });
  };
  const handleUpdate = () => {
    onClose();
    let oldAlg = state.algorithm;

    onChange({ ...state, isUpdate: true, algorithm: ['update'], oldAlgorithm: oldAlg });
  };

  return (
    <Modal onClose={onClose} size="lg" isOpen={isOpen} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {attr2} <b>{predicateName}</b> {weight ? parseFloat(weight).toFixed(3) + ' * ' : ''} {pivot}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Configurator onChange={handleOnChange} attribute={attr2} pivot={pivot} weight={weight} />
        </ModalBody>
        <ModalFooter>
          <Stack spacing={5} direction="row">
            <Button colorScheme="gray" onClick={handleUpdate}>
              Update
            </Button>
            <Button colorScheme="blue" onClick={handleConfirm}>
              Rebuild
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPopup;
