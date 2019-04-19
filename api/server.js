const express = require('express');
const bodyParser = require('body-parser');
const DataHanlder = require('./DataHandler');

const app = express();
const port = 3000;

app.get('/process-data', DataHanlder);

app.listen(port, err => {
  if (err) {
    console.error('Server terminated');
    process.exit(1);
  }

  console.log('Server running at port', port);
});
