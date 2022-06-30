import React from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './css/App.scss';
import Main from './components/Main';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import theme from './theme';
import { LoadingProvider } from './contexts/LoadingContext';
import Login from './components/Login';

const themes = extendTheme({ ...theme });

function App() {
  return (
    <ChakraProvider theme={themes}>
      <CSSReset />
      <LoadingProvider>
        <div id="app" className="App">
          <Login>
            <Main></Main>
          </Login>
        </div>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default App;
