import React, { useState, useEffect } from 'react';
import { mergeChunksWithoutChosen } from '../../utils/cross-valid';
import ConfusionMatrix from '../ConfusionMatrix';

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
 * @param {Number} props.fold

 * @returns
 */
function CrossValidator({ builder, chunks, treeModels }) {
  useEffect(() => {
    if (treeModels.lenght > 8) {
      // do something
    }
  }, [treeModels]);

  if (treeModels.lenght < 2) return 'Waiting for places';

  return (
    <div id="cv" className="main">
      <div>
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
          </p>
        ))}
        {/* <Tree options={builder} headers={headers} /> */}
      </div>
    </div>
  );
}

export default CrossValidator;
