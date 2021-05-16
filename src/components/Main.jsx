import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import Tree from './Tree';
import Navigation from './Navigation';
import { AttributesProvider } from '../contexts/AttributesContext';
import { BuilderConfigProvider } from '../contexts/BuilderConfigContext';
import { TestTreeProvider } from '../contexts/TestTreeContext';

function Main() {
  const [builder, setBuilder] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('UseEffetc');
  }, [builder, isReady]);

  function StartDrawing(value) {
    //console.log(value);
    setBuilder(value);
    setIsReady(true);
  }

  return (
    <BuilderConfigProvider>
      <AttributesProvider>
        <TestTreeProvider>
          <div id="main" className="main">
            <Navigation onPrepareConfig={StartDrawing} />
            {/* <Button onClick={start}>Drzewo</Button> */}
            <br></br>
            <div>{isReady ? <Tree options={builder} /> : <div>Deploy your set</div>}</div>
          </div>
        </TestTreeProvider>
      </AttributesProvider>
    </BuilderConfigProvider>
  );
}

export default Main;
