// theme.js
import { extendTheme, useBreakpointValue } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

const theme = extendTheme({
  breakpoints: breakpoints,
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
        lg: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
        md: {
          h: '36px',
          fontSize: 'md',
          px: '32px',
        },
        sm: {
          h: '16px',
          fontSize: 'lg',
          px: '12px',
        },
      },
      // 3. We can add a new visual variant
      // variants: {
      //   'beamed': {
      //     bg: 'red.400',
      //     boxShadow: '0 0 2px 2px #efdfde',
      //   },
      //   // 4. We can override existing variants
      //   solid: props => ({
      //     bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      //   }),
      // },
    },
  },
});

export default theme;
