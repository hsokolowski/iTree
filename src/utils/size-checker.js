export function getSizeTree(tree) {
  let leafs = 0,
    joints = 0;

  if (tree) {
    joints = getNodeCount(tree);
    leafs = getLeafCount(tree);
  }

  return { joints, leafs };
}

function getLeafCount(tree) {
  if (tree.category) {
    return 1;
  } else {
    return getLeafCount(tree.match) + getLeafCount(tree.notMatch);
  }
}

function getNodeCount(tree) {
  if (tree.category) {
    return 0;
  } else {
    return 1 + getNodeCount(tree.match) + getNodeCount(tree.notMatch);
  }
}
