/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 7/7/13
 * Time: 10:05 AM
 * To change this template use File | Settings | File Templates.
 */

var http = require('http');

var server = http.createServer();

function handleRequests(req,res){
    res.writeHead(200,{'content-type':'text/plain'})
    res.write('Hello World');
    res.end();
};

server.on('request',handleRequests);

server.listen(8080);