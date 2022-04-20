import React, { useEffect, useState } from 'react';
import {
  Button,
  Textarea,
  Box,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { predict } from '../../utils/predict';
import TableComponent from '../ConfusionMatrix/Table';

/**
 * @param {Object} props
 * @param {Object} props.tree
 * @param {Function} props.onChange
 * @param {Object[]} props.data
 * @param {string[]} props.allClasses
 * @param {string} props.categoryAttr
 * @param {string} props.type
 */
function SmallConfusionMatrix({ tree, onChange, data, allClasses, categoryAttr, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confusionMatrix, setConfusionMatrix] = useState([]);
  const [accuracy, setAccuracy] = useState(0);

  function handleAccuracy(confusionMatrix) {
    if (confusionMatrix.length > 0) {
      let allTargets = 0;
      let goodTargets = 0;
      for (let i = 0; i < confusionMatrix[0].length; i++) {
        for (let j = 0; j < confusionMatrix[0].length; j++) {
          if (i === j) {
            goodTargets += confusionMatrix[i][j];
          }
          allTargets += confusionMatrix[i][j];
        }
      }
      let acc = (goodTargets / allTargets) * 100;
      return acc;
    }
    return 0;
  }

  useEffect(() => {
    try {
      let CM = buildArray(allClasses.length);

      if (tree !== null && data !== null) {
        let prediction, clazz;
        for (let index = 0; index < data.length; index++) {
          prediction = predict(tree, data[index]);
          clazz = data[index][categoryAttr];
          if (prediction == clazz) {
            CM[allClasses.indexOf(clazz)][allClasses.indexOf(clazz)]++;
          } else {
            CM[allClasses.indexOf(clazz)][allClasses.indexOf(prediction)]++;
          }
        }
        setConfusionMatrix(CM);
        let tmpAccuracy = handleAccuracy(CM);
        setAccuracy(tmpAccuracy);
        onChange(tmpAccuracy);
      }
    } catch (error) {
      console.log(error);
    }
  }, [tree, allClasses, categoryAttr, data, onChange]);

  function buildArray(lenght) {
    let arr = [];
    for (var x = 0; x < lenght; x++) {
      arr[x] = [];
      for (var y = 0; y < lenght; y++) {
        arr[x][y] = 0;
      }
    }

    return arr;
  }

  return (
    <>
      <Button
        bg={'#ddd'}
        color="#black"
        _hover={{ bg: '#aaa' }}
        onClick={onOpen}
        width={100}
        height={25}
        fontSize={10}
      >
        {type} [{accuracy.toFixed(0)}%]
      </Button>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confusion Matrix</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={5} display="flex" justifyContent="center">
            <TableComponent headers={allClasses} confusionMatrix={confusionMatrix} />
          </ModalBody>
          <ModalFooter>
            <Button>Accuracy: {accuracy.toFixed(3)}%</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SmallConfusionMatrix;
