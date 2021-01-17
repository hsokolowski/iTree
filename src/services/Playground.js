//var json = require("../data/arrythmia.json");
var json = require("../data/ar2.json");
//var json = require("../data/iris.json");
//var json = require("../data/US_Politics_Twitter.json");
export var builder = {
  //categoryAttr: "Sex",
  //categoryAttr: "species",
  categoryAttr: "attribute279",
  //ignoredAttributes: ['Instagram_username','Birthday','816181091673448400','Account_start_time'],
  //ignoredAttributes: ["sepalWidth", "petalLength"],
  ignoredAttributes: [],
  allAttributes: [
    "attribute1",
    "attribute2",
    "attribute3",
    "attribute4",
    "attribute5",
    "attribute6",
    "attribute7",
    "attribute8",
    "attribute9",
    "attribute10",
    "attribute11",
    "attribute12",
    "attribute13",
    "attribute14",
    "attribute15",
    "attribute16",
    "attribute17",
    "attribute18",
    "attribute19",
    "attribute20",
    "attribute21",
    "attribute22",
    "attribute23",
    "attribute24",
    "attribute25",
    "attribute26",
    "attribute27",
    "attribute28",
    "attribute29",
    "attribute30",
    "attribute31",
    "attribute32",
    "attribute33",
    "attribute34",
    "attribute35",
    "attribute36",
    "attribute37",
    "attribute38",
    "attribute39",
    "attribute40",
    "attribute41",
    "attribute42",
    "attribute43",
    "attribute44",
    "attribute45",
    "attribute46",
    "attribute47",
    "attribute48",
    "attribute49",
    "attribute50",
    "attribute51",
    "attribute52",
    "attribute53",
    "attribute54",
    "attribute55",
    "attribute56",
    "attribute57",
    "attribute58",
    "attribute59",
    "attribute60",
    "attribute61",
    "attribute62",
    "attribute63",
    "attribute64",
    "attribute65",
    "attribute66",
    "attribute67",
    "attribute68",
    "attribute69",
    "attribute70",
    "attribute71",
    "attribute72",
    "attribute73",
    "attribute74",
    "attribute75",
    "attribute76",
    "attribute77",
    "attribute78",
    "attribute79",
    "attribute80",
    "attribute81",
    "attribute82",
    "attribute83",
    "attribute84",
    "attribute85",
    "attribute86",
    "attribute87",
    "attribute88",
    "attribute89",
    "attribute90",
    "attribute91",
    "attribute92",
    "attribute93",
    "attribute94",
    "attribute95",
    "attribute96",
    "attribute97",
    "attribute98",
    "attribute99",
    "attribute100",
    "attribute101",
    "attribute102",
    "attribute103",
    "attribute104",
    "attribute105",
    "attribute106",
    "attribute107",
    "attribute108",
    "attribute109",
    "attribute110",
    "attribute111",
    "attribute112",
    "attribute113",
    "attribute114",
    "attribute115",
    "attribute116",
    "attribute117",
    "attribute118",
    "attribute119",
    "attribute120",
    "attribute121",
    "attribute122",
    "attribute123",
    "attribute124",
    "attribute125",
    "attribute126",
    "attribute127",
    "attribute128",
    "attribute129",
    "attribute130",
    "attribute131",
    "attribute132",
    "attribute133",
    "attribute134",
    "attribute135",
    "attribute136",
    "attribute137",
    "attribute138",
    "attribute139",
    "attribute140",
    "attribute141",
    "attribute142",
    "attribute143",
    "attribute144",
    "attribute145",
    "attribute146",
    "attribute147",
    "attribute148",
    "attribute149",
    "attribute150",
    "attribute151",
    "attribute152",
    "attribute153",
    "attribute154",
    "attribute155",
    "attribute156",
    "attribute157",
    "attribute158",
    "attribute159",
    "attribute160",
    "attribute161",
    "attribute162",
    "attribute163",
    "attribute164",
    "attribute165",
    "attribute166",
    "attribute167",
    "attribute168",
    "attribute169",
    "attribute170",
    "attribute171",
    "attribute172",
    "attribute173",
    "attribute174",
    "attribute175",
    "attribute176",
    "attribute177",
    "attribute178",
    "attribute179",
    "attribute180",
    "attribute181",
    "attribute182",
    "attribute183",
    "attribute184",
    "attribute185",
    "attribute186",
    "attribute187",
    "attribute188",
    "attribute189",
    "attribute190",
    "attribute191",
    "attribute192",
    "attribute193",
    "attribute194",
    "attribute195",
    "attribute196",
    "attribute197",
    "attribute198",
    "attribute199",
    "attribute200",
    "attribute201",
    "attribute202",
    "attribute203",
    "attribute204",
    "attribute205",
    "attribute206",
    "attribute207",
    "attribute208",
    "attribute209",
    "attribute210",
    "attribute211",
    "attribute212",
    "attribute213",
    "attribute214",
    "attribute215",
    "attribute216",
    "attribute217",
    "attribute218",
    "attribute219",
    "attribute220",
    "attribute221",
    "attribute222",
    "attribute223",
    "attribute224",
    "attribute225",
    "attribute226",
    "attribute227",
    "attribute228",
    "attribute229",
    "attribute230",
    "attribute231",
    "attribute232",
    "attribute233",
    "attribute234",
    "attribute235",
    "attribute236",
    "attribute237",
    "attribute238",
    "attribute239",
    "attribute240",
    "attribute241",
    "attribute242",
    "attribute243",
    "attribute244",
    "attribute245",
    "attribute246",
    "attribute247",
    "attribute248",
    "attribute249",
    "attribute250",
    "attribute251",
    "attribute252",
    "attribute253",
    "attribute254",
    "attribute255",
    "attribute256",
    "attribute257",
    "attribute258",
    "attribute259",
    "attribute260",
    "attribute261",
    "attribute262",
    "attribute263",
    "attribute264",
    "attribute265",
    "attribute266",
    "attribute267",
    "attribute268",
    "attribute269",
    "attribute270",
    "attribute271",
    "attribute272",
    "attribute273",
    "attribute274",
    "attribute275",
    "attribute276",
    "attribute277",
    "attribute278",
    "attribute279",
  ],
  //allAttributes: [
  //   "sepalLength",
  //   "sepalWidth",
  //   "petalLength",
  //   "petalWidth",
  //   "species",
  // ],
  // allAttributes: [
  //   "Name","Twitter_username","Account_start_time","Account_ID","Sex","Birthplace","Birthday","Age","Instagram_username","Political_party"
  // ],
  trainingSet: json,
  maxTreeDepth: 20,
  minItemsCount: 5,
  //allClasses: getAllClasses(json,"species")
  allClasses: getAllClasses(json, "attribute279"),
};


export function start(builder) {
  //console.log(builder);
  return buildDecisionTree(builder, false);
};

function buildDecisionTree(builder, isChanged = false) {
  var trainingSet = builder.trainingSet;
  var minItemsCount = builder.minItemsCount;
  var categoryAttr = builder.categoryAttr;
  var entropyThrehold = builder.entropyThrehold;
  var maxTreeDepth = builder.maxTreeDepth;
  var ignoredAttributes = builder.ignoredAttributes;
  //console.log("########## NOWY WEZEL ########", trainingSet.length);
  var _quality = 0;
  debugger;
  if (maxTreeDepth === 0 || trainingSet.length <= minItemsCount) {
  console.log("LISC BO MAX TREE DEPTH",maxTreeDepth,"LISC ILOSC",trainingSet.length)
    //);
    //gger;
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    //console.log("KATEGORIA JAKO:", _category);
    trainingSet.forEach((element) => {
      if (element[categoryAttr] == _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    _quality = _quality * 100;
    _quality = _quality.toFixed(2);
    //ugger;
    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x=> x[categoryAttr])
    };
  }
  var attributes = builder.allAttributes.filter(function (el) {
    return ![...ignoredAttributes, categoryAttr].includes(el);
  });
  //console.log(builder.minItemsCount, builder.trainingSet.length);

  // tu juz musi byc przekazana cm wyzerowana

  var podzial = [];
  //console.log(attributes);
  var right = 0,
    left = 0;
  var maxDif = 100,
    attribute1 = -1,
    attribute2 = -1;
  var directrion = "<";
  var leftList = [],
    rightList = [],
    classMatrix = [
      new Array(builder.allClasses.length).fill(0),
      new Array(builder.allClasses.length).fill(0),
    ],
    match = [],
    notMatch = [];
  for (let i = 0; i < attributes.length; i++) {
    let attr1 = attributes[i];
    for (let j = 0; j < attributes.length; j++) {
      let attr2 = attributes[j];
      if (attr1 !== attr2) {
        right = left = 0;
        leftList = [];
        rightList = [];
        classMatrix = [
          new Array(builder.allClasses.length).fill(0),
          new Array(builder.allClasses.length).fill(0),
        ];

        for (let index = 0; index < trainingSet.length; index++) {
          const element = trainingSet[index];

          if (element[attr1] < element[attr2]) {
            left++;
            leftList.push(element);
            classMatrix[0][builder.allClasses.indexOf(element[categoryAttr])]++;
          } else {
            right++;
            rightList.push(element);
            classMatrix[1][builder.allClasses.indexOf(element[categoryAttr])]++;
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
          (right / trainingSet.length) * (1 - rankR) +
          (left / trainingSet.length) * (1 - rankL);
        if (currentDif < maxDif) {
          //console.log("------Zapisanie maxDif-------");
          //console.log(attr1,attr2);
          //console.log("R/L ", right + ":" + left);
          //console.log("cur/mD",currentDif + ":" + maxDif);
          maxDif = currentDif;
          attribute1 = attr1;
          attribute2 = attr2;
          match = leftList;
          notMatch = rightList;
          podzial = classMatrix;
          //console.log("-----------------------------");
        }
      }
    }
  }
  //console.log("PO WYLICZENIU NAJLEPSZEGO");
  //console.log(attribute1, attribute2);
  //console.log("L/R ", match.length + ":" + notMatch.length);
  //console.log(podzial);
  //console.log("MaxDifference:", maxDif);
  if (!maxDif) {
    console.log("LISC BO MAX DIF ZERO", trainingSet.length);
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    //console.log("KATEGORIA JAKO:", _category);
    trainingSet.forEach((element) => {
      if (element[categoryAttr] == _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    _quality = _quality * 100;
    _quality = _quality.toFixed(2);

    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x=> x[categoryAttr])
    };
  }
  // sprawdzic
  // wssytskies stringi do ignored
  if (match.length === 0 || notMatch.length === 0) {
    console.log("LISC BO JEDNA ZE STRON MA 0");
    let _category = mostFrequentValue(trainingSet, categoryAttr);
    let _positiveCounter = 0;
    //console.log(_category);
    trainingSet.forEach((element) => {
      if (element[categoryAttr] == _category) _positiveCounter++;
    });
    let _negativeCounter = trainingSet.length - _positiveCounter;
    _quality = _positiveCounter / trainingSet.length;
    _quality = _quality * 100;
    _quality = _quality.toFixed(2);
    // restriction by maximal depth of tree
    // or size of training set is to small
    // so we have to terminate process of building tree
  
    return {
      category: _category,
      quality: _quality,
      matchedCount: _positiveCounter,
      notMatchedCount: _negativeCounter,
      trainingSet2: trainingSet.map(x=> x[categoryAttr])
    };
  }

  builder.maxTreeDepth = maxTreeDepth - 1;
  builder.trainingSet = match;
  //var matchSubTree = buildDecisionTree(builder);

  builder.trainingSet = notMatch;
  //var notMatchSubTree = buildDecisionTree(builder);
  console.log("TUTAJ");
  return {
    attr2: attribute2,
    pivot: attribute1,
    predicateName: directrion,
    //match: matchSubTree,
    //notMatch: notMatchSubTree, //{category: ...}
    matchedCount: match.length,
    notMatchedCount: notMatch.length,
  };
  //console.log(attributes);
}
// var tree={root : buildDecisionTree(builder, true)}
// var json = JSON.stringify(tree);
// var blob = new Blob([json], {type: "application/json"});
// var url  = URL.createObjectURL(blob);


// var a = document.createElement('a');
// a.download    = "backup.json";
// a.href        = url;
// a.textContent = "Download backup.json";
// a.innerHTML="tutaj download"
// document.getElementById('main').innerHTML=a
//console.log(tree);

// function fillConfusionMatrix() {
//   let confusionMatrix = buildArray(Object.keys(classes).length);

//   set.forEach((element) => {
//     let prediction = predict(decisionTree.root, element);
//     let _class = element[window.CFG.categoryAttr];
//     if (prediction === _class) {
//       confusionMatrix[classes[_class]][classes[_class]]++;
//     } else {
//       confusionMatrix[classes[_class]][classes[prediction]]++;
//     }
//   });
//   //console.log(confusionMatrix)
//   return confusionMatrix;
// }
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
function getAllClasses(set, cattegoryAttr) {
  let array = [];
  set.forEach((element) => {
    let _class = element[cattegoryAttr];
    if (!array.includes(_class)) array.push(_class);
  });
  console.log(array);
  return array;
}


function takeAllClasses(set, cattegotyAttr) {
  let array = {};
  let counter = 0;
  //console.log(window.CFG.categoryAttr)
  set.forEach((element) => {
    let _class = element[cattegotyAttr];
    if (!array.hasOwnProperty(_class)) array[_class] = counter++;
  });

  return array;
}
function buildArrayFillZeros(lenght) {
  let arr = [];
  for (var x = 0; x < lenght; x++) {
    arr[x] = [];
    for (var y = 0; y < lenght; y++) {
      arr[x][y] = 0;
    }
  }

  return arr;
}



function recursionTreePrint(tree, str, lvl) {
  //console.log(str)
  if (tree.category) {
    let l = "   ";
    for (let i = 0; i < lvl; i++) {
      l += "      ";
    }
    return "\n" + l + tree.category;
  }
  let l = "   ";
  for (let i = 0; i < lvl; i++) {
    l += "      ";
  }
  str +=
    "\n" + l + tree.attribute + " " + tree.predicateName + " " + tree.pivot;
  //console.log(tree.match)
  lvl++;
  str += recursionTreePrint(tree.match, "", lvl);
  //console.log(tree.notMatch)
  str += recursionTreePrint(tree.notMatch, "", lvl);
  return str;
}
