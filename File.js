var pathModule = require('path');


var exists = require('fs').existsSync;


var File = function(p, dirname) {
	if (!dirname) dirname = process.cwd();
	var extname = pathModule.extname(p);
	p += (extname ? '' : '.js');
	var rePath = pathModule.relative(dirname, p);
	var abPath = pathModule.resolve(dirname, rePath);
	this.path = abPath;
	this.rePath = rePath;
	this.extname = extname || '.js';
	this.exists = exists(this.path);
}


module.exports = File;