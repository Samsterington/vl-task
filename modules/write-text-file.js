const fs = require('fs');
const path = require('path');

function writeTextFile(stringToWrite) {
  const filePath = `${__dirname}/../input/${fileName()}.answer`;
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, stringToWrite, (error) => {
      if (error) reject(`Could not write file: ${error}`);
      resolve('File was successfully written');
    })
  })
}

function fileName() {
  const name = process.argv[2];
  return path.basename(name);
}

module.exports = writeTextFile;

