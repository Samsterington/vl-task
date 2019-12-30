function configurations() {
  return {
    character: '0',
    hashFunctionName: 'MD5'
  }
}

function preLoop(string) {
  const { salt, integer } = splitSaltAndInteger(string);
  if (!saltIsASCII(salt)) return new Error('Salt contains characters that are not ASCII');
  if (!integerIsInteger(integer)) return new Error('Format of data string is incorrect: Integer missing');
  const output = new Array(10).fill(undefined);
  const hashFunction = getHashFunction();
  const hashLength = hashFunction('').length;
  const bufferString = createBufferString(integer);
  return { salt, output, hashFunction, hashLength, bufferString };
}

function splitSaltAndInteger(string) {
  const dividePoint = string.lastIndexOf(',');
  return {
    salt: string.substring(0, dividePoint),
    integer: parseInt(string.substring(dividePoint + 1, string.length))
  }
}

function saltIsASCII(salt) {
  return /^[\x00-\x7F]*$/.test(salt);
}

function integerIsInteger(integer) {
  return integer != NaN;
}

function createBufferString(integer) {
  const { character } = configurations();
  let bufferString = '';
  for (let i = 0; i < integer; i++) {
    bufferString += character;
  }
  return bufferString;
}

function getHashFunction() {
  const { hashFunctionName } = configurations();
  const filePath = `../problem-1/hash-functions/${hashFunctionName}.js`;
  return require(filePath);
}


function looping({ salt, output, hashFunction, hashLength, bufferString }) {
  let i = 0;
  while (!outputFull(output)) {
    i++;
    const string = appendIteration(salt, i);
    const hash = hashFunction(string);
    const outputIndex = parseInt(hash[bufferString.length]);
    if (!hashMatches(hash, bufferString, output, outputIndex)) continue;
    const hashIndex = calculateHashIndex(hashLength, i);
    const character = getCharacter(hash, hashIndex);
    placeInOutput(character, output, outputIndex);
  }
  return output.join('');
}

function appendIteration(salt, i) {
  return salt.concat(i.toString());
}

function hashMatches(hash, bufferString, output, outputIndex) {
  const hashBuffer = hash.substring(0, bufferString.length);
  if (hashBuffer != bufferString) return false;
  if (!outputIndex && outputIndex != 0) return false;
  if (output[outputIndex] != undefined) return false;
  return true;
}

function calculateHashIndex(hashLength, i) {
  return i % hashLength;
}

function getCharacter(hash, hashIndex) {
  return hash[hashIndex];
}

function placeInOutput(character, output, outputIndex) {
  output[outputIndex] = character;
}

function outputFull(output) {
  const result = output.filter(v => v === undefined);
  if (result.length > 0) return false;
  return true;
}

module.exports = { preLoop, looping };

