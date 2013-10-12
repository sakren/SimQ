// Generated by CoffeeScript 1.6.3
(function() {
  var Builder, Info, Package, SyntaxException, builder, dir, expect, path, pckg;

  expect = require('chai').expect;

  path = require('path');

  Info = require('module-info');

  Package = require('../../../lib/Package/Package');

  Builder = require('../../../lib/Package/Builder');

  SyntaxException = require('source-compiler/Exceptions/SyntaxException');

  dir = path.resolve(__dirname + '/../../data/package');

  pckg = null;

  builder = null;

  describe('Package/Builder', function() {
    beforeEach(function() {
      pckg = new Package(dir);
      return builder = new Builder(pckg);
    });
    describe('#buildModules()', function() {
      it('should build one module from absolute path', function(done) {
        pckg.addModule(dir + '/modules/1.js');
        return builder.buildModules().then(function(data) {
          expect(data).to.have.string("'/modules/2.js'");
          expect(data).to.have.string("'/modules/3.js'");
          expect(data).to.have.string("'module'");
          return done();
        }).done();
      });
      return it('should return an error for wrong coffee file', function(done) {
        pckg.addModule('./modules/with-error.coffee');
        return builder.buildModules().fail(function(err) {
          expect(err).to.be.an["instanceof"](Error);
          return done();
        }).done();
      });
    });
    describe('#buildAutorun()', function() {
      return it('should build autorun section', function(done) {
        pckg.addModule('./modules/1.js');
        pckg.addToAutorun('/modules/1');
        pckg.addToAutorun('- ./libs/begin/4.js');
        return builder.buildAutorun().then(function(data) {
          expect(data).to.have.string("require('/modules/1');");
          expect(data).to.have.string('// 4');
          return done();
        }).done();
      });
    });
    describe('#buildStyles()', function() {
      it.skip('should build styles', function(done) {
        pckg.setStyle('./css/style.less', './public/style.css');
        return builder.buildStyles().then(function(data) {
          expect(data).to.be.equal('body {\n  color: #000000;\n}\n');
          return done();
        }).done();
      });
      return it('should return an error for bad style', function(done) {
        pckg.setStyle('./css/with-errors.less', './public/style.css');
        return builder.buildStyles().fail(function(err) {
          expect(err).to.be.an["instanceof"](SyntaxException);
          expect(err.message).to.be.equal('missing closing `}`');
          expect(err.line).to.be.equal(1);
          expect(err.column).to.be.equal(0);
          return done();
        }).done();
      });
    });
    return describe('#build()', function() {
      return it('should build whole section', function(done) {
        pckg.addModule('./modules/1.js');
        pckg.addToAutorun('/modules/1');
        pckg.addToAutorun('- ./libs/begin/4.js');
        return builder.build().then(function(data) {
          expect(data).to.include.keys(['css', 'js']);
          expect(data.js).to.have.string("'/modules/2.js'");
          expect(data.js).to.have.string("'/modules/3.js'");
          expect(data.js).to.have.string("'module'");
          expect(data.js).to.have.string("require('/modules/1');");
          expect(data.js).to.have.string('// 4');
          return done();
        }).done();
      });
    });
  });

}).call(this);
