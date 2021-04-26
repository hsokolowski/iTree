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
//TSP-weight
function buildDecisionTreeTSPW(
  _builder,
  isChanged = false,
  changedAttribute1 = null,
  changedAttribute2 = null,
  weight = 1
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
    console.log('Liść bo maxTreeDepth:', maxTreeDepth, ' Ilość elementów:', trainingSet.length);
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    for (let element of trainingSet) {
      if (element[categoryAttr] == _category) _positiveCounter++;
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
    left = 0,
    sum1 = 0,
    sum2 = 0,
    L_weight = 0;
  var maxDif = 100;
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

  //#########################
  //#     force changes     #
  //#########################
  if (isChanged) {
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
    var probR = 0,
      probL = 0,
      rankL = 0,
      rankR = 0;
    for (let k = 0; k < builder.allClasses.length; k++) {
      probL = left === 0 ? 0 : classMatrix[0][k] / left;
      probR = right === 0 ? 0 : classMatrix[1][k] / right;

      rankL += probL * probL;
      rankR += probR * probR;
    }

    // setting new values
    var currentDif = (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
    if (currentDif < maxDif) {
      maxDif = currentDif;
      attribute1 = changedAttribute1;
      attribute2 = changedAttribute2;
      match = leftList;
      notMatch = rightList;
      L_weight = weight;
    }
  } else {
    for (let attr1 of attributes) {
      for (let attr2 of attributes) {
        if (attr1 !== attr2) {
          console.log(attr1, attr2);
          right = left = 0;
          leftList = [];
          rightList = [];
          classMatrix = [
            new Array(builder.allClasses.length).fill(0),
            new Array(builder.allClasses.length).fill(0),
          ];

          for (let index = 0; index < trainingSet.length; index++) {
            const element = trainingSet[index];
            if (!isNaN(element[attr1]) && !isNaN(element[attr2])) {
              sum1 += parseFloat(element[attr1]);
              sum2 += parseFloat(element[attr2]);
              console.log(index, element[attr1], element[attr2]);
            }
          }
          console.log('sum1', sum1, 'sum2', sum2);
          sum1 /= trainingSet.length;
          sum2 /= trainingSet.length;
          console.log('sum1', sum1, 'sum2', sum2);
          weight = sum1 / sum2;
          console.log('weight', weight);

          // division
          for (let element of trainingSet) {
            const attribute = element[categoryAttr];

            if (element[attr1] < weight * element[attr2]) {
              left++;
              leftList.push(element);
              classMatrix[0][builder.allClasses.indexOf(attribute)]++;
            } else {
              right++;
              rightList.push(element);
              classMatrix[1][builder.allClasses.indexOf(attribute)]++;
            }
          }
          //console.log(classMatrix);
          var probR = 0,
            probL = 0,
            rankL = 0,
            rankR = 0;
          for (let k = 0; k < builder.allClasses.length; k++) {
            probL = left === 0 ? 0 : classMatrix[0][k] / left;
            probR = right === 0 ? 0 : classMatrix[1][k] / right;

            rankL += probL * probL;
            rankR += probR * probR;
          }
          //console.log("Rank Lewy",rankL,"Rank Prawy",rankR);

          var currentDif =
            (right / trainingSet.length) * (1 - rankR) + (left / trainingSet.length) * (1 - rankL);
          if (currentDif < maxDif) {
            console.log('------Zapisanie maxDif-------');
            console.log(attr1, attr2);
            console.log('leftList', leftList);
            console.log('rightList', rightList);
            maxDif = currentDif;
            attribute1 = attr1;
            attribute2 = attr2;
            match = leftList;
            notMatch = rightList;
            L_weight = weight;
            console.log('-----------------------------');
          }
        }
      }
    }
  }

  console.log('MaxDifference:', maxDif);
  // LEAF
  if (!maxDif) {
    console.log('Liść bo maxDif:', maxDif);
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    for (let element of trainingSet) {
      if (element[categoryAttr] == _category) _positiveCounter++;
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
    console.log('Liść bo Lewa/Prawa wynosi 0');
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    for (let element of trainingSet) {
      if (element[categoryAttr] == _category) _positiveCounter++;
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
  var matchSubTree = buildDecisionTreeTSPW(builder);

  builder.trainingSet = notMatch;
  var notMatchSubTree = buildDecisionTreeTSPW(builder);
  console.log('TUTAJ WAGA');
  return {
    attr2: attribute2,
    pivot: attribute1,
    predicateName: directrion,
    match: matchSubTree,
    notMatch: notMatchSubTree, //{category: ...}
    matchedCount: match.length,
    notMatchedCount: notMatch.length,
    nodeSet: match.concat(notMatch),
    weight: L_weight,
  };
  //console.log(attributes);
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

/** @type {Worker} */
// @ts-ignore
const context = self; //eslint-disable-line
context.onmessage = function (event) {
  console.log('received message', event);
  const {
    data: { _builder, isChanged = false, changedAttribute1 = null, changedAttribute2 = null, weight = 1 },
  } = event;
  const result = buildDecisionTreeTSPW(_builder, isChanged, changedAttribute1, changedAttribute2, weight);
  context.postMessage(result);
};
