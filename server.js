'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'zaKwcTFahinrF8TlU7lu0/wUaNiFwFq32yKM/Wllt4gczGLU/5qLWF5CJLSfbadDFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECm/ggXZi1Btrk2lOwxHxWoXlHBuAfR49ofREcAiQIBheAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'aa4e48ba5b1b8eb471d0d9ebca1b46a2'
};


const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: '??????????'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});