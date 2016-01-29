var should = require('should');
var filemodel = require('../File');

describe('test util', function() {
	before(function() {
		this.util = require('../util');
		this.file =
			new filemodel('D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\b.js', 'D:\\开发库\\WebEsh\\05编码\\WebEsh\\2.Web应用程序\\WebEsh.Web\\Static\\');
	});



	describe('CloudKeyCanRemove', function() {

		////var path='Static/js/lib/layer/layer.ext.js'
		//it('should return true with normalpath ', function(done) {
		//	debugger;
		//	var key = 'Static/js/lib/layer/layer.ext.js';
		//	var result = this.util.CloudKeyCanRemove(key, this.file.rePath);
		//	(result).should.be.exactly(true);
		//	done();
		//});


		it('should return true with combopath and in the start ', function(done) {
			debugger;
			var key = 'Static/$$b.js,c.js'
			var result = this.util.CloudKeyCanRemove(key, this.file.rePath);
			(result).should.be.exactly(true);
			done();
		});

		/*it('should return true with combopath and in the mid ', function(done) {
		 debugger;
		 var key = 'Static/js/$$common/procopy/procopy.js,lib/layer/layer.ext.js,common/btnLoading/btnLoading.js,common/verify/verify.js,common/loginPanel/loginPanel.js'
		 var result = this.util.CloudKeyCanRemove(key, this.file.rePath);
		 (result).should.be.exactly(true);
		 done();
		 });

		 it('should return true with combopath and in the end ', function(done) {
		 debugger;
		 var key = 'Static/js/$$common/procopy/procopy.js,common/btnLoading/btnLoading.js,common/verify/verify.js,common/loginPanel/loginPanel.js,lib/layer/layer.ext.js'
		 var result = this.util.CloudKeyCanRemove(key, this.file.rePath);
		 (result).should.be.exactly(true);
		 done();
		 });

		 it('should return false with combopath ', function(done) {
		 debugger;
		 var key = 'Static/js/$$common/procopy/procopy.js,common/btnLoading/btnLoading.js,common/verify/verify.js,common/loginPanel/loginPanel.js'
		 var result = this.util.CloudKeyCanRemove(key, this.file.rePath);
		 (result).should.be.exactly(false);
		 done();
		 });*/
	})

});