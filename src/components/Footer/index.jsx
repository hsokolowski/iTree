import { Box } from '@chakra-ui/react';
import React from 'react';

export const Footer = () => (
  <Box
    bg="blue.600"
    w="100%"
    height={5}
    p={1}
    color="white"
    textAlign={'center'}
    fontSize={10}
    marginBottom={1}
  >
    Powered by Hubert Sokołowski & Marcin Czajkowski ( m.czajkowski@pb.edu.pl )
  </Box>
);
