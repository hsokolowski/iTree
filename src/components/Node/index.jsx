import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useBuilderConfigContext } from '../../contexts/BuilderConfigContext';
import { executeAlgorithm } from '../../utils/algorithm-executor';
//import { addNode } from "./utils";

import Joint from './Joint';
import Leaf from './Leaf';

const Node = props => {
  //console.log(props.node);
  const { builderConfig } = useBuilderConfigContext();
  const [highlighted, setHighlighted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [node, setNode] = useState(props.node || {});
  useEffect(() => setNode(props.node || {}), [props.node, setNode]);
  const {
    category,
    quality,
    matchedCount,
    notMatchedCount,
    match,
    notMatch,
    attr2,
    predicateName,
    pivot,
    nodeSet,
  } = node;

  const onNodeClicked = e => {
    //console.log(e);
    e.stopPropagation();
    console.log('Node clicked', node);
    //const changed = addComment(node);
    //props.onChange(changed);
    //setNode(changed);
    setHighlighted(true);
    setTimeout(() => setHighlighted(false), 500);
  };

  const onChange = options => {
    if (!options) {
      return;
    }
    console.log('builderConfig', builderConfig);
    const builderModel = {
      ...builderConfig,
      trainingSet: node.nodeSet,
      algorithm: options.algorithm.toLowerCase(),
    };
    const changeOptions = {
      isChanged: true,
      changedAttribute1: options.attr2 || node.attr2,
      changedAttribute2: options.pivot || node.pivot,
      weight: typeof options.weight === 'number' ? options.weight : node.weight,
    };
    console.log('partial builder model', builderModel, changeOptions);
    setLoading(true);
    executeAlgorithm(builderModel, changeOptions)
      .then(value => {
        setNode(value);
        props.requestChildChange(value);
      })
      .catch(e => console.error(e))
      .finally(() => {
        setLoading(false);
      });
    // const index = match.findIndex(c => c.id === node.id);
    // console.log(index);
    // console.log(match);
    // match.splice(index, 1, node);
    // props.node.match = [...match];
  };

  useEffect(() => {
    console.log(category, category ? 'Leaf' : 'Joint');
  }, [category]);

  const requestChildChangeIfMatchIs = match => newNode => {
    const targetNode = {
      ...node,
      [match ? 'match' : 'notMatch']: newNode,
    };
    setNode(targetNode);
    props.requestChildChange(targetNode);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <div className={`node ${highlighted ? 'highlight' : ''}`} onClick={onNodeClicked}>
      {category ? (
        <Leaf
          category={category}
          matchedCount={matchedCount}
          notMatchedCount={notMatchedCount}
          quality={quality}
        />
      ) : (
        <Joint
          attr2={attr2}
          predicateName={predicateName}
          pivot={pivot}
          match={match}
          notMatch={notMatch}
          onChange={onChange}
          nodeSet={nodeSet}
        >
          <Node node={match} onChange={onChange} requestChildChange={requestChildChangeIfMatchIs(true)} />
          <Node node={notMatch} onChange={onChange} requestChildChange={requestChildChangeIfMatchIs(false)} />
        </Joint>
      )}
    </div>
  );
};

export default Node;
