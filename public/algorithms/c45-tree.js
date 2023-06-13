// @ts-check

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
function buildDecisionTreeC45(
  _builder,
  isChanged = false,
  changedAttribute1 = null,
  changedAttribute2 = null
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
  } = builder;

  let bestTests = [];

  //console.log('old Treee', oldTree, 'isUpdate', isUpdate, 'isChange', isChanged, trainingSet);

  if (!isUpdate && (maxTreeDepth === 0 || trainingSet?.length <= minItemsCount)) {
    //console.log('LEAF Minimal node size', minItemsCount + 'trainingSet?.length ' + trainingSet?.length);
    return MakeLeaf(trainingSet, categoryAttr);
  }

  //LEAF
  var initialEntropy = entropy(trainingSet, categoryAttr);
  //console.log('initial entropy', initialEntropy);
  if (initialEntropy <= entropyThrehold && !isChanged && !isUpdate) {
    //console.log('LEAF initial entropy', initialEntropy);
    return MakeLeaf(trainingSet, categoryAttr);
  }

  // used as hash-set for avoiding the checking of split by rules
  // with the same 'attribute-predicate-pivot' more than once
  var alreadyChecked = {};

  // this variable expected to contain rule, which splits training set
  // into subsets with smaller values of entropy (produces informational gain)
  var bestSplit = { gain: 0 };

  var pivot;
  var predicateName;
  var attrPredPivot;
  var predicate;
  var currSplit;
  var matchEntropy;
  var notMatchEntropy;
  var newEntropy;
  var currGain;
  console.log(isChanged, changedAttribute2);
  if (isChanged && changedAttribute2 != 'clear') {
    let attr = changedAttribute1;

    // let the value of current attribute be the pivot
    pivot = changedAttribute2;

    //console.log(attr +" "+ pivot)
    if (!isNaN(pivot)) {
      pivot = parseFloat(pivot);
    }
    console.log('nie clear', pivot);
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
    //console.log('IS CHAANGED CURRENT GAIN ' + currGain);
    if (currGain > bestSplit.gain) {
      // remember pairs 'attribute-predicate-value'
      // which provides informational gain
      bestSplit = currSplit;
      bestSplit.predicateName = predicateName;
      bestSplit.predicate = predicate;
      bestSplit.attribute = attr;
      bestSplit.pivot = pivot;
      bestSplit.gain = currGain;
      //console.log('@ IS CHANGE ', bestSplit);
    }
    if (!currGain) {
      // remember pairs 'attribute-predicate-value'
      // which provides informational gain
      bestSplit = currSplit;
      bestSplit.predicateName = predicateName;
      bestSplit.predicate = predicate;
      bestSplit.attribute = attr;
      bestSplit.pivot = pivot;
      bestSplit.gain = currGain;
      //console.log('@ IS CHANGE ', bestSplit);
    }

    isChanged = false;
  } else if (isUpdate && !isChanged) {
    //console.log('# IS UPDATE');
    if (oldTree?.category) {
      //console.log('# IS UPDATE - oldTree?.category', oldTree?.category);

      let _category = oldTree?.category;
      if (trainingSet.length === 0) {
        //console.log('# IS UPDATE - trainingSet.length = 0');
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
      bestTests = oldTree.tests;
      //console.log('# IS UPDATE - NODE');
      let attr = oldTree.attr2;
      pivot = oldTree.pivot;
      if (!isNaN(pivot)) {
        pivot = parseFloat(pivot);
      }

      if (typeof pivot == 'number') {
        predicateName = '>=';
      } else {
        predicateName = '==';
      }

      attrPredPivot = attr + predicateName + pivot;
      if (alreadyChecked[attrPredPivot]) {
      }
      alreadyChecked[attrPredPivot] = true;

      predicate = predicates[predicateName];

      currSplit = split(trainingSet, attr, predicate, pivot);
      //console.log('currSplit', currSplit);
      matchEntropy = entropy(currSplit.match, categoryAttr);
      notMatchEntropy = entropy(currSplit.notMatch, categoryAttr);
      //console.log('matchEntropy', matchEntropy, 'notMatchEntropy', notMatchEntropy);
      newEntropy = 0;
      newEntropy += matchEntropy * currSplit.match.length;
      newEntropy += notMatchEntropy * currSplit.notMatch.length;
      newEntropy /= trainingSet.length;
      currGain = initialEntropy - newEntropy;
      //console.log('CURRENT GAIN ' + currGain);
      if (currGain > bestSplit.gain) {
        bestSplit = currSplit;
        bestSplit.predicateName = predicateName;
        bestSplit.predicate = predicate;
        bestSplit.attribute = attr;
        bestSplit.pivot = pivot;
        bestSplit.gain = currGain;
      }
      if (!currGain) {
        // remember pairs 'attribute-predicate-value'
        // which provides informational gain
        bestSplit = currSplit;
        bestSplit.predicateName = predicateName;
        bestSplit.predicate = predicate;
        bestSplit.attribute = attr;
        bestSplit.pivot = pivot;
        bestSplit.gain = currGain;
      }
    }
  } else {
    for (var i = trainingSet.length - 1; i >= 0; i--) {
      var item = trainingSet[i];

      // iterating over all attributes of item
      for (var attr in item) {
        //if(ignoredAttributes[attr]===true) console.log("równe")
        if (attr === categoryAttr || ignoredAttributes.includes(attr)) {
          //if ((attr === categoryAttr) || ignore===attr) {
          continue;
        }

        // let the value of current attribute be the pivot
        pivot = item[attr];
        if (!isNaN(pivot)) {
          pivot = parseFloat(pivot);
        }
        // pick the predicate
        // depending on the type of the attribute value
        //var predicateName;
        if (typeof pivot == 'number') {
          //console.log('is number ' + pivot + ' ' + typeof pivot)
          predicateName = '>=';
        } else {
          //console.log('is not number ' + pivot + ' ' + typeof pivot)

          // there is no sense to compare non-numeric attributes
          // so we will check only equality of such attributes
          predicateName = '==';
        }

        attrPredPivot = attr + predicateName + pivot;
        if (alreadyChecked[attrPredPivot]) {
          // skip such pairs of 'attribute-predicate-pivot',
          // which been already checked
          continue;
        }
        alreadyChecked[attrPredPivot] = true;

        predicate = predicates[predicateName];

        // splitting training set by given 'attribute-predicate-value'
        currSplit = split(trainingSet, attr, predicate, pivot);
        ////console.log(currSplit)
        // calculating entropy of subsets
        matchEntropy = entropy(currSplit.match, categoryAttr);
        notMatchEntropy = entropy(currSplit.notMatch, categoryAttr);
        ////console.log(bestSplit.gain)
        // calculating informational gain
        newEntropy = 0;
        newEntropy += matchEntropy * currSplit.match.length;
        newEntropy += notMatchEntropy * currSplit.notMatch.length;
        newEntropy /= trainingSet.length;
        currGain = initialEntropy - newEntropy;
        //console.log(' !!!!!!!!!!!!  CURRENT GAIN 2', attrPredPivot, currGain);
        if (currGain > bestSplit.gain) {
          // remember pairs 'attribute-predicate-value'
          // which provides informational gain
          bestSplit = currSplit;
          bestSplit.predicateName = predicateName;
          bestSplit.predicate = predicate;
          bestSplit.attribute = attr;
          bestSplit.pivot = pivot;
          bestSplit.gain = currGain;

          let test = {
            maxDif: bestSplit.gain,
            attribute1: bestSplit.attribute,
            attribute2: bestSplit.pivot,
            match: bestSplit.match,
            notMatch: bestSplit.notMatch,
            direction: bestSplit.predicateName,
          };
          bestTests.push(test);
        }
      }
    }
  }
  console.log('po wszytskim');
  if (!bestSplit.gain && !isUpdate) {
    return MakeLeaf(trainingSet, categoryAttr);
  }

  bestTests = bestTests.sort(({ maxDif: a }, { maxDif: b }) => b - a);
  console.log(bestTests);
  // building subtrees
  builder.maxTreeDepth = maxTreeDepth - 1;
  //console.log('po wszytskim-match');
  var matchSubTree = buildDecisionTreeC45({
    ...builder,
    trainingSet: bestSplit.match?.length ? bestSplit.match : [],
    //isUpdate: oldTree?.match?.category ? false : oldTree?.match,
    isUpdate: isUpdate,
    oldTree: oldTree?.match,
  });
  //console.log('po wszytskim-notmatch');
  var notMatchSubTree = buildDecisionTreeC45({
    ...builder,
    trainingSet: bestSplit.notMatch?.length ? bestSplit.notMatch : [],
    //isUpdate: oldTree?.notMatch?.category ? false : oldTree?.notMatch,
    isUpdate: isUpdate,
    oldTree: oldTree?.notMatch,
  });

  return {
    attr2: bestSplit.attribute,
    predicateName: bestSplit.predicateName,
    pivot: bestSplit.pivot,
    match: matchSubTree,
    notMatch: notMatchSubTree,
    matchedCount: bestSplit.match?.length ? bestSplit.match.length : 0,
    notMatchedCount: bestSplit.notMatch?.length ? bestSplit.notMatch.length : 0,
    // nodeSet:
    //   bestSplit.match?.length && bestSplit.notMatch?.length
    //     ? bestSplit.match?.concat(bestSplit.notMatch)
    //     : [],
    nodeSet: trainingSet,
    tests: bestTests,
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

function MakeLeaf(trainingSet, categoryAttr) {
  var _quality = 0;
  let _category = mostFrequentValue(trainingSet, categoryAttr);
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
}

function findBestTests() {}

/** @type {Worker} */
// @ts-ignore
const context = self; //eslint-disable-line
context.onmessage = function (event) {
  console.log('received message', event);
  const {
    data: { _builder, isChanged = false, changedAttribute1 = null, changedAttribute2 = null },
  } = event;
  const result = buildDecisionTreeC45(_builder, isChanged, changedAttribute1, changedAttribute2);
  console.log(result);
  context.postMessage(result);
};
