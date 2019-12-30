function parseCoordinates(data) {
  if (!thereIsData(data)) return 'error';

  // Stages for parsing:
  // Stage 1: x, Stage 2: x magnitude and y, Stage 3: y magnitude.
  let stage = 1;
  let coordinates = [];

  for (let i = 0; i < data.length; i++) {

    if (stage === 1) {

      if (isX(data[i])) stage++;
      else i = nextCoordinateIndex(data, i);

    } else if (stage === 2) {

      const { magnitude, iTemp } = paresMagnitude(data, i);
      i = iTemp;
      if (!magnitude) {
        i = nextCoordinateIndex(data, i);
        stage = 1;
      } else if (correctSuccessorFor('x', data[i])) {
        coordinates.push(new Coordinate(parseInt(magnitude)));
        stage++;
      } else {
        stage = 1;
        i = nextCoordinateIndex(data, i);
      }

    } else if (stage === 3) {

      const { magnitude, iTemp } = paresMagnitude(data, i);
      i = iTemp;
      if (!magnitude) {
        i = deleteCoordinate(data, i, coordinates);
        stage = 1;
      } else if (correctSuccessorFor('y', data[i]) || endOfData(i, data.length)) {
        coordinates[coordinates.length - 1].y = parseInt(magnitude);
        stage = 1;
      } else {
        i = deleteCoordinate(data, i, coordinates);
        stage = 1;
      }

    }
  }
  return coordinates;
}

function thereIsData(data) {
  return data.length > 0;
}



function isX(value) { return value === 'x' };

function isInteger(value) {
  if (parseInt(value) || value === '0') return true;
  return false;
}

function ifXIncreaseStage(dataI, stage) {
  if (isX(dataI)) return stage++;
}

function paresMagnitude(data, iTemp) {
  let magnitude = [];
  while (isInteger(data[iTemp])) {
    magnitude.push(data[iTemp]);
    iTemp++;
  }
  return { magnitude: magnitude.join(''), iTemp: iTemp };
}

function correctSuccessorFor(type, dataI) {
  if (type === 'x') {
    if (dataI === 'y') return true;
  }
  else if (type === 'y') {
    if (dataI === ',' || dataI === '\n') return true;
  }
  return false;
}

function endOfData(iTemp, length) {
  return length === iTemp;
}

function nextCoordinateIndex(data, iTemp) {
  for (iTemp; iTemp < data.length; iTemp++) {
    if (data[iTemp] === ',') break;
    if (data[iTemp] === '\n') break;

  }
  return iTemp++;
}

function deleteCoordinate(data, iTemp, coordinates) {
  coordinates.splice(coordinates.length - 1, 1);
  return nextCoordinateIndex(data, iTemp);
}

class Coordinate {
  constructor(x) {
    this.x = x;
    this.y = undefined;
  }
}

module.exports = parseCoordinates;