export function testTree(tree, newData, categoryAttr) {
  let predicate;
  console.log(categoryAttr);
  if (tree.category) {
    tree.trainingSet2 = newData;
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
  } else {
    tree.nodeSet = newData;

    predicate = predicates[tree.predicateName];

    let matchedData = [],
      notMatchedData = [];

    newData.forEach(x => {
      let match;
      if (tree.predicateName === '==' || tree.predicateName === '>=') {
        match = predicate(x[tree.attr2], tree.pivot);
        console.log('c45', match);
      } else if (tree.weight) {
        match = predicate(x[tree.attr2], x[tree.pivot], tree.weight);
        console.log('tspw', match);
      } else {
        match = predicate(x[tree.attr2], x[tree.pivot]);
        console.log('tsp', match);
      }

      match ? matchedData.push(x) : notMatchedData.push(x);
    });

    testTree(tree.match, matchedData, categoryAttr);
    testTree(tree.notMatch, notMatchedData, categoryAttr);
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
    //console.log(a < w * b, a, w * b);
    return a < w * b;
  },
};
