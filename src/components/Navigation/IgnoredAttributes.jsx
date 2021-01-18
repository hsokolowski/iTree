import React from 'react';
import { Button, useDisclosure, Collapse, Box } from '@chakra-ui/react';

/**
 * @param {Object} props
 * @param {string} props.size
 * @param {Array<string>} props.ignoredAttributes
 */
function IgnoredAttributes({ size, ignoredAttributes }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle} size={size}>
        Show all ignore attributes
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box position="absolute" p="5px" color="white" mt="1" bg="#342545" rounded="md">
          {ignoredAttributes ? ignoredAttributes.toString() : <div></div>}
        </Box>
      </Collapse>
    </>
  );
}

export default IgnoredAttributes;
