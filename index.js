var promises = require('bluebird');

var qn = require('esh-qn');


var util = require('./util');
var qnclient;

var _ = require('lodash');

var filemodel = require('./File');



var Cloud = function(qnConfig) {
	this.ItemCloudList = null;
	qnclient = promises.promisifyAll(qn.create(qnConfig));
}



Cloud.prototype.Start = function(file, option, callback) {
	if (!callback) {
		if (_.isFunction(option)) {
			callback = option;
			option = {};
		} else {
			callback = function() {
				return "ok"
			};
		}
	}
	var isRemoveKey = option && !!option.RemoveKey;
	var fileisfilemodel = file instanceof filemodel;
	if (!fileisfilemodel) {
		file = new filemodel(file);
	}
	if (!file.exists) return Promise.resolve(file);
	var lastPromise = isRemoveKey ? this.RemoveCloudList : this.prefetchCloudKey;
	return this.GetCloudList()
		.then(this.GetRemoveList(file.rePath))
		.then(lastPromise).then(function(arg) {
			return callback(null, arg);
		}).catch(function(err) {
			return callback(err, null);
		});
}

//获取云上面的静态文件列表
Cloud.prototype.GetCloudList = function() {
	var ItemCloudList = this.ItemCloudList;
	if (ItemCloudList) return promises.resolve(ItemCloudList);
	return qnclient.listAsync('/').then(function(arg) {
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
		console.log(removeKey);
		return qnclient.deleteAsync(removeKey);
	})
}


Cloud.prototype.prefetchCloudKey = function(removeKeys) {
	removeKeys = _.compact(removeKeys);
	console.log('需要获取' + removeKeys.length + '个key');
	return promises.map(removeKeys, function(removeKey) {
		return qnclient.prefetchAsync(removeKey);
	})
}



module.exports = Cloud;