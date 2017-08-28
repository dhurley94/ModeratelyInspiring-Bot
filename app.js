var SlackBot = require('slackbots');
var http = require('http');
var req = require('request');
var channel = ('');
var request = require('request');
var alex = require('alex');

var bot = new SlackBot({
   token: '',
   name: 'InspiroBoterino'
});

var botParams = {
  icon_emoji: ':fidget_spinner:'
}

function isMsg(data) {
   if (data.type == "message") { return true } else { return false }
}

bot.on('start', function(err, data) {
   if (err) {
       console.log('Failed to connect to Slack server.')
   } else {
       if (bot.getChannel(channel)) {
           bot.postMessageToChannel(channel, '', botParams)
       }
   }
});

bot.on('message', function(data, input) {
    if (data.text == '.inspire') {
        require('http').get('http://inspirobot.me/api?generate=true', (res) => {
            res.setEncoding('utf8');
            res.on('data', function (body) {
                bot.postMessageToChannel(channel, body, botParams)
                console.log("Inspiration deployed to", data.user, "at", Date(), "image", body)
               });
           });
       }
       if (data.text == '.rquote') {
         request.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', function(error, response, body) {
           if (error) { throw error }
           var quote = JSON.parse(body)
           quote = "> " + quote.quoteText + "\n - " + quote.quoteAuthor;
           console.log(quote)
           bot.postMessageToChannel(channel, quote, botParams)
         });
       }
       if (data.text == '.help') {
         bot.postMessageToChannel(channel, "No.", botParams)
       }
       if (data.text == '.src') {
         bot.postMessageToChannel(channel, "https://raw.githubusercontent.com/dhurley94/not_poindexter/master/app.js", botParams)
       }
});

bot.on('close', function(err, data) {
   console.log('Bot is dying.')
});
