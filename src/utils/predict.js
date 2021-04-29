export function predict(tree, item) {
  var attr1, attr2, value, predicate, pivot, match;

  // Traversing tree from the root to leaf
  while (true) {
    if (tree.category) {
      // only leafs contains predicted category
      return tree.category;
    }
    console.log(
      tree.predicateName,
      tree.weight,
      tree.predicateName === '>=',
      tree.predicateName === '==',
      tree.predicateName === '<'
    );
    if (tree.weight) {
      attr1 = tree.attr2;
      attr2 = tree.pivot;
      value = item[attr1];
      pivot = item[attr2];

      predicate = predicates['w'];
      match = predicate(value, pivot, tree.weight);

      console.log('predict - waga', match);
    }
    if (tree.predicateName === '>=' || tree.predicateName === '==') {
      attr1 = tree.attr2;
      value = item[attr1];
      pivot = tree.pivot;
      predicate = predicates[tree.predicateName];
      match = predicate(value, pivot);

      console.log('predict - c45', match);
    }
    if (tree.predicateName === '<') {
      attr1 = tree.attr2;
      attr2 = tree.pivot;
      value = item[attr1];
      pivot = item[attr2];

      predicate = predicates[tree.predicateName];
      match = predicate(value, pivot);

      console.log('predict - tsp', match);
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
    return a < w * b;
  },
};
