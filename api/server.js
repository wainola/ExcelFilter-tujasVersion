const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DataHanlder = require('./DataHandler');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/process-data', DataHanlder.processData);
app.post('/file', DataHanlder.submitData);

app.listen(port, err => {
  if (err) {
    console.error('Server terminated');
    process.exit(1);
  }

  console.log('Server running at port', port);
});
