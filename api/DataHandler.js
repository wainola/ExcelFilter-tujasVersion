const fs = require('fs');
const { promisify } = require('util');

const Reader = require('./reader');

const readdirr = promisify(fs.readdir);

const reportsPath = `${process.cwd()}/reports`;

class DataHandler {
  static async processData(request, response) {
    return readdirr(reportsPath)
      .then(async r => {
        const file = r[0];
        const resultsOfReading = await Reader(`${reportsPath}/${file}`);
        return resultsOfReading;
      })
      .then(dataRead => response.send(dataRead));
  }

  static async submitData(request, response) {
    console.log('POSTDATA', request.file);
    const { filename, path } = request.file;
    return response.status(200).send({ filename, path });
  }
}

module.exports = DataHandler;
