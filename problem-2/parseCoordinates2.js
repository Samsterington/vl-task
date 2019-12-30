// This currently does not work
// Issue returning array of coordinates


let runsThrough = 0;
let exitMessage = '';

function parseCoordinates(data, coordinates = []) {
  runsThrough++;
  console.log('coordinates at start ', coordinates)
  if (data.length === 0) {
    exitMessage = 'Were done';
    console.log('Just before sending back', coordinates);
    return coordinates;
  }
  const { coordinate, index } = collectNextCoordinate(data);
  const alteredData = removeCoordinate(data, index);
  const coordinateNoX = isAnX(coordinate);
  if (coordinateNoX === 'No x') {
    parseCoordinates(alteredData, coordinates);
    exitMessage += '.1. run through: ' + runsThrough;
    return;
  }
  const result1 = paresMagnitude(coordinateNoX);
  if (result1 === 'No magnitude') {
    parseCoordinates(alteredData, coordinates);
    exitMessage += '.2. run through: ' + runsThrough;
    return;
  }
  const magnitudeX = result1.magnitude;
  const result2 = correctSuccessorFor('x', result1.leftoverString)
  if (result2 === 'Incorrect successor') {
    parseCoordinates(alteredData, coordinates);
    exitMessage += '.3. run through: ' + runsThrough;
    return;
  }
  const coordinateNoXorY = result2;
  const result3 = paresMagnitude(coordinateNoXorY);
  if (result3 === 'No magnitude') {
    parseCoordinates(alteredData, coordinates);
    exitMessage += '.4. run through: ' + runsThrough;
    return;
  }
  const magnitudeY = result3.magnitude;
  const result4 = correctSuccessorFor('y', result3.leftoverString);
  if (result4 === 'Incorrect successor') {
    parseCoordinates(alteredData, coordinates);
    exitMessage += '.5. run through: ' + runsThrough;
    return;
  }
  coordinates.push(new Coordinate(magnitudeX, magnitudeY));
  console.log('array after adding: ', coordinates);
  parseCoordinates(alteredData, coordinates);
}

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function correctSuccessorFor(type, data) {
  if (type === 'x') {
    if (data[0] === 'y') return data.slice(1, data.end);
  }
  else if (type === 'y') {
    if (data.length === 0) return;
  }
  return 'Incorrect successor';
}

function paresMagnitude(data) {
  let magnitudeArray = [];
  let i = 0;
  while (isInteger(data[i])) {
    magnitudeArray.push(data[i]);
    i++;
  }
  if (magnitudeArray.length === 0) return 'No magnitude';
  const magnitude = parseInt(magnitudeArray.join(''))
  const leftoverString = data.slice(i, coordinate.length);
  return { magnitude, leftoverString };
}

function isInteger(value) {
  if (parseInt(value) || value === '0') return true;
  return false;
}

function isAnX(coordinate) {
  let result;
  for (let i = 0; i < coordinate.length; i++) {
    if (coordinate[i] === `\n`) continue;
    if (coordinate[i] === `x`) {
      const removedX = coordinate.slice(i + 1, coordinate.length);
      return removedX;
    } else {
      return 'No x';
    }
    break;
  }
}

function collectNextCoordinate(data) {
  const index = data.indexOf(',')
  coordinate = data.substring(0, index);
  return { coordinate, index };
}

function removeCoordinate(data, index) {
  return data.slice(index + 1, data.length);
}

const coordinatesArray = parseCoordinates('x6y7,x7y8,x9y6,');
console.log('Got back from function', coordinatesArray);
console.log('number of runs through ', runsThrough);
console.log('Exit gate:', exitMessage);