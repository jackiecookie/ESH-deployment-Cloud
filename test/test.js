var cloud = require('../');

var rsOpFile = 'index.js';

var should = require('should');

var filemodel = require('../File');



describe('clous.test.js', function() {
	before(function() {
		this.cloud = new cloud({
			"accessKey": "5UyUq-l6jsWqZMU6tuQ85Msehrs3Dr58G-mCZ9rE",
			"secretKey": "YaRsPKiYm4nGUt8mdz2QxeV5Q_yaUzVxagRuWTfM",
			"bucket": "qiniu-sdk-test",
			"domain": "http://qiniu-sdk-test.qiniudn.com",
			"uploadURL": "http://up.qiniug.com/"
		})
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
	})
});