const PF = require('pathfinding');

function createMap(coordinates) {
  const start = coordinates[0];
  const treasure = coordinates[coordinates.length - 1];
  const reefs = getReefs(coordinates);
  const extents = findMapExtents(reefs);
  if (mapDoesNotContain(start, extents)) return 'error';
  if (mapDoesNotContain(treasure, extents)) return 'error';
  let map = setMap(extents);
  setReefs(map, reefs, extents);
  const nonSeaCoordinates = { reefs, start, treasure };
  const mapSize = [map.nodes[0].length, map.nodes.length]
  return { map, nonSeaCoordinates, mapSize, extents }
}

function setMap(extents) {
  const { min, max } = extents;
  const columns = 1 + (max[0] - min[0]);
  const rows = 1 + (max[1] - min[1]);
  return new PF.Grid(columns, rows);
}

function findMapExtents(reefs) {
  let min = [reefs[0].x, reefs[0].y];
  let max = [reefs[0].x, reefs[0].y];
  for (let i = 1; i < reefs.length; i++) {
    if (reefs[i].x < min[0]) min[0] = reefs[i].x;
    if (reefs[i].y < min[1]) min[1] = reefs[i].y;
    if (reefs[i].x > max[0]) max[0] = reefs[i].x;
    if (reefs[i].x > max[1]) max[1] = reefs[i].y;
  }
  return { min, max };
}

function getReefs(coordinates) {
  coordinates.pop();
  coordinates.shift();
  return coordinates;
}

function setReefs(map, reefs, extents) {
  const shiftColumns = parseInt(extents.min[0]);
  const shiftRows = parseInt(extents.min[1]);
  for (let i = 0; i < reefs.length; i++) {
    map.setWalkableAt(reefs[i].x - shiftColumns, reefs[i].y - shiftRows, false);
  }
}

function mapDoesNotContain(point, extents) {
  const { min, max } = extents;
  if (point.x < min[0]) return true;
  if (point.y < min[0]) return true;
  if (point.x > max[0]) return true;
  if (point.y > max[0]) return true;
  return false;
}

module.exports = createMap;