import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import Tree from './Tree';
import Navigation from './Navigation';
import { builder as _builder_ } from '../services/Playground';
import { AttributesProvider } from '../contexts/AttributesContext';
import { IgnoredProviders } from '../contexts/IgnoredContext';
import { BuilderConfigProvider } from '../contexts/BuilderConfigContext';

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
        <div id="main" className="main">
          <Navigation onPrepareConfig={StartDrawing} />
          {/* <Button onClick={start}>Drzewo</Button> */}
          <br></br>
          <div>{isReady ? <Tree options={builder} /> : <div>Deploy your set</div>}</div>
        </div>
      </AttributesProvider>
    </BuilderConfigProvider>
  );
}

export default Main;
