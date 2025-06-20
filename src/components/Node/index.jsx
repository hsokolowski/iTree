import { Box, Button, ButtonGroup, Hide, Spinner, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useBuilderConfigContext } from '../../contexts/BuilderConfigContext';
import { executeAlgorithm, mostFrequentValue } from '../../utils/algorithm-executor';
import DataViewer from './DataViewer';

import Joint from './Joint';
import Leaf from './Leaf';

const Node = props => {
  //console.log(props.node);
  const { builderConfig } = useBuilderConfigContext();
  const [highlighted, setHighlighted] = useState(false);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [node, setNode] = useState(props.node || {});
  useEffect(() => setNode(props.node || {}), [props.node, setNode]);

  const { side, isNotModify } = props;
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
    weight,
    tests,
  } = node;

  const onNodeClicked = e => {
    if (!e.target.classList.contains('node')) {
      return;
    }
    //console.log(e);
    e.stopPropagation();
    //console.log('Node clicked', node);
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
    // console.log('builderConfig', builderConfig);
    // console.log('node', node);
    // console.log('options', options);

    const builderModel = {
      ...builderConfig,
      trainingSet: node.nodeSet,
      oldTree: JSON.parse(JSON.stringify(node)),
      isUpdate: options.isUpdate || false,
      algorithm: options.algorithm.map(item => item.toLowerCase()),
      oldAlgorithm: options.oldAlgorithm,
    };

    options.weight = Number.parseFloat(options.weight);

    const changeOptions = {
      isChanged: true,
      changedAttribute1: options.attribute || node.attr2,
      changedAttribute2: options.pivot || node.pivot,
      weight: typeof options.weight === 'number' ? options.weight : node.weight,
    };
    //console.log('partial builder model', builderModel, changeOptions);
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
    //console.log(node);
  }, [node]);

  const requestChildChangeIfMatchIs = match => newNode => {
    const targetNode = {
      ...node,
      [match ? 'match' : 'notMatch']: newNode,
    };
    setNode(targetNode);
    props.requestChildChange(targetNode);
  };

  const foldJointToLeaf = () => {
    const foldResult = mostFrequentValue(nodeSet, builderConfig.categoryAttr);
    setNode(foldResult);
    props.requestChildChange(foldResult);
  };

  const unfoldLeaf = (algorithm, unfoldOnce = false) => {
    setLoading(true);
    executeAlgorithm({
      ...builderConfig,
      trainingSet: node.trainingSet2,
      algorithm,
      unfoldOnce,
    })
      .then(value => {
        setNode(value);
        props.requestChildChange(value);
      })
      .catch(e => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleHide = value => {
    setHide(value);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <div className={`node ${highlighted ? 'highlight' : ''}`} onClick={onNodeClicked}>
      <Box d="flex" flexDirection="column" p="1" paddingLeft={3}>
        <Box d="flex" flexDirection="row">
          <DataViewer node={node} side={side} hide={hide} onChange={handleHide} />
        </Box>
        <div style={{ display: hide ? 'none' : 'block' }}>
          {category ? (
            <Leaf
              category={category}
              matchedCount={matchedCount}
              notMatchedCount={notMatchedCount}
              quality={quality}
              requestLeafUnfold={unfoldLeaf}
              isNotModify={isNotModify}
            />
          ) : (
            <Joint
              attr2={attr2}
              predicateName={predicateName}
              pivot={pivot}
              match={match}
              notMatch={notMatch}
              onChange={onChange}
              requestFoldToLeaf={foldJointToLeaf}
              nodeSet={nodeSet}
              weight={weight}
              isNotModify={isNotModify}
              bestTests={tests}
            >
              <Node
                node={match}
                onChange={onChange}
                requestChildChange={requestChildChangeIfMatchIs(true)}
                side={true}
                isNotModify={isNotModify}
              />
              <Node
                node={notMatch}
                onChange={onChange}
                requestChildChange={requestChildChangeIfMatchIs(false)}
                side={false}
                isNotModify={isNotModify}
              />
            </Joint>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Node;
