'use strict'

const line = require('@line/bot-sdk')
const express = require('express')
//const bodyParser = require('body-parser')
const fs = require('fs')
const file = './message.json'

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
}

// create LINE SDK client
const client = new line.Client(config)

// create Express app
// about Express itself: https://expressjs.com/
const app = express()

let jsonData = []
fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        return console.log(err)
    }
    jsonData = JSON.parse(data)
})

//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err)
            res.status(500).end()
        })
})

// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null)
    }
    let msg = event.message.text
    for (let item of jsonData) {
        if (msg.includes(item.keyword)) {
            let selectAnswer = Math.floor(Math.random() * item.answer.length)
            let replyAnswer = item.answer[selectAnswer]

            console.log('humen-- ' + msg + ' | ' + 'bot-- ' + replyAnswer)

            // create a echoing text message
            let echo = { type: 'text', text: replyAnswer }

            // use reply API
            return client.replyMessage(event.replyToken, echo)
        }
    }
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
