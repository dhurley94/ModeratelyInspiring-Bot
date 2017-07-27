var SlackBot = require('slackbots')
 , http = require('http')
 , req = require('request')
 , channel = '<YOUR CHANNEL>'
 , request = require('request')
 , alex = require('alex')

var bot = new SlackBot({
    token: '<YOUR API TOKEN>',
    name: 'InspiroBoterino'
})

function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}

var params = { icon_emoji: ':apace:' }

bot.on('start', function(err, data) {
    if (err) {
        console.log('Failed to connect to Slack server.')
    } else {
        if (bot.getChannel(channel)) {
            bot.postMessageToChannel(channel, '', params)
        }
    }
})

bot.on('message', function(data, input) {
        if (data.text == '.rquote' || data.text == '.inspire') {
            require('http').get('http://inspirobot.me/api?generate=true', (res) => {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    bot.postMessageToChannel(channel, body, params)
                    console.log("Inspiration deployed to", data.user, "at", Date(), "image", body)
                });
            });
        }
    })

bot.on('close', function(err, data) {
    console.log('Bot is dying.')
})
