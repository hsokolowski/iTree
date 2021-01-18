import React from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./css/App.scss";
import Main from './components/Main'
import { ChakraProvider , CSSReset } from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider >
            <CSSReset />
            <div id="app" className="App">
                <Main></Main>
            </div>
        </ChakraProvider>
    );
}

export default App;
