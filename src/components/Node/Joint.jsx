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
import ModalPopup from './ModalPopup';

function Joint({ children, attr2, predicateName, pivot, match, notMatch, onChange, nodeSet }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('lg');

  const handleOpenModalClick = () => {
    buildNewNode(); // to na inny guzik i o
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
      <ModalPopup
        isOpen={isOpen}
        nodeSet={nodeSet}
        attr2={attr2}
        predicateName={predicateName}
        pivot={pivot}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
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
