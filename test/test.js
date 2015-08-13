var cloud = require('../');

var rsOpFile = 'index.js';

var should = require('should');

var filemodel = require('../File');


var rsFile = 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\js\\lib\\layer\\layer.ext.js';



describe('clous.test.js', function() {
	before(function() {
		this.cloud = new cloud({
			"accessKey": "5UyUq-l6jsWqZMU6tuQ85Msehrs3Dr58G-mCZ9rE",
			"secretKey": "YaRsPKiYm4nGUt8mdz2QxeV5Q_yaUzVxagRuWTfM",
			"bucket": "qiniu-sdk-test",
			"domain": "http://qiniu-sdk-test.qiniudn.com",
			"uploadURL": "http://up.qiniug.com/"
		});
	});

	describe('Start', function() {
		it('should return ok with filepath ', function(done) {
			var info = this.cloud.Start(rsOpFile, function(err, info) {
				should.not.exist(err);
				should.exist(info);
				done();
			});
		});

		it('should return ok with filemodule ', function(done) {
			var info = this.cloud.Start(new filemodel(rsOpFile), function(err, info) {
				should.not.exist(err);
				should.exist(info);
				done();
			});
		});

		it('should return ok with  filemodule prefetchCloudKey', function(done) {
			var f = new filemodel(rsFile, 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\');
			var info = this.cloud.Start(f, function(err, info) {
				should.not.exist(err);
				should.exist(info);
				done();
			});
		});

		it('should return ok with  filemodule removeCloudKey', function(done) {
			var info = this.cloud.Start(rsOpFile, {
				RemoveKey: true
			}, function(err, info) {
				should.not.exist(err);
				should.exist(info);
				done();
			});
		});
	})



});