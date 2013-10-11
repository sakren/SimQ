/** Generated by SimQ **/
/** modules **/

// Generated by CoffeeScript 1.6.3
(function() {
  var SUPPORTED, cache, modules, require, resolve;

  if (!this.require) {
    SUPPORTED = ['js', 'json', 'ts', 'coffee', 'eco'];
    modules = {};
    cache = {};
    require = function(name, parent) {
      var fullName, m;
      if (parent == null) {
        parent = null;
      }
      fullName = resolve(name, parent);
      if (fullName === null) {
        throw new Error('Module ' + name + ' was not found.');
      }
      if (typeof cache[fullName] === 'undefined') {
        m = {
          exports: {},
          id: fullName,
          filename: fullName,
          loaded: false,
          parent: null,
          children: null
        };
        modules[fullName].apply(modules[fullName], [m.exports, m]);
        m.loaded = true;
        cache[fullName] = m;
      }
      return cache[fullName].exports;
    };
    resolve = function(name, parent) {
      var ext, num, part, parts, prev, result, _i, _j, _k, _len, _len1, _len2;
      if (parent == null) {
        parent = null;
      }
      if (parent !== null && name[0] === '.') {
        num = parent.lastIndexOf('/');
        if (num !== -1) {
          parent = parent.substr(0, num);
        }
        name = parent + '/' + name;
        parts = name.split('/');
        result = [];
        prev = null;
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          part = parts[_i];
          if (part === '.' || part === '') {
            continue;
          } else if (part === '..' && prev) {
            result.pop();
          } else {
            result.push(part);
          }
          prev = part;
        }
        name = '/' + result.join('/');
      }
      if (typeof modules[name] !== 'undefined') {
        return name;
      }
      for (_j = 0, _len1 = SUPPORTED.length; _j < _len1; _j++) {
        ext = SUPPORTED[_j];
        if (typeof modules[name + '.' + ext] !== 'undefined') {
          return name + '.' + ext;
        }
      }
      for (_k = 0, _len2 = SUPPORTED.length; _k < _len2; _k++) {
        ext = SUPPORTED[_k];
        if (typeof modules[name + '/index.' + ext] !== 'undefined') {
          return name + '/index.' + ext;
        }
      }
      return null;
    };
    this.require = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return require(name, parent);
    };
    this.require.resolve = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return resolve(name, parent);
    };
    this.require.define = function(bundle) {
      var m, name, _results;
      _results = [];
      for (name in bundle) {
        m = bundle[name];
        _results.push(modules[name] = m);
      }
      return _results;
    };
    this.require.release = function() {
      var name, _results;
      _results = [];
      for (name in cache) {
        _results.push(delete cache[name]);
      }
      return _results;
    };
    this.require.cache = cache;
  }

  return this.require.define;

}).call(this)({
'one': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'one');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'one';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'one';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'one'], env: {}};

	/** code **/
	module.exports = 'one/' + require('two');

},'two': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'two');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'two';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'two';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'two'], env: {}};

	/** code **/
	module.exports = 'two/' + require('three');

},'three': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'three');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'three';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'three';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'three'], env: {}};

	/** code **/
	module.exports = 'three';

},'/app/Application.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/app/Application.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/app/Application.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/app/Application.coffee';
	var __dirname = '/app';
	var process = {cwd: function() {return '/';}, argv: ['node', '/app/Application.coffee'], env: {}};

	/** code **/
	(function() {
	  module.exports = 'Application';
	
	}).call(this);
	

},'/app/Bootstrap.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/app/Bootstrap.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/app/Bootstrap.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/app/Bootstrap.coffee';
	var __dirname = '/app';
	var process = {cwd: function() {return '/';}, argv: ['node', '/app/Bootstrap.coffee'], env: {}};

	/** code **/
	(function() {
	
	
	}).call(this);
	

},'/app/Random.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/app/Random.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/app/Random.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/app/Random.coffee';
	var __dirname = '/app';
	var process = {cwd: function() {return '/';}, argv: ['node', '/app/Random.coffee'], env: {}};

	/** code **/
	(function() {
	  var Random;
	
	  Random = (function() {
	    function Random() {}
	
	    Random.prototype.num = null;
	
	    Random.prototype.generate = function() {
	      if (this.num === null) {
	        this.num = Math.random();
	      }
	      return this.num;
	    };
	
	    return Random;
	
	  })();
	
	  module.exports = new Random;
	
	}).call(this);
	

},'/app/views/message.eco': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/app/views/message.eco');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/app/views/message.eco';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/app/views/message.eco';
	var __dirname = '/app/views';
	var process = {cwd: function() {return '/';}, argv: ['node', '/app/views/message.eco'], env: {}};

	/** code **/
	module.exports = (function() {
	  return function(__obj) {
	    if (!__obj) __obj = {};
	    var __out = [], __capture = function(callback) {
	      var out = __out, result;
	      __out = [];
	      callback.call(this);
	      result = __out.join('');
	      __out = out;
	      return __safe(result);
	    }, __sanitize = function(value) {
	      if (value && value.ecoSafe) {
	        return value;
	      } else if (typeof value !== 'undefined' && value != null) {
	        return __escape(value);
	      } else {
	        return '';
	      }
	    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
	    __safe = __obj.safe = function(value) {
	      if (value && value.ecoSafe) {
	        return value;
	      } else {
	        if (!(typeof value !== 'undefined' && value != null)) value = '';
	        var result = new String(value);
	        result.ecoSafe = true;
	        return result;
	      }
	    };
	    if (!__escape) {
	      __escape = __obj.escape = function(value) {
	        return ('' + value)
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;');
	      };
	    }
	    (function() {
	      (function() {
	        __out.push('<span>hello ');
	      
	        __out.push(__sanitize(this.name));
	      
	        __out.push('</span>');
	      
	      }).call(this);
	      
	    }).call(__obj);
	    __obj.safe = __objSafe, __obj.escape = __escape;
	    return __out.join('');
	  }
	}).call(this);

},'/test/Require.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/Require.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/Require.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/Require.coffee';
	var __dirname = '/test';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/Require.coffee'], env: {}};

	/** code **/
	(function() {
	  var require;
	
	  require = window.require;
	
	  describe('require', function() {
	    beforeEach(function() {
	      return require.release();
	    });
	    afterEach(function() {
	      return require.release();
	    });
	    describe('#resolve()', function() {
	      it('should return same name for module', function() {
	        return expect(require.resolve('/app/Application.coffee')).to.be.equal('/app/Application.coffee');
	      });
	      it('should return name of module without extension', function() {
	        return expect(require.resolve('/app/Application')).to.be.equal('/app/Application.coffee');
	      });
	      it('should return name of module from parent', function() {
	        return expect(require.resolve('./Application.coffee', '/app/Bootstrap.coffee')).to.be.equal('/app/Application.coffee');
	      });
	      it('should return name of module from parent without extension', function() {
	        return expect(require.resolve('./Application', '/app/Bootstrap.coffee')).to.be.equal('/app/Application.coffee');
	      });
	      it('should resolve name in root directory', function() {
	        return expect(require.resolve('/setup.js')).to.be.equal('/setup.js');
	      });
	      it('should resolve name in root without extension', function() {
	        return expect(require.resolve('/setup')).to.be.equal('/setup.js');
	      });
	      it('should resolve name for main file', function() {
	        return expect(require.resolve('/index.js')).to.be.equal('/index.js');
	      });
	      it('should resolve name for main file without extension', function() {
	        return expect(require.resolve('/index')).to.be.equal('/index.js');
	      });
	      it('should resolve name for package file', function() {
	        return expect(require.resolve('/package.json')).to.be.equal('/package.json');
	      });
	      return it('should resolve name for package file withoud extension', function() {
	        return expect(require.resolve('/package')).to.be.equal('/package.json');
	      });
	    });
	    describe('#require()', function() {
	      it('should load simple module', function() {
	        return expect(require('/app/Application.coffee')).to.be.equal('Application');
	      });
	      it('should load simple module without extension', function() {
	        return expect(require('/app/Application')).to.be.equal('Application');
	      });
	      it('should load package file', function() {
	        var data;
	        data = require('/package');
	        expect(data).to.include.keys(['name']);
	        return expect(data.name).to.be.equal('browser-test');
	      });
	      it('should load package from alias', function() {
	        return expect(require('app')).to.be.equal('Application');
	      });
	      it('should load npm module', function() {
	        return expect(require('any')).to.be.equal('hello');
	      });
	      it('should load npm module main file directly', function() {
	        return expect(require('any/index')).to.be.equal('hello');
	      });
	      it('should load package file from npm module', function() {
	        var data;
	        data = require('any/package');
	        expect(data).to.include.keys(['name']);
	        return expect(data.name).to.be.equal('any');
	      });
	      it('should load node core module', function() {
	        var events;
	        events = new require('events').EventEmitter;
	        return expect(events).to.satisfy(function(events) {
	          return Object.prototype.toString.call(events) === '[object Function]';
	        });
	      });
	      it('should load eco template', function() {
	        var template;
	        template = require('/app/views/message.eco')({
	          name: 'David'
	        });
	        return expect(template).to.be.equal('<span>hello David</span>');
	      });
	      return it('should load advanced npm module', function() {
	        return expect(require('advanced')).to.be.equal('advanced/one/two/three');
	      });
	    });
	    return describe('cache', function() {
	      it('should be empty', function() {
	        return expect(require.cache).to.be.eql({});
	      });
	      it('should contain required module', function() {
	        require('/app/Application');
	        return expect(require.cache).to.include.keys(['/app/Application.coffee']);
	      });
	      it('should load random number from cache', function() {
	        var old;
	        old = require('/app/Random').generate();
	        return expect(old).to.be.equal(require('/app/Random').generate());
	      });
	      return it('should save module to cache again', function() {
	        var name, old;
	        old = require('/app/Random').generate();
	        name = require.resolve('/app/Random');
	        delete require.cache[name];
	        return expect(old).not.to.be.equal(require('/app/Random').generate());
	      });
	    });
	  });
	
	}).call(this);
	

},'/setup.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/setup.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/setup.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/setup.js';
	var __dirname = '/';
	var process = {cwd: function() {return '/';}, argv: ['node', '/setup.js'], env: {}};

},'events': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'events');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'events';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'events';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'events'], env: {}};

	/** code **/
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var domain;
	
	exports.usingDomains = false;
	
	function EventEmitter() {
	  this.domain = null;
	  if (exports.usingDomains) {
	    // if there is an active domain, then attach to it.
	    domain = domain || require('domain');
	    if (domain.active && !(this instanceof domain.Domain)) {
	      this.domain = domain.active;
	    }
	  }
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || defaultMaxListeners;
	}
	exports.EventEmitter = EventEmitter;
	
	// By default EventEmitters will print a warning if more than
	// 10 listeners are added to it. This is a useful default which
	// helps finding memory leaks.
	//
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	var defaultMaxListeners = 10;
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (typeof n !== 'number' || n < 0)
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (typeof this._events.error === 'object' &&
	         !this._events.error.length)) {
	      er = arguments[1];
	      if (this.domain) {
	        if (!er) er = new TypeError('Uncaught, unspecified "error" event.');
	        er.domainEmitter = this;
	        er.domain = this.domain;
	        er.domainThrown = false;
	        this.domain.emit('error', er);
	      } else if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        throw TypeError('Uncaught, unspecified "error" event.');
	      }
	      return false;
	    }
	  }
	
	  handler = this._events[type];
	
	  if (typeof handler === 'undefined')
	    return false;
	
	  if (this.domain && this !== process)
	    this.domain.enter();
	
	  if (typeof handler === 'function') {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (typeof handler === 'object') {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  if (this.domain && this !== process)
	    this.domain.exit();
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (typeof listener !== 'function')
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type, typeof listener.listener === 'function' ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (typeof this._events[type] === 'object')
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (typeof this._events[type] === 'object' && !this._events[type].warned) {
	    m = this._maxListeners;
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      console.trace();
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (typeof listener !== 'function')
	    throw TypeError('listener must be a function');
	
	  function g() {
	    this.removeListener(type, g);
	    listener.apply(this, arguments);
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (typeof listener !== 'function')
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (typeof list.listener === 'function' && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (typeof list === 'object') {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (typeof listeners === 'function') {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (typeof this._events[type] === 'function')
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (typeof emitter._events[type] === 'function')
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	

},'/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/package.json';
	var __dirname = '/';
	var process = {cwd: function() {return '/';}, argv: ['node', '/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"name": "browser-test",
		"version": "1.0.0",
		"dependencies": {
			"any": "latest",
			"advanced": "latest"
		}
	}
	}).call(this);
	

},'/index.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/index.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/index.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/index.js';
	var __dirname = '/';
	var process = {cwd: function() {return '/';}, argv: ['node', '/index.js'], env: {}};

},'any/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'any/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'any/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'any/package.json';
	var __dirname = 'any';
	var process = {cwd: function() {return '/';}, argv: ['node', 'any/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"name": "any",
		"version": "1.0.0"
	}
	}).call(this);
	

},'any': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'any');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'any';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'any';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'any'], env: {}};

	/** code **/
	module.exports = 'hello';

},'advanced/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'advanced/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'advanced/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'advanced/package.json';
	var __dirname = 'advanced';
	var process = {cwd: function() {return '/';}, argv: ['node', 'advanced/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"name": "advanced"
	}
	}).call(this);
	

},'advanced': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, 'advanced');};
	require.resolve = function(name, parent) {if (parent === null) {parent = 'advanced';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = 'advanced';
	var __dirname = '.';
	var process = {cwd: function() {return '/';}, argv: ['node', 'advanced'], env: {}};

	/** code **/
	module.exports = 'advanced/' + require('one');

},'app': function(exports, module) { module.exports = window.require('/app/Application'); },'one/index.js': function(exports, module) { module.exports = window.require('one'); },'two/index.js': function(exports, module) { module.exports = window.require('two'); },'three/index.js': function(exports, module) { module.exports = window.require('three'); },'any/index.js': function(exports, module) { module.exports = window.require('any'); },'advanced/index.js': function(exports, module) { module.exports = window.require('advanced'); }
});

/** run section **/

require('/test/Require');