var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');
app.listen(80);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}


io.sockets.on('connection', function (socket) {

    socket.emit('welcome', { hello: log + "<br/>" + 'welcome to chat, your designation is ', name: 'unicornfluffmaster'+ users});
    io.sockets.emit('Incoming_Messages',{ incoming: 'unicornfluffmaster' + users + ' has entered chat' })
    socket.on('usersays', function (data) {
        var sendmessage = '';
        for(var word in data.incoming.split(" ")){
            if (splice(word.length-3,word.length) == 'jpg' || 'png' || 'gif'){
                io.socket.emit('Incoming_Image', {picture : '<img src ="' + word + '" alt ="picture">'})
            }
            else{
                sendmessage += word;
            }
        }
        io.sockets.emit('Incoming_Messages',{ incoming: word });

        log += data.incoming + "<br/>";
    });
});