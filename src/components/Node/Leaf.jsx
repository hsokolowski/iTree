import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';

function Leaf({ category, matchedCount, notMatchedCount, quality, requestLeafUnfold }) {
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
      <Menu closeOnSelect closeOnBlur isLazy>
        <MenuButton fontSize="sm" w={20} h={6} as={Button} rightIcon={<ChevronDownIcon />}>
          Unfold
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => requestLeafUnfold('c45')}>C 4.5</MenuItem>
          <MenuItem onClick={() => requestLeafUnfold('tsp')}>TSP</MenuItem>
          <MenuItem onClick={() => requestLeafUnfold('tspw')}>TSP Weight</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Leaf;
