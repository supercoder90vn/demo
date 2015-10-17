//__ph_reference: https://nodejs.org/en/about/
// Create Server
/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Require Modules
console.log('##############################################################################');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Array of Mime Types
var mimeTypes = {
	'html': 'text/html',
	'jpeg': 'image/jpeg',
	'jpg': 'image/jpg',
	'png': 'image/png',
	'js': 'text/javascript',
	'css': 'text/css'
};

http.createServer(function (req, res) {
	console.log('_________________________________________________________________________________')
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log('Loading url: ' + uri);
	console.log('fileName:')
	console.log(fileName);
	var stats;
	
	try{
		stats = fs.lstatSync(fileName);
	}catch(e) {
		res.writeHead(404, {'Content-type':'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}	
	
	// Check if file/directory
	if(stats.isFile()){
		console.log("stats is file...");
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {'Content-type':mimeType});
		
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}else if(stats.isDirectory()){
		console.log("stats is directory...")
		res.writeHead(302,{
			'Location' : 'index.html'
		});
		res.end();
	}else{
		res.writeHead(500,{'Content-Type': 'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}
}).listen(3000);

