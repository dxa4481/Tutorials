var express = require('express')
    , http = require('http')
    , path = require('path');
var app = express();
var fs = require('fs');
var checkforweather = require('./checkforweather')


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var xmpp = require('./xmpp');

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var sendweatherHTTP = function (socket, info) {io.sockets.emit('Incoming_Messages',{ incoming: info })};

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

var users = 0;
var log = '';
app.get('/',handler);
console.log('test')
io.sockets.on('connection', function (socket) {
    users = users + 1;
    socket.emit('welcome', { hello: log + "<br/>" + 'welcome to chat, your designation is ', name: 'unicornfluffmaster'+ users});
    io.sockets.emit('Incoming_Messages',{ incoming: 'unicornfluffmaster' + users + ' has entered chat' })
    socket.on('usersays', function (data) {
        var sendmessage = '';
        stringin = data.incoming;
        stringin.split(' ').forEach(function imcheck(word){
            console.log('before');
            console.log(word.slice(word.length-3,word.length));
            console.log('after');
            if (word.slice(word.length-3,word.length) == 'jpg' || word.slice(word.length-3,word.length) == 'png' || word.slice(word.length-3,word.length) ==  'gif'){
                io.sockets.emit('Incoming_Image', {picture : '<img src ="' + word + '" alt ="picture">'})  ;
                log += '<img src ="' + word + '" alt ="picture">' + "<br/>";
            }
            else{
                sendmessage += word;
            }
        });
        checkforweather.weathercheck(stringin, sendweatherHTTP, socket);

        io.sockets.emit('Incoming_Messages',{ incoming: data.incoming });
        console.log("I am here");
        xmpp.httpsend(data.incoming);

        log += data.incoming + "<br/>";
    });
});