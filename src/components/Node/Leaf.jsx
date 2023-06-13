import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Leaf({ category, matchedCount, notMatchedCount, quality, requestLeafUnfold, isNotModify }) {
  return (
    <Box
      d="flex"
      alignItems="baseline"
      //border={'2px solid #eee'}
      // border={'2px solid #009c72'}
      // bg={'#e1ffde'}
      border={'2px solid #1560ab'}
      //bg={'#baefff'}
      bg={'#dbedff'}
      _hover={{
        bg: '#c9e4ff',
      }}
      borderRadius="lg"
      flexDirection="column"
      maxW="xs"
      minW="xs"
      //w={250}
      p={3}
      my="2"
      boxShadow="lg"
      className={'tree-branch'}
    >
      <Box
        color="gray.600"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="sm"
        textTransform="uppercase"
        ml="2"
        d="flex"
        flexDirection="row"
        flexWrap="wrap"
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
      <br />

      <Box
        d="flex"
        flexDirection="row"
        justifyContent="space-between"
        w="100%"
        flexWrap="wrap-reverse"
        alignItems="flex-end"
      >
        <Box>
          {isNotModify ? (
            <div></div>
          ) : (
            <Box display={'flex'} flexDirection={'column'}>
              <Menu closeOnSelect closeOnBlur isLazy>
                <MenuButton
                  fontSize="sm"
                  w={110}
                  h={6}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg={'#1560ab'}
                  _hover={{
                    bg: '#005069',
                  }}
                  _active={{
                    bg: '#005069',
                  }}
                  color={'white'}
                  marginBottom={1}
                  textAlign={'left'}
                  paddingLeft={'13px'}
                >
                  Unfold once
                </MenuButton>
                {/* </Tooltip> */}
                <MenuList>
                  <MenuItem onClick={() => requestLeafUnfold(['c45'], true)}>C 4.5</MenuItem>
                  <MenuItem onClick={() => requestLeafUnfold(['tsp'], true)}>TSP</MenuItem>
                  <MenuItem onClick={() => requestLeafUnfold(['tspw'], true)}>TSP Weight</MenuItem>
                </MenuList>
              </Menu>
              <Menu closeOnSelect closeOnBlur isLazy>
                {/* <Tooltip hasArrow label="Unfold to node" bg="yellow.500" placement="right"> */}
                <MenuButton
                  fontSize="sm"
                  w={110}
                  h={6}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  paddingLeft={1}
                  paddingRight={1}
                  textAlign={'left'}
                  //bg={'#009c72'}
                  // _hover={{
                  //   bg: '#00402f',
                  // }}
                  // _active={{
                  //   bg: '#00402f',
                  // }}
                  bg={'#1560ab'}
                  _hover={{
                    bg: '#005069',
                  }}
                  _active={{
                    bg: '#005069',
                  }}
                  color={'white'}
                >
                  Unfold all
                </MenuButton>
                {/* </Tooltip> */}
                <MenuList>
                  <MenuItem onClick={() => requestLeafUnfold(['c45'])}>C 4.5</MenuItem>
                  <MenuItem onClick={() => requestLeafUnfold(['tsp'])}>TSP</MenuItem>
                  <MenuItem onClick={() => requestLeafUnfold(['tspw'])}>TSP Weight</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Box>
        <Box fontWeight="700" fontSize={30}>
          {isNaN(quality) ? '0.00' : quality}%
        </Box>
        {/* <Box fontWeight="700" lineHeight="tight" isTruncated>
          %<Box position="absolute" right={3} bottom={2} fontSize={30}></Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Leaf;
