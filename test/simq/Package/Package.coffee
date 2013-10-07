expect = require('chai').expect
path = require 'path'
Info = require 'module-info'

Package = require '../../../lib/Package/Package'

dir = path.resolve(__dirname + '/../../data/package')
pckg = null

describe 'Package/Package', ->

	beforeEach( ->
		pckg = new Package(dir)
	)

	describe '#setApplication()', ->
		it 'should set path for result js file', ->
			pckg.setApplication('./public/application.js')
			expect(pckg.application).to.be.equal(dir + '/public/application.js')

	describe '#setStyle()', ->
		it 'should set paths for styles without dependent files', ->
			pckg.setStyle('./css/style.less', './public/style.css')
			expect(pckg.style.in).to.be.equal(dir + '/css/style.less')
			expect(pckg.style.out).to.be.equal(dir + '/public/style.css')
			expect(pckg.style.dependencies).to.be.null

		it 'should set paths for styles with dependent files', ->
			pckg.setStyle('./css/style.less', './public/style.css', ['./css/*.less'])
			expect(pckg.style.dependencies).to.be.eql([
				dir + '/css/common.less'
				dir + '/css/style.less'
				dir + '/css/variables.less'
			])

		it 'should throw an error if input file does not exists', ->
			expect( -> pckg.setStyle('./css/unknown.less', './public/style.css')).to.throw(Error)

	describe '#addModule()', ->
		it 'should add module with absolute path', ->
			pckg.addModule(dir + '/modules/1.js')
			expect(pckg.modules).to.include.keys('package/modules/1.js')
			expect(pckg.modules['package/modules/1.js']).to.be.equal(dir + '/modules/1.js')

		it 'should add modules with absolute path', ->
			pckg.addModule(dir + '/modules/*.js<$>')
			expect(pckg.modules).to.include.keys([
				'package/modules/1.js'
				'package/modules/2.js'
				'package/modules/3.js'
				'package/modules/4.js'
				'package/modules/6.js'
			])

		it 'should add core module', ->
			pckg.addModule('events')
			expect(pckg.modules).to.include.keys('events')

		it 'should add module from base directory', ->
			pckg.addModule('./modules/1.js')
			expect(pckg.modules).to.include.keys('modules/1.js')
			expect(pckg.modules['modules/1.js']).to.be.equal(dir + '/modules/1.js')

		it 'should add modules from base directory', ->
			pckg.addModule('./modules/*.js<$>')
			expect(pckg.modules).to.include.keys([
				'modules/1.js'
				'modules/2.js'
				'modules/3.js'
				'modules/4.js'
				'modules/6.js'
			])

		it 'should add installed npm module', ->
			pckg.addModule('module/test.js')
			expect(pckg.modules).to.include.keys('module/test.js')
			expect(pckg.modules['module/test.js']).to.be.equal(dir + '/node_modules/module/test.js')

		it 'should add installed npm modules', ->
			pckg.addModule('module/*.js<$>')
			expect(pckg.modules).to.include.keys([
				'module',
				'module/test.js',
				'module/test2.js'
			])

	describe '#addAlias()', ->
		it 'should throw an error if module is not registered', ->
			expect( -> pckg.addAlias('unknown', 'new')).to.throw(Error)

		it 'should create new module for alias', ->
			pckg.addModule('module/test.js')
			pckg.addAlias('module/test.js', 'test')
			expect(pckg.modules).to.include.keys(['module/test.js', 'test'])
			expect(pckg.modules.test).to.be.equal("`module.exports = require('module/test.js');`")

		it 'should create new module for alias without extension', ->
			pckg.addModule('module/test.js')
			pckg.addAlias('module/test', 'test')
			expect(pckg.modules).to.include.keys(['module/test.js', 'test'])

		it 'should create new module for alias without exact file path', ->
			pckg.addModule('module/any/index.json')
			pckg.addAlias('module/any', 'any')
			expect(pckg.modules).to.include.keys(['module/any/index.json', 'any'])

	describe '#addToAutorun()', ->
		it 'should add module to autorun', ->
			pckg.addModule('module/test.js')
			pckg.addToAutorun('module/test.js')
			expect(pckg.run).to.include.members(['module/test.js'])

		it 'should add module to autorun without extension', ->
			pckg.addModule('module/test.js')
			pckg.addToAutorun('module/test')
			expect(pckg.run).to.include.members(['module/test.js'])

		it 'should add module to autorun without exact file path', ->
			pckg.addModule('module/any/index.json')
			pckg.addToAutorun('module/any')
			expect(pckg.run).to.include.members(['module/any/index.json'])

		it 'should add library from absolute path', ->
			pckg.addToAutorun(dir + '/libs/begin/1.js')
			expect(pckg.run).to.include.members([dir + '/libs/begin/1.js'])

		it 'should add library from relative path', ->
			pckg.addToAutorun('./libs/begin/1.js')
			expect(pckg.run).to.include.members([dir + '/libs/begin/1.js'])

		it 'should add all js libraries from absolute path', ->
			pckg.addToAutorun(dir + '/libs/begin/*.js<$>')
			expect(pckg.run).to.include.members([
				dir + '/libs/begin/1.js'
				dir + '/libs/begin/2.js'
				dir + '/libs/begin/3.js'
				dir + '/libs/begin/4.js'
				dir + '/libs/begin/6.js'
			])

		it 'should add all js libraries from relative path', ->
			pckg.addToAutorun('./libs/begin/*.js<$>')
			expect(pckg.run).to.include.members([
				dir + '/libs/begin/1.js'
				dir + '/libs/begin/2.js'
				dir + '/libs/begin/3.js'
				dir + '/libs/begin/4.js'
				dir + '/libs/begin/6.js'
			])

		it 'should throw an error if module or library does not exists', ->
			expect( -> pckg.addToAutorun('unknown')).to.throw(Error)

	describe '#resolveRegisteredModule()', ->
		it 'should return same name', ->
			pckg.addModule('module/test.js')
			expect(pckg.resolveRegisteredModule('module/test.js')).to.be.equal('module/test.js')

		it 'should return full name from name without extension', ->
			pckg.addModule('module/test.js')
			expect(pckg.resolveRegisteredModule('module/test')).to.be.equal('module/test.js')

		it 'should return full name from directory', ->
			pckg.addModule('module/any/index.json')
			expect(pckg.resolveRegisteredModule('module/any')).to.be.equal('module/any/index.json')

		it 'should return null if module is not registered', ->
			expect(pckg.resolveRegisteredModule('unknown')).to.be.null