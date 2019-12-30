const readTextFile = require('./modules/read-text-file');
const writeTextFile = require('./modules/write-text-file');
const parseCoordinates = require('./problem-2/parse-coordinates-3');
const createMap = require('./problem-2/create-map');
const createDisplay = require('./problem-2/create-display');
const findPath = require('./problem-2/find-path');


async function findYeTreasure() {
  try {
    const fileString = await readTextFile();
    const coordinates = parseCoordinates(fileString);
    if (coordinates === 'error') return writeTextFile('Data file empty');
    if (coordinates.length === 0) return writeTextFile('Data format is wrong');
    const result = createMap(coordinates);
    if (result === 'error') return writeTextFile('error');
    const { map, nonSeaCoordinates, mapSize, extents } = result;
    const path = findPath(nonSeaCoordinates, map, extents);
    if (path.length === 0) return writeTextFile('error')
    const string = createDisplay(mapSize, nonSeaCoordinates, path, extents);
    writeTextFile(string);
  } catch (errorMessage) { console.log(errorMessage) }
}

findYeTreasure();




