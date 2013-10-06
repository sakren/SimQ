Info = require 'module-info'
fs = require 'fs'
path = require 'path'
Finder = require 'fs-finder'

Helpers = require '../Helpers'

class Package


	@SUPPORTED = ['js', 'json', 'ts', 'coffee']


	basePath: null

	skip: false

	application: null

	base: null

	style: null

	modules: null

	run: null


	constructor: (@basePath) ->
		@basePath = path.resolve(@basePath)

		@modules = {}
		@run = []


	getBasePath: ->
		return @basePath + (if @base == null then '' else '/' + @base)


	getPath: (_path) ->
		return path.resolve(@getBasePath() + '/' + _path)


	expandPaths: (paths) ->
		result = []
		for _path in paths
			if _path.match(/^http/) == null
				_path = @getPath(_path)
				if fs.existsSync(_path) && fs.statSync(_path).isFile()
					result.push(_path)
				else
					result = result.concat(Finder.findFiles(_path))
			else
				result.push(_path)

		return result.filter( (el, pos) -> return result.indexOf(el) == pos)


	setApplication: (@application) ->
		@application = @getPath(@application)
		return @


	setStyle: (fileIn, fileOut, dependencies = null) ->
		fileIn = @getPath(fileIn)
		fileOut = @getPath(fileOut)

		if !fs.existsSync(fileIn)
			throw new Error 'File ' + fileIn + ' does not exists.'

		if dependencies != null
			dependencies = @expandPaths(dependencies)

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
			_path = @getPath(name)
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
			_path = @getPath('./node_modules/' + name)
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
		original = @resolveRegisteredModule(original)

		if original == null
			throw new Error 'Module ' + original + ' is not registered.'

		@modules[alias] = "`module.exports = require('#{original}');`"
		return @


	addToAutorun: (name) ->
		fullName = @resolveRegisteredModule(name)

		if fullName == null
			fullName = path.resolve(@getBasePath(), name)
			if !fs.existsSync(fullName)
				files = Finder.findFiles(fullName)
				if files.length == 0
					throw new Error 'Module or library' + name + ' was not found.'

				for file in files
					@addToAutorun(file)

				return @

		@run.push(fullName)

		return @


	resolveRegisteredModule: (name) ->
		if typeof @modules[name] != 'undefined'
			return name

		for ext in Package.SUPPORTED
			return name + '.' + ext if typeof @modules[name + '.' + ext] != 'undefined'

		for ext in Package.SUPPORTED
			return name + '/index.' + ext if typeof @modules[name + '/index.' + ext] != 'undefined'

		return null


	findRegisteredModule: (name) ->
		name = @resolveRegisteredModule(name)
		return if name == null then null else @modules[name]


module.exports = Package