var conf = require('./conf.json');
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(onRequest).listen(conf.http.port);

//Execute each time a request is made on the server
function onRequest (request, res) {
    
    var pathName = url.parse(request.url).pathname;
    //get extension of required file
    var extension = pathName.split('.').pop();
    
    //default page if not specified
    pathName = (pathName == "/") ? conf.http.index : pathName;
    console.log("Going to" + pathName);
	res.writeHead(200, {'Content-Type' : conf.http.mime[extension]});

    try {
        res.end(fs.readFileSync(conf.http.www + pathName));
    } catch (ex) { // print a special page 404
        res.writeHead(200, {'Content-Type' : conf.http.mime['text']});
        res.end(ex+fs.readFileSync(conf.http.error['404']));
    }
}
console.log("Server launched on http://localhost:2311");
