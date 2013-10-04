Info = require 'module-info'
fs = require 'fs'
path = require 'path'
Finder = require 'fs-finder'

Helpers = require '../Helpers'

class Package


	basePath: null

	skip: false

	application: null

	base: null

	style: null

	modules: null

	aliases: null

	run: null

	libraries: null


	constructor: (@basePath) ->
		@basePath = path.resolve(@basePath)

		@modules = {}
		@aliases = {}
		@run = []
		@libraries =
			begin: []
			end: []


	getBasePath: ->
		return @basePath + (if @base == null then '' else '/' + @base)


	setApplication: (@application) ->
		@application = Helpers.resolvePath(@basePath, @application, @base)
		return @


	setStyle: (fileIn, fileOut, dependencies = null) ->
		fileIn = Helpers.resolvePath(@basePath, fileIn, @base)
		fileOut = Helpers.resolvePath(@basePath, fileOut, @base)

		if dependencies != null
				dependencies = Helpers.expandFilesList(dependencies, @basePath, @base)

		@style =
			in: fileIn
			out: fileOut
			dependencies: dependencies

		return @


	addModule: (name) ->
		found = false

		# modules registered with absolute path
		if name[0] == '/'
			if fs.existsSync(name)
				found = true
				if fs.statSync(name).isDirectory()
					pckg = new Info(name)
					@modules[pckg.getName()] = pckg.getMainFile()
					@modules[pckg.getName() + '/package.json'] = pckg.getPackagePath()
				else
					pckg = Info.fromFile(name)
					@modules[pckg.getModuleName(name)] = name
			else
				paths = Finder.findFiles(name)
				if paths.length > 0
					found = true
					for _path in paths
						@addModule(_path)

		# core node modules
		if found == false
			_path = Helpers.getCoreModulePath(name)
			if _path != null
				found = true
				@modules[name] = _path

		# own modules from project
		if name[0] == '.' && found == false
			_path = Helpers.resolvePath(@basePath, name, @base)
			if fs.existsSync(_path)
				found = true
				pckg = Info.fromFile(_path)
				name = pckg.getModuleName(name).replace(new RegExp('^' + pckg.getName() + '\/'), '')
				@modules[name] = _path
			else
				paths = Finder.findFiles(_path)
				if paths.length > 0
					found = true
					for _path in paths
						_path = path.relative(@getBasePath(), _path)
						@addModule('./' + _path)

		# npm modules in node_modules directory
		if found == false
			_path = Helpers.resolvePath(@basePath, './node_modules/' + name, @base)
			if fs.existsSync(_path)
				found = true
				pckg = Info.fromFile(_path)
				@modules[pckg.getModuleName(_path)] = _path
			else
				paths = Finder.findFiles(_path)
				if paths.length > 0
					found = true
					for _path in paths
						_path = path.relative(@getBasePath() + '/node_modules', _path)
						@addModule(_path)

		if found == false
			throw new Error 'Module ' + name + ' was not found.'

		return @


	addAlias: (original, alias) ->
		@aliases[alias] = original
		return @


	addToAutorun: (name) ->
		@run.push(name)
		return @


	addLibraryToBegin: (_path) ->
		@libraries.begin.push(Helpers.expandFilesList(_path))
		return @


	addLibraryToEnd: (_path) ->
		@libraries.end.push(Helpers.expandFilesList(_path))
		return @


module.exports = Package