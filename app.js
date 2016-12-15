var SlackBot = require('slackbots')
var http = require('http')
var req = require('request')
var channel = '<YOUR CHANNEL>'

var bot = new SlackBot({
    token: '<YOUR API KEY HERE>',
    name: 'not_poindexter'
})

function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}

var params = { icon_emoji: ':cat:' }

bot.on('start', function(err, data) {
    if (err) {
        console.log('Failed to connect to Slack server.')
    } else {
        if (bot.getChannel(channel)) {
            bot.postMessageToChannel(channel, 'Initializing node.js bot.', params)
        }
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
