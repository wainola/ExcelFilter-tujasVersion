const fs = require('fs');
const { promisify } = require('util');

const Reader = require('./reader');

const readdirr = promisify(fs.readdir);

const reportsPath = `${process.cwd()}/reports`;

module.exports = (request, response) => {
  readdirr(reportsPath)
    .then(async r => {
      const file = r[0];
      const resultsOfReading = await Reader(`${reportsPath}/${file}`);
      return resultsOfReading;
    })
    .then(dataRead => response.send(dataRead));
};
