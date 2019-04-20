const fs = require('fs');
const { promisify } = require('util');

const Reader = require('./reader');

const readdirr = promisify(fs.readdir);

const reportsPath = `${process.cwd()}/reports`;

class DataHandler {
  static async processData(reportsPath) {
    console.log('reportPath', reportsPath);
    const resultsOfReading = await Reader(`${reportsPath}`);
    return resultsOfReading;
  }

  static async submitData(request, response) {
    console.log('POSTDATA', request.file);
    const { filename, path } = request.file;
    try {
      const filePath = `${process.cwd()}/reports/${filename}`;
      const dataRead = await DataHandler.processData(filePath);

      return response.status(200).send({ filename, path });
    } catch (err) {
      console.log('Error', err);
    }
  }
}

module.exports = DataHandler;
