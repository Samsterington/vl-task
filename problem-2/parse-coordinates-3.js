"use strict";
function passCoordinates(data) {
    let coordinates = [];
    const dataArray = data.split(',');
    for (let i = 0; i < dataArray.length; i++) {
        if (correctCharactersIn(dataArray[i])) {
            const indexes = getXandYIndex(dataArray[i]);
            const { xPosition, yPosition } = getXandYpositions(dataArray[i], indexes);
            coordinates.push(new Coordinate(xPosition, yPosition));
        }
    }
    return coordinates;
}
function correctCharactersIn(dataPoint) {
    const pattern = /^\n*x\d+y\d+$/g;
    return pattern.test(dataPoint);
}
function getXandYIndex(dataPoint) {
    const xIndex = dataPoint.indexOf('x');
    const yIndex = dataPoint.indexOf('y');
    return { xIndex, yIndex };
}
function getXandYpositions(dataPoint, indexes) {
    const { xIndex, yIndex } = indexes;
    const xPosition = parseInt(dataPoint.substring(xIndex + 1, yIndex));
    const yPosition = parseInt(dataPoint.substring(yIndex + 1, dataPoint.length));
    return { xPosition, yPosition };
}
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
module.exports = passCoordinates;
