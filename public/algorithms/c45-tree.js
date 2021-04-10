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
  //debugger;
  const builder = { ..._builder };
  const {
    trainingSet,
    minItemsCount,
    categoryAttr,
    entropyThrehold,
    maxTreeDepth,
    ignoredAttributes,
  } = builder;

  let _quality = 0;
  if (maxTreeDepth === 0 || trainingSet.length <= minItemsCount) {
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    let _hide = 0;
    //console.log(trainingSet);
    trainingSet.forEach(element => {
      if (element[categoryAttr] === _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    if (_quality !== 1) _hide = 25;
    _quality = _quality * 100;
    // restriction by maximal depth of tree
    // or size of training set is to small
    // so we have to terminate process of building tree
    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x => x[categoryAttr]),
    };
  }
  //console.log(categoryAttr);
  var initialEntropy = entropy(trainingSet, categoryAttr);
  console.log('initialEntropy ' + initialEntropy);
  if (initialEntropy <= entropyThrehold) {
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    let _hide = 0;
    //console.log(trainingSet);
    trainingSet.forEach(element => {
      if (element[categoryAttr] === _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    if (_quality !== 1) _hide = 25;
    _quality = _quality * 100;
    // entropy of training set too small
    // (it means that training set is almost homogeneous),
    // so we have to terminate process of building tree
    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x => x[categoryAttr]),
    };
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

  if (isChanged) {
    let attr = changedAttribute1;

    // let the value of current attribute be the pivot
    pivot = changedAttribute2;

    //console.log(attr +" "+ pivot)
    if (!isNaN(pivot)) {
      pivot = parseFloat(pivot);
    }

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
    //console.log(currSplit.match)
    //console.log(currSplit.notMatch)

    // calculating entropy of subsets
    matchEntropy = entropy(currSplit.match, categoryAttr);
    notMatchEntropy = entropy(currSplit.notMatch, categoryAttr);

    // calculating informational gain
    newEntropy = 0;
    newEntropy += matchEntropy * currSplit.match.length;
    newEntropy += notMatchEntropy * currSplit.notMatch.length;
    newEntropy /= trainingSet.length;
    currGain = initialEntropy - newEntropy;
    console.log('CURRENT GAIN ' + currGain);
    if (currGain > bestSplit.gain) {
      // remember pairs 'attribute-predicate-value'
      // which provides informational gain
      bestSplit = currSplit;
      bestSplit.predicateName = predicateName;
      bestSplit.predicate = predicate;
      bestSplit.attribute = attr;
      bestSplit.pivot = pivot;
      bestSplit.gain = currGain;
    }

    isChanged = false;
  } else {
    //delete space from property in object
    // let ignore=""
    // if(!(Object.entries(ignoredAttributes).length === 0 && ignoredAttributes.constructor === Object)){
    //     ignore = Object.keys(ignoredAttributes)
    //     ignore = ignore[0].substring(0, ignore[0].length - 1);
    //     console.log(ignore)
    // }
    //console.log("Liczy")

    for (var i = trainingSet.length - 1; i >= 0; i--) {
      var item = trainingSet[i];

      // iterating over all attributes of item
      for (var attr in item) {
        //console.log(ignoredAttributes)
        //if(ignoredAttributes[attr]===true) console.log("równe")
        if (attr === categoryAttr || ignoredAttributes[attr]) {
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
        //console.log("CURRENT GAIN 2"+currGain)
        if (currGain > bestSplit.gain) {
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
    }
  }
  console.log(bestSplit.gain);
  if (!bestSplit.gain) {
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    let _hide = 0;
    //console.log(trainingSet);
    trainingSet.forEach(element => {
      if (element[categoryAttr] === _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    if (_quality !== 1) _hide = 25;
    _quality = _quality * 100;
    // can't find optimal split
    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x => x[categoryAttr]),
    };
  }

  //console.log(window.list_obj)

  // building subtrees
  builder.maxTreeDepth = maxTreeDepth - 1;

  builder.trainingSet = bestSplit.match;
  var matchSubTree = buildDecisionTreeC45(builder);

  builder.trainingSet = bestSplit.notMatch;
  var notMatchSubTree = buildDecisionTreeC45(builder);

  return {
    attr2: bestSplit.attribute,
    predicateName: bestSplit.predicateName,
    pivot: bestSplit.pivot,
    match: matchSubTree,
    notMatch: notMatchSubTree,
    matchedCount: bestSplit.match.length,
    notMatchedCount: bestSplit.notMatch.length,
    nodeSet: bestSplit.match.concat(bestSplit.notMatch),
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
