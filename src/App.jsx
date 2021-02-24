import React from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './css/App.scss';
import Main from './components/Main';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import theme from './theme';

const themes = extendTheme({ ...theme });

function App() {
  return (
    <ChakraProvider theme={themes}>
      <CSSReset />
      <div id="app" className="App">
        <Main></Main>
      </div>
    </ChakraProvider>
  );
}

export default App;
