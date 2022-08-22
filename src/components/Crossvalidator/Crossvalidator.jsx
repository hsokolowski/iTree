import { Box, SimpleGrid, Stack, StackDivider } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mergeChunksWithoutChosen } from '../../utils/cross-valid';
import ConfusionMatrix from '../ConfusionMatrix';
import SmallConfusionMatrix from './SmallConfusionMatrix';
import './sampleTree.scss';
import Tree from '../Tree';
import { useEffect } from 'react';
import TreePrinter from '../TreePrinter';
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
 * @param {Array} props.chunks
 * @param {Object} props.treeModels

 * @return
 */
function CrossValidator({ builder, chunks, treeModels }) {
  const [allAccuracy, setAllAccuracy] = useState({});

  const [selectedTree, setSelectedTree] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(allAccuracy)));
  }, [allAccuracy]);

  function updateAccuracy({ train, test, index }) {
    if (allAccuracy[index]?.train === train && allAccuracy[index]?.test === test) {
      return;
    }
    setAllAccuracy(m => ({ ...m, [index]: { train, test } }));
  }

  const [trainAcc, testAcc] = useMemo(() => {
    const items = Object.values(allAccuracy);
    const avg = key => items.reduce((acc, x) => acc + x[key], 0) / items.length;
    return [avg('train'), avg('test')];
  }, [allAccuracy]);

  // useEffect(() => {
  //   function getAccuracy() {
  //     const values = Object.values(AllAccuracyObject);
  //     console.log(values);

  //     let training = 0,
  //       test = 0;
  //     for (const value of values) {
  //       training += value['training'];
  //       test += value['test'];
  //     }
  //     let trainingAcc = training / values.length;
  //     let testAcc = test / values.length;

  //     return { trainingAcc, testAcc };
  //   }

  //   setAcc(getAccuracy());
  // }, [AllAccuracyObject, acc]);

  function selectTree(tree, index) {
    setSelectedTree(tree);
    setSelectedIndex(index);
    console.log(tree, index);
  }

  return (
    <div id="cv">
      <SimpleGrid
        columns={2}
        spacingX="30px"
        spacingY="10px"
        flexDirection={'row'}
        flexWrap={'wrap'}
        display={'flex'}
        //height={Math.ceil(chunks.length / 4) * 55}
        fontSize={12}
        padding={2}
        alignContent={'center'}
      >
        {treeModels.map((x, i) => (
          <SampleTreeItem
            key={uuidv4()}
            builder={builder}
            chunks={chunks}
            item={x}
            index={i}
            onGetResults={updateAccuracy}
            onSelectedTree={selectTree}
          />
        ))}
      </SimpleGrid>
      <div>
        <p>Training accuracy: {trainAcc}</p>
        <p>Test accuracy: {testAcc}</p>
      </div>
      <div>
        <p>Tree {selectedIndex + 1}</p>
        Tree
        {selectedTree != null ? (
          <TreePrinter TREE={selectedTree} options={builder} testDataset={chunks[selectedIndex]} />
        ) : (
          <div></div>
        )}
      </div>
      {/* <div>
        {treeModels.map((x, i) => (
          <p key={uuidv4()}>
            Tree {i}{' '}
            <ConfusionMatrix
              tree={x}
              data={mergeChunksWithoutChosen(chunks, i)}
              allClasses={builder.allClasses}
              categoryAttr={builder.categoryAttr}
              onChange={console.log}
              disabled={false}
            />
            Test
            <ConfusionMatrix
              tree={x}
              data={chunks[i]}
              allClasses={builder.allClasses}
              categoryAttr={builder.categoryAttr}
              onChange={console.log}
              disabled={false}
            />
          </p>
        ))}
        {/* <Tree options={builder} headers={headers} />
      </div> */}
    </div>
  );
}

export default CrossValidator;

function SampleTreeItem({ builder, chunks, item, index, onGetResults, onSelectedTree }) {
  const [trainAcc, setTrainAcc] = useState(null);
  const [testAcc, setTestAcc] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(mergeChunksWithoutChosen(chunks, index));
  }, []);

  function clickSelectTree(tree, index) {
    onSelectedTree(tree, index);
  }

  useEffect(() => {
    if (trainAcc === null || testAcc === null) {
      return;
    }
    onGetResults({ train: trainAcc, test: testAcc, index });
  }, [trainAcc, testAcc]);

  function getTreningAccuracy(value) {
    setTrainAcc(value);
    //onGetResults({ ...acc, training: value });
  }

  function getTestAccuracy(value) {
    setTestAcc(value);
    //onGetResults({ ...acc, test: value });
  }

  return (
    <Box key={uuidv4()} padding={1} width={220} height={55} border={'1px solid black'} borderRadius={5}>
      <p className="sampleTreeItem" style={{ textAlign: 'left' }} onClick={e => clickSelectTree(item, index)}>
        <b>Tree {index + 1}</b>
      </p>
      <SimpleGrid columns={2} spacing={1}>
        {data && (
          <SmallConfusionMatrix
            tree={item}
            data={data}
            allClasses={builder.allClasses}
            categoryAttr={builder.categoryAttr}
            onChange={getTreningAccuracy}
            type={'Trening'}
          />
        )}
        <SmallConfusionMatrix
          tree={item}
          data={chunks[index]}
          allClasses={builder.allClasses}
          categoryAttr={builder.categoryAttr}
          onChange={getTestAccuracy}
          type={'Test'}
        />
      </SimpleGrid>
    </Box>
  );
}
