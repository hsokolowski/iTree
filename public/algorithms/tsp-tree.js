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
function buildDecisionTreeTSP(
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
    //console.log('initialEntropy ' + initialEntropy + '<=' + entropyThrehold + ' entropyThrehold');
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    for (let element of trainingSet) {
      console.log(element[categoryAttr] === _category, element[categoryAttr] == _category);
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

  var right = 0,
    left = 0;
  var maxDif = 100,
    currentDif;
  /** @type {string | number} */ var attribute1 = -1;
  /** @type {string | number} */ var attribute2 = -1;
  var directrion = '<';
  var leftList = [],
    rightList = [],
    classMatrix = [
      new Array(builder.allClasses.length).fill(0),
      new Array(builder.allClasses.length).fill(0),
    ],
    match = [],
    notMatch = [];
  var probR = 0,
    probL = 0,
    rankL = 0,
    rankR = 0;

  //#########################
  //#     force changes     #
  //#########################
  if (isChanged) {
    // if (isCalulate) {
    // division
    for (let element of trainingSet) {
      const attribute = element[categoryAttr];

      if (element[changedAttribute1] < element[changedAttribute2]) {
        left++;
        leftList.push(element);
        classMatrix[0][builder.allClasses.indexOf(attribute)]++;
      } else {
        right++;
        rightList.push(element);
        classMatrix[1][builder.allClasses.indexOf(attribute)]++;
      }
    }

    // probability
    probR = 0;
    probL = 0;
    rankL = 0;
    rankR = 0;
    for (let k = 0; k < builder.allClasses.length; k++) {
      probL = left === 0 ? 0 : classMatrix[0][k] / left;
      probR = right === 0 ? 0 : classMatrix[1][k] / right;

      rankL += probL * probL;
      rankR += probR * probR;
    }

    // setting new values
    currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
    if (currentDif < maxDif) {
      maxDif = currentDif;
      attribute1 = changedAttribute1;
      attribute2 = changedAttribute2;
      match = leftList;
      notMatch = rightList;
      //podzial = classMatrix;
    }
  } else {
    for (let attr1 of attributes) {
      for (let attr2 of attributes) {
        if (attr1 !== attr2) {
          right = left = 0;
          leftList = [];
          rightList = [];
          classMatrix = [
            new Array(builder.allClasses.length).fill(0),
            new Array(builder.allClasses.length).fill(0),
          ];

          // division
          for (let element of trainingSet) {
            const attribute = element[categoryAttr];

            if (element[attr1] < element[attr2]) {
              left++;
              leftList.push(element);
              classMatrix[0][builder.allClasses.indexOf(attribute)]++;
            } else {
              right++;
              rightList.push(element);
              classMatrix[1][builder.allClasses.indexOf(attribute)]++;
            }
          }

          // probability
          probR = 0;
          probL = 0;
          rankL = 0;
          rankR = 0;
          for (let k = 0; k < builder.allClasses.length; k++) {
            probL = left === 0 ? 0 : classMatrix[0][k] / left;
            probR = right === 0 ? 0 : classMatrix[1][k] / right;

            rankL += probL * probL;
            rankR += probR * probR;
          }

          // setting new values
          currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
          if (currentDif < maxDif) {
            maxDif = currentDif;
            attribute1 = attr1;
            attribute2 = attr2;
            match = leftList;
            notMatch = rightList;
            //podzial = classMatrix;
          }
        }
      }
    }
  }

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
  var matchSubTree = buildDecisionTreeTSP(builder); //savesubtreesinfothreshold

  builder.trainingSet = notMatch;
  var notMatchSubTree = buildDecisionTreeTSP(builder);

  return {
    attr2: attribute1,
    pivot: attribute2,
    predicateName: directrion,
    match: matchSubTree,
    notMatch: notMatchSubTree, //{category: ...}
    matchedCount: match.length,
    notMatchedCount: notMatch.length,
    nodeSet: match.concat(notMatch),
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
  const result = buildDecisionTreeTSP(_builder, isChanged, changedAttribute1, changedAttribute2);
  context.postMessage(result);
};

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
