import React, { useEffect, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { buildDecisionTree } from '../utils/decision-tree';
// import { start } from '../services/Playground';
// import { dt } from '../services/TSP';
import Node from './Node';

/**
 * @typedef {import('../utils/decision-tree.js').DecisionTreeBuilder} DecisionTreeBuilder
 */

const logTree = root => console.log(root);

/**
 * @param {Object} props
 * @param {DecisionTreeBuilder} props.options
 */
const Tree = ({ options }) => {
  const root = useMemo(() => {
    //return dt.TSPDecisionTree(options)
    return buildDecisionTree(options);
  }, [options]);

  useEffect(() => logTree(root), [root]);

  return (
    <div id="tree">
      <h1>Tree</h1>
      <p>
        <button onClick={logTree}>Log tree</button>
      </p>
      <h2>Nodes:</h2>
      <Box>
        <Node node={root} onChange={() => {}} />
      </Box>
    </div>
  );
};

export default Tree;
