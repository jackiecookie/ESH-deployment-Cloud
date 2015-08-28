var cloud = require('../');

var rsOpFile = 'index.js';

var should = require('should');

var filemodel = require('../File');


var rsFile = 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\js\\lib\\layer\\layer.js';



describe('clous.test.js', function() {
	before(function() {
		this.cloud = new cloud();
	});

	describe('Start', function() {
		// it('should return ok with filepath ', function(done) {
		// 	var info = this.cloud.Start(rsOpFile, function(err, info) {
		// 		should.not.exist(err);
		// 		should.exist(info);
		// 		done();
		// 	});
		// });

		// it('should return ok with filemodule ', function(done) {
		// 	var info = this.cloud.Start(new filemodel(rsOpFile), function(err, info) {
		// 		should.not.exist(err);
		// 		should.exist(info);
		// 		done();
		// 	});
		// });

		it('should return ok with  filemodule prefetchCloudKey', function(done) {
			var f = new filemodel(rsFile, 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\');
			var info = this.cloud.Start(rsOpFile, function(err, info) {
				should.not.exist(err);
				should.exist(info);
				done();
			});
		});

		// it('should return ok with  filemodule removeCloudKey', function(done) {
		// 	var info = this.cloud.Start(rsOpFile, {
		// 		RemoveKey: true
		// 	}, function(err, info) {
		// 		should.not.exist(err);
		// 		should.exist(info);
		// 		done();
		// 	});
		// });


		//TODO:批量同步  并且保护file的一些变量 不允许外界修改
		// it('should return ok with  filemodule removeCloudKey', function(done) {
		// 	var f = new filemodel(rsFile, 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\');
		// 	f.rePath = '.css';
		// 	console.log(f);
		// 	var info = this.cloud.Start(f, {
		// 		RemoveKey: false
		// 	}, function(err, info) {
		// 		should.not.exist(err);
		// 		should.exist(info);
		// 		done();
		// 	});
		// });
	})



});