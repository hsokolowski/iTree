import { Box } from '@chakra-ui/react';
import React from 'react';

function Leaf({ category, matchedCount, notMatchedCount, quality }) {
  return (
    <Box
      d="flex"
      alignItems="baseline"
      borderWidth="1px"
      borderRadius="lg"
      flexDirection="column"
      maxW="sm"
      p="1"
      my="2"
    >
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="sm"
        textTransform="uppercase"
        ml="2"
      >
        Category: {category}
      </Box>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="sm"
        textTransform="uppercase"
        ml="2"
      >
        {matchedCount} good &bull; {notMatchedCount} bad
      </Box>
      <Box mt="1" ml="2" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {quality}%
      </Box>
    </Box>
  );
}

export default Leaf;
