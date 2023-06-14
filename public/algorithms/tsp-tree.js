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
    oldTree,
    isUpdate,
  } = builder;

  /** @type {string | number} */
  var _quality = 0;

  let bestTests = [];

  // LEAF
  if (!isUpdate && (maxTreeDepth === 0 || trainingSet?.length <= minItemsCount)) {
    console.log('LEAF Minimal node size', minItemsCount + 'trainingSet?.length ' + trainingSet?.length);
    return MakeLeaf(trainingSet, categoryAttr);
  }

  // LEAF
  var initialEntropy = entropy(trainingSet, categoryAttr);
  if (initialEntropy <= entropyThrehold && !isChanged && !isUpdate) {
    console.log('LEAF initial entropy', initialEntropy);
    return MakeLeaf(trainingSet, categoryAttr);
  }

  var attributes = builder.allAttributes.filter(el => el !== categoryAttr && !ignoredAttributes.includes(el));

  var right = 0,
    left = 0;
  var maxDif = 0,
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
    console.log(changedAttribute2);
    if (changedAttribute2 === 'clear') {
      for (let j = 0; j < attributes.length; j++) {
        changedAttribute2 = attributes[j];

        if (changedAttribute1 !== changedAttribute2) {
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

            if (parseFloat(element[changedAttribute1]) < parseFloat(element[changedAttribute2])) {
              left++;
              leftList.push(element);
              classMatrix[0][builder.allClasses.indexOf(attribute)]++;
            } else {
              right++;
              rightList.push(element);
              classMatrix[1][builder.allClasses.indexOf(attribute)]++;
            }
          }

          let matchEntropy = entropy(leftList, categoryAttr);
          let notMatchEntropy = entropy(rightList, categoryAttr);

          // calculating informational gain
          let newEntropy = 0;
          newEntropy += matchEntropy * leftList.length;
          newEntropy += notMatchEntropy * rightList.length;
          newEntropy /= trainingSet.length;
          let currentDif = initialEntropy - newEntropy;
          if (currentDif > maxDif) {
            //console.log('wchodzi');
            maxDif = currentDif;
            attribute1 = changedAttribute1;
            attribute2 = changedAttribute2;
            match = leftList;
            notMatch = rightList;

            let test = {
              maxDif: currentDif,
              attribute1: changedAttribute1,
              attribute2: changedAttribute2,
              match: leftList,
              notMatch: rightList,
              direction: '<',
            };
            bestTests.push(test);
          }
        }
      }
    } else {
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

      // // probability
      // probR = 0;
      // probL = 0;
      // rankL = 0;
      // rankR = 0;
      // for (let k = 0; k < builder.allClasses.length; k++) {
      //   probL = left === 0 ? 0 : classMatrix[0][k] / left;
      //   probR = right === 0 ? 0 : classMatrix[1][k] / right;

      //   rankL += probL * probL;
      //   rankR += probR * probR;
      // }

      // // setting new values
      // currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);

      // maxDif = currentDif;
      // attribute1 = changedAttribute1;
      // attribute2 = changedAttribute2;
      // match = leftList;
      // notMatch = rightList;
      //podzial = classMatrix;

      let matchEntropy = entropy(rightList, categoryAttr);
      let notMatchEntropy = entropy(leftList, categoryAttr);

      // calculating informational gain
      let newEntropy = 0;
      newEntropy += matchEntropy * rightList.length;
      newEntropy += notMatchEntropy * leftList.length;
      newEntropy /= trainingSet.length;
      let currentDif = initialEntropy - newEntropy;

      maxDif = currentDif;
      attribute1 = changedAttribute1;
      attribute2 = changedAttribute2;
      match = leftList;
      notMatch = rightList;
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
      for (let element of trainingSet) {
        const attribute = element[categoryAttr];

        if (element[oldTree.attr2] < element[oldTree.pivot]) {
          left++;
          leftList.push(element);
          classMatrix[0][builder.allClasses.indexOf(attribute)]++;
        } else {
          right++;
          rightList.push(element);
          classMatrix[1][builder.allClasses.indexOf(attribute)]++;
        }
      }

      // // probability
      // probR = 0;
      // probL = 0;
      // rankL = 0;
      // rankR = 0;
      // for (let k = 0; k < builder.allClasses.length; k++) {
      //   probL = left === 0 ? 0 : classMatrix[0][k] / left;
      //   probR = right === 0 ? 0 : classMatrix[1][k] / right;

      //   rankL += probL * probL;
      //   rankR += probR * probR;
      // }

      // // setting new values
      // currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);

      // maxDif = currentDif;
      // attribute1 = changedAttribute1;
      // attribute2 = changedAttribute2;
      // match = leftList;
      // notMatch = rightList;
      //podzial = classMatrix;

      let matchEntropy = entropy(rightList, categoryAttr);
      let notMatchEntropy = entropy(leftList, categoryAttr);

      // calculating informational gain
      let newEntropy = 0;
      newEntropy += matchEntropy * rightList.length;
      newEntropy += notMatchEntropy * leftList.length;
      newEntropy /= trainingSet.length;
      let currentDif = initialEntropy - newEntropy;

      maxDif = currentDif;
      attribute1 = oldTree.attr2;
      attribute2 = oldTree.pivot;
      match = leftList;
      notMatch = rightList;
    }
  } else {
    let attr1, attr2;
    for (let i = 0; i < attributes.length; i++) {
      attr1 = attributes[i];
      for (let j = i + 1; j < attributes.length; j++) {
        attr2 = attributes[j];

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

            if (parseFloat(element[attr1]) < parseFloat(element[attr2])) {
              left++;
              leftList.push(element);
              classMatrix[0][builder.allClasses.indexOf(attribute)]++;
            } else {
              right++;
              rightList.push(element);
              classMatrix[1][builder.allClasses.indexOf(attribute)]++;
            }
          }

          // // probability
          // probR = 0;
          // probL = 0;
          // rankL = 0;
          // rankR = 0;
          // for (let k = 0; k < builder.allClasses.length; k++) {
          //   probL = left === 0 ? 0 : classMatrix[0][k] / left;
          //   probR = right === 0 ? 0 : classMatrix[1][k] / right;

          //   rankL += probL * probL;
          //   rankR += probR * probR;
          // }

          // // setting new values
          // currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
          // if (currentDif < maxDif) {
          //   maxDif = currentDif;
          //   attribute1 = attr1;
          //   attribute2 = attr2;
          //   match = leftList;
          //   notMatch = rightList;
          //   //podzial = classMatrix;
          // }

          let matchEntropy = entropy(leftList, categoryAttr);
          let notMatchEntropy = entropy(rightList, categoryAttr);

          // calculating informational gain
          let newEntropy = 0;
          newEntropy += matchEntropy * leftList.length;
          newEntropy += notMatchEntropy * rightList.length;
          newEntropy /= trainingSet.length;
          let currentDif = initialEntropy - newEntropy;
          if (currentDif > maxDif) {
            maxDif = currentDif;
            attribute1 = attr1;
            attribute2 = attr2;
            match = leftList;
            notMatch = rightList;

            let test = {
              maxDif: currentDif,
              attribute1: attr1,
              attribute2: attr2,
              match: leftList,
              notMatch: rightList,
              direction: '<',
            };
            bestTests.push(test);
          }
        }
      }
    }
  }

  // LEAF
  if (!maxDif && !isUpdate) {
    return MakeLeaf(trainingSet, categoryAttr);
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

  bestTests = bestTests.sort(({ maxDif: a }, { maxDif: b }) => b - a);

  builder.maxTreeDepth = maxTreeDepth - 1;
  // builder.trainingSet = match;
  // var matchSubTree = buildDecisionTreeTSP(builder); //savesubtreesinfothreshold
  console.log('-----------PODZIAł -----------------');
  // builder.trainingSet = notMatch;
  // var notMatchSubTree = buildDecisionTreeTSP(builder);
  console.log(changedAttribute2);
  var matchSubTree = buildDecisionTreeTSP({
    ...builder,
    trainingSet: match?.length ? match : [],
    //isUpdate: oldTree?.match?.category ? false : oldTree?.match,
    isUpdate: isUpdate,
    oldTree: oldTree?.match,
  });
  console.log(changedAttribute2);
  var notMatchSubTree = buildDecisionTreeTSP({
    ...builder,
    trainingSet: notMatch?.length ? notMatch : [],
    //isUpdate: oldTree?.notMatch?.category ? false : oldTree?.notMatch,
    isUpdate: isUpdate,
    oldTree: oldTree?.notMatch,
  });
  console.log('po obli');
  return {
    attr2: attribute1,
    pivot: attribute2,
    predicateName: directrion,
    match: matchSubTree,
    notMatch: notMatchSubTree, //{category: ...}
    matchedCount: match.length,
    notMatchedCount: notMatch.length,
    nodeSet: trainingSet,
    tests: bestTests,
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

/** @type {Worker} */
// @ts-ignore
const context = self; //eslint-disable-line
context.onmessage = function (event) {
  console.log('received message', event);
  const {
    data: { _builder, isChanged = false, changedAttribute1 = null, changedAttribute2 = null },
  } = event;
  console.log('worker tsp');
  const result = buildDecisionTreeTSP(_builder, isChanged, changedAttribute1, changedAttribute2);
  context.postMessage(result);
};
