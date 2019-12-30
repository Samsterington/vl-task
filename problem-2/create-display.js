function createDisplay(mapSize, nonSeaCoordinates, path, extents) {
  let display = initializeDisplay(mapSize);
  display = inputTheValues(nonSeaCoordinates, path, display, extents);
  return stringifyDisplay(display);
}

function stringifyDisplay(display) {
  const strings = display.map((arr) => arr.join(''));
  let string = '';
  for (let i = 0; i < strings.length; i++) {
    string += strings[i];
    if (i != strings.length - 1) {
      string += `\n`;
    }
  }
  return string;
}

function initializeDisplay(mapSize) {
  // let display = new Array(mapSize[1]).fill(new Array(mapSize[0]).fill('.'));
  let display = [];
  for (let y = 0; y < mapSize[1]; y++) {
    display[y] = [];
    for (let x = 0; x < mapSize[0]; x++) {
      display[y][x] = `.`;
    }
  }
  return display;
}

function inputTheValues(nonSeaCoordinates, path, display, extents) {
  const { reefs, start, treasure } = nonSeaCoordinates;
  const shiftColumns = parseInt(extents.min[0]);
  const shiftRows = parseInt(extents.min[1]);
  display[start.y - shiftRows][start.x - shiftColumns] = `S`;
  display[treasure.y - shiftRows][treasure.x - shiftColumns] = `E`;
  reefs.forEach(reef => {
    display[reef.y - shiftRows][reef.x - shiftColumns] = `x`;
  });
  path.forEach(p => {
    display[p[1] - shiftRows][p[0] - shiftColumns] = `O`;
  });
  return display
}

module.exports = createDisplay;