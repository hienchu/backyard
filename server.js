#!/bin/env node
//  OpenShift sample Node application
var http = require('http');

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;
console.log("OPENSHIFT_NODEJS_IP" + process.env.OPENSHIFT_NODEJS_IP);
console.log("OPENSHIFT_NODEJS_PORT" + process.env.OPENSHIFT_NODEJS_PORT);

http.createServer(function (req, res) {
	var addr = "unknown";
	var out = "";
	if (req.headers.hasOwnProperty('x-forwarded-for')) {
		addr = req.headers['x-forwarded-for'];
	} else if (req.headers.hasOwnProperty('remote-addr')){
		addr = req.headers['remote-addr'];
	}

	if (req.headers.hasOwnProperty('accept')) {
		if (req.headers['accept'].toLowerCase() == "application/json") {
			  res.writeHead(200, {'Content-Type': 'application/json'});
			  res.end(JSON.stringify({'ip': addr}, null, 4) + "\n");			
			  return ;
		}
	}

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Welcome to Node.js on OpenShift!\n\n");
  res.write("This is my first release from GitHub!");
  res.end("Your IP address seems to be " + addr + "\n");
}).listen(port, ipaddr);
console.log("Server running at http://" + ipaddr + ":" + port + "/");
