var static = require('node-static');
var ssi = require("ssi");
var file = new static.Server();

var inputDirectory = "/tmp/test";
var outputDirectory = "/tmp/output";
var matcher = ".*";

var includes = new ssi(inputDirectory, outputDirectory, matcher, true);
includes.compile();

require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        file.serve(request, response);
    }).resume();
}).listen(80);
