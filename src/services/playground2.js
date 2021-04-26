function predict(tree, item) {
  var attr, value, predicate, pivot;

  // Traversing tree from the root to leaf
  while (true) {
    if (tree.category) {
      // only leafs contains predicted category
      return tree.category;
    }

    attr = tree.attribute;
    value = item[attr];

    predicate = predicates[tree.predicate];
    pivot = tree.pivot;

    // move to one of subtrees
    if (predicate(value, pivot)) {
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
  '<': function (a, b, item) {
    return item[a] < item[b];
  },
};
let p = predicates['<'];
let item = {
  a: 1,
  b: 2,
};
console.log(item['a'], item['b']);
console.log(item['a'] < item['b']);
console.log(p('a', 'b', item));
