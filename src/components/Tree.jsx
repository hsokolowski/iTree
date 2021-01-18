import React, {useMemo, useState }from "react";
import { start } from "../services/Playground";
import { dt } from "../services/TSP";
//import Node from "./Node";

const Tree = ({options}) => {
  // const tree = useMemo(()=>{
  //   //return dt.TSPDecisionTree(options)
  //   var abc = start(options)
    
  //   console.log(abc);
  //   return abc
  // },[options])
  const [aaaaaa,setTree] = useState(buildDecisionTree(options))
  
  const logTree = () => console.log(aaaaaa);
  
  console.log(aaaaaa)

  function buildDecisionTree(builder, isChanged = false) {
    //debugger;
    var trainingSet = builder.trainingSet;
    var minItemsCount = builder.minItemsCount;
    var categoryAttr = builder.categoryAttr;
    var entropyThrehold = builder.entropyThrehold;
    var maxTreeDepth = builder.maxTreeDepth;
    var ignoredAttributes = builder.ignoredAttributes;
    //console.log("########## NOWY WEZEL ########", trainingSet.length);
    var _quality = 0;
    if (maxTreeDepth === 0 || trainingSet.length <= minItemsCount) {
      //console.log(
      //  "LISC BO MAX TREE DEPTH",
      //  maxTreeDepth,
      //  "LISC ILOSC",
      //  trainingSet.length
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
      //console.log("LISC BO MAX DIF ZERO", trainingSet.length);
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
      //console.log("LISC BO JEDNA ZE STRON MA 0");
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
    //builder.trainingSet = match;
    //var matchSubTree = buildDecisionTree(builder);
  
    //builder.trainingSet = notMatch;
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
    
  return (
    <div id='tree'>
      <h1>Tree</h1>
      <p>
        <button onClick={logTree}>Log tree</button>
      </p>
      <h2>Nodes:</h2>
      {/* <Node node={tree}  onChange={() => {}} /> */}
    
    </div>
  );
};
        //{/*  */}

export default Tree;
