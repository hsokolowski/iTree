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
    <Box>
      <Badge
        borderRadius="full"
        px="2"
        py="1"
        colorScheme="teal"
        onClick={handleOpenModalClick}
        className={'badge'}
        marginRight={3}
      >
        {attr2} <b>{predicateName}</b> {weight} {pivot}
      </Badge>
      <Button size="xs" rightIcon={<CloseIcon />} onClick={foldToLeaf}>
        Fold
      </Button>
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
      {/* <Modal onClose={onClose} size={size} isOpen={isOpen}>
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
            <Configurator />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
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
