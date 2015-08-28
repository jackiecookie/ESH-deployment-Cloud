var pathModule = require('path');

var promises = require('bluebird');

var qn = require('esh-qn');

var util = require('./util');
var qnclient;

var _ = require('lodash');

var filemodel = require('./File');

var promisesprocess = promises.promisifyAll(require('child_process'));

var Config = null;



var Cloud = function(qnConfig) {
	Config = qnConfig;
	this.ItemCloudList = null;
	qnclient = promises.promisifyAll(qn.create(Config));
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
		.then(lastPromise)
		.then(this.ExecQnClient)
		.then(function(arg) {
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
		return qnclient.deleteAsync(removeKey).then(function() {
			return removeKey
		});
	})
}

//通知回源
Cloud.prototype.prefetchCloudKey = function(removeKeys) {
	removeKeys = _.compact(removeKeys);
	console.log('需要获取' + removeKeys.length + '个key');
	return promises.map(removeKeys, function(removeKey) {
		return qnclient.prefetchAsync(removeKey).then(function() {
			return removeKey
		});;
	})
}


//执行qrsctl.exe更新缓存
Cloud.prototype.ExecQnClient = function(removeKeys) {
	var qnClientPath = pathModule.resolve(process.cwd(), 'qrsctl.exe');
	var len = removeKeys.length;
	if (len == 0) {
		return promises.resolve(['refresh successed']);
	}
	for (var i = len - 1; i >= 0; i--) {
		//将原有逗号合并的逗号转义,并且拼上原先存在的key
		removeKeys[i] = Config.domain + '/' + removeKeys[i].replace(/[,]/g, '%2C');
	};
	var UrlsStr = removeKeys.join(',');
	var cmd = 'qrsctl.exe login ' + Config.userName + ' ' + Config.password + ' &qrsctl cdn/refresh static ' + UrlsStr;
	return promisesprocess.execAsync(cmd);
}



module.exports = Cloud;