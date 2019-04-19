const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const { promisify } = require('util')
const Reader = require('./reader')

const readdirr = promisify(fs.readdir)

const reportsPath = `${process.cwd()}/reports`

readdirr(reportsPath).then(response => {
    if(!!response.length){
        response.forEach(item => {
            Reader(`${reportsPath}/${item}`)
        })
    }
})

console.log(process.cwd())


const app = express();
const port = 3000;



app.listen(port, err => {
    if(err) {
        console.error('Server terminated')
        process.exit(1)
    }

    console.log('Server running at port', port)
})