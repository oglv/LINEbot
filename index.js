const express = require('express');
const line = require('@line/bot-sdk');
const { token } = require('./config.json');
const { secret } = require('./config.json');

const config = {
    channelAccessToken: token,
    channelSecret: secret,
};
const client = new line.Client(config);

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
    );
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
    }

    if (event.message.text === 'AND') {
    const message = {
        type: 'text',
        text: 'Hello',
    };
    return client.replyMessage(event.replyToken, message);
    }
}
