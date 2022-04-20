import { Box, SimpleGrid, Stack, StackDivider } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { mergeChunksWithoutChosen } from '../../utils/cross-valid';
import ConfusionMatrix from '../ConfusionMatrix';
import SmallConfusionMatrix from './SmallConfusionMatrix';

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

 * @returns
 */
function CrossValidator({ builder, chunks, treeModels }) {
  const [builtChunks, setBuiltChunks] = useState({});
  const acc = useMemo(() => Object.values(builtChunks), [builtChunks]);

  function updateAccuracy(e, i) {
    console.log(e, i);
  }

  return (
    <div id="cv">
      <SimpleGrid
        columns={2}
        spacingX="30px"
        spacingY="10px"
        flexDirection={'column'}
        flexWrap={'wrap'}
        display={'flex'}
        height={Math.ceil(chunks.length / 4) * 55}
        fontSize={12}
        padding={2}
        alignContent={'center'}
      >
        {treeModels.map((x, i) => (
          <SampleTreeItem
            builder={builder}
            chunks={chunks}
            item={x}
            index={i}
            onUpdateAccuracy={e => updateAccuracy(e, i)}
          />
        ))}
      </SimpleGrid>
      {/* <div>
        {treeModels.map((x, i) => (
          <p key={Math.random() + 5}>
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

function SampleTreeItem({ builder, chunks, item, index, getResults, selectedTree }) {
  return (
    <Box
      key={Math.random() + 5}
      padding={1}
      width={220}
      height={55}
      border={'1px solid black'}
      borderRadius={5}
    >
      <p style={{ textAlign: 'left' }}>
        <b>Tree {index + 1}</b>
      </p>
      <SimpleGrid columns={2} spacing={1}>
        <SmallConfusionMatrix
          tree={item}
          data={mergeChunksWithoutChosen(chunks, index)}
          allClasses={builder.allClasses}
          categoryAttr={builder.categoryAttr}
          onChange={console.log}
          type={'Trening'}
        />
        <SmallConfusionMatrix
          tree={item}
          data={chunks[index]}
          allClasses={builder.allClasses}
          categoryAttr={builder.categoryAttr}
          onChange={console.log}
          type={'Test'}
        />
      </SimpleGrid>
    </Box>
  );
}
