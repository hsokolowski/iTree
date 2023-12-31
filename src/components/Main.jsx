import React, { useState, useEffect } from 'react';
import '../css/main.scss';
import Tree from './Tree';
import Navigation from './Navigation';
import { AttributesProvider } from '../contexts/AttributesContext';
import { BuilderConfigProvider } from '../contexts/BuilderConfigContext';
import { TestTreeProvider } from '../contexts/TestTreeContext';
import ModelBuilder from './ModelBuilder';
import { Footer } from './Footer';
import { Readme } from './Readme';

function Main() {
  const [builder, setBuilder] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [folds, setFolds] = useState(0);
  const [headers, setHeaders] = useState(true);

  useEffect(() => {
    console.log('UseEffetc');
  }, [builder, isReady]);

  function StartDrawing(value) {
    //console.log(value);
    setBuilder(value);
    setIsReady(true);
  }

  function onSetHeaders(value) {
    setHeaders(value);
  }

  function handleFolds(value) {
    console.log(value);
    setFolds(value);
  }

  return (
    <BuilderConfigProvider>
      <AttributesProvider>
        <TestTreeProvider>
          <div id="main" className="main">
            <Navigation
              onPrepareConfig={StartDrawing}
              setHeaders={onSetHeaders}
              onCrossValidation={handleFolds}
            />
            <Footer />
            {/* <Button onClick={start}>Drzewo</Button> */}
            <div>
              {isReady ? (
                folds != 0 ? (
                  <div>
                    {/* ModelBuidler */}
                    <ModelBuilder builder={builder} headers={headers} fold={folds} />
                  </div>
                ) : (
                  <Tree options={builder} headers={headers} />
                )
              ) : (
                <div>
                  {/* Deploy your set */}
                  <Readme />
                </div>
              )}
            </div>

            <div>
              {/* {isReady ? <ModelBuilder builder={builder} headers={headers} /> : <div>Deploy your set</div>} */}
            </div>
            {/* <br></br>
            <div>{isReady ? <Tree options={builder} headers={headers} /> : <div>Deploy your set</div>}</div> */}
          </div>
        </TestTreeProvider>
      </AttributesProvider>
    </BuilderConfigProvider>
  );
}

export default Main;
