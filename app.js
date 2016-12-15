var SlackBot = require('slackbots')
var fs = require('fs')
var alex = require('alex')
var http = require('http')
var req = require('request')
var bodyParser = require('body-parser');
var channel = '2eztest'
var params = { icon_emoji: ':apace:' }

const server = http.createServer((req, res) => {
  res.end();
})

var bot = new SlackBot({
    token: '<YOUR API KEY HERE>',
    name: 'not_poindexter'
})

function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}

bot.on('start', function(err, data) {
    if (!err) {
        if (bot.getChannel(channel)) {
            bot.postMessageToChannel(channel, '', params)
        }
    } else {
        console.log('Failed to connect to Slack server.')
    }
})

bot.on('message', function(data, input) {
    if (isMsg(data)) {
        if (data.text.toLowerCase() == '.datboi') {
            bot.postMessageToChannel(channel, 'http://cdn.smosh.com/sites/default/files/2016/05/dat-boi-memes-anime-guys.jpg', params)
            console.log(data.user, 'datboi distributed at', Date())
        }
        if (data.text.toLowerCase() == '.sanic') {
            bot.postMessageToChannel(channel, 'https://media.giphy.com/media/onDu5bFg6fmRG/giphy.gif', params)
            console.log(data.user, 'sanic distributed at', Date())
        }
        if (data.text.toLowerCase() == '.sollog') {
            bot.postMessageToChannel(channel, 'http://www.sheriff.org/apps/arrest/photos/50/0000501040.jpg', params)
            console.log(data.user, 'sollog distributed at', Date())
        }
        if (data.text.toLowerCase() == '.help') {
            bot.postMessageToChannel(channel, 'ur fucked', params)
        }
        if (data.text.toLowerCase() == '.rquote') {
            require('http').get('http://inspirobot.me/api?generate=true', (res) => {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    bot.postMessageToChannel(channel, body, params)
                });
            });
        }
    }
})
