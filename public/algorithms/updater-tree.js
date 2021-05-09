// @ts-nocheck

/**
 * @typedef {Object} DecisionTreeBuilder
 * @property {Array<Object>} trainingSet
 * @property {Array<string>} allAttributes
 * @property {Array<string>} allClasses
 * @property {number} minItemsCount
 * @property {string} categoryAttr
 * @property {number} entropyThrehold
 * @property {number} maxTreeDepth
 * @property {Array<string>} ignoredAttributes
 * @property {Object} oldTree
 * @property {boolean} isUpdate
 */

/**
 * @param {DecisionTreeBuilder} _builder
 * @param {boolean} isChanged
 */
//TSP
function buildDecisionTreeUpdate(
  _builder,
  isChanged = false,
  changedAttribute1 = null,
  changedAttribute2 = null,
  weight
) {
  const builder = { ..._builder };
  const {
    trainingSet,
    minItemsCount,
    categoryAttr,
    entropyThrehold,
    maxTreeDepth,
    ignoredAttributes,
    oldTree,
    isUpdate,
    oldAlgorithm,
  } = builder;

  var predicate;
  var match;
  var notMatch;
  var result;
  var L_weight;

  if (isChanged) {
    //var maxDif, attribute1, attribute2, match, notMatch, L_weight, predicateName, predicate;
    console.log('@ ISCHANGE');
    var expr = oldAlgorithm[0];
    switch (expr) {
      case 'C45':
        var initialEntropy = entropy(trainingSet, categoryAttr);

        result = c45isChange(changedAttribute1, changedAttribute2, trainingSet, categoryAttr, initialEntropy);

        match = result.match;
        notMatch = result.notMatch;
        predicate = result.predicateName;
        console.log('@ ISCHANGE - c45');
        console.log(result);
        break;
      case 'TSP':
        console.log('t');

        result = tspisChange(
          changedAttribute1,
          changedAttribute2,
          trainingSet,
          categoryAttr,
          builder.allClasses
        );
        match = result.match;
        notMatch = result.notMatch;
        predicate = result.predicate;
        console.log('@ ISCHANGE - tsp');
        console.log(result);
        break;
      case 'TSPW':
        console.log('w', weight);

        result = tspwisChange(
          changedAttribute1,
          changedAttribute2,
          weight,
          trainingSet,
          categoryAttr,
          builder.allClasses
        );
        match = result.match;
        notMatch = result.notMatch;
        L_weight = result.L_weight;
        predicate = result.predicate;
        console.log('@ ISCHANGE - tspw');
        console.log(L_weight);
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }

    isChanged = false;
  } else if (isUpdate && !isChanged) {
    console.log('# IS UPDATE');
    if (oldTree?.category) {
      console.log('# IS UPDATE LEAF - oldTree?.category', oldTree?.category);

      let _category = oldTree?.category;
      if (trainingSet.length === 0) {
        console.log('# IS UPDATE LEAF - trainingSet.length = 0');
        return {
          category: _category,
          quality: 0,
          matchedCount: 0,
          notMatchedCount: 0,
          trainingSet2: [],
        };
      }
      var _quality = 0;
      let _positiveCounter = 0;
      for (let element of trainingSet) {
        if (element[categoryAttr] === _category) _positiveCounter++;
      }
      let _negativeCounter = trainingSet.length - _positiveCounter;
      _quality = _positiveCounter / trainingSet.length;
      _quality = _quality * 100;

      return {
        category: _category,
        quality: _quality.toFixed(2),
        matchedCount: _positiveCounter,
        notMatchedCount: _negativeCounter,
        trainingSet2: trainingSet,
      };
    } else {
      console.log('# IS UPDATE - NODE');

      if (oldTree?.weight) {
        console.log('# IS UPDATE - NODE - TSP W', oldTree?.weight);
        result = tspwisChange(
          oldTree.attr2,
          oldTree.pivot,
          oldTree.weight,
          trainingSet,
          categoryAttr,
          builder.allClasses
        );
        match = result.match;
        notMatch = result.notMatch;
        L_weight = oldTree?.weight;
        predicate = result.predicate;
        console.log('# IS UPDATE - tspw');
        console.log(result);
        changedAttribute1 = oldTree.attr2;
        changedAttribute2 = oldTree.pivot;
      } else {
        var expr = oldTree?.predicateName;
        console.log(expr);
        console.log('# IS UPDATE - NODE - TSP OR C45');
        switch (expr) {
          case '==':
          case '>=':
            var initialEntropy = entropy(trainingSet, categoryAttr);

            result = c45isChange(oldTree.attr2, oldTree.pivot, trainingSet, categoryAttr, initialEntropy);

            match = result.match;
            notMatch = result.notMatch;
            predicate = result.predicateName;
            console.log('# IS UPDATE - NODE - c45');
            console.log(result);
            changedAttribute1 = oldTree.attr2;
            changedAttribute2 = oldTree.pivot;

            break;
          case '<':
            console.log('t');

            result = tspisChange(oldTree.attr2, oldTree.pivot, trainingSet, categoryAttr, builder.allClasses);
            match = result.match;
            notMatch = result.notMatch;
            predicate = result.predicate;
            console.log('# IS UPDATE - NODE - tsp');
            console.log(result);
            changedAttribute1 = oldTree.attr2;
            changedAttribute2 = oldTree.pivot;

            break;
          default:
            console.log('error in update');
        }
      }
    }
  }

  // building subtrees
  builder.maxTreeDepth = maxTreeDepth - 1;

  var matchSubTree = buildDecisionTreeUpdate({
    ...builder,
    trainingSet: match?.length ? match : [],
    //isUpdate: oldTree?.match?.category ? false : oldTree?.match,
    isUpdate: isUpdate,
    oldTree: oldTree?.match,
  });

  var notMatchSubTree = buildDecisionTreeUpdate({
    ...builder,
    trainingSet: notMatch?.length ? notMatch : [],
    //isUpdate: oldTree?.notMatch?.category ? false : oldTree?.notMatch,
    isUpdate: isUpdate,
    oldTree: oldTree?.notMatch,
  });

  var weightFixed = L_weight ? L_weight : '';
  return {
    attr2: changedAttribute1,
    predicateName: predicate,
    pivot: changedAttribute2,
    match: matchSubTree,
    notMatch: notMatchSubTree,
    matchedCount: match?.length ? match.length : 0,
    notMatchedCount: notMatch?.length ? notMatch.length : 0,
    nodeSet: trainingSet,
    weight: weightFixed,
  };
}

function countUniqueValues(items, attr) {
  var counter = {};

  // detecting different values of attribute
  for (var i = items.length - 1; i >= 0; i--) {
    // items[i][attr] - value of attribute
    counter[items[i][attr]] = 0;
  }

  // counting number of occurrences of each of values
  // of attribute
  for (var j = items.length - 1; j >= 0; j--) {
    counter[items[j][attr]] += 1;
  }

  return counter;
}

function mostFrequentValue(items, attr) {
  // counting number of occurrences of each of values
  // of attribute
  var counter = countUniqueValues(items, attr);

  var mostFrequentCount = 0;
  var mostFrequentValue;

  for (var value in counter) {
    if (counter[value] > mostFrequentCount) {
      mostFrequentCount = counter[value];
      mostFrequentValue = value;
    }
  }

  return mostFrequentValue;
}

/**
 * Calculating entropy of array of objects
 * by specific attribute.
 *
 * @param items - array of objects
 *
 * @param attr  - variable with name of attribute,
 *                which embedded in each object
 */
function entropy(items, attr) {
  // counting number of occurrences of each of values
  // of attribute
  var counter = countUniqueValues(items, attr);

  var entropy = 0;
  var p;
  for (var i in counter) {
    p = counter[i] / items.length;
    entropy += -p * Math.log(p);
  }

  return entropy;
}

/**
 * Splitting array of objects by value of specific attribute,
 * using specific predicate and pivot.
 *
 * Items which matched by predicate will be copied to
 * the new array called 'match', and the rest of the items
 * will be copied to array with name 'notMatch'
 *
 * @param items - array of objects
 *
 * @param attr  - variable with name of attribute,
 *                which embedded in each object
 *
 * @param predicate - function(x, y)
 *                    which returns 'true' or 'false'
 *
 * @param pivot - used as the second argument when
 *                calling predicate function:
 *                e.g. predicate(item[attr], pivot)
 */
function split(items, attr, predicate, pivot) {
  var match = [];
  var notMatch = [];

  var item, attrValue;

  for (var i = items.length - 1; i >= 0; i--) {
    item = items[i];
    attrValue = item[attr];

    if (predicate(attrValue, pivot)) {
      match.push(item);
    } else {
      notMatch.push(item);
    }
  }

  return {
    match: match,
    notMatch: notMatch,
  };
}

var predicates = {
  '==': function (a, b) {
    return a === b;
  },
  '>=': function (a, b) {
    return a >= b;
  },
};

function c45isChange(changedAttribute1, changedAttribute2, trainingSet, categoryAttr, initialEntropy) {
  let attr = changedAttribute1;

  // let the value of current attribute be the pivot
  let pivot = changedAttribute2;

  //console.log(attr +" "+ pivot)
  if (!isNaN(pivot)) {
    pivot = parseFloat(pivot);
  }

  // used as hash-set for avoiding the checking of split by rules
  // with the same 'attribute-predicate-pivot' more than once
  var alreadyChecked = {};

  // this variable expected to contain rule, which splits training set
  // into subsets with smaller values of entropy (produces informational gain)
  var bestSplit = { gain: 0 };

  var predicateName;
  var attrPredPivot;
  var predicate;
  var currSplit;
  var matchEntropy;
  var notMatchEntropy;
  var newEntropy;
  var currGain;
  // pick the predicate
  // depending on the type of the attribute value
  // var predicateName;
  if (typeof pivot == 'number') {
    predicateName = '>=';
  } else {
    // there is no sense to compare non-numeric attributes
    // so we will check only equality of such attributes
    predicateName = '==';
  }

  attrPredPivot = attr + predicateName + pivot;
  if (alreadyChecked[attrPredPivot]) {
    // skip such pairs of 'attribute-predicate-pivot',
    // which been already checked
    //continue;
  }
  alreadyChecked[attrPredPivot] = true;

  predicate = predicates[predicateName];

  // splitting training set by given 'attribute-predicate-value'
  currSplit = split(trainingSet, attr, predicate, pivot);
  // console.log(currSplit.match);
  // console.log(currSplit.notMatch);

  // calculating entropy of subsets
  matchEntropy = entropy(currSplit.match, categoryAttr);
  notMatchEntropy = entropy(currSplit.notMatch, categoryAttr);

  // calculating informational gain
  newEntropy = 0;
  newEntropy += matchEntropy * currSplit.match.length;
  newEntropy += notMatchEntropy * currSplit.notMatch.length;
  newEntropy /= trainingSet.length;
  currGain = initialEntropy - newEntropy;

  bestSplit = currSplit;
  bestSplit.predicateName = predicateName;
  bestSplit.predicate = predicate;
  bestSplit.attribute = attr;
  bestSplit.pivot = pivot;
  bestSplit.gain = currGain;

  return bestSplit;
}

function tspisChange(changedAttribute1, changedAttribute2, trainingSet, categoryAttr, allClasses) {
  var right = 0,
    left = 0;

  var  currentDif;

  var directrion = '<';
  var leftList = [],
    rightList = [],
    classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)];
  var probR = 0,
    probL = 0,
    rankL = 0,
    rankR = 0;
  for (let element of trainingSet) {
    const attribute = element[categoryAttr];

    if (element[changedAttribute1] < element[changedAttribute2]) {
      left++;
      leftList.push(element);
      classMatrix[0][allClasses.indexOf(attribute)]++;
    } else {
      right++;
      rightList.push(element);
      classMatrix[1][allClasses.indexOf(attribute)]++;
    }
  }

  // probability
  probR = 0;
  probL = 0;
  rankL = 0;
  rankR = 0;
  for (let k = 0; k < allClasses.length; k++) {
    probL = left === 0 ? 0 : classMatrix[0][k] / left;
    probR = right === 0 ? 0 : classMatrix[1][k] / right;

    rankL += probL * probL;
    rankR += probR * probR;
  }

  // setting new values
  currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);

  return {
    maxDif: currentDif,
    attribute1: changedAttribute1,
    attribute2: changedAttribute2,
    match: leftList,
    notMatch: rightList,
    predicate: directrion,
  };
}

function tspwisChange(changedAttribute1, changedAttribute2, weight, trainingSet, categoryAttr, allClasses) {
  var right = 0,
    left = 0;
  var
    currentDif;

  var directrion = '<';
  var leftList = [],
    rightList = [],
    classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)],

  var probR = 0,
    probL = 0,
    rankL = 0,
    rankR = 0;
  for (let element of trainingSet) {
    const attribute = element[categoryAttr];

    if (element[changedAttribute1] < weight * element[changedAttribute2]) {
      left++;
      leftList.push(element);
      classMatrix[0][allClasses.indexOf(attribute)]++;
    } else {
      right++;
      rightList.push(element);
      classMatrix[1][allClasses.indexOf(attribute)]++;
    }
  }

  // probability
  probR = 0;
  probL = 0;
  rankL = 0;
  rankR = 0;
  for (let k = 0; k < allClasses.length; k++) {
    probL = left === 0 ? 0 : classMatrix[0][k] / left;
    probR = right === 0 ? 0 : classMatrix[1][k] / right;

    rankL += probL * probL;
    rankR += probR * probR;
  }

  // setting new values
  currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);

  return {
    maxDif: currentDif,
    attribute1: changedAttribute1,
    attribute2: changedAttribute2,
    match: leftList,
    notMatch: rightList,
    predicate: directrion,
    L_weight: weight,
  };
}

/** @type {Worker} */
// @ts-ignore
const context = self; //eslint-disable-line
context.onmessage = function (event) {
  console.log('received message', event);
  const {
    data: { _builder, isChanged = false, changedAttribute1 = null, changedAttribute2 = null, weight = 1 },
  } = event;
  const result = buildDecisionTreeUpdate(_builder, isChanged, changedAttribute1, changedAttribute2, weight);
  console.log(result);
  context.postMessage(result);
};
