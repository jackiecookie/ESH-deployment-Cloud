var promises = require('bluebird');

var qn = require('qn');


var util = require('./util');
var qnclient;

var _ = require('lodash');



var Cloud = function(qnConfig) {
	this.ItemCloudList = null;
	qnclient = promises.promisifyAll(qn.create(qnConfig));
}



Cloud.prototype.Start = function(file) {
	if (!file.exists) return Promise.resolve(file);
	return this.GetCloudList()
		.then(this.GetRemoveList(file.rePath))
		.then(this.RemoveCloudList);
}

//获取云上面的静态文件列表
Cloud.prototype.GetCloudList = function() {
	var ItemCloudList = this.ItemCloudList;
	if (ItemCloudList) return promises.resolve(ItemCloudList);
	return qnclient.listAsync('/').then(function(arg) {
		debugger;
		ItemCloudList = arg[0].items;
		return ItemCloudList;
	});
}

//获得可以删除的列表
Cloud.prototype.GetRemoveList = function(rePath) {
	return function(cloudList) {
		return promises.map(cloudList, function(cloudobj) {
			//暂时简单判断,如何进行较为严谨的判断
			var cloudUrl = cloudobj.key
			if (util.CloudKeyCanRemove(cloudUrl, rePath)) {
				return cloudUrl;
			}
			return false;
		})
	}

}

//删除key
Cloud.prototype.RemoveCloudList = function(removeKeys) {
	removeKeys = _.compact(removeKeys);
	console.log('需要删除' + removeKeys.length + '个key');
	return promises.map(removeKeys, function(removeKey) {
		return qnclient.deleteAsync(removeKey);
	})
}



module.exports = Cloud;