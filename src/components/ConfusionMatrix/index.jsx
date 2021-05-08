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
import TableComponent from './Table';

/**
 * @param {Object} props
 * @param {Object} props.tree
 * @param {Function} props.onChange
 * @param {Object[]} props.data
 * @param {string[]} props.allClasses
 * @param {string} props.categoryAttr
 * @param {boolean} props.disabled
 */
function ConfusionMatrix({ tree, onChange, data, allClasses, categoryAttr, disabled }) {
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
      console.log(acc);
      return acc;
    }
    return 0;
  }

  useEffect(() => {
    //console.log(allClasses);
    let CM = buildArray(allClasses.length);
    // console.log(CM);
    // console.log(categoryAttr);
    // console.log(tree);
    // console.log(data);

    if (!disabled && tree !== null) {
      let prediction, clazz;
      for (let index = 0; index < data.length; index++) {
        prediction = predict(tree, data[index]);
        clazz = data[index][categoryAttr];
        //console.log(prediction, clazz);

        if (prediction === clazz) {
          CM[allClasses.indexOf(clazz)][allClasses.indexOf(clazz)]++;
        } else {
          CM[allClasses.indexOf(clazz)][allClasses.indexOf(prediction)]++;
        }
      }
      setConfusionMatrix(CM);
      let tmpAccuracy = handleAccuracy(CM);
      setAccuracy(tmpAccuracy);
      onChange(tmpAccuracy);
      //console.log(CM);
    }
  }, [tree, disabled, allClasses, categoryAttr, data]);

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
        size="sm"
        disabled={disabled}
      >
        Confusion Matrix
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

export default ConfusionMatrix;
