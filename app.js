'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser')
const utf8 = require('utf8');
//const AIMLParser = require('aimlparser')
//const AIMLInterpreter = require('aimlinterpreter');
//const aimlInterpreter = new AIMLInterpreter({ name: 'WireInterpreter', age: '42' });

//const aimlHigh = require('aiml-high');
//const interpreter = new aimlHigh({ name: 'Bot', age: '42' }, 'Goodbye');
//interpreter.loadFiles(['./message.xml']);

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

//const aimlParser = new AIMLParser({ name: 'HelloBot' })
//aimlParser.load(['./message.xml'])

//aimlInterpreter.loadAIMLFilesIntoArray(['./message.xml']);

app.use(bodyParser.urlencoded({ extended: false }))

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
    const msg = utf8.encode(event.message.text);
    const match = msg.indexOf(utf8.encode('?????'));
    console.log('msg--' + msg + match);

    if (match) {

        console.log('status--match')

        // create a echoing text message
        const echo = { type: 'text', text: utf8.encode('????') };

        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }

    //aimlParser.getResult(event.message.text, (answer, wildCardArray, input) => {

    //    console.log(answer + ' | ' + wildCardArray + ' | ' + input);

    //    // create a echoing text message
    //    const echo = { type: 'text', text: answer };

    //    // use reply API
    //    return client.replyMessage(event.replyToken, echo);
    //})

    //const callback = function (answer, wildCardArray, input) {
    //    console.log(answer + ' | ' + wildCardArray + ' | ' + input);

    //    // create a echoing text message
    //    const echo = { type: 'text', text: answer };

    //    // use reply API
    //    return client.replyMessage(event.replyToken, echo);
    //};
    //aimlInterpreter.findAnswerInLoadedAIMLFiles(event.message.text, callback);

    //const callback = function (answer, wildCardArray, input) {
    //    console.log(answer + ' | ' + wildCardArray + ' | ' + input);

    //    // create a echoing text message
    //    const echo = { type: 'text', text: answer };

    //    // use reply API
    //    return client.replyMessage(event.replyToken, echo);
    //};

    //interpreter.findAnswer(event.message.text, callback);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
