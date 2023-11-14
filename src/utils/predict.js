export function predict(tree, item) {
  var attr1, attr2, value, predicate, pivot, match;

  // Traversing tree from the root to leaf
  while (true) {
    if (tree.category) {
      // only leafs contains predicted category
      return tree.category;
    }
    // console.log(
    //   tree.predicateName,
    //   tree.predicateName === '>=',
    //   tree.predicateName === '==',
    //   tree.predicateName === '<'
    // );
    if (tree.predicateName === '>=' || tree.predicateName === '==') {
      attr1 = tree.attr2;
      value = item[attr1];
      pivot = parseFloat(tree.pivot);
      // if pivot is NaN probably is a Text value so return to based value
      if (isNaN(pivot)) {
        pivot = tree.pivot;
      }
      predicate = predicates[tree.predicateName];
      match = predicate(value, pivot);

      //console.log(value, pivot);
      //console.log('predict - c45', match);
    }
    if (tree.predicateName === '<') {
      attr1 = tree.attr2;
      attr2 = tree.pivot;
      value = parseFloat(item[attr1]);
      pivot = parseFloat(item[attr2]);

      predicate = predicates[tree.predicateName];
      match = predicate(value, pivot);

      //console.log(value, pivot);
      //console.log('predict - tsp', match);
    }
    //console.log(tree.weight);
    if (tree.weight) {
      attr1 = tree.attr2;
      attr2 = tree.pivot;
      value = parseFloat(item[attr1]);
      pivot = parseFloat(item[attr2]);

      predicate = predicates['w'];
      match = predicate(value, pivot, tree.weight);

      //console.log('predict - waga', match, value + '<', pivot * tree.weight);
    }

    // move to one of subtrees
    if (match) {
      tree = tree.match;
    } else {
      tree = tree.notMatch;
    }
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
