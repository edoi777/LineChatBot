'use strict';

const express = require('express');
//const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const config = {
    channelAccessToken: 'zaKwcTFahinrF8TlU7lu0/wUaNiFwFq32yKM/Wllt4gczGLU/5qLWF5CJLSfbadDFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECm/ggXZi1Btrk2lOwxHxWoXlHBuAfR49ofREcAiQIBheAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'aa4e48ba5b1b8eb471d0d9ebca1b46a2'
};


// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhook', middleware(config), (req, res) => {
    res.json(req.body.events) // req.body will be webhook event object
})

app.listen(8080)

