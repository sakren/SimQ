// Generated by CoffeeScript 1.6.3
(function() {
  var Info, Package, dir, expect, path, pckg;

  expect = require('chai').expect;

  path = require('path');

  Info = require('module-info');

  Package = require('../../../lib/Package/Package');

  dir = path.resolve(__dirname + '/../../data/package');

  pckg = null;

  describe('Package/Package', function() {
    beforeEach(function() {
      return pckg = new Package(dir);
    });
    describe('#setTarget()', function() {
      return it('should set path for result js file', function() {
        pckg.setTarget('./public/application.js');
        return expect(pckg.target).to.be.equal(dir + '/public/application.js');
      });
    });
    describe('#setStyle()', function() {
      it('should set paths for styles without dependent files', function() {
        pckg.setStyle('./css/style.less', './public/style.css');
        expect(pckg.style["in"]).to.be.equal(dir + '/css/style.less');
        expect(pckg.style.out).to.be.equal(dir + '/public/style.css');
        return expect(pckg.style.dependencies).to.be["null"];
      });
      it('should set paths for styles with dependent files', function() {
        pckg.setStyle('./css/style.less', './public/style.css', ['./css/*.less']);
        return expect(pckg.style.dependencies).to.be.eql([dir + '/css/common.less', dir + '/css/style.less', dir + '/css/variables.less', dir + '/css/with-errors.less']);
      });
      return it('should throw an error if input file does not exists', function() {
        return expect(function() {
          return pckg.setStyle('./css/unknown.less', './public/style.css');
        }).to["throw"](Error);
      });
    });
    describe('#addModule()', function() {
      it('should add module with absolute path', function() {
        pckg.addModule(dir + '/modules/1.js');
        return expect(pckg.modules).to.be.eql([dir + '/modules/1.js']);
      });
      it('should add modules with absolute path', function() {
        pckg.addModule(dir + '/modules/*.js<$>');
        return expect(pckg.modules).to.be.eql([dir + '/modules/1.js', dir + '/modules/2.js', dir + '/modules/3.js', dir + '/modules/4.js', dir + '/modules/6.js', dir + '/modules/other/index.js']);
      });
      it.skip('should add core module', function() {
        pckg.addModule('events');
        expect(pckg.modules).to.have.length.above(0);
        return expect(pckg.modules[0]).not.to.be["null"];
      });
      it('should add module from base directory', function() {
        pckg.addModule('./modules/1.js');
        return expect(pckg.modules).to.be.eql([dir + '/modules/1.js']);
      });
      it('should add modules from base directory', function() {
        pckg.addModule('./modules/*.js<$>');
        return expect(pckg.modules).to.be.eql([dir + '/modules/1.js', dir + '/modules/2.js', dir + '/modules/3.js', dir + '/modules/4.js', dir + '/modules/6.js', dir + '/modules/other/index.js']);
      });
      it('should add installed npm module', function() {
        pckg.addModule('module/test.js');
        return expect(pckg.modules).to.be.eql([dir + '/node_modules/module/test.js']);
      });
      return it('should add installed npm modules', function() {
        pckg.addModule('module/*.js<$>');
        return expect(pckg.modules).to.be.eql([dir + '/node_modules/module/index.js', dir + '/node_modules/module/test.js', dir + '/node_modules/module/test2.js']);
      });
    });
    describe('#addAlias()', function() {
      it('should create new module for alias', function() {
        pckg.addModule('module/test.js');
        pckg.addAlias('/module/test.js', 'test');
        expect(pckg.aliases).to.be.eql({
          test: '/module/test.js'
        });
        return expect(pckg.modules).to.be.eql([dir + '/node_modules/module/test.js']);
      });
      it('should create new module for alias without extension', function() {
        pckg.addModule('module/test.js');
        pckg.addAlias('/module/test', 'test');
        expect(pckg.aliases).to.be.eql({
          test: '/module/test'
        });
        return expect(pckg.modules).to.be.eql([dir + '/node_modules/module/test.js']);
      });
      return it('should create new module for alias without exact file path', function() {
        pckg.addModule('module/any/index.json');
        pckg.addAlias('/module/any', 'any');
        expect(pckg.aliases).to.be.eql({
          any: '/module/any'
        });
        return expect(pckg.modules).to.be.eql([dir + '/node_modules/module/any/index.json']);
      });
    });
    describe('#addToAutorun()', function() {
      it('should add module to autorun', function() {
        pckg.addModule('./modules/1.js');
        pckg.addToAutorun('/modules/1.js');
        return expect(pckg.run).to.be.eql(['/modules/1.js']);
      });
      it('should add module to autorun without extension', function() {
        pckg.addModule('./modules/1.js');
        pckg.addToAutorun('/modules/1');
        return expect(pckg.run).to.be.eql(['/modules/1']);
      });
      it('should add module to autorun without exact file path', function() {
        pckg.addModule('./modules/other/index.js');
        pckg.addToAutorun('/modules/other');
        return expect(pckg.run).to.be.eql(['/modules/other']);
      });
      it('should add npm module to autorun', function() {
        pckg.addModule('module/test.js');
        return pckg.addToAutorun('module/test');
      });
      it('should add library from absolute path', function() {
        pckg.addToAutorun('- ' + dir + '/libs/begin/1.js');
        return expect(pckg.run).to.be.eql([dir + '/libs/begin/1.js']);
      });
      it('should add library from relative path', function() {
        pckg.addToAutorun('- ./libs/begin/1.js');
        return expect(pckg.run).to.be.eql([dir + '/libs/begin/1.js']);
      });
      it('should add all js libraries from absolute path', function() {
        pckg.addToAutorun('- ' + dir + '/libs/begin/*.js<$>');
        return expect(pckg.run).to.be.eql([dir + '/libs/begin/1.js', dir + '/libs/begin/2.js', dir + '/libs/begin/3.js', dir + '/libs/begin/4.js', dir + '/libs/begin/6.js']);
      });
      return it('should add all js libraries from relative path', function() {
        pckg.addToAutorun('- ./libs/begin/*.js<$>');
        return expect(pckg.run).to.be.eql([dir + '/libs/begin/1.js', dir + '/libs/begin/2.js', dir + '/libs/begin/3.js', dir + '/libs/begin/4.js', dir + '/libs/begin/6.js']);
      });
    });
    return describe('#packagePath', function() {
      return it('should set different path to package.json file', function() {
        pckg.packagePath = './otherPackage';
        return expect(pckg.getPackageInfo().getName()).to.be.equal('other-package');
      });
    });
  });

}).call(this);
