'use strict'

const line = require('@line/bot-sdk')
const express = require('express')
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
    let selectAnswer = 0
    let replyAnswer = 'อย่าโกรธเราเลยนะ เรากำลังเรียนรู้ ^^'
    let echo = {}


    jsonData.forEach(function (item, index) {

        let word = item.keyword.split("_");
       
        if (word.length > 1) {
            let isMatch = new Array();
            
            word.forEach(function (value, index) {
                let w = new RegExp(value);//contain word

                if (msg.match(w)) {
                    isMatch.push(true);
                } else {
                    isMatch.push(false);
                }
            })

            console.log(isMatch)

            if (isMatch.includes(true, true)) {
                selectAnswer = Math.floor(Math.random() * item.answer.length)
                replyAnswer = item.answer[selectAnswer]

                //console.log(`humen-- ${msg} | bot-- ${replyAnswer}`)

                // create a echoing text message
                //echo = { type: 'text', text: replyAnswer }

                // use reply API
                //return client.replyMessage(event.replyToken, echo)
            }

        } else {
            if (msg.includes(item.keyword)) {
                if (!item.hasOwnProperty('refer')) {
                    selectAnswer = Math.floor(Math.random() * item.answer.length)
                    replyAnswer = item.answer[selectAnswer]

                    //console.log(`humen-- ${msg} | bot-- ${replyAnswer}`)

                    // create a echoing text message
                    //echo = { type: 'text', text: replyAnswer }

                    // use reply API
                    //return client.replyMessage(event.replyToken, echo)
                }
                else {
                    for (let subitem of jsonData) {
                        if (item.refer === subitem.keyword) {
                            selectAnswer = Math.floor(Math.random() * subitem.answer.length)
                            replyAnswer = subitem.answer[selectAnswer]

                            //console.log(`humen-- ${msg} | bot-- ${replyAnswer}`)

                            // create a echoing text message
                            //echo = { type: 'text', text: replyAnswer }

                            // use reply API
                            //return client.replyMessage(event.replyToken, echo)
                        }
                    }
                }
            }
        }

    })

    console.log(`humen-- ${msg} | bot-- ${replyAnswer}`)

    // create a echoing text message
    echo = { type: 'text', text: replyAnswer }

    // use reply API
    return client.replyMessage(event.replyToken, echo)
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
