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

}).call(this);