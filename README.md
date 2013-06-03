# SimQ - simple require for javascript (client)

## Installing

```
$ npm install -g simq
```

## Building

Merging all files into one will be helpful for client's browser (less http requests).

SimQ will automatically merge all your files into one for you.

```
$ cd /my/project/path
$ simq build
```

## Configuration - setup.json

The only thing what SimQ needs for run, is setup.json file, which contains configuration for your application.
The example below shows full configuration.
```
{
	"application": "./Application.js",
	"style": {
		"in": "./css/style.less",
		"out": "./css/style.css"
	}
	"modules": [
		"./app/Application.js",
		"./app/controllers/",
		"./src/*.coffee",
		"./views/*.eco",
		"./config/database.json",
		"./lib/Spine/*.coffee"
	],
	"aliases": {
		"spine": "lib/Spine/spine"
	},
	"run": [
		"lib/Spine/ajax"
	],
	"libs": {
		"begin": [
			"./lib/jquery.js"
		],
		"end": [
			"./lib/ckeditor.js"
		]
	}
}
```

Application section holds name of final file.

SimQ can also compile you styles written in less css framework.

Modules section is array with list of all your own modules. More information about how to properly create module is bellow.
There are three ways how to define your modules. You can specify every module manually, or you can write just path to base dirs with slash in the end - this will load all modules in this folder recursively. The last possible way is to load everything from specified folder, but only files with given extension.

Some external libraries may use other module paths than paths generated by SimQ. Solution for this problem is using aliases for these cases. (eg: spine framework)

In section 'run', you can set names of modules, which should be called automatically on page load.

Last section defines other libraries and the place where they should be inserted.

In this example you can also see all supported files: js, coffee, json and eco for templating.

## Packages

Another way of defining your modules, is using packages. This is useful when you want to split your application to
some independent packages (eg. admin application, frontend application).

Just simply add "packages" section with names of your packages. The rest of configuration of each package is the same like above.

```
{
	"packages": {
		"admin": {

		},
		"frontend": {

		}
	}
}
```

## Module

Every module is simple javascript file. Here is example for hello word application.

```
// file app/helloWord.js

(function() {

	module.exports = function() {
		alert('hello word');
	};

}).call(this);
```

## Using module

```
<script type="text/javascript" src="Application.js"></script>
<script type="text/javascript">
	var hello = require('app/helloWord');

	hello();
</script>
```

You can notice that in require, we are not using any file extension - just like in node.

## Coffee script modules
If your are using coffee script, everything will be even much easier.

```
# file app/helloWord.coffee

module.exports = -> alert 'hello word'
```
As you can see, module definition is just a class (or any other code) and return statement. This is done because of coffee-script itself, which automatically wrap all your code into it's own scope.

## Templating
SimQ includes eco template engine, so you can really simply require also your templates. Eco documentation: [link](https://github.com/sstephenson/eco#eco-embedded-coffeescript-templates).

Example of usage:
```
var data = {
	items: ['first', 'second', 'third']
}

$(require('views/menu')(data)).appendTo('body')
```

## Watching for changes
It is also very simple to tell the SimQ to watch your files for changes. This is much easier than running 'simq build' after each change in your code.

```
$ cd /my/project/path
$ simq watch
```

## Compress result
In default, SimQ automatically compress result javascript file, but sometimes (for example for debug reasons), you may want to see it uncompressed.
This can be achieved by adding "debug" to build or watch command.

```
$ simq build --debug
```