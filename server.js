const express = require('express');
const path = require('path');

const app = express()

let messages = []
let userName = []

app.use(express.static(path.join(__dirname, '/client')))

app.use('/', function(req, res) {
    render.res('index')
})

app.listen(8000, () => {
    console.log('server is running...')
})