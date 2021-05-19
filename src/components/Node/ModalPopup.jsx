import React, { useState } from 'react';
import {
  Button,
  Code,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
} from '@chakra-ui/react';
import Configurator from './Configurator';

function ModalPopup({
  attr2,
  predicateName,
  pivot,
  weight,
  isOpen,
  nodeSet,
  onOpen,
  onChange,
  onClose,
  bestTests,
}) {
  const [state, setState] = useState({});
  const handleOnChange = value => {
    console.log(value);
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
    <Modal onClose={onClose} size="xl" isOpen={isOpen} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {attr2} <b>{predicateName}</b> {weight ? parseFloat(weight).toFixed(3) + ' * ' : ''} {pivot}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Configurator onChange={handleOnChange} attribute={attr2} pivot={pivot} weight={weight} />
          {!bestTests || bestTests.length === 0 ? (
            <></>
          ) : (
            <>
              Best Tests:
              {bestTests.slice(0, 5).map((x, i) => (
                <Tag
                  size="md"
                  variant={
                    state.attribute == x.attribute1 && state.pivot == x.attribute2 ? 'subtle' : 'outline'
                  }
                  colorScheme="blue"
                  p={3}
                  mb={2}
                >
                  {i + 1}.
                  <Stack direction="row">
                    <Code children={'Gain: ' + x.maxDif.toFixed(3)} />
                    <Code children={'Attr1: ' + x.attribute1} />
                    <Code children={'Attr2: ' + x.attribute2} />
                    {x.L_weight ? <Code children={'Weight: ' + x.L_weight.toFixed(3)} /> : <></>}
                    <Code children={'Match size: ' + x.match.length} />
                    <Code children={'NotMatch size:' + x.notMatch.length} />
                  </Stack>
                </Tag>
              ))}
            </>
          )}
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
