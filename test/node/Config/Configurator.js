// Generated by CoffeeScript 1.6.3
(function() {
  var Configurator, dir, expect, getConfig, path;

  expect = require('chai').expect;

  path = require('path');

  Configurator = require('../../../lib/_Config/Configurator');

  dir = path.resolve(__dirname + '/../../data/package/config');

  getConfig = function(name) {
    return (new Configurator(dir + '/' + name + '.json')).load();
  };

  describe('Configurator', function() {
    return describe('#load()', function() {
      it('should load empty configuration', function() {
        var config;
        config = getConfig('empty');
        expect(config).to.include.keys(['packages', 'template', 'cache', 'debugger', 'server', 'routes']);
        expect(config.packages).to.be.a('object');
        expect(config.packages).to.include.keys(['application']);
        return expect(config.packages.application).to.be.eql({
          skip: false,
          application: null,
          base: null,
          style: {
            "in": null,
            out: null,
            dependencies: null
          },
          modules: [],
          aliases: {},
          run: [],
          libraries: {
            begin: [],
            end: []
          }
        });
      });
      it('should throw an error when there is fsModules section', function() {
        return expect(function() {
          return getConfig('fs-modules');
        }).to["throw"](Error, 'Config: fsModules section is deprecated. Please take a look in new documentation.');
      });
      return it('should throw an error when there is coreModules section', function() {
        return expect(function() {
          return getConfig('core-modules');
        }).to["throw"](Error, 'Config: coreModules section is deprecated. Please take a look in new documentation.');
      });
    });
  });

}).call(this);
