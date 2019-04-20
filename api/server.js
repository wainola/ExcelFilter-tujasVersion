require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const moment = require('moment');
const DataHanlder = require('./DataHandler');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: `${process.cwd()}/reports`,
  filename(req, file, cb) {
    cb(null, `${moment().format()}.xlsx`);
  }
});

const upload = multer({ storage });

// app.get('/process-data', DataHanlder.processData);
app.post('/file', upload.single('file'), DataHanlder.submitData);

app.post('/get-report', DataHanlder.downloadFile);

app.get('/test', (request, response) => response.status(200).send('Im alive!'));

app.listen(port, err => {
  if (err) {
    console.error('Server terminated');
    process.exit(1);
  }

  console.log('Server running at port', port);
});
