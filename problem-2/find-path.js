const PF = require('pathfinding');

function findPath(nonSeaCoordinates, map, extents) {
  const { start, treasure } = nonSeaCoordinates;
  const shiftColumns = parseInt(extents.min[0]);
  const shiftRows = parseInt(extents.min[1]);
  let finder = new PF.AStarFinder();
  const shiftedPath = finder.findPath(start.x - shiftColumns, start.y - shiftRows, treasure.x - shiftColumns, treasure.y - shiftRows, map);
  let path = realignPath(shiftedPath, shiftColumns, shiftRows)
  path.pop();
  path.shift();
  return path;
}

function realignPath(path, shiftColumns, shiftRows) {
  path.forEach((coordinate) => {
    coordinate[0] += shiftColumns;
    coordinate[1] += shiftRows;
  });
  return path;
}

module.exports = findPath;
