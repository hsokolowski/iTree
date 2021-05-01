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
 * @property {string} algorithm
 */

/**
 * @param {DecisionTreeBuilder} _builder
 * @param {boolean} isChanged
 */
//TSP
function buildDecisionTreeMix(
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
    algorithm,
    allClasses,
  } = builder;

  /** @type {string | number} */
  var _quality = 0;

  // LEAF
  if (maxTreeDepth === 0 || trainingSet.length <= minItemsCount) {
    //console.log('Liść bo maxTreeDepth:', maxTreeDepth, ' Ilość elementów:', trainingSet.length);
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

  // LEAF
  var initialEntropy = entropy(trainingSet, categoryAttr);
  if (initialEntropy <= entropyThrehold && !isChanged) {
    console.log('initialEntropy ' + initialEntropy + '<=' + entropyThrehold + ' entropyThrehold');
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

  var attributes = builder.allAttributes.filter(el => el !== categoryAttr && !ignoredAttributes.includes(el));

  var arrayOfTests = [];

  if (algorithm.includes('c45')) arrayOfTests.push(C45Dif(trainingSet, categoryAttr, ignoredAttributes));
  if (algorithm.includes('tsp')) arrayOfTests.push(TSPDif(allClasses, attributes, trainingSet, categoryAttr));
  if (algorithm.includes('tspw'))
    arrayOfTests.push(TSPWDif(allClasses, attributes, trainingSet, categoryAttr));

  //console.log(arrayOfTests);

  var lowest;
  var tmp;
  var min = 1000;
  for (var alg of arrayOfTests) {
    tmp = alg.maxDif;
    if (tmp < min) {
      lowest = alg;
      min = tmp;
    }
  }
  //console.log(lowest);
  const { maxDif, match, notMatch, attribute1, attribute2, direction, L_weight } = lowest;

  // LEAF
  if (!maxDif) {
    //console.log('Liść bo maxDif:', maxDif);
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

  //LEAF
  if (match.length === 0 || notMatch.length === 0) {
    //console.log('Liść bo Lewa/Prawa wynosi 0');
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

  builder.maxTreeDepth = maxTreeDepth - 1;
  builder.trainingSet = match;
  var matchSubTree = buildDecisionTreeMix(builder); //savesubtreesinfothreshold

  builder.trainingSet = notMatch;
  var notMatchSubTree = buildDecisionTreeMix(builder);

  //console.log('TUTAJ');
  return {
    attr2: attribute1,
    pivot: attribute2,
    predicateName: direction,
    match: matchSubTree,
    notMatch: notMatchSubTree, //{category: ...}
    matchedCount: match.length,
    notMatchedCount: notMatch.length,
    nodeSet: match.concat(notMatch),
    weight: L_weight ? L_weight.toFixed(3) : null,
  };
}

function countUniqueValues(items, attr) {
  ////var counter = {};

  // detecting different values of attribute
  //// for (var i = items.length - 1; i >= 0; i--) {
  ////   // items[i][attr] - value of attribute
  ////   counter[items[i][attr]] = 0;
  //// }
  var counter = Object.fromEntries(items.map(item => [item[attr], 0]));

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

/** @type {Worker} */
// @ts-ignore
const context = self; //eslint-disable-line
context.onmessage = function (event) {
  console.log('received message', event);
  const {
    data: { _builder, isChanged = false, changedAttribute1 = null, changedAttribute2 = null },
  } = event;
  const result = buildDecisionTreeMix(_builder, isChanged, changedAttribute1, changedAttribute2);
  context.postMessage(result);
};

function TSPDif(allClasses, attributes, trainingSet, categoryAttr) {
  var right = 0,
    left = 0;
  var maxDif = 100;
  var direction = '<';
  /** @type {string | number} */ var attribute1 = -1;
  /** @type {string | number} */ var attribute2 = -1;
  var leftList = [],
    rightList = [],
    classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)],
    match = [],
    notMatch = [];

  for (let attr1 of attributes) {
    for (let attr2 of attributes) {
      if (attr1 !== attr2) {
        right = left = 0;
        leftList = [];
        rightList = [];
        classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)];

        // division
        for (let element of trainingSet) {
          const attribute = element[categoryAttr];

          if (element[attr1] < element[attr2]) {
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
        var probR = 0,
          probL = 0,
          rankL = 0,
          rankR = 0;
        for (let k = 0; k < allClasses.length; k++) {
          probL = left === 0 ? 0 : classMatrix[0][k] / left;
          probR = right === 0 ? 0 : classMatrix[1][k] / right;

          rankL += probL * probL;
          rankR += probR * probR;
        }

        // setting new values
        var currentDif =
          (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
        if (currentDif < maxDif) {
          maxDif = currentDif;
          attribute1 = attr1;
          attribute2 = attr2;
          match = leftList;
          notMatch = rightList;
        }
      }
    }
  }
  return { maxDif, attribute1, attribute2, match, notMatch, direction };
}

function TSPWDif(allClasses, attributes, trainingSet, categoryAttr) {
  var right = 0,
    left = 0,
    sum1 = 0,
    sum2 = 0,
    L_weight = 0,
    weight = 0,
    direction = '<';
  var maxDif = 100;
  /** @type {string | number} */ var attribute1 = -1;
  /** @type {string | number} */ var attribute2 = -1;
  var leftList = [],
    rightList = [],
    classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)],
    match = [],
    notMatch = [];

  for (let attr1 of attributes) {
    for (let attr2 of attributes) {
      if (attr1 !== attr2) {
        right = left = sum1 = sum2 = weight = 0;
        leftList = [];
        rightList = [];
        classMatrix = [new Array(allClasses.length).fill(0), new Array(allClasses.length).fill(0)];

        for (let index = 0; index < trainingSet.length; index++) {
          const element = trainingSet[index];
          if (!isNaN(element[attr1]) && !isNaN(element[attr2])) {
            sum1 += parseFloat(element[attr1]);
            sum2 += parseFloat(element[attr2]);
          }
        }
        sum1 /= trainingSet.length;
        sum2 /= trainingSet.length;
        weight = sum1 / sum2;

        // division
        for (let element of trainingSet) {
          const attribute = element[categoryAttr];
          if (element[attr1] < weight * element[attr2]) {
            left++;
            leftList.push(element);
            classMatrix[0][allClasses.indexOf(attribute)]++;
          } else {
            right++;
            rightList.push(element);
            classMatrix[1][allClasses.indexOf(attribute)]++;
          }
        }
        var probR = 0,
          probL = 0,
          rankL = 0,
          rankR = 0;
        for (let k = 0; k < allClasses.length; k++) {
          probL = left === 0 ? 0 : classMatrix[0][k] / left;
          probR = right === 0 ? 0 : classMatrix[1][k] / right;

          rankL += probL * probL;
          rankR += probR * probR;
        }

        var currentDif =
          (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);

        if (currentDif < maxDif) {
          maxDif = currentDif;
          attribute1 = attr1;
          attribute2 = attr2;
          match = leftList;
          notMatch = rightList;
          L_weight = weight;
        }
      }
    }

    return { maxDif, attribute1, attribute2, match, notMatch, direction, L_weight };
  }
}

function C45Dif(trainingSet, categoryAttr, ignoredAttributes) {
  var alreadyChecked = {};

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
  var initialEntropy = entropy(trainingSet, categoryAttr);

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

  return {
    maxDif: bestSplit.gain,
    attribute1: bestSplit.attribute,
    attribute2: bestSplit.pivot,
    match: bestSplit.match,
    notMatch: bestSplit.notMatch,
    direction: bestSplit.predicateName,
  };
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
