export function shuffleAndChunkArray(data, fold = 10) {
  console.log(data);
  let shuffledData = [...data];
  var chunks = splitToChunks(shuffledData, fold);

  return chunks;
}

export function mergeChunksWithoutChosen(chunks, chosenIndex) {
  return [].concat.apply([], arrayWithoutElementAtIndex(chunks, chosenIndex));
}

const arrayWithoutElementAtIndex = function (arr, index) {
  return arr.filter(function (value, arrIndex) {
    return index !== arrIndex;
  });
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function splitToChunks(array, parts) {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

function abc(shuffledData, fold) {
  let arrayLength = shuffledData.length;
  let sizeOfTestGroup = Math.floor(arrayLength / fold);

  let startPosition = 0;
  let array = Array.from(Array(fold), () => new Array(2));
  for (let i = 0; i < fold; i++) {
    let tmpArray = [...shuffledData];

    if (i === fold - 1) {
      array[i][1] = tmpArray.splice(startPosition);
      array[i][0] = tmpArray;
      break;
    }
    array[i][1] = tmpArray.splice(startPosition, sizeOfTestGroup);
    array[i][0] = tmpArray;
    startPosition += sizeOfTestGroup;
    //console.log(shuffledData);
  }

  console.log(array);
}
