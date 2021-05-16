export function rebuildTestTree(tree, newData, categoryAttr) {
  let predicate;

  if (tree.category) {
    tree.trainingSet2 = newData;
    if (!newData) {
      tree.quality = 0;
      tree.matchedCount = 0;
      tree.notMatchedCount = 0;
      return;
    } else {
      let _positiveCounter = 0,
        _quality = 0;
      for (let element of newData) {
        if (element[categoryAttr] === tree.category) _positiveCounter++;
      }
      let _negativeCounter = newData.length - _positiveCounter;
      _quality = _positiveCounter / newData.length;
      _quality = _quality * 100;

      tree.quality = _quality.toFixed(2);
      tree.matchedCount = _positiveCounter;
      tree.notMatchedCount = _negativeCounter;
      return;
    }
  } else {
    tree.nodeSet = newData;

    if (tree.weight) {
      predicate = predicates['w'];
    } else {
      predicate = predicates[tree.predicateName];
    }

    let matchedData = [],
      notMatchedData = [];

    newData.forEach(x => {
      let match;
      if (tree.predicateName === '==' || tree.predicateName === '>=') {
        match = predicate(x[tree.attr2], tree.pivot);
        //console.log('c45', match);
      } else if (tree.weight) {
        match = predicate(x[tree.attr2], x[tree.pivot], tree.weight);
        //console.log('tspw', match);
      } else {
        match = predicate(x[tree.attr2], x[tree.pivot]);
        //console.log('tsp', match);
      }

      match ? matchedData.push(x) : notMatchedData.push(x);
    });

    tree.matchedCount = matchedData.length;
    tree.notMatchedCount = notMatchedData.length;
    rebuildTestTree(tree.match, matchedData, categoryAttr);
    rebuildTestTree(tree.notMatch, notMatchedData, categoryAttr);
  }
}

var predicates = {
  '==': function (a, b) {
    return a === b;
  },
  '>=': function (a, b) {
    return a >= b;
  },
  '<': function (a, b) {
    return a < b;
  },
  w: function (a, b, w) {
    return a < w * b;
  },
};
