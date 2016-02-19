var _ = require('lodash');
var path = require('path');
var join = path.join;

var splitCloudUrl = function(cloudUrl) {
	var result = [];
	// var regex = /Static\/(.*\/?)\$\$(.*)/;
	
	var configPath = path.resolve(process.cwd(), 'config.js');
	var globalConfig = require(configPath);
	var flag = require(path.join(globalConfig.assets_path, 'rootConfig.js')).comboSyntax[0];
	var separator=require(join(globalConfig.assets_path, 'rootConfig.js')).comboSyntax[1];
	
	// 遍历flag中的字符
	var regString = '';
	for(var i=0;i<flag.length;i++){
	   regString+= "["+ flag.charAt(i) +"]";
	}
	var regex =new RegExp("Static\/(.*?\/)"+ regString +"(.*)",'i');         //将字符串实例化为正则表达式

	var regresult = regex.exec(cloudUrl);

	if (regresult && regresult.length == 3) {
		// var item = regresult[2].split(',');
		var item = regresult[2].split(separator);
		_.map(item, function(n) {
			result.push(regresult[1] + n); //path.join(regresult[1], n)
		})
	}
	return result;
}

var judeUrl = function(cloudUrl, rePath) {
	rePath = rePath.replace(/\\/g, '/');
	if (_.endsWith(cloudUrl, rePath)) {
		return true;
	}
}

module.exports.CloudKeyCanRemove = function(cloudUrl, rePath) {
	if (judeUrl(cloudUrl, rePath)) {
		return true;
	}
	var cloudUrls = splitCloudUrl(cloudUrl);
	cloudUrls = _.dropWhile(cloudUrls, function(n) {
		return !judeUrl(n, rePath);
	});
	return cloudUrls.length > 0;
}
