var SlackBot = require('slackbots')
var fs = require('fs')
var alex = require('alex')

var channel = 'admins';

var bot = new SlackBot({
    token: 'xoxp-6043592625-80785343623-117647259191-70ec1923c29dd4796a7dbbd5d105aaac',
    name: 'not_poindexter'
})

function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}

var params = { icon_emoji: ':apace:' }

bot.on('start', function(err, data) {
    if (!err) {
        if (bot.getChannel(channel)) {
            bot.postMessageToChannel(channel, 'Initializing NODEJS bot. ', params)
        }
    } else {
        console.log('Failed to connect to Slack server.')
    }
})

bot.on('message', function(data, input) {
    if (isMsg(data)) {
        if (data.text.toLowerCase() == '.datboi') {
            bot.postMessageToChannel(channel, 'http://cdn.smosh.com/sites/default/files/2016/05/dat-boi-memes-anime-guys.jpg', params)
            console.log('datboi distributed at', Date())
        }
        if (data.text.toLowerCase() == '.sanic') {
            bot.postMessageToChannel(channel, 'https://media.giphy.com/media/onDu5bFg6fmRG/giphy.gif', params)
            console.log('sanic distributed at', Date())
        }
        if (data.text.toLowerCase() == '.sollog') {
            bot.postMessageToChannel(channel, 'http://www.sheriff.org/apps/arrest/photos/50/0000501040.jpg', params)
            console.log('sollog distributed at', Date())
        }
        if (data.text.toLowerCase() == '.help') {
            bot.postMessageToChannel(channel, 'ur fucked', params)
        }
    }
})
