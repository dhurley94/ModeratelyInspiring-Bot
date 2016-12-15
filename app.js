var SlackBot = require('slackbots')
 , http = require('http')
 , req = require('request')
 , fs = require('fs')
 , request = require('request')
 , channel = '<YOUR CHANNEL>'

var bot = new SlackBot({
    token: '<YOUR API KEY HERE>',
    name: 'not_poindexter'
})

function isMsg(data) {
    if (data.type == "message") { return true } else { return false }
}

var params = { icon_emoji: ':apace:' }

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

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
        if (data.text == 'datboi') {
            bot.postMessageToChannel(channel, 'http://cdn.smosh.com/sites/default/files/2016/05/dat-boi-memes-anime-guys.jpg', params)
            console.log(data.user, 'datboi distributed at', Date())
        }
        if (data.text == 'sanic') {
            bot.postMessageToChannel(channel, 'https://media.giphy.com/media/onDu5bFg6fmRG/giphy.gif', params)
            console.log(data.user, 'sanic distributed at', Date())
        }
        if (data.text == '.sollog') {
            bot.postMessageToChannel(channel, 'http://www.sheriff.org/apps/arrest/photos/50/0000501040.jpg', params)
            console.log(data.user, 'sollog distributed at', Date())
        }
        if (data.text == '.help') {
            bot.postMessageToChannel(channel, 'sorry no help can be found.', params)
        }
        if (data.text == '.rquote') {
            require('http').get('http://inspirobot.me/api?generate=true', (res) => {
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    bot.postMessageToChannel(channel, body, params)
                    console.log('Inspiration deployed at', Date())
					download(body, 'img/' + body.split("http://generated.inspirobot.me/")[1].split("/")[1], function(){
						console.log("File written to", 'img/' + body.split("http://generated.inspirobot.me/")[1].split("/")[1])
					});
                });
            });
        }
    }
})
