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

app.use(bodyParser.urlencoded({ extended: true }))

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
    let msg = event.message.text;
    console.log('msg--' + msg );

    let answer = ['สวัสดี', 'หวัดดี', 'ว่าไงจ๊ะ', 'ดีจ้า'];
    if (msg.includes('ดีจ้า') || msg.includes('หวัดดี')) {

        let selectAnswer = Math.floor(Math.random() * answer.length);
        let replyAnswer = answer[selectAnswer];
        // create a echoing text message
        let echo = { type: 'text', text: replyAnswer };

        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }

    let answer = ['นอนสิ รอไร', 'นอนได้ไง งานยังไม่เสร็จ', 'นอนเถอะ', 'ห้ามนอน'];
    if (msg.includes('ง่วง')) {

        let selectAnswer = Math.floor(Math.random() * answer.length);
        let replyAnswer = answer[selectAnswer];
        // create a echoing text message
        let echo = { type: 'text', text: replyAnswer };

        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }

    let answer = ['ไปหาไรกินกัน', 'กินไรดี', 'กินให้มันน้อย ๆ หน่อย', 'อ้วนแล้วนะ จะกินไรเยอะแยะ', 'ก็กินสิ'];
    if (msg.includes('หิว')) {

        let selectAnswer = Math.floor(Math.random() * answer.length);
        let replyAnswer = answer[selectAnswer];
        // create a echoing text message
        let echo = { type: 'text', text: replyAnswer };

        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }

    let answer = ['ว่ามาสิ', 'จะถามไรนักหนา', 'ตอบได้ก็จะตอบ', 'ไม่ให้ถาม', 'ไม่ให้ถาม'];
    if (msg.includes('ถาม')) {

        let selectAnswer = Math.floor(Math.random() * answer.length);
        let replyAnswer = answer[selectAnswer];
        // create a echoing text message
        let echo = { type: 'text', text: replyAnswer };

        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }

    let answer = ['เหยิงพ่องเมิงสิ', 'เหยิงแม่เมิงสิ', 'ห่าน', 'เหยิงไรสวยขนาดนี้'];
    if (msg.includes('เหยิง')) {

        let selectAnswer = Math.floor(Math.random() * answer.length);
        let replyAnswer = answer[selectAnswer];
        // create a echoing text message
        let echo = { type: 'text', text: replyAnswer };

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
