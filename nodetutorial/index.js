/**
 * Created with JetBrains WebStorm.
 * User: dayrey
 * Date: 7/2/13
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
server.start(router.route, handle);
