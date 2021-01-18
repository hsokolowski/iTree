import React from 'react';
import { Button, Textarea, Collapse } from '@chakra-ui/react';

import { useToggle } from '../../hooks/use-toggle';

/**
 * @typedef {import('../../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

/**
 * @param {Object} props
 * @param {string} props.size
 * @param {DecisionTreeBuilder} props.builder
 */
function Builder({ size, builder }) {
  const [show, toggleShow] = useToggle(false);

  return (
    <div>
      <Collapse startingHeight={20} in={show}>
        <Textarea isDisabled placeholder={JSON.stringify(builder, null, 2)} />
      </Collapse>
      <Button size={size} onClick={toggleShow} mt="1rem">
        Show {show ? 'Less' : 'More'}
      </Button>
    </div>
  );
}

export default Builder;
