'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'zaKwcTFahinrF8TlU7lu0/wUaNiFwFq32yKM/Wllt4gczGLU/5qLWF5CJLSfbadDFPFishj7/aIMFAges23hAsZI6YRIKEEkTKa/ztVSECm/ggXZi1Btrk2lOwxHxWoXlHBuAfR49ofREcAiQIBheAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'aa4e48ba5b1b8eb471d0d9ebca1b46a2'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});