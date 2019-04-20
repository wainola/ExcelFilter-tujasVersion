const Reader = require('./reader');

class DataHandler {
  static async processData(reportsPath) {
    const resultsOfReading = await Reader(`${reportsPath}`);
    return resultsOfReading;
  }

  static async submitData(request, response) {
    console.log('POSTDATA', request.file);
    const { filename, path } = request.file;
    try {
      const filePath = `${process.cwd()}/reports/${filename}`;
      const dataRead = await DataHandler.processData(filePath);

      return response.status(200).send({ filename, path, meta: dataRead });
    } catch (err) {
      return response.status(500).send({ error: true, meta: err });
    }
  }
}

module.exports = DataHandler;
