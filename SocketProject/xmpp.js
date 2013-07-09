/**
 * Echo Bot - the XMPP Hello World
 **/
var xmpp = require('node-xmpp');
var argv = process.argv;
var getweather= require('./getweather');
var checkforweather = require('./checkforweather')


var httpmembers = {};

var sendweatherXMPP = function(stanza, info){
    stanza.getChild('body').text(info);
    console.log(temp);
    cl.send(stanza);
}

var cl = new xmpp.Client(
    {
        jid: 'chatbot@example.com/em-johnsode-l01.enernoc.local',
        password: 'test',
        host: 'localhost',
        port: '5222'
    }
);
cl.on('online',
    function() {
        cl.send(new xmpp.Element('presence', { }).
            c('show').t('chat').up().
            c('status').t('Happily echoing your <message/> stanzas')
        );

        cl.send(new xmpp.Element('message',
            {
                from: 'chatbot@example.com/em-johnsode-l01.enernoc.local',
                to: 'admin@example.com/em-johnsode-l01.enernoc.local',
                type: 'chat'
            }).c('body').t("Hi, I'm JavaScript!"));

        console.log('online');
    });
cl.on('stanza',
    function(stanza) {
        if (stanza.is('message') &&
            // Important: never reply to errors!
            stanza.attrs.type !== 'error') {

            // Swap addresses...
            stanza.attrs.to = stanza.attrs.from;
            delete stanza.attrs.from;
            // and send back.
            var incomingMessage = stanza.getChild('body').text();
            if (incomingMessage == "/join"){
                httpmembers[stanza.attrs.to] = true;
            }
            else if(incomingMessage == "/quit"){
                httpmembers[stanza.attrs.to] = false;
            }
            checkforweather.weathercheck(incomingMessage,sendweatherXMPP,stanza);
            //stanza.getChild('body').text(incomingMessage + " I modified your message");
            //cl.send(stanza);
            console.dir(stanza.getChild('body').text());
        }
    });
exports.httpsend = function(message){
      for (var key in httpmembers){
          if (httpmembers[key] == true){
              cl.send(new xmpp.Element('message',
                  {
                      from: 'chatbot@example.com/em-johnsode-l01.enernoc.local',
                      to: key,
                      type: 'chat'
                  }).c('body').t(message));
          }
      }
}

cl.on('error',
    function(e) {
        console.error(e);
    });