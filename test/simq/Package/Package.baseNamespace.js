// Generated by CoffeeScript 1.6.3
(function() {
  var Info, Package, dir, expect, path, pckg;

  expect = require('chai').expect;

  path = require('path');

  Info = require('module-info');

  Package = require('../../../lib/Package/Package');

  dir = path.resolve(__dirname + '/../../data/package');

  pckg = null;

  describe('Package/Package.baseNamespace', function() {
    beforeEach(function() {
      pckg = new Package(path.resolve(dir + '/../..'));
      return pckg.base = 'data/package';
    });
    describe('#setApplication()', function() {
      return it('should set path for result js file', function() {
        pckg.setApplication('./public/application.js');
        return expect(pckg.application).to.be.equal(dir + '/public/application.js');
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
        return expect(pckg.style.dependencies).to.be.eql([dir + '/css/common.less', dir + '/css/style.less', dir + '/css/variables.less']);
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
        expect(pckg.modules).to.include.keys('package/modules/1.js');
        return expect(pckg.modules['package/modules/1.js']).to.be.equal(dir + '/modules/1.js');
      });
      it('should add modules with absolute path', function() {
        pckg.addModule(dir + '/modules/*.js<$>');
        return expect(pckg.modules).to.include.keys(['package/modules/1.js', 'package/modules/2.js', 'package/modules/3.js', 'package/modules/4.js', 'package/modules/6.js']);
      });
      it('should add core module', function() {
        pckg.addModule('events');
        return expect(pckg.modules).to.include.keys('events');
      });
      it('should add module from base directory', function() {
        pckg.addModule('./modules/1.js');
        expect(pckg.modules).to.include.keys('modules/1.js');
        return expect(pckg.modules['modules/1.js']).to.be.equal(dir + '/modules/1.js');
      });
      it('should add modules from base directory', function() {
        pckg.addModule('./modules/*.js<$>');
        return expect(pckg.modules).to.include.keys(['modules/1.js', 'modules/2.js', 'modules/3.js', 'modules/4.js', 'modules/6.js']);
      });
      it('should add installed npm module', function() {
        pckg.addModule('module/test.js');
        expect(pckg.modules).to.include.keys('module/test.js');
        return expect(pckg.modules['module/test.js']).to.be.equal(dir + '/node_modules/module/test.js');
      });
      return it('should add installed npm modules', function() {
        pckg.addModule('module/*.js<$>');
        return expect(pckg.modules).to.include.keys(['module', 'module/test.js', 'module/test2.js']);
      });
    });
    describe('#addAlias()', function() {
      it('should throw an error if module is not registered', function() {
        return expect(function() {
          return pckg.addAlias('unknown', 'new');
        }).to["throw"](Error);
      });
      it('should create new module for alias', function() {
        pckg.addModule('module/test.js');
        pckg.addAlias('module/test.js', 'test');
        expect(pckg.modules).to.include.keys(['module/test.js', 'test']);
        return expect(pckg.modules.test).to.be.equal("`module.exports = require('module/test.js');`");
      });
      it('should create new module for alias without extension', function() {
        pckg.addModule('module/test.js');
        pckg.addAlias('module/test', 'test');
        return expect(pckg.modules).to.include.keys(['module/test.js', 'test']);
      });
      return it('should create new module for alias without exact file path', function() {
        pckg.addModule('module/any/index.json');
        pckg.addAlias('module/any', 'any');
        return expect(pckg.modules).to.include.keys(['module/any/index.json', 'any']);
      });
    });
    describe('#addToAutorun()', function() {
      it('should add module to autorun', function() {
        pckg.addModule('module/test.js');
        pckg.addToAutorun('module/test.js');
        return expect(pckg.run).to.include.members(['module/test.js']);
      });
      it('should add module to autorun without extension', function() {
        pckg.addModule('module/test.js');
        pckg.addToAutorun('module/test');
        return expect(pckg.run).to.include.members(['module/test.js']);
      });
      it('should add module to autorun without exact file path', function() {
        pckg.addModule('module/any/index.json');
        pckg.addToAutorun('module/any');
        return expect(pckg.run).to.include.members(['module/any/index.json']);
      });
      it('should add library from absolute path', function() {
        pckg.addToAutorun(dir + '/libs/begin/1.js');
        return expect(pckg.run).to.include.members([dir + '/libs/begin/1.js']);
      });
      it('should add library from relative path', function() {
        pckg.addToAutorun('./libs/begin/1.js');
        return expect(pckg.run).to.include.members([dir + '/libs/begin/1.js']);
      });
      it('should add all js libraries from absolute path', function() {
        pckg.addToAutorun(dir + '/libs/begin/*.js<$>');
        return expect(pckg.run).to.include.members([dir + '/libs/begin/1.js', dir + '/libs/begin/2.js', dir + '/libs/begin/3.js', dir + '/libs/begin/4.js', dir + '/libs/begin/6.js']);
      });
      it('should add all js libraries from relative path', function() {
        pckg.addToAutorun('./libs/begin/*.js<$>');
        return expect(pckg.run).to.include.members([dir + '/libs/begin/1.js', dir + '/libs/begin/2.js', dir + '/libs/begin/3.js', dir + '/libs/begin/4.js', dir + '/libs/begin/6.js']);
      });
      return it('should throw an error if module or library does not exists', function() {
        return expect(function() {
          return pckg.addToAutorun('unknown');
        }).to["throw"](Error);
      });
    });
    return describe('#resolveRegisteredModule()', function() {
      it('should return same name', function() {
        pckg.addModule('module/test.js');
        return expect(pckg.resolveRegisteredModule('module/test.js')).to.be.equal('module/test.js');
      });
      it('should return full name from name without extension', function() {
        pckg.addModule('module/test.js');
        return expect(pckg.resolveRegisteredModule('module/test')).to.be.equal('module/test.js');
      });
      it('should return full name from directory', function() {
        pckg.addModule('module/any/index.json');
        return expect(pckg.resolveRegisteredModule('module/any')).to.be.equal('module/any/index.json');
      });
      return it('should return null if module is not registered', function() {
        return expect(pckg.resolveRegisteredModule('unknown')).to.be["null"];
      });
    });
  });

}).call(this);
