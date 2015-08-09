var pathModule = require('path');


var exists = require('fs').existsSync;


var File = function(p) {
	var extname = pathModule.extname(p);
	p += (extname ? '' : '.js');
	this.path = pathModule.resolve(process.cwd(), p);
	this.rePath = p;
	this.extname = extname || '.js';
	this.exists = exists(this.path);
	this.asdok = false;
}


module.exports = File;