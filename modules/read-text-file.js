const fs = require('fs');

function readTextFile() {
  const filePath = retrieveTextFilePath();
  return readText(filePath);
}

function retrieveTextFilePath() {
  if (process.argv.length === 3) return process.argv[2];
}

function readText(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, fileString) => {
      if (error) reject(`Error with reading from text file: ${error.message}`);
      resolve(fileString);
    });
  })
}

module.exports = readTextFile;