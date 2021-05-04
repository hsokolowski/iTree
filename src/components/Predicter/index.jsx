import React, { useState } from 'react';
import { Button, Textarea, Box, ButtonGroup } from '@chakra-ui/react';
import { GiWaterDivinerStick } from 'react-icons/gi';
import { predict } from '../../utils/predict';

/**
 * @param {Object} props
 * @param {Object} props.tree
 * @param {Object[]} props.testSet
 * @param {Function} props.onChange
 */
function Predicter({ tree, onChange, testSet, accuracy }) {
  const [allow, setAllow] = useState(true);

  function handlePredict() {
    if (allow) setAllow(false);
    let result = [];
    //for (let index = 0; index < testSet.length; index++) {
    for (let index = 0; index < 1; index++) {
      result.push(predict(tree, testSet[index]));
    }
    console.log(result);
  }
  return (
    <Box d="flex">
      <Box>
        <ButtonGroup>
          <Button leftIcon={<GiWaterDivinerStick />} onClick={handlePredict}>
            Predict
          </Button>
          <Button disabled={allow}>Confusion Matrix {accuracy}</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default Predicter;
