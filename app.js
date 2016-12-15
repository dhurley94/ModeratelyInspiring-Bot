var SlackBot = require('slackbots')
 , http = require('http')
 , req = require('request')
 , fs = require('fs')
 , channel = '<YOUR SLACK CHANNEL>'
 , request = require('request')

var bot = new SlackBot({
    token: '<YOUR SLACK API KEY>',
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
    if (isMsg(data)) {
        if (data.text == '.rquote') {
            require('http').get('http://inspirobot.me/api?generate=true', (res) => {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    bot.postMessageToChannel(channel, body, params)
					download(body, 'img/' + body.split("http://generated.inspirobot.me/")[1].split("/")[1], function(){
						console.log("File written to", 'img/' + body.split("http://generated.inspirobot.me/")[1].split("/")[1], "requested by User", data.user, "at", Date())
					});
                });
            });
        }
    }
})
