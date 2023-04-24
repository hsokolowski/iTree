import { Box, ListItem, List, Link, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaExternalLinkAlt } from 'react-icons/fa';
import React from 'react';

export const Readme = () => (
  <Box
    display={'flex'}
    flexDirection={'column'}
    // border={'4px solid'}
    // borderColor={'blue.600'}
    borderRadius={10}
    width={'60%'}
    margin={'auto'}
    paddingTop={12}
  >
    <Box>
      <b>README</b>
    </Box>
    <Box textAlign={'left'} padding={4}>
      <i>Interactive Tree</i> allows you to generate decision tree based on your data set and change values in
      nodes. You can build decision tree as a 'hybrid' using all of algortithms - thanks to this, tree will
      have different rules of division.
    </Box>
    <Box textAlign={'left'}>We prepared examples of data sets which you can use to see how iTree works:</Box>
    <Box textAlign={'left'} padding={4} paddingLeft={6}>
      <List styleType="disc" spacing={2}>
        <ListItem>
          <Link
            href="https://github.com/hsokolowski/ng_pd_train/blob/main/ng_pd_train.csv"
            isExternal
            display={'flex'}
            alignContent={'center'}
          >
            Training data set <FaExternalLinkAlt name="external-link" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            display={'flex'}
            href=" https://github.com/hsokolowski/ng_pd_data_sets/blob/main/ng_pd_test.csv"
            isExternal
          >
            Test data set <FaExternalLinkAlt />
          </Link>
        </ListItem>
      </List>
    </Box>
    <Box textAlign={'left'}>Have fun!</Box>
  </Box>
);
