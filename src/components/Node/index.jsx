import React, { useEffect, useMemo, useState } from 'react';
//import { addNode } from "./utils";

import Joint from './Joint';
import Leaf from './Leaf';

const Node = props => {
  //console.log(props.node);
  const [highlighted, setHighlighted] = useState(false);
  const [node, setNode] = useState(props.node || {});
  useEffect(() => setNode(props.node || {}), [props.node, setNode]);
  const { category, quality, matchedCount, notMatchedCount, match, notMatch, attr2, predicateName, pivot } = node;

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

  const onChange = useMemo(() => {
    return node => {
      console.log(node);
      // const index = match.findIndex(c => c.id === node.id);
      // console.log(index);
      // console.log(match);
      // match.splice(index, 1, node);
      // props.node.match = [...match];
    };
  }, [match, props.node]);

  useEffect(() => {
    console.log(category, category ? 'Leaf' : 'Joint');
  }, [category]);

  return (
    <div className={`node ${highlighted ? 'highlight' : ''}`} onClick={onNodeClicked}>
      {category ? (
        <Leaf category={category} matchedCount={matchedCount} notMatchedCount={notMatchedCount} quality={quality} />
      ) : (
        <Joint
          attr2={attr2}
          predicateName={predicateName}
          pivot={pivot}
          match={match}
          notMatch={notMatch}
          onChange={onChange}
        >
          <Node node={match} onChange={onChange} />
          <Node node={notMatch} onChange={onChange} />
        </Joint>
      )}
    </div>
  );
};

export default Node;
