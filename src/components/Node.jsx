import React, { useState } from "react";
//import { addNode } from "./utils";

const Node = (props) => {
  console.log(props.node);
  const [highlighted, setHighlighted] = useState(false);
  const [node, setNode] = useState(props.node) || {};
  console.log(node);
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
  } = node || {};

  const onNodeClicked = (e) => {
    console.log(e);
    e.stopPropagation();
    console.log("Node clicked", node);
    //const changed = addComment(node);
    //props.onChange(changed);
    //setNode(changed);
    setHighlighted(true);
    setTimeout(() => setHighlighted(false), 500);
  };

  const onChange = (node) => {
    const index = match.findIndex((c) => c.id === node.id);
    match.splice(index, 1, node);
    props.node.match = [...match];
  };

  var NODE = null;
  console.log(category);
  if (!category) {
    console.log("JOINT");
    NODE = Joint(attr2,predicateName,pivot,match,notMatch,onChange)
  } else {
    console.log("LEAF");
    NODE = Leaf(category, matchedCount, notMatchedCount, quality);
  }

  return (
    <div
      className={`node ${highlighted ? "highlight" : ""}`}
      onClick={onNodeClicked}
    >
      {NODE}
    </div>
  );
};

export default Node;

function Leaf(category, matchedCount, notMatchedCount, quality) {
  return (
    <div>
      <p>
        {category} {matchedCount} {notMatchedCount} {quality}
      </p>
    </div>
  );
}

function Joint(attr2,predicateName,pivot,match,notMatch,onChange) {
  return (
    <div>
      <p>
        {attr2} <b>{predicateName}</b> {pivot}
      </p>
      <Node node={match} onChange={onChange} />
      <Node node={notMatch} onChange={onChange} />
    </div>
  );
}

