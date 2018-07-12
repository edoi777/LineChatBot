'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: '94RSe503vUxRDUgFDsTiS8VhWLAw0VhItUPhNu0howCKhOLMTdj2KzM+cMPZzIoyFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECn/EymB4YyS7tD5r7YCMMKz2kDAXIezA0p/vMIw+jhn4QdB04t89/1O/w1cDnyilFU=',
    channelSecret: '985467c5007c52ffc04b485e6bccb3cb'
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