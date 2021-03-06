const Reader = require('./reader');

class DataHandler {
  static async processData(reportsPath) {
    const resultsOfReading = await Reader(`${reportsPath}`);
    return resultsOfReading;
  }

  static async submitData(request, response) {
    const { filename, path } = request.file;
    try {
      const filePath = `${process.cwd()}/reports/${filename}`;
      const dataRead = await DataHandler.processData(filePath);

      return response.status(200).send({ filename, path, meta: dataRead });
    } catch (err) {
      return response.status(500).send({ error: true, meta: err });
    }
  }

  static async downloadFile(request, response) {
    const { body } = request;

    const { path } = body;

    return response.download(path);
  }
}

module.exports = DataHandler;
