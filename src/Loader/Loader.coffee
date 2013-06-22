Q = require 'q'
_path = require 'path'
fs = require 'fs'
Compilers = require './Compilers'

class Loader


	simq: null

	compilers: null


	constructor: (@simq) ->
		@compilers = new Compilers(@simq)


	loadFile: (path) ->
		return ( ->
			deferred = Q.defer()

			path = _path.resolve(path)
			ext = _path.extname(path).substr(1)

			fs.readFile(path, 'utf-8', (e, data) ->
				if e then deferred.reject(new Error e) else deferred.resolve(ext: ext, content: data)
			)
			return deferred.promise
		)().then( (file) =>
			return Q.resolve(@compilers.prepare(file.ext, file.content))
		)


	loadModule: (path, base = null) ->
		return ( =>
			deferred = Q.defer()

			path = _path.resolve(path)
			ext = _path.extname(path).substr(1)

			if !@compilers.hasCompiler(ext)
				deferred.reject(new Error 'File type' + ext + ' is not supported')
			else
				@loadFile(path).then((content) -> deferred.resolve(path: path, ext: ext, content: content) )

			return deferred.promise
		)().then( (file) =>
			name = @simq.getModuleName(file.path)

			if base != null then name = name.replace(new RegExp('^' + base + '/'), '')

			module = @compilers.compile(file.ext, file.content)
			module = '\'' + name + '\': function(exports, require, module) {\n\t\t' + module + '\n\t}'

			return Q.resolve(module)
		)


	loadModules: (modules, base = null) ->
		deferred = Q.defer()
		@processModules([], modules, 0, base, (result) ->
			deferred.resolve(result)
		)
		return deferred.promise


	getModulesInDir: (dir, type = null) ->
		dir = _path.resolve(dir)
		files = fs.readdirSync(dir)
		result = []

		for name in files
			name = dir + '/' + name
			stats = fs.statSync(name)

			if stats.isFile() && name.substring(name.length - 1) != '~'
				if type
					continue if _path.extname(name) != '.' + type

				result.push(name)
			else if stats.isDirectory()
				result = result.concat(@getModulesInDir(name, type))

		return result


	processModules: (result, files, num, base = null, finish) ->
		if files.length == 0 || num == files.length
			finish(result)
			return true

		@loadModule(files[num], base).then( (content) =>
			result.push(content)
			@processModules(result, files, num + 1, base, finish)
		)


module.exports = Loader