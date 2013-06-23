coffee = require 'coffee-script'
eco = require 'eco'
less = require 'less'
Q = require 'q'
path = require 'path'
stylus = require 'stylus'
sass = require 'node-sass'
fs = require 'fs'
exec = require('child_process').exec


class Compilers


	simq: null


	constructor: (@simq) ->


	hasLoader: (ext) ->
		ext = ext.toLowerCase()
		return typeof @[ext + 'Loader'] != 'undefined'


	prepare: (file, content) ->
		deferred = Q.defer()
		file = path.resolve(file)
		ext = path.extname(file).substr(1).toLowerCase()

		if @hasLoader(ext)
			@[ext + 'Loader'](content, file).then( (content) ->
				deferred.resolve(content.replace(/^\s+|\s+$/g, ''))
			, (e) ->
				deferred.reject(e)
			)
		else
			deferred.resolve(content.replace(/^\s+|\s+$/g, ''))
		return deferred.promise


	hasCompiler: (ext) ->
		ext = ext.toLowerCase()
		return typeof @[ext + 'Compiler'] != 'undefined'


	compile: (file, content) ->
		deferred = Q.defer()
		file = path.resolve(file)
		ext = path.extname(file).substr(1).toLowerCase()

		if !@hasCompiler(ext) then throw new Error 'File type ' + ext + ' is not supported.'

		@[ext + 'Compiler'](content, file).then( (content) -> deferred.resolve(content) )
		return deferred.promise


	coffeeLoader: (content, file) ->
		deferred = Q.defer()

		try
			deferred.resolve(coffee.compile(content, filename: file, literate: false))
		catch e
			deferred.reject(e)

		return deferred.promise

	tsLoader: (content, file) ->
		deferred = Q.defer()
		file = path.resolve(file)
		dir = path.dirname(file)
		name = path.basename(file, path.extname(file))
		fileName = dir + '/' + name + '.js'
		ts = path.resolve(__dirname + '/../../node_modules/typescript/bin/tsc.js')
		exec('node ' + ts + ' ' + file, (e, stdout, stderr) =>
			if e then deferred.reject(@parseTsError(e, file))
			else
				fs.readFile(fileName, 'utf-8', (e, content) =>
					fs.unlink(fileName)
					if e then deferred.reject(e)
					else
						@prepare(fileName, content).then( (content) ->
							deferred.resolve(content)
						, (e) ->
							deferred.reject(e)
						)
				)
		)

		return deferred.promise

	ecoLoader: (content) -> return Q.resolve(eco.precompile(content))

	lessLoader: (content, file) ->
		deferred = Q.defer()
		debug = @simq.config.load().debugger

		options =
			paths: [path.dirname(file)]
			optimization: 1
			filename: file
			rootpath: ''
			relativeUrls: false
			strictImports: false
			compress: !debug.styles

		if debug.styles && debug.sourceMap then options.dumpLineNumbers = 'mediaquery'

		try
			less.render(content, options, (e, content) =>
				if e then deferred.reject(@parseLessError(e)) else deferred.resolve(content)
			)
		catch e
			deferred.reject(@parseLessError(e))

		return deferred.promise

	stylLoader: (content, file) ->
		deferred = Q.defer()

		stylus(content)
			.include(path.dirname(file))
			.set('include css', ('--includeCss' in process.argv))
			.set('compress', !@simq.config.load().debugger.styles)
			.render( (e, content) =>
				if e then deferred.reject(@parseStylusError(e, file)) else deferred.resolve(content)
			)

		return deferred.promise

	scssLoader: (content, file) ->
		deferred = Q.defer()

		try
			content = sass.renderSync(
				data: content
				includePaths: [path.dirname(file)]
				#outputStyle: if @simq.config.load().debugger.styles then 'compact' else 'compressed'		bug in sass
			)
			deferred.resolve(content)
		catch e
			deferred.reject(@parseSassError(e, file))

		return deferred.promise


	jsCompiler: (content) -> return Q.resolve('return (function() {\n' + content + '\n\t\t}).call(this);')

	coffeeCompiler: (content) -> return Q.resolve('return ' + content)

	tsCompiler: (content) -> return Q.resolve('return (function() {\n' + content + '\n\t\t}).call(this);')

	jsonCompiler: (content) -> return Q.resolve('module.exports = ' + content)

	ecoCompiler: (content) ->
		if @simq.config.load().template.jquerify == true
			module =			# this snippet of code is from spine/hem package
				"""
				module.exports = function (values, data) {
					var $  = jQuery, result = $();
					values = $.makeArray(values);
					data = data || {};
					for (var i=0; i < values.length; i++) {
						var value = $.extend({}, values[i], data, {index: i});
						var elem  = $((#{content})(value));
						elem.data('item', value);
						$.merge(result, elem);
					}
					return result;
				};
				"""
		else
			module = 'module.exports = ' + content

		return Q.resolve(module)


	parseLessError: (e) ->
		err = new Error e.type + 'Error: ' + e.message.replace(/[\s\.]+$/, '') + ' in ' + e.filename + ':' + e.line + ':' + e.column
		err.type = e.type
		err.filename = e.filename
		err.line = e.line
		err.column = e.column

		return err


	parseStylusError: (e, file) ->
		data = e.message.split('\n')
		line = data[0].split(':')[1]
		message = data[data.length - 2]

		err = new Error message + ' in '  + file + ':' + line
		err.type = e.name
		err.filename = file
		err.line = line

		return err


	parseSassError: (e, file) ->
		data = e.message.split('\n')[0].match(/^\:(\d+)\:\serror\:\s(.*)/)
		line = data[1]
		message = data[2]

		err = new Error message + ' in ' + file + ':' + line
		err.filename = file
		err.line = line

		return err


	parseTsError: (e, file) ->
		err = new Error e.message.replace(/^Command\sfailed\:\s/, '')
		err.filename = file

		return err


module.exports = Compilers