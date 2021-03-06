[![NPM version](https://img.shields.io/npm/v/simq.svg?style=flat-square)](http://badge.fury.io/js/simq)
[![Dependency Status](https://img.shields.io/gemnasium/Carrooi/Node-Simq.svg?style=flat-square)](https://gemnasium.com/Carrooi/Node-Simq)
[![Build Status](https://img.shields.io/travis/Carrooi/Node-Simq.svg?style=flat-square)](https://travis-ci.org/Carrooi/Node-Simq)

[![Donate](https://img.shields.io/badge/donate-PayPal-brightgreen.svg?style=flat-square)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BTJNKVQLQJ6NG)

## Abandoned

Unfortunately I don't have any more time to maintain this repository :-(

![sad cat](https://raw.githubusercontent.com/sakren/sakren.github.io/master/images/sad-kitten.jpg)

# SimQ - Common js module loader for browser (Simple reQuire)

Join and minify all your javascript files into one (even remote ones) and use them in browser just like in node server.
Same also for your style files.

## Installation

```
$ npm install -g simq
```

## Supported files

Javascript:

* .js (plain javascript)
* .json
* .coffee ([coffee-script](http://coffeescript.org/))
* .ts ([TypeScript](http://www.typescriptlang.org/))

Styles:

* .less ([Less](http://lesscss.org/))
* .scss ([Sass](http://sass-lang.com/))
* .styl ([Stylus](http://learnboost.github.io/stylus/))

Templates:

* .eco ([eco](https://npmjs.org/package/eco), [documentation](https://github.com/sstephenson/eco/blob/master/README.md))

Unfortunately typescript is really slow for processing by SimQ. This is because typescript does not provide any
public API for other programmers, so there is just some slow workaround. This is really good point to use cache (see below).

For more information, please look into [source-compiler](https://npmjs.org/package/source-compiler) documentation.

## Creating application

```
$ simq create name-of-my-new-application
```

This will create base and default skeleton for your new application.

## Configuration

SimQ using [easy-configuration](https://npmjs.org/package/easy-configuration) module for configuration and configuration
is loaded from json file. Default path for config file is `./config/setup.json`.

Also you will need classic `package.json` file in your project. SimQ will use some information also from this file.

There are several sections in your config files, but the main one is section `packages`. This section holds information
about your modules and external libraries which will be packed into your final javascript or css file.
The name `packages` also suggests, that you can got more independent packages in one application.

config:
```
{
	"packages": {
		"nameOfYourFirstPackage": {
			"target": "./path/to/the/result/javascript/file.js"
			"modules": [
				"./my/first/module.coffee",
				"./my/second/module.js",
				"./my/third/module.ts",
				"./my/other/modules/*.coffee",
				"./even/more/modules/here/*.<(coffee|js|ts)$>",
				"./libs/jquery/jquery.js"
			],
			"libraries": {
				"begin": [
					"./some/external/library/in/the/beginning/of/the/result/file.js",
					"http://some.library/in/remote/server.js",
					"./and/some/other/files/*.js"
				],
				"end": [
					"./some/external/library/in/the/end/of/the/result/file.js"
				]
			},
			"style": {
				"in": "./css/style.less",
				"out": "./path/to/the/result/style/file.css"
			}
		},
		"nameOfYourSecondPackage": {

		}
	}
}
```

This is the basic configuration, where you can see, how to load your modules and libraries. Plus modules and libraries
can be loaded with one by one or with asterisk or with regular expression, which have to be enclosed in <> (see full documentation of
[fs-finder](https://npmjs.org/package/fs-finder)).

SimQ automatically adds some modules to your project. If you defined `main` section in your `package.json` file or
if you have got `index.js` file in your project directory, then this file will be added. Also all defined dependencies from
`package.json` file. It adds these main files, `package.json` files and also try to look for other dependent files and pack
them as well.

Unfortunately looking for dependent files works just for `.js` files.

## External libraries

In example above, you could see `libraries` section with two sub sections `begin` and `end`. There you can set some external
libraries and their position in result file (beginning or the end of the file).

For libraries on remote server you can use http or https protocol.

If you need more control over position of these libraries in result js file, please look below into documentation for `run
section`.

## Styles

If you are using some CSS framework, you can let SimQ to handle these files too.

You just need to define `input` and `output` file.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"style": {
				"in": "./css/style.less",
				"out": "./css/style.css"
			}
		}
	}
}
```

Based on file extension in `in` variable, the right css framework will be chosen.

## Templates

SimQ currently supports only [eco](https://npmjs.org/package/eco) templating system. Template files are defined in `modules`
section and you can use them just like every other module (see below).

There is also configuration which can save you few characters and wrap your eco templates automatically into jquery.

config:
```
{
	"packages": {
		"my-package": {
			"modules": [
				"./app/views/*.eco"
			]
		}
	},
	"template": {
		"jquerify": true
	}
}
```

## Building application

There are three options how to build your application: build to disk, watch automatically for changes and create server.

```
$ cd /var/www/my-application
$ simq build
```

Or auto watching for changes:

```
$ simq watch
```

Or server:

```
$ simq server
```

## Server

Server has got it's own setup in your config file. You can set port of your server (default is 3000) and custom routes.

config:
```
{
	"server": {
		"port": 4000
	},
	"routes": {
		"main": "./index.html",
		"prefix": "app/",
		"routes": {
			"data-in-directory": "./someDirectoryOnMyDisk",
			"source-file": "./someRandomFileOnMyDisk"
		}
	}
}
```

Both these sections server and routes are top level sections in config file (like packages section).

In routes section, we've set main index html file (default is `./public/index.html`), prefix for our application and routes.
If you set prefix, then every route url will be prefixed with it (default is `/`). And I guess that routes doesn't need any other explanation.

SimQ will also automatically set routes for your result javascript and style files.

In this example there will be just three urls (if index.html file exists):
* `http://localhost:4000/app/`
* `http://localhost:4000/app/data-in-directory/<some file>`
* `http://localhost:4000/app/source-file`

## Using modules

In your application you can use modules you defined just like you used to in node js.

```
<script type="text/javascript" src="path/to/the/result/javascript/file.js"></script>
<script type="text/javascript">
	(function() {
		var Application = require('/my/first/module');

		this.app = new Application;
	}).call(window);
</script>
```

Here we created instance of my/first/module and stored it in window object (window.app).

Paths for modules have to be absolute from directory where you run `simq build` command. Exception are other modules,
if you want to use module inside another module, you can require them also relatively.

File extensions are also optional.

`lib/form.coffee`:
```
var FormValidator = require('./validator');
var SomethingElse = require('../../SomethingElseWithExtension.js');
```

## npm modules

You can also use modules from npm, but be carefully with this, because of usages of internal modules, which are not
implemented in browser or in SimQ (see compatibility section bellow).

Just define your module in your `package.json` file and run install command.

```
$ npm install .
```

Then you can use it.

```
var moment = require('moment');
```

## Aliases

Maybe you will want to shorten some frequently used modules like jQuery. For example our jquery is in ./lib/jquery directory,
so every time we want to use jquery, we have to write `require('/lib/jquery/jquery')`. Solution for this is to use aliases.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"aliases": {
				"jquery": "/lib/jquery/jquery"
			}
		}
	}
}
```

Now you can use `require('jquery')`.

## Modules somewhere else

Maybe you have got some modules somewhere else in your disk.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"modules": [
				"/module/which/is/not/in/my/project"
			]
		}
	}
}
```

Directory to this module needs to contain `package.json` file.

## Node core modules

You can define all core modules (like `events`) if you want to use them in browser.
Be careful with this, because in some cases, simq can not see node's global paths and include these modules.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"modules": [
				"events"
			]
		}
	}
}
```

## Run automatically

It would be great if some modules can be started automatically after script is loaded to the page. You can got for example
one Bootstrap.js module, which do not export anything but just loads for example Application.js module and prepare your
application. With this in most cases you don't have to got any javascript code in your HTML files!

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"run": [
				"/app/setup",
				"/app/Bootstrap"
			]
		}
	}
}
```

You may also need for some reason your libraries (not modules) in exact position (for example right before running module /app/Bootstrap).
You just need to set paths to these libraries in run section and not in libraries section, prepended with `- `.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"run": [
				"/app/setup",
				"- ./libs/some/setup.js",
				"/app/Bootstrap"
			]
		}
	}
}
```

## Standalone builds

By default, require object is exposed into window object so you can use it also in your .html files, not just in your
compiled .js files.

This behavior can be of course changed, which is useful for example if you want to publish standalone package (or library)
but this package is written with node modular style.

config:
```
{
	"debugger": {
		"expose": false
	}
}
```

Now there will be no require function in `window` object and also non of your modules (you can not require them), so
next step is to create new module, for example `./lib/prepare.js` in which you will expose all your desired modules
into `window` object. Last thing you need to do is to add this `./lib/prepare.js` module into `autorun` section.

## Base namespace

If you have got more packages in your application, then writing some paths may be boring. Good example is when you rewriting
your application and when you have got your new js files for example in `./_NEW_` directory. It is not good to write
anything like this: `require('_NEW_/app/Bootstrap')`. So you can set base "namespace" of every package.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"base": "./_NEW_/"
		}
	}
}
```

## Changing config path

```
$ simq build --config my/own/path/to/config.json
```

## Minify result files

It is better to minify your files in production version. Only thing what you will need to do, is add new section to your config file.

config:
```
{
	"packages": {

    },
	"debugger": {
		"minify": true
	}
}
```

## Files stats

You can get some stats information (`atime`, `mtime`, `ctime`) about your modules.

```
var stats = require.getStats('/name/of/some/module');

console.log('atime: ' + stats.atime.getTime());
console.log('mtime: ' + stats.mtime.getTime());
console.log('ctime: ' + stats.ctime.getTime());
```

Keep in mind, that `atime` is changed every time, you access module with `require` method.

If you want to disable this options, you have to disable option `filesStats` in your config file.

config:
```
{
	"packages": {

	},
	"debugger": {
		"filesStats": false
	}
}
```

## Skip packages

If you want to temporary disable some packages from processing by SimQ, you can set `skip` option for this package in
your config file.


config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"skip": true
		}
	}
}
```

## Logging

There are to options how to log all actions in simq: logging into file or into console. Setup is in your config file in
debugger section.

Path to file log is relative to directory where simq command was called. This is not affected with `base` option in
configuration.

Into console:
```
{
	"packages": {

	},
	"debugger": {
		"log": "console"
	}
}
```

Into file:
```
{
	"packages": {

	},
	"debugger": {
		"log": "./path/to/log/file.log"
	}
}
```

## Caching

In large applications or in applications with typescript (explanation above) it is good to turn on cache. SimQ using
[cache-storage](https://npmjs.org/package/cache-storage) module.

config:
```
{
	"cache": {
		"directory": "./temp"
	}
}
```

Now when there is request for rebuild application, SimQ will first try to load result files (compiled) from cache and
only if they are not in cache, they will be processed and saved to cache. Next time there is no need to recompile every
file again, so they will be loaded from cache.

This is little bit harder with styles, because they importing other files into itself, so cache do not know which files
must be invalidated. If you also want to use cache in styles, you have to define dependent files in your config file.
Luckily you don't have to write every file on your own, but let [fs-finder](https://npmjs.org/package/fs-finder) do
the job for you.

config:
```
{
	"packages": {
		"nameOfYourFirstModule": {
			"style": {
				"in": "./css/style.less",
				"out": "./css/style.css",
				"dependencies": [
					"./css/<*.less$>"
				]
			}
		}
	}
}
```

For more information look into documentation of [source-compiler](https://npmjs.org/package/source-compiler).

## Compatibility with node

Global objects [link](http://nodejs.org/api/globals.html):
* require: yes
* require.resolve: yes
* require.cache: yes
* __filename: yes
* __dirname: yes
* process: yes (partially)
* module: yes (partially)
* exports: yes

Process object
* cwd: yes
* argv: yes
* env: yes

Module object:
* module.exports: yes
* module.require: no
* module.id: yes
* module.filename: yes
* module.loaded: yes
* module.parent: no
* module.children: no

## Remove files created by simq

```
$ simq clean
```

This will remove all result js and css files with temp files.

## Tests

This command will run two testing "groups": for node and for browser.

```
$ npm test
```

## Changelog

* 5.6.6
	+ Abandon project

* 5.6.5
	+ Move under Carrooi organization
	+ Abandon project

* 5.6.4
	+ Much better expansion of other libraries

* 5.6.3
	+ Optimized packages.ignore options
	+ Bug with minifying styles when there were no styles [[#20](https://github.com/Carrooi/Node-Simq/issues/20)]

* 5.6.2
	+ Libraries were not called in window context

* 5.6.1
	+ Bug with node modules required from another module

* 5.6.0
	+ Added support for configurable modules [[#14](https://github.com/Carrooi/Node-Simq/issues/14)]
	+ Normalizing all paths in `require.resolve` (previously it was only for relative paths)
	+ `require.resolve` throws an error if path does not exists (like in node.js) [[#19](https://github.com/Carrooi/Node-Simq/issues/19)]
	+ Added support for standalone builds
	+ Improvements in documentation
	+ Updated dependencies

* 5.5.1
	+ Circular references are handled just like in node environment

* 5.5.0
	+ Added logger
	+ Added options `ignore.package` and `ignore.main`
	+ Wrong paths when using `base` option with `paths.package`

* 5.4.1
	+ Bug with custom package and node modules paths
	+ Improved including node modules

* 5.4.0
	+ Option `packagePath` removed
	+ Added option `paths.package`
	+ Added option `paths.npmModules`

* 5.3.0 (actually 5.2.1 - mistake, sorry)
	+ `Application` option renamed to `target` (BC break!)
	+ Updated dependencies
	+ Optimized tests
	+ Added `autoNpmModules` option
	+ Added `packagePath` option

* 5.2.0
	+ Updated dependencies
	+ Modules for tests does not need to be installed globally
	+ Added [fury](https://badge.fury.io/), [gemnasium](https://gemnasium.com) and [travis](https://travis-ci.org/) badges
	+ Tests for node and browser are separated
	+ Throwing exception when core module was not found (node globalPaths is empty) + tests temporary disabled

* 5.1.4
	+ Updated dependencies
	+ Updated sandbox
	+ Removing project git files after create command

* 5.1.3
	+ Changed port of testing server
	+ Modules are called in window context

* 5.1.2
	+ Optimization in tests
	+ method require.__setStats is not removed now
	+ filesStats option is now true in default

* 5.1.1
	+ Misunderstanding in docs

* 5.1.0
	+ Some directories were not in git so some tests failed
	+ Added some info about tests
	+ Added `filesStats` option and `getStats` method

* 5.0.4
	+ Better error messages

* 5.0.2 - 5.0.3
	+ Bug with requiring relative modules in npm module

* 5.0.1
	+ Some bad tests
	+ npm modules in run section did not work

* 5.0.0
	+ Rewritten tests
	+ Better documentation
	+ Better error messages from compiler
	+ SimQ is completely rewritten
	+ Classes are not so dependent on each other like before (can be used programatically)
	+ Auto searching for dependencies from `package.json`
	+ Much better compatibility with node
	+ Added many tests
	+ Easier modules definition

* 4.5.5
	+ Bug with watching

* 4.5.4
	+ require.resolve returns full path for aliases

* 4.5.3
	+ Added argv and env to process variable

* 4.5.2
	+ Optimized base namespace option

* 4.5.1
	+ More debug info

* 4.5.0
	+ Added clean option

* 4.4.3 - 4.4.4
	+ Bug with core modules

* 4.4.2
	+ Optimization
	+ More verbose

* 4.4.1
	+ Strange bug with same named variables (in different places)

* 4.4.0
	+ Added support for core modules
	+ Prepared process object

* 4.3.0
	+ Again some improvements
	+ Bugs
	+ Browser code should be faster
	+ Added fsModules

* 4.2.0
	+ Many improvements
	+ Showing information about using node core modules
	+ Bugs in server option

* 4.1.1
	+ Bug with building application

* 4.1.0
	+ Added ability to run own code from run section

* 4.0.0
	+ Bugs
	+ Optimizations in configuration
	+ Updated for new version of [easy-configuration](https://npmjs.org/package/easy-configuration)
	+ Bugs in tests
	+ Added skip option

* 3.9.2
	+ Added tests for styles
	+ Bug with eco templates
	+ Optimizations

* 3.9.1
	+ auto 'module.exports' for json files

* 3.9.0
	+ Base namespace is applied also for results files and style files (BC break)
	+ Bug with styles and application building
	+ Some optimizations

* 3.8.0
	+ Many typos in readme
	+ Files are compiled with [source-compiler](https://npmjs.org/package/source-compiler)
	+ Added other tests
	+ Optimizations
	+ Some bugs in building application

* 3.7.3
	+ Typos in readme (compatibility mode)

* 3.7.2
	+ Typos in readme

* 3.7.1
	+ Added information about compatibility with node
	+ Exposed require.resolve function
	+ Exposed require.cache object

* 3.7.0
	+ Module objects is almost the same like in node
	+ Added __filename and __dirname variables

* 3.6.0
	+ Added server command
	+ Added verbose option
	+ Updated sandbox

* 3.5.2
	+ Section run is compiled before libraries - end

* 3.5.1
	+ Bug with generating modules

* 3.5.0
	+ Libs section renamed to libraries
	+ Tests can be run throw `npm test` command

* 3.4.0:
	+ Added changelog
	+ Created some tests for building js application
	+ Fixed bugs in js building
