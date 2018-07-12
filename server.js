'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'zaKwcTFahinrF8TlU7lu0/wUaNiFwFq32yKM/Wllt4gczGLU/5qLWF5CJLSfbadDFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECm/ggXZi1Btrk2lOwxHxWoXlHBuAfR49ofREcAiQIBheAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'aa4e48ba5b1b8eb471d0d9ebca1b46a2'
};


const app = express()
const port = process.env.PORT || 4000
app.post('/webhook', (req, res) => res.sendStatus(200))
app.listen(port)