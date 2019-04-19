const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

async function Reader(filePath){
    let fileContents;
    try {
        fileContents = await readFile(filePath, 'utf-8')
    } catch (err){
        console.log('Error', err)
    }

    console.log(fileContents)
}

module.exports = Reader