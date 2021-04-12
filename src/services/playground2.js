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
