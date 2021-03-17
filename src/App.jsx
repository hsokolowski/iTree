import React from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './css/App.scss';
import Main from './components/Main';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import theme from './theme';
import { LoadingProvider } from './contexts/LoadingContext';

const themes = extendTheme({ ...theme });

function App() {
  return (
    <ChakraProvider theme={themes}>
      <CSSReset />
      <LoadingProvider>
        <div id="app" className="App">
          <Main></Main>
        </div>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default App;
