import React from "react";
import '../css/main.scss'
import Tree from './Tree'
//import {start} from '../services/Playground.js'
import * as model from '../data/mock.data.json'
import Navigation from "./Navigation";
import {builder} from '../services/Playground'

function Main() {
  //console.log(builder);
    return (
        <div id="main" className="main">
            <Navigation />
            {/* <Button onClick={start}>Drzewo</Button> */}
            <br></br>
            <div>
              <Tree options={builder}/>
            </div>
        </div>
    );
}

export default Main;
