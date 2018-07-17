'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const AIMLParser = require('aimlparser')

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

const aimlParser = new AIMLParser({ name: 'HelloBot' })
aimlParser.load(['./message.xml'])

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
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
    const echo = {};

    aimlParser.getResult(event.message.text, (answer, wildCardArray, input) => {
        echo = { type: 'text', text: answer };
    })

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
