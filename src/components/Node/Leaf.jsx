import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';

function Leaf({ category, matchedCount, notMatchedCount, quality, requestLeafUnfold }) {
  return (
    <Box
      d="flex"
      alignItems="baseline"
      borderWidth="2px"
      borderRadius="lg"
      flexDirection="column"
      maxW="xs"
      p="1"
      my="2"
      boxShadow="md"
      className={'tree-branch'}
    >
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="sm"
        textTransform="uppercase"
        ml="2"
        d="flex"
        flexDirection="row"
      >
        <Box mr={2}>Category:</Box>
        <Box color="black" fontWeight="bold">
          {category}
        </Box>
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
        <Tooltip hasArrow label="Unfold to node" bg="yellow.500" placement="right">
          <MenuButton fontSize="sm" w={20} h={6} as={Button} rightIcon={<ChevronDownIcon />}>
            Unfold
          </MenuButton>
        </Tooltip>
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
