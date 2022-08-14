import React, { useState, useEffect, useMemo } from 'react';
import Tree from './Tree';
import { shuffleAndChunkArray, mergeChunksWithoutChosen } from '../utils/cross-valid';
import { useLoadingContext } from '../contexts/LoadingContext';
import { executeAlgorithm } from '../utils/algorithm-executor';
import ConfusionMatrix from './ConfusionMatrix';
import CrossValidator from './Crossvalidator/Crossvalidator';
import { Progress } from '@chakra-ui/react';

/**
 *
 * @param {Object} props
 * @param {Object} props.builder
 * @param {Array} props.builder.allAttributes
 * @param {Array} props.builder.allClasses
 * @param {string} props.builder.categoryAttr
 * @param {string} props.builder.entropyThrehold
 * @param {string} props.builder.minItemsCount
 * @param {Array} props.builder.trainingSet
 * @param {Array<string>} props.builder.ignoredAttributes
 * @param {string} props.builder.algorithm
 * @param {Boolean} props.headers
 * @param {Boolean} props.isReady
 * @param {string} props.fold

 * @returns
 */
function ModelBuilder({ builder, headers, fold }) {
  const { isLoading, setIsLoading } = useLoadingContext();

  const [progress, setProgress] = useState(0);
  const [mainDataset, setMainDataset] = useState(builder.trainingSet);
  const [chunks, setChunks] = useState([]);
  const [builtChunks, setBuiltChunks] = useState({});
  const treeModels = useMemo(() => Object.values(builtChunks), [builtChunks]);

  useEffect(() => {
    console.log('MODEl BUIDLER');
    setIsLoading(true);

    let step = Math.ceil(100 / parseInt(fold));
    let prog = 0;
    setProgress(prog);

    let chunks = shuffleAndChunkArray(builder.trainingSet, parseInt(fold));
    setChunks(chunks);

    let buildedModels = [];
    let tmpBuilder = JSON.parse(JSON.stringify(builder));

    setBuiltChunks(() => ({}));

    chunks.forEach((_x, i) => {
      const chunkBuilder = { ...tmpBuilder, trainingSet: mergeChunksWithoutChosen(chunks, i) };
      console.log('CHUNK', i);

      executeAlgorithm(chunkBuilder)
        .then(value => {
          // if (terminated) {
          //   return;
          // }
          setBuiltChunks(prevState => ({
            ...prevState,
            [i]: value,
          }));
          console.log('Set next step');
          prog += step;
          setProgress(prog);
        })
        .catch(e => console.error(e))
        .finally(() => {
          // if (!terminated) setIsLoading(false);
          // terminated = true;
        });
    });

    console.log(chunks);
    console.log(buildedModels);
    // return () => {
    //   if (terminated) {
    //     return;
    //   }
    //   terminated = true;
    // };
  }, [builder, fold, setIsLoading]);

  useEffect(() => {
    if (Object.keys(builtChunks).length === parseInt(fold)) {
      console.log('END BUILD MODELS', builtChunks);
      setIsLoading(false);
      return;
    }
  }, [fold, setIsLoading, builtChunks]);

  return (
    <div id="model-builder" className="main">
      <div>
        <Progress hasStripe value={progress} />
      </div>
      <div>
        <CrossValidator builder={builder} chunks={chunks} treeModels={treeModels} />
        {/* <Tree options={builder} headers={headers} /> */}
      </div>
    </div>
  );
}

export default ModelBuilder;
