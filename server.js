'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'zaKwcTFahinrF8TlU7lu0/wUaNiFwFq32yKM/Wllt4gczGLU/5qLWF5CJLSfbadDFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECm/ggXZi1Btrk2lOwxHxWoXlHBuAfR49ofREcAiQIBheAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'aa4e48ba5b1b8eb471d0d9ebca1b46a2'
};


const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.listen(3000);