var _ = require('lodash');

var path = require('path');

var splitCloudUrl = function(cloudUrl) {
	var result = [];
	var regex = /Static\/(.*?)\/\$\$(.*)/;
	var regresult = regex.exec(cloudUrl);

	if (regresult && regresult.length == 3) {
		var item = regresult[2].split(',');
		_.map(item, function(n) {
			result.push(path.join(regresult[1], n));
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
	cloudUrl = _.dropWhile(cloudUrls, function(n) {
		return !judeUrl(n, rePath);
	});
	return cloudUrls.length > 0;
}