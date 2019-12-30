const readTextFile = require('./modules/read-text-file');
const writeTextFile = require('./modules/write-text-file');
const hashIterator = require('./problem-1/hash-iterator');

async function createHash() {
  try {
    const fileString = await readTextFile();
    const parameters = hashIterator.preLoop(fileString);
    const outputString = hashIterator.looping(parameters);
    await writeTextFile(outputString);
  } catch (errorMessage) { console.log(errorMessage) }
}

createHash();




