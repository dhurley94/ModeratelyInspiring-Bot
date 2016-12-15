var SlackBot = require('slackbots')
 , http = require('http')
 , req = require('request')
 , fs = require('fs')
 , channel = '<YOUR CHANNEL>'
 , request = require('request')
 , alex = require('alex')
var bot = new SlackBot({
    token: '<YOUR API KEY>',
    name: 'not_poindexter'
})
function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}
var params = { icon_emoji: ':apace:' }
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
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
        if (data.text.toLowerCase() == '.rquote') {
            require('http').get('http://inspirobot.me/api?generate=true', (res) => {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    bot.postMessageToChannel(channel, body, params)
                    console.log("Inspiration deployed to", data.user, "at", Date(), "image", body)
                });
            });
        }
    }
})
bot.on('close', function(err, data) {
    console.log('Bot is dying.')
})
