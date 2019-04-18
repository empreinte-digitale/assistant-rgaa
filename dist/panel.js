webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(559);
	module.exports = __webpack_require__(660);


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var YAMLException = __webpack_require__(101);
	
	var TYPE_CONSTRUCTOR_OPTIONS = [
	  'kind',
	  'resolve',
	  'construct',
	  'instanceOf',
	  'predicate',
	  'represent',
	  'defaultStyle',
	  'styleAliases'
	];
	
	var YAML_NODE_KINDS = [
	  'scalar',
	  'sequence',
	  'mapping'
	];
	
	function compileStyleAliases(map) {
	  var result = {};
	
	  if (map !== null) {
	    Object.keys(map).forEach(function (style) {
	      map[style].forEach(function (alias) {
	        result[String(alias)] = style;
	      });
	    });
	  }
	
	  return result;
	}
	
	function Type(tag, options) {
	  options = options || {};
	
	  Object.keys(options).forEach(function (name) {
	    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
	      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
	    }
	  });
	
	  // TODO: Add tag format check.
	  this.tag          = tag;
	  this.kind         = options['kind']         || null;
	  this.resolve      = options['resolve']      || function () { return true; };
	  this.construct    = options['construct']    || function (data) { return data; };
	  this.instanceOf   = options['instanceOf']   || null;
	  this.predicate    = options['predicate']    || null;
	  this.represent    = options['represent']    || null;
	  this.defaultStyle = options['defaultStyle'] || null;
	  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
	
	  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
	    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
	  }
	}
	
	module.exports = Type;


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = routerWarning;
	exports._resetWarned = _resetWarned;
	
	var _warning = __webpack_require__(1011);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warned = {};
	
	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }
	
	    warned[message] = true;
	  }
	
	  message = '[react-router] ' + message;
	
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
	}
	
	function _resetWarned() {
	  warned = {};
	}

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (false) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isValidChild(object) {
	  return object == null || _react2.default.isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2.default.Children.forEach(children, function (element) {
	    if (_react2.default.isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	   false ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(1);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});
	
	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

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
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(163);
	/*</replacement>*/
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var util = __webpack_require__(100);
	util.inherits = __webpack_require__(80);
	/*</replacement>*/
	
	var Readable = __webpack_require__(433);
	var Writable = __webpack_require__(275);
	
	util.inherits(Duplex, Readable);
	
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false) this.readable = false;
	
	  if (options && options.writable === false) this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}
	
	function onEndNT(self) {
	  self.end();
	}
	
	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	
	Duplex.prototype._destroy = function (err, cb) {
	  this.push(null);
	  this.end();
	
	  processNextTick(cb, err);
	};
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),

/***/ 81:
/***/ (function(module, exports) {

	'use strict';
	
	
	function isNothing(subject) {
	  return (typeof subject === 'undefined') || (subject === null);
	}
	
	
	function isObject(subject) {
	  return (typeof subject === 'object') && (subject !== null);
	}
	
	
	function toArray(sequence) {
	  if (Array.isArray(sequence)) return sequence;
	  else if (isNothing(sequence)) return [];
	
	  return [ sequence ];
	}
	
	
	function extend(target, source) {
	  var index, length, key, sourceKeys;
	
	  if (source) {
	    sourceKeys = Object.keys(source);
	
	    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
	      key = sourceKeys[index];
	      target[key] = source[key];
	    }
	  }
	
	  return target;
	}
	
	
	function repeat(string, count) {
	  var result = '', cycle;
	
	  for (cycle = 0; cycle < count; cycle += 1) {
	    result += string;
	  }
	
	  return result;
	}
	
	
	function isNegativeZero(number) {
	  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
	}
	
	
	module.exports.isNothing      = isNothing;
	module.exports.isObject       = isObject;
	module.exports.toArray        = toArray;
	module.exports.repeat         = repeat;
	module.exports.isNegativeZero = isNegativeZero;
	module.exports.extend         = extend;


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable max-len*/
	
	var common        = __webpack_require__(81);
	var YAMLException = __webpack_require__(101);
	var Type          = __webpack_require__(11);
	
	
	function compileList(schema, name, result) {
	  var exclude = [];
	
	  schema.include.forEach(function (includedSchema) {
	    result = compileList(includedSchema, name, result);
	  });
	
	  schema[name].forEach(function (currentType) {
	    result.forEach(function (previousType, previousIndex) {
	      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
	        exclude.push(previousIndex);
	      }
	    });
	
	    result.push(currentType);
	  });
	
	  return result.filter(function (type, index) {
	    return exclude.indexOf(index) === -1;
	  });
	}
	
	
	function compileMap(/* lists... */) {
	  var result = {
	        scalar: {},
	        sequence: {},
	        mapping: {},
	        fallback: {}
	      }, index, length;
	
	  function collectType(type) {
	    result[type.kind][type.tag] = result['fallback'][type.tag] = type;
	  }
	
	  for (index = 0, length = arguments.length; index < length; index += 1) {
	    arguments[index].forEach(collectType);
	  }
	  return result;
	}
	
	
	function Schema(definition) {
	  this.include  = definition.include  || [];
	  this.implicit = definition.implicit || [];
	  this.explicit = definition.explicit || [];
	
	  this.implicit.forEach(function (type) {
	    if (type.loadKind && type.loadKind !== 'scalar') {
	      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
	    }
	  });
	
	  this.compiledImplicit = compileList(this, 'implicit', []);
	  this.compiledExplicit = compileList(this, 'explicit', []);
	  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
	}
	
	
	Schema.DEFAULT = null;
	
	
	Schema.create = function createSchema() {
	  var schemas, types;
	
	  switch (arguments.length) {
	    case 1:
	      schemas = Schema.DEFAULT;
	      types = arguments[0];
	      break;
	
	    case 2:
	      schemas = arguments[0];
	      types = arguments[1];
	      break;
	
	    default:
	      throw new YAMLException('Wrong number of arguments for Schema.create function');
	  }
	
	  schemas = common.toArray(schemas);
	  types = common.toArray(types);
	
	  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
	    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
	  }
	
	  if (!types.every(function (type) { return type instanceof Type; })) {
	    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	  }
	
	  return new Schema({
	    include: schemas,
	    explicit: types
	  });
	};
	
	
	module.exports = Schema;


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = Object.create(null);
	
	function compilePattern(pattern) {
	  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	
	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }
	
	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }
	
	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }
	
	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);
	
	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }
	
	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }
	
	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;
	
	  var params = {};
	
	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });
	
	  return params;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      !(paramValue != null || parenCount > 0) ?  false ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      !(paramValue != null || parenCount > 0) ?  false ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.findTestResults = exports.findCriteriaResults = exports.isImportActive = exports.isValid = exports.isPending = exports.getOneCriterionResults = exports.getOneTestResult = exports.getTestResults = exports.getHumanReadableErrors = exports.getErrors = exports.getVersion = exports.getConfig = exports.getContent = undefined;
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _countBy2 = __webpack_require__(839);
	
	var _countBy3 = _interopRequireDefault(_countBy2);
	
	var _groupBy2 = __webpack_require__(861);
	
	var _groupBy3 = _interopRequireDefault(_groupBy2);
	
	var _mapValues2 = __webpack_require__(386);
	
	var _mapValues3 = _interopRequireDefault(_mapValues2);
	
	var _upperFirst2 = __webpack_require__(389);
	
	var _upperFirst3 = _interopRequireDefault(_upperFirst2);
	
	var _fromPairs2 = __webpack_require__(860);
	
	var _fromPairs3 = _interopRequireDefault(_fromPairs2);
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _isEmpty2 = __webpack_require__(382);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _property2 = __webpack_require__(49);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _reference = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const getContent = exports.getContent = (0, _property3.default)('imports.content');
	
	/**
	 *
	 */
	const getConfig = exports.getConfig = (0, _property3.default)('imports.config');
	
	/**
	 *
	 */
	const getVersion = exports.getVersion = state => (0, _get3.default)(getContent(state), '[0][\'Version référentiel\']', null);
	
	/**
	 *
	 */
	const getErrors = exports.getErrors = (0, _property3.default)('imports.errors');
	
	/**
	 *
	 */
	const getHumanReadableErrors = exports.getHumanReadableErrors = state => getErrors(state).map((_ref) => {
	  let message = _ref.message,
	      row = _ref.row;
	  return row ? `Ligne ${row} : ${message}.` : `${(0, _upperFirst3.default)(message)}.`;
	});
	
	/**
	 *
	 */
	const getTestResults = exports.getTestResults = (0, _property3.default)('imports.testResults');
	
	/**
	 *
	 */
	const getOneTestResult = exports.getOneTestResult = (state, id) => state.imports.testResults[id] || '';
	
	/**
	 *
	 */
	const getOneCriterionResults = exports.getOneCriterionResults = (state, id) => state.imports.criteriaResults[id] || null;
	
	/**
	 *
	 */
	const isPending = exports.isPending = (0, _property3.default)('imports.pending');
	
	/**
	 *
	 */
	const isValid = exports.isValid = state => state.imports.content !== null && !state.imports.errors.length;
	
	/**
	 *
	 */
	const isImportActive = exports.isImportActive = state => !(0, _isEmpty3.default)(getTestResults(state));
	
	/*
	 *
	 */
	const findCriteriaResults = exports.findCriteriaResults = state => {
	  const allTests = getContent(state);
	  const resultsByCriterion = (0, _mapValues3.default)((0, _groupBy3.default)(allTests, 'Critère'), tests => (0, _countBy3.default)((0, _map3.default)(tests, test => test.Statut.toLowerCase())));
	  return resultsByCriterion;
	};
	
	/*
	 *
	 */
	const findTestResults = exports.findTestResults = state => {
	  const allTests = getContent(state);
	  const importResults = (0, _fromPairs3.default)(allTests.map((_ref2) => {
	    let Test = _ref2.Test,
	        Statut = _ref2.Statut;
	    return [Test, Statut];
	  }));
	  const testIds = (0, _reference.getTestIds)(state);
	  const referenceTestResults = {};
	  testIds.forEach(id => {
	    if (importResults[id]) {
	      referenceTestResults[id] = importResults[id].toLowerCase();
	    }
	  });
	  return referenceTestResults;
	};

/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
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
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	
	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = Buffer.isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(193).Buffer))

/***/ }),

/***/ 101:
/***/ (function(module, exports) {

	// YAML error class. http://stackoverflow.com/questions/8458984
	//
	'use strict';
	
	function YAMLException(reason, mark) {
	  // Super constructor
	  Error.call(this);
	
	  this.name = 'YAMLException';
	  this.reason = reason;
	  this.mark = mark;
	  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
	
	  // Include stack trace in error object
	  if (Error.captureStackTrace) {
	    // Chrome and NodeJS
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    // FF, IE 10+ and Safari 6+. Fallback for others
	    this.stack = (new Error()).stack || '';
	  }
	}
	
	
	// Inherit from Error
	YAMLException.prototype = Object.create(Error.prototype);
	YAMLException.prototype.constructor = YAMLException;
	
	
	YAMLException.prototype.toString = function toString(compact) {
	  var result = this.name + ': ';
	
	  result += this.reason || '(unknown reason)';
	
	  if (!compact && this.mark) {
	    result += ' ' + this.mark.toString();
	  }
	
	  return result;
	};
	
	
	module.exports = YAMLException;


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `safeLoad` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on standard YAML's Core schema and includes most of
	// extra types described at YAML tag repository. (http://yaml.org/type/)
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(82);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(336)
	  ],
	  implicit: [
	    __webpack_require__(717),
	    __webpack_require__(710)
	  ],
	  explicit: [
	    __webpack_require__(702),
	    __webpack_require__(712),
	    __webpack_require__(713),
	    __webpack_require__(715)
	  ]
	});


/***/ }),

/***/ 142:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(902);
	
	var _runTransitionHook = __webpack_require__(213);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _PathUtils = __webpack_require__(55);
	
	var _deprecate = __webpack_require__(212);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }
	
	       false ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	       false ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	       false ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `load` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on JS-YAML's default safe schema and includes
	// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
	//
	// Also this schema is used as default base schema at `Schema.create` function.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(82);
	
	
	module.exports = Schema.DEFAULT = new Schema({
	  include: [
	    __webpack_require__(102)
	  ],
	  explicit: [
	    __webpack_require__(708),
	    __webpack_require__(707),
	    __webpack_require__(706)
	  ]
	});


/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}
	
	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (a, b, reserved) {
	  // This will get id, className, style, etc.
	  for (var x in b) {
	    if (!b.hasOwnProperty(x)) continue;
	    if (reserved[x]) continue;
	    a[x] = b[x];
	  }
	};

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _deprecateObjectProperties = __webpack_require__(171);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _getRouteParams = __webpack_require__(1004);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	
	var RouterContext = _react2.default.createClass({
	  displayName: 'RouterContext',
	
	
	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2.default.createElement
	    };
	  },
	
	
	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;
	
	    if (!router) {
	       false ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;
	
	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }
	
	    if (false) {
	      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }
	
	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2.default)(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }
	
	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};
	
	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    !(element === null || element === false || _react2.default.isValidElement(element)) ?  false ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;
	
	    return element;
	  }
	});
	
	exports.default = RouterContext;
	module.exports = exports['default'];

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.canUseMembrane = undefined;
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseMembrane = exports.canUseMembrane = false;
	
	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};
	
	if (false) {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	
	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};
	
	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }
	
	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }
	
	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };
	
	      for (var prop in object) {
	        var _ret = _loop(prop);
	
	        if (_ret === 'continue') continue;
	      }
	
	      return membrane;
	    };
	  }
	}
	
	exports.default = deprecateObjectProperties;

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable node/no-deprecated-api */
	var buffer = __webpack_require__(193)
	var Buffer = buffer.Buffer
	
	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key]
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports)
	  exports.Buffer = SafeBuffer
	}
	
	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}
	
	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer)
	
	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	}
	
	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size)
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding)
	    } else {
	      buf.fill(fill)
	    }
	  } else {
	    buf.fill(0)
	  }
	  return buf
	}
	
	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	}
	
	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	}


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(606)
	var ieee754 = __webpack_require__(679)
	var isArray = __webpack_require__(335)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

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
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
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
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
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
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
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
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),

/***/ 211:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function deprecate(fn, message) {
	  return function () {
	     false ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}
	
	exports['default'] = deprecate;
	module.exports = exports['default'];

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	     false ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's Failsafe schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2802346
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(82);
	
	
	module.exports = new Schema({
	  explicit: [
	    __webpack_require__(716),
	    __webpack_require__(714),
	    __webpack_require__(709)
	  ]
	});


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var externalStateControl = __webpack_require__(393);
	
	module.exports = {
	  Wrapper: __webpack_require__(906),
	  Button: __webpack_require__(903),
	  Menu: __webpack_require__(904),
	  MenuItem: __webpack_require__(905),
	  openMenu: externalStateControl.openMenu,
	  closeMenu: externalStateControl.closeMenu
	};

/***/ }),

/***/ 271:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false,
	      doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;
	
	var _react = __webpack_require__(1);
	
	var _deprecateObjectProperties = __webpack_require__(171);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});
	
	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	// Deprecated stuff below:
	
	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;
	
	if (false) {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };
	
	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };
	
	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };
	
	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);
	
	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}
	
	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};
	
	if (false) {
	  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}
	
	exports.default = defaultExport;

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createTransitionManager;
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _computeChangedRoutes2 = __webpack_require__(1002);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(999);
	
	var _isActive2 = __webpack_require__(1006);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(1003);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(1008);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}
	
	function createTransitionManager(history, routes) {
	  var state = {};
	
	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	       false ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }
	
	    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
	  }
	
	  var partialNextState = void 0;
	
	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }
	
	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);
	
	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	
	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);
	
	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);
	
	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });
	
	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2.default)(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }
	
	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, redirectInfo);
	    }
	  }
	
	  var RouteGuid = 1;
	
	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }
	
	  var RouteHooks = Object.create(null);
	
	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }
	
	  function transitionHook(location, callback) {
	    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }
	
	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });
	
	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);
	
	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }
	
	      callback(result);
	    });
	  }
	
	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);
	
	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }
	
	      return message;
	    }
	  }
	
	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;
	
	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }
	
	    delete RouteHooks[routeID];
	
	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }
	
	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }
	
	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and can return either a prompt message (string) to show the user,
	   * to make sure they want to leave the page; or `false`, to prevent the transition.
	   * Any other return value will have no effect.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];
	
	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	      RouteHooks[routeID] = [hook];
	
	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);
	
	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	         false ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;
	
	        hooks.push(hook);
	      }
	    }
	
	    return function () {
	      var hooks = RouteHooks[routeID];
	
	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }
	
	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.replace(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	             false ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }
	
	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}
	
	//export default useRoutes
	
	module.exports = exports['default'];

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;
	
	var _RouteUtils = __webpack_require__(50);
	
	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});
	
	var _PropTypes2 = __webpack_require__(272);
	
	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});
	
	var _PatternUtils = __webpack_require__(91);
	
	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});
	
	var _Router2 = __webpack_require__(997);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	var _Link2 = __webpack_require__(421);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	var _IndexLink2 = __webpack_require__(991);
	
	var _IndexLink3 = _interopRequireDefault(_IndexLink2);
	
	var _withRouter2 = __webpack_require__(1010);
	
	var _withRouter3 = _interopRequireDefault(_withRouter2);
	
	var _IndexRedirect2 = __webpack_require__(992);
	
	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);
	
	var _IndexRoute2 = __webpack_require__(993);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	var _Redirect2 = __webpack_require__(422);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	var _Route2 = __webpack_require__(995);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	var _History2 = __webpack_require__(990);
	
	var _History3 = _interopRequireDefault(_History2);
	
	var _Lifecycle2 = __webpack_require__(994);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	var _RouteContext2 = __webpack_require__(996);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	var _useRoutes2 = __webpack_require__(1009);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	var _RouterContext2 = __webpack_require__(170);
	
	var _RouterContext3 = _interopRequireDefault(_RouterContext2);
	
	var _RoutingContext2 = __webpack_require__(998);
	
	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	var _match2 = __webpack_require__(1007);
	
	var _match3 = _interopRequireDefault(_match2);
	
	var _useRouterHistory2 = __webpack_require__(427);
	
	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);
	
	var _applyRouterMiddleware2 = __webpack_require__(1000);
	
	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);
	
	var _browserHistory2 = __webpack_require__(1001);
	
	var _browserHistory3 = _interopRequireDefault(_browserHistory2);
	
	var _hashHistory2 = __webpack_require__(1005);
	
	var _hashHistory3 = _interopRequireDefault(_hashHistory2);
	
	var _createMemoryHistory2 = __webpack_require__(424);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Router = _Router3.default; /* components */
	
	exports.Link = _Link3.default;
	exports.IndexLink = _IndexLink3.default;
	exports.withRouter = _withRouter3.default;
	
	/* components (configuration) */
	
	exports.IndexRedirect = _IndexRedirect3.default;
	exports.IndexRoute = _IndexRoute3.default;
	exports.Redirect = _Redirect3.default;
	exports.Route = _Route3.default;
	
	/* mixins */
	
	exports.History = _History3.default;
	exports.Lifecycle = _Lifecycle3.default;
	exports.RouteContext = _RouteContext3.default;
	
	/* utils */
	
	exports.useRoutes = _useRoutes3.default;
	exports.RouterContext = _RouterContext3.default;
	exports.RoutingContext = _RoutingContext3.default;
	exports.PropTypes = _PropTypes3.default;
	exports.match = _match3.default;
	exports.useRouterHistory = _useRouterHistory3.default;
	exports.applyRouterMiddleware = _applyRouterMiddleware3.default;
	
	/* histories */
	
	exports.browserHistory = _browserHistory3.default;
	exports.hashHistory = _hashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
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
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(163);
	/*</replacement>*/
	
	module.exports = Writable;
	
	/* <replacement> */
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}
	
	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	
	  this.next = null;
	  this.entry = null;
	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */
	
	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	/*<replacement>*/
	var util = __webpack_require__(100);
	util.inherits = __webpack_require__(80);
	/*</replacement>*/
	
	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(1099)
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream = __webpack_require__(436);
	/*</replacement>*/
	
	/*<replacement>*/
	var Buffer = __webpack_require__(177).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*</replacement>*/
	
	var destroyImpl = __webpack_require__(435);
	
	util.inherits(Writable, Stream);
	
	function nop() {}
	
	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(65);
	
	  options = options || {};
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);
	
	  // if _final has been called
	  this.finalCalled = false;
	
	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // has it been destroyed
	  this.destroyed = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	
	  // count buffered requests
	  this.bufferedRequestCount = 0;
	
	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})();
	
	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;
	
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}
	
	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(65);
	
	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	
	    if (typeof options.writev === 'function') this._writev = options.writev;
	
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	
	    if (typeof options.final === 'function') this._final = options.final;
	  }
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};
	
	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}
	
	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = _isUint8Array(chunk) && !state.objectMode;
	
	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }
	
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	
	  if (typeof cb !== 'function') cb = nop;
	
	  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function () {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);
	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	
	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    processNextTick(cb, er);
	    // this can emit finish, and it will always happen
	    // after error
	    processNextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	    // this can emit finish, but finish must
	    // always follow error
	    finishMaybe(stream, state);
	  }
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);
	
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	
	    var count = 0;
	    var allBuffers = true;
	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }
	    buffer.allBuffers = allBuffers;
	
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);
	
	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	
	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};
	
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;
	    if (err) {
	      stream.emit('error', err);
	    }
	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}
	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function') {
	      state.pendingcb++;
	      state.finalCalled = true;
	      processNextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    prefinish(stream, state);
	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');
	    }
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	
	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;
	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  }
	  if (state.corkedRequestsFree) {
	    state.corkedRequestsFree.next = corkReq;
	  } else {
	    state.corkedRequestsFree = corkReq;
	  }
	}
	
	Object.defineProperty(Writable.prototype, 'destroyed', {
	  get: function () {
	    if (this._writableState === undefined) {
	      return false;
	    }
	    return this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._writableState.destroyed = value;
	  }
	});
	
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function (err, cb) {
	  this.end();
	  cb(err);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40), __webpack_require__(1098).setImmediate, (function() { return this; }())))

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(433);
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(275);
	exports.Duplex = __webpack_require__(65);
	exports.Transform = __webpack_require__(434);
	exports.PassThrough = __webpack_require__(1025);


/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Buffer = __webpack_require__(177).Buffer;
	
	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};
	
	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	};
	
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}
	
	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};
	
	StringDecoder.prototype.end = utf8End;
	
	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;
	
	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};
	
	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return -1;
	}
	
	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}
	
	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd'.repeat(p);
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd'.repeat(p + 1);
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd'.repeat(p + 2);
	      }
	    }
	  }
	}
	
	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf, p);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}
	
	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}
	
	// For UTF-8, a replacement character for each buffered byte of a (partial)
	// character needs to be added to the output.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
	  return r;
	}
	
	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}
	
	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}
	
	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}
	
	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}
	
	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}
	
	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRouter = __webpack_require__(274);
	
	const memoryHistory = (0, _reactRouter.createMemoryHistory)();
	exports.default = memoryHistory;

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.areAllTestsDone = exports.isTestDone = undefined;
	
	var _every2 = __webpack_require__(846);
	
	var _every3 = _interopRequireDefault(_every2);
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const isTestDone = exports.isTestDone = (state, id) => (0, _get3.default)(state, ['checklist', id], false);
	
	/**
	 *
	 */
	const areAllTestsDone = exports.areAllTestsDone = (state, tests) => (0, _every3.default)(tests, (_ref) => {
	  let id = _ref.id;
	  return isTestDone(state, id);
	});

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isOpen = undefined;
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _includes2 = __webpack_require__(113);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const isOpen = exports.isOpen = (state, criterionId) => (0, _includes3.default)((0, _get3.default)(state, 'criteria.opened', []), criterionId);

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getScrollPosition = exports.isMenuOpen = undefined;
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const isMenuOpen = exports.isMenuOpen = state => !!(0, _get3.default)(state, 'themes.menuIsOpen');
	
	/**
	 *
	 */
	const getScrollPosition = exports.getScrollPosition = state => (0, _get3.default)(state, 'themes.scrollPosition', 0);

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const Page = (_ref) => {
		let id = _ref.id,
		    title = _ref.title,
		    children = _ref.children;
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)({
					Page: true,
					[`Page--${id}`]: !!id
				})
			},
			_react2.default.createElement(
				'h1',
				{ className: 'Page-title Title' },
				title
			),
			_react2.default.createElement(
				'div',
				{ className: 'Page-body' },
				children
			)
		);
	};
	
	Page.propTypes = {
		id: _react.PropTypes.string,
		title: _react.PropTypes.node.isRequired,
		children: _react.PropTypes.node.isRequired
	};
	
	Page.defaultProps = {
		id: ''
	};
	
	exports.default = Page;

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];
	
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(142);
	
	var _DOMUtils = __webpack_require__(211);
	
	var _createHistory = __webpack_require__(331);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(79);
	
	var _PathUtils = __webpack_require__(55);
	
	var _ExecutionEnvironment = __webpack_require__(142);
	
	var _DOMUtils = __webpack_require__(211);
	
	var _DOMStateStorage = __webpack_require__(328);
	
	var _createDOMHistory = __webpack_require__(329);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	         false ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	     false ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepEqual = __webpack_require__(652);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _PathUtils = __webpack_require__(55);
	
	var _AsyncUtils = __webpack_require__(675);
	
	var _Actions = __webpack_require__(79);
	
	var _createLocation2 = __webpack_require__(677);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(213);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(212);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	       false ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ExecutionEnvironment = __webpack_require__(142);
	
	var _PathUtils = __webpack_require__(55);
	
	var _runTransitionHook = __webpack_require__(213);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(212);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var basename = options.basename;
	
	    var checkedBaseHref = false;
	
	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }
	
	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');
	
	        if (baseHref != null) {
	          basename = baseHref;
	
	           false ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }
	
	      checkedBaseHref = true;
	    }
	
	    function addBasename(location) {
	      checkBaseHref();
	
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      checkBaseHref();
	
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ }),

/***/ 335:
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's Core schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2804923
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, Core schema has no distinctions from JSON schema is JS-YAML.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(82);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(337)
	  ]
	});


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

	// Standard YAML's JSON schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2803231
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, this schema is not such strict as defined in the YAML specification.
	// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(82);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(214)
	  ],
	  implicit: [
	    __webpack_require__(711),
	    __webpack_require__(703),
	    __webpack_require__(705),
	    __webpack_require__(704)
	  ]
	});


/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

	var arrayAggregator = __webpack_require__(727),
	    baseAggregator = __webpack_require__(733),
	    baseIteratee = __webpack_require__(37),
	    isArray = __webpack_require__(5);
	
	/**
	 * Creates a function like `_.groupBy`.
	 *
	 * @private
	 * @param {Function} setter The function to set accumulator values.
	 * @param {Function} [initializer] The accumulator object initializer.
	 * @returns {Function} Returns the new aggregator function.
	 */
	function createAggregator(setter, initializer) {
	  return function(collection, iteratee) {
	    var func = isArray(collection) ? arrayAggregator : baseAggregator,
	        accumulator = initializer ? initializer() : {};
	
	    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
	  };
	}
	
	module.exports = createAggregator;


/***/ }),

/***/ 393:
/***/ (function(module, exports) {

	'use strict';
	
	var registeredManagers = {};
	
	var errorCommon = 'a menu outside a mounted Wrapper with an id, or a menu that does not exist';
	
	function registerManager(menuId, manager) {
	  registeredManagers[menuId] = manager;
	}
	
	function unregisterManager(menuId) {
	  delete registeredManagers[menuId];
	}
	
	function openMenu(menuId, openOptions) {
	  var manager = registeredManagers[menuId];
	  if (!manager) throw new Error('Cannot open ' + errorCommon);
	  manager.openMenu(openOptions);
	}
	
	function closeMenu(menuId, closeOptions) {
	  var manager = registeredManagers[menuId];
	  if (!manager) throw new Error('Cannot close ' + errorCommon);
	  manager.closeMenu(closeOptions);
	}
	
	module.exports = {
	  registerManager: registerManager,
	  unregisterManager: unregisterManager,
	  openMenu: openMenu,
	  closeMenu: closeMenu
	};

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PropTypes = __webpack_require__(272);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;
	
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}
	
	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;
	
	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }
	
	  return to;
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2.default.createClass({
	  displayName: 'Link',
	
	
	  contextTypes: {
	    router: _PropTypes.routerShape
	  },
	
	  propTypes: {
	    to: oneOfType([string, object]),
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (this.props.onClick) this.props.onClick(event);
	
	    if (event.defaultPrevented) return;
	
	    !this.context.router ?  false ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    // If target prop is set (e.g. to "_blank"), let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) return;
	
	    event.preventDefault();
	
	    var _props = this.props;
	    var to = _props.to;
	    var query = _props.query;
	    var hash = _props.hash;
	    var state = _props.state;
	
	    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	
	    this.context.router.push(location);
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;
	
	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);
	
	     false ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;
	
	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;
	
	
	    if (router) {
	      // If user does not specify a `to` prop, return an empty anchor tag.
	      if (to == null) {
	        return _react2.default.createElement('a', props);
	      }
	
	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});
	
	exports.default = Link;
	module.exports = exports['default'];

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _PatternUtils = __webpack_require__(91);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */
	
	var Redirect = _react2.default.createClass({
	  displayName: 'Redirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);
	
	      if (route.from) route.path = route.from;
	
	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;
	
	
	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }
	
	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };
	
	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';
	
	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';
	
	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
	
	        if (pattern.indexOf('/') === 0) break;
	      }
	
	      return '/' + parentPattern;
	    }
	  },
	
	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Redirect;
	module.exports = exports['default'];

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;
	
	var _deprecateObjectProperties = __webpack_require__(171);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}
	
	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);
	
	  if (false) {
	    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }
	
	  return history;
	}

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createMemoryHistory;
	
	var _useQueries = __webpack_require__(143);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(332);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	var _createMemoryHistory = __webpack_require__(678);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2.default)(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
	  return history;
	};
	
	var _useRouterHistory = __webpack_require__(427);
	
	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	module.exports = exports['default'];

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = makeStateWithLocation;
	
	var _deprecateObjectProperties = __webpack_require__(171);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeStateWithLocation(state, location) {
	  if (false) {
	    var stateWithLocation = _extends({}, state);
	
	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.
	
	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }
	
	      Object.defineProperty(stateWithLocation, prop, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };
	
	    for (var prop in location) {
	      var _ret = _loop(prop);
	
	      if (_ret === 'continue') continue;
	    }
	
	    return stateWithLocation;
	  }
	
	  return _extends({}, state, location);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = useRouterHistory;
	
	var _useQueries = __webpack_require__(143);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(332);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(163);
	/*</replacement>*/
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(335);
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	/*<replacement>*/
	var EE = __webpack_require__(210).EventEmitter;
	
	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream = __webpack_require__(436);
	/*</replacement>*/
	
	// TODO(bmeurer): Change this back to const once hole checks are
	// properly optimized away early in Ignition+TurboFan.
	/*<replacement>*/
	var Buffer = __webpack_require__(177).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(100);
	util.inherits = __webpack_require__(80);
	/*</replacement>*/
	
	/*<replacement>*/
	var debugUtil = __webpack_require__(1107);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	var BufferList = __webpack_require__(1026);
	var destroyImpl = __webpack_require__(435);
	var StringDecoder;
	
	util.inherits(Readable, Stream);
	
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
	
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	
	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(65);
	
	  options = options || {};
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);
	
	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	
	  // has it been destroyed
	  this.destroyed = false;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(285).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(65);
	
	  if (!(this instanceof Readable)) return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }
	
	  Stream.call(this);
	}
	
	Object.defineProperty(Readable.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	  }
	});
	
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function (err, cb) {
	  this.push(null);
	  cb(err);
	};
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;
	
	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;
	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }
	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }
	
	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};
	
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  var state = stream._readableState;
	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	    if (er) {
	      stream.emit('error', er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }
	
	      if (addToFront) {
	        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        stream.emit('error', new Error('stream.push() after EOF'));
	      } else {
	        state.reading = false;
	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	    }
	  }
	
	  return needMoreData(state);
	}
	
	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    stream.emit('data', chunk);
	    stream.read(0);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	
	    if (state.needReadable) emitReadable(stream);
	  }
	  maybeReadMore(stream, state);
	}
	
	function chunkInvalid(state, chunk) {
	  var er;
	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(285).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}
	
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (n !== 0) state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	
	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }
	
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;
	
	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	
	  if (ret !== null) this.emit('data', ret);
	
	  return ret;
	};
	
	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};
	
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');
	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	
	    cleanedUp = true;
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	
	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	
	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = { hasUnpiped: false };
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	
	    if (!dest) dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, unpipeInfo);
	    }return this;
	  }
	
	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this, unpipeInfo);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}
	
	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }
	
	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	
	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }
	
	  // proxy certain important events.
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
	  }
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	
	  return ret;
	}
	
	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}
	
	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}
	
	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(40)))

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

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
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	'use strict';
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(65);
	
	/*<replacement>*/
	var util = __webpack_require__(100);
	util.inherits = __webpack_require__(80);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb) {
	    return stream.emit('error', new Error('write callback called multiple times'));
	  }
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(this);
	
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }
	
	  // When the writable side finishes, then flush out anything remaining.
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er, data) {
	      done(stream, er, data);
	    });else done(stream);
	  });
	}
	
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};
	
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	
	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	Transform.prototype._destroy = function (err, cb) {
	  var _this = this;
	
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	    _this.emit('close');
	  });
	};
	
	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	
	  return stream.push(null);
	}

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(163);
	/*</replacement>*/
	
	// undocumented cb() API, needed for core, not for public API
	function destroy(err, cb) {
	  var _this = this;
	
	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;
	
	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
	      processNextTick(emitErrorNT, this, err);
	    }
	    return;
	  }
	
	  // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks
	
	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  }
	
	  // if this is a duplex stream mark the writable part as destroyed as well
	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }
	
	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      processNextTick(emitErrorNT, _this, err);
	      if (_this._writableState) {
	        _this._writableState.errorEmitted = true;
	      }
	    } else if (cb) {
	      cb(err);
	    }
	  });
	}
	
	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }
	
	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}
	
	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}
	
	module.exports = {
	  destroy: destroy,
	  undestroy: undestroy
	};

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(210).EventEmitter;


/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(276).Transform


/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

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
	
	module.exports = Stream;
	
	var EE = __webpack_require__(210).EventEmitter;
	var inherits = __webpack_require__(80);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(276);
	Stream.Writable = __webpack_require__(1028);
	Stream.Duplex = __webpack_require__(1024);
	Stream.Transform = __webpack_require__(437);
	Stream.PassThrough = __webpack_require__(1027);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = __webpack_require__(452)
	
	// through
	//
	// a stream that does nothing but re-emit the input.
	// useful for aggregating a series of changing but not ending streams into one stream)
	
	exports = module.exports = through
	through.through = through
	
	//create a readable writable stream.
	
	function through (write, end, opts) {
	  write = write || function (data) { this.queue(data) }
	  end = end || function () { this.queue(null) }
	
	  var ended = false, destroyed = false, buffer = [], _ended = false
	  var stream = new Stream()
	  stream.readable = stream.writable = true
	  stream.paused = false
	
	//  stream.autoPause   = !(opts && opts.autoPause   === false)
	  stream.autoDestroy = !(opts && opts.autoDestroy === false)
	
	  stream.write = function (data) {
	    write.call(this, data)
	    return !stream.paused
	  }
	
	  function drain() {
	    while(buffer.length && !stream.paused) {
	      var data = buffer.shift()
	      if(null === data)
	        return stream.emit('end')
	      else
	        stream.emit('data', data)
	    }
	  }
	
	  stream.queue = stream.push = function (data) {
	//    console.error(ended)
	    if(_ended) return stream
	    if(data === null) _ended = true
	    buffer.push(data)
	    drain()
	    return stream
	  }
	
	  //this will be registered as the first 'end' listener
	  //must call destroy next tick, to make sure we're after any
	  //stream piped from here.
	  //this is only a problem if end is not emitted synchronously.
	  //a nicer way to do this is to make sure this is the last listener for 'end'
	
	  stream.on('end', function () {
	    stream.readable = false
	    if(!stream.writable && stream.autoDestroy)
	      process.nextTick(function () {
	        stream.destroy()
	      })
	  })
	
	  function _end () {
	    stream.writable = false
	    end.call(stream)
	    if(!stream.readable && stream.autoDestroy)
	      stream.destroy()
	  }
	
	  stream.end = function (data) {
	    if(ended) return
	    ended = true
	    if(arguments.length) stream.write(data)
	    _end() // will emit or queue
	    return stream
	  }
	
	  stream.destroy = function () {
	    if(destroyed) return
	    destroyed = true
	    ended = true
	    buffer.length = 0
	    stream.writable = stream.readable = false
	    stream.emit('close')
	    return stream
	  }
	
	  stream.pause = function () {
	    if(stream.paused) return
	    stream.paused = true
	    return stream
	  }
	
	  stream.resume = function () {
	    if(stream.paused) {
	      stream.paused = false
	      stream.emit('resume')
	    }
	    drain()
	    //may have become paused again,
	    //as drain emits 'data'.
	    if(!stream.paused)
	      stream.emit('drain')
	    return stream
	  }
	  return stream
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getCsv = undefined;
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _uniq2 = __webpack_require__(885);
	
	var _uniq3 = _interopRequireDefault(_uniq2);
	
	var _join2 = __webpack_require__(384);
	
	var _join3 = _interopRequireDefault(_join2);
	
	var _includes2 = __webpack_require__(113);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _isArray2 = __webpack_require__(5);
	
	var _isArray3 = _interopRequireDefault(_isArray2);
	
	var _each2 = __webpack_require__(844);
	
	var _each3 = _interopRequireDefault(_each2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _papaparse = __webpack_require__(890);
	
	var _papaparse2 = _interopRequireDefault(_papaparse);
	
	var _reference = __webpack_require__(125);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * schema of one row we expect from an import file
	 */
	const csvRowSchema = {
		'Version référentiel': { required: true },
		'Ref-audit': {},
		Auditeur: {},
		Url: { required: true },
		Thématique: {},
		Critère: { required: true },
		Niveau: { required: true },
		Test: { required: true },
		Statut: { required: true, oneOf: ['C', 'NC', 'NA', 'NT'] },
		Dérogé: { oneOf: ['D'] },
		Remarques: {},
		'Note dérogation': {}
	};
	
	/**
	 *
	 */
	const rowErrors = (row, schema) => {
		const errors = [];
		(0, _each3.default)(schema, (_ref, key) => {
			let required = _ref.required,
			    oneOf = _ref.oneOf;
	
			const value = row[key];
			if (required && !value) {
				errors.push({
					code: 'MissingRequiredField',
					message: `le champ "${key}" est obligatoire`
				});
			}
			if ((!required && value || required) && (0, _isArray3.default)(oneOf) && !(0, _includes3.default)(oneOf, value)) {
				errors.push({
					code: 'UnallowedValue',
					message: `le champ "${key}" a pour valeur "${value}" mais les valeurs acceptées sont ` + `${(0, _join3.default)(oneOf.map(val => `"${val}"`), ', ')}`
				});
			}
		});
		return errors;
	};
	
	/**
	 *
	 */
	const formattedErrorMessage = (_ref2) => {
		let code = _ref2.code,
		    message = _ref2.message;
	
		switch (code) {
			case 'TooManyFields':
			case 'TooFewFields':
				return message.replace(/Too (?:many|few) fields: expected (\d+) fields but parsed (\d+)/, '$2 champs trouvés sur les $1 décrits en entête du fichier');
			case 'UndetectableDelimiter':
				return message.replace(/Unable to auto-detect delimiting character; defaulted to '(.*)'/, 'impossible de détecter automatiquement le délimiteur ; utilisation de $1');
			case 'MissingQuotes':
				return 'guillemets non fermés';
			default:
				return message;
		}
	};
	
	/**
	 *
	 */
	const formattedError = (_ref3) => {
		let code = _ref3.code,
		    message = _ref3.message,
		    row = _ref3.row;
		return {
			code,
			message: formattedErrorMessage({ code, message }),
			// we want to show the *real* csv file linenumber
			// but in the parsed content, the header row is removed,
			// and we start index at 0, so we are two actual rows short
			row: row + 2
		};
	};
	
	/**
	 *
	 */
	const parsedCsv = (csvString, config) => {
		const csv = _papaparse2.default.parse(csvString, config);
		let errors = csv.errors;
		csv.data.forEach((row, n) => {
			let currentRowErrors = rowErrors(row, csvRowSchema);
			if (currentRowErrors.length) {
				// put row index info in each error object
				currentRowErrors = currentRowErrors.map(error => _extends({}, error, {
					row: n
				}));
	
				errors = [...errors, ...currentRowErrors];
			}
		});
	
		return {
			data: csv.data,
			errors: errors.length ? errors.map(formattedError) : []
		};
	};
	
	/**
	 *
	 */
	const checkCsvReferenceVersion = rows => {
		const versions = (0, _uniq3.default)((0, _map3.default)(rows, 'Version référentiel'));
		const version = versions[0];
	
		return new Promise((resolve, reject) => {
			if (versions.length > 1) {
				reject('plusieurs versions de référentiels trouvées dans le fichier au lieu d\'une : ' + `${(0, _join3.default)(versions.map(val => `"${val}"`), ', ')}`);
			}
	
			(0, _reference.getReference)(version).then(() => resolve(version)).catch(() => reject(`version de référentiel "${version}" non supportée par l'extension`));
		});
	};
	
	const withHeader = rawCsvString => {
		const hasHeader = rawCsvString.startsWith('Version référentiel') || rawCsvString.startsWith('"Version référentiel"');
		if (hasHeader) {
			return rawCsvString;
		}
	
		const csvString = `${['Version référentiel', 'Ref-audit', 'Auditeur', 'Url', 'Thématique', 'Critère', 'Niveau', 'Test', 'Statut', 'Dérogé', 'Remarque', 'Note dérogation'].join(',')}\n${rawCsvString}`;
		return csvString;
	};
	
	/**
	 *
	 */
	const getCsv = exports.getCsv = function getCsv(rawCsvString) {
		let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
		const csvString = withHeader(rawCsvString);
		const csv = parsedCsv(csvString, _extends({}, config, { header: true }));
	
		return checkCsvReferenceVersion(csv.data).then(() => csv).catch(reason => ({
			data: csv.data,
			errors: [{
				row: null,
				code: 'InvalidReference',
				message: reason
			}, ...csv.errors]
		}));
	};

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 *
	 */
	const replaceLocalUrls = exports.replaceLocalUrls = (body, basePath) => body.replace(/page:\/\/([a-z0-9/_-]+)/gi, (match, path) => chrome.extension.getURL(`${basePath}/${path}`));

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.watchToggleCriterion = watchToggleCriterion;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _criteria = __webpack_require__(179);
	
	var _criteria2 = __webpack_require__(297);
	
	/**
	 *
	 */
	function* toggleCriterionWorker(_ref) {
		let payload = _ref.payload;
	
		const isOpen = yield (0, _effects.select)(_criteria2.isOpen, payload);
		if (isOpen) {
			yield (0, _effects.put)((0, _criteria.closeCriterion)(payload));
		} else {
			yield (0, _effects.put)((0, _criteria.openCriterion)(payload));
		}
	}
	
	/**
	 *
	 */
	function* watchToggleCriterion() {
		yield* (0, _reduxSaga.takeEvery)(_criteria.TOGGLE_CRITERION, toggleCriterionWorker);
	}

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.watchApply = watchApply;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _history = __webpack_require__(294);
	
	var _history2 = _interopRequireDefault(_history);
	
	var _imports = __webpack_require__(96);
	
	var _reference = __webpack_require__(69);
	
	var _imports2 = __webpack_require__(95);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function* applyWorker() {
		const importVersion = yield (0, _effects.select)(_imports.getVersion);
	
		if (!importVersion) {
			return;
		}
	
		yield (0, _effects.put)((0, _reference.setReferenceVersion)(importVersion));
		const testResults = yield (0, _effects.select)(_imports.findTestResults);
		const criteriaResults = yield (0, _effects.select)(_imports.findCriteriaResults);
		yield (0, _effects.put)((0, _imports2.setTestsResults)(testResults));
		yield (0, _effects.put)((0, _imports2.setCriteriaResults)(criteriaResults));
		yield (0, _effects.call)(_history2.default.push, '/');
	}
	
	/**
	 *
	 */
	function* watchApply() {
		yield* (0, _reduxSaga.takeEvery)(_imports2.APPLY, applyWorker);
	}

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _reject2 = __webpack_require__(876);
	
	var _reject3 = _interopRequireDefault(_reject2);
	
	exports.watchEnable = watchEnable;
	exports.watchDisable = watchDisable;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _tests = __webpack_require__(180);
	
	var _helpers = __webpack_require__(67);
	
	var _tests2 = __webpack_require__(129);
	
	var _helpers2 = __webpack_require__(128);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function* enableSaga(_ref) {
		let id = _ref.payload;
	
		// disables previously enabled tests
		const enabled = yield (0, _effects.select)(_tests2.getEnabled);
		const otherEnabled = (0, _reject3.default)(enabled, ['id', id]);
	
		yield (0, _map3.default)(otherEnabled, test => (0, _effects.put)((0, _tests.disable)(test.id)));
	
		const helpers = yield (0, _effects.select)(_helpers2.getHelpersByTest, id);
		yield (0, _effects.put)((0, _helpers.applyHelpers)(id, helpers));
	}
	
	/**
	 *
	 */
	function* disableSaga(_ref2) {
		let id = _ref2.payload;
	
		const helpers = yield (0, _effects.select)(_helpers2.getHelpersByTest, id);
		yield (0, _effects.put)((0, _helpers.revertHelpers)(id, helpers));
	}
	
	/**
	 *
	 */
	function* watchEnable() {
		yield* (0, _reduxSaga.takeEvery)(_tests.ENABLE, enableSaga);
	}
	
	/**
	 *
	 */
	function* watchDisable() {
		yield* (0, _reduxSaga.takeEvery)(_tests.DISABLE, disableSaga);
	}

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getInstructionsByTest = undefined;
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const ALL = 'all';
	const RGAA = 'rgaa';
	
	/**
	 *
	 */
	const getInstructionsByTest = exports.getInstructionsByTest = (state, id) => (0, _get3.default)(state, ['instructions', id, RGAA]) || (0, _get3.default)(state, ['instructions', id, ALL]);

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = App;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _HeaderContainer = __webpack_require__(536);
	
	var _HeaderContainer2 = _interopRequireDefault(_HeaderContainer);
	
	var _AppToggle = __webpack_require__(528);
	
	var _AppToggle2 = _interopRequireDefault(_AppToggle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function App(_ref) {
		let folded = _ref.folded,
		    onUnfoldRequest = _ref.onUnfoldRequest,
		    children = _ref.children;
	
		return _react2.default.createElement(
			'div',
			{ className: 'App' },
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)({
						'App-content': true,
						'is-hidden': folded
					})
				},
				_react2.default.createElement(_HeaderContainer2.default, null),
				children
			),
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)({
						'App-toggle': true,
						'is-hidden': !folded
					})
				},
				_react2.default.createElement(_AppToggle2.default, { onClick: onUnfoldRequest })
			)
		);
	}
	
	App.propTypes = {
		children: _react.PropTypes.element,
		folded: _react.PropTypes.bool,
		onUnfoldRequest: _react.PropTypes.func
	};

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(12);
	
	var _panel = __webpack_require__(71);
	
	var _panel2 = __webpack_require__(68);
	
	var _App = __webpack_require__(526);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
	  folded: (0, _panel.isFolded)(state)
	});
	
	/**
	 *
	 */
	const mapDispatchToProps = dispatch => ({
	  onUnfoldRequest() {
	    dispatch((0, _panel2.toggleFold)(false));
	  }
	});
	
	/**
	 *
	 */
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_App2.default);

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function AppToggle(_ref) {
		let onClick = _ref.onClick,
		    intl = _ref.intl;
	
		return _react2.default.createElement(
			'button',
			{
				type: 'button',
				className: 'AppToggle',
				onClick: onClick,
				title: intl.formatMessage({ id: 'Panel.toggle' })
			},
			_react2.default.createElement('img', {
				src: chrome.extension.getURL('img/icon-48.png'),
				alt: intl.formatMessage({ id: 'Panel.toggle' })
			})
		);
	}
	
	AppToggle.propTypes = {
		onClick: _react.PropTypes.func,
		intl: _reactIntl.intlShape
	};
	
	exports.default = (0, _reactIntl.injectIntl)(AppToggle);

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TestContainer = __webpack_require__(548);
	
	var _TestContainer2 = _interopRequireDefault(_TestContainer);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function Criterion(_ref) {
		let id = _ref.id,
		    level = _ref.level,
		    title = _ref.title,
		    tests = _ref.tests,
		    activeTest = _ref.activeTest,
		    isDone = _ref.isDone,
		    isOpen = _ref.isOpen,
		    importResults = _ref.importResults,
		    onToggle = _ref.onToggle,
		    onDone = _ref.onDone,
		    intl = _ref.intl;
	
		const className = (0, _classnames2.default)('Criterion Theme-criterion', {
			'is-open': isOpen,
			'Criterion--hasActiveTest': !!activeTest
		});
		const headerClassName = (0, _classnames2.default)('Criterion-header', {
			'Title Title--sub': isOpen
		});
		const handleDoneChange = event => onDone(event.target.checked);
		return _react2.default.createElement(
			'li',
			{ id: `Criterion-${id}`, className: className, 'data-id': id },
			_react2.default.createElement(
				'header',
				{ className: headerClassName },
				_react2.default.createElement(
					'div',
					{ className: 'Criterion-title', onClick: onToggle },
					_react2.default.createElement(
						'div',
						{ className: 'Criterion-titleText' },
						_react2.default.createElement(
							'button',
							{
								className: 'InvisibleButton Criterion-toggle',
								type: 'button',
								onClick: onToggle,
								'aria-expanded': isOpen,
								'aria-controls': `Criterion-${id}-content`
							},
							_react2.default.createElement(
								'span',
								{ className: 'ScreenReaderOnly' },
								_react2.default.createElement(_reactIntl.FormattedMessage, {
									id: `Criterion.toggle.${isOpen ? 'hide' : 'show'}`,
									values: {
										id
									}
								})
							)
						),
						_react2.default.createElement(
							'h3',
							{ className: 'Criterion-id' },
							intl.formatMessage({ id: 'Criterion.title' }, { id }),
							(0, _renderIf2.default)(!isOpen && activeTest)(() => _react2.default.createElement(
								'span',
								{ className: 'Criterion-activeTest' },
								intl.formatMessage({ id: 'Criterion.activeTest' }, { id: activeTest.id })
							))
						),
						(0, _renderIf2.default)(level)(() => _react2.default.createElement(
							'span',
							{ className: 'Criterion-level' },
							intl.formatMessage({ id: 'Criterion.level' }, { lvl: level })
						)),
						_react2.default.createElement('p', {
							className: 'Criterion-description',
							dangerouslySetInnerHTML: { __html: title }
						})
					),
					(0, _renderIf2.default)(!isOpen && importResults)(() => _react2.default.createElement(
						'div',
						{ className: 'Criterion-importResults' },
						(0, _map3.default)(importResults, (count, status) => _react2.default.createElement(
							'span',
							{
								key: status,
								className: 'Label ImportResult',
								'data-import-result': status,
								title: intl.formatMessage({
									id: `ImportResults.${status}.title`
								}, {
									count
								})
							},
							count,
							' \xD7 ',
							status
						))
					))
				),
				_react2.default.createElement(
					'div',
					{ className: 'Criterion-actions' },
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('Criterion-action Criterion-action--done', {
								'Criterion-action--checked': isDone
							})
						},
						_react2.default.createElement(
							'label',
							{
								htmlFor: `criterion-${id}-done-input`,
								className: 'Criterion-actionLabel',
								title: intl.formatMessage({
									id: isDone ? 'Criterion.done.label' : 'Criterion.todo.label'
								})
							},
							_react2.default.createElement(_Icon2.default, { name: 'flag' })
						),
						_react2.default.createElement('input', {
							type: 'checkbox',
							id: `criterion-${id}-done-input`,
							className: 'u-hidden',
							checked: isDone,
							onChange: handleDoneChange
						})
					)
				)
			),
			_react2.default.createElement(
				'div',
				{
					className: 'Criterion-content',
					id: `Criterion-${id}-content`
				},
				(0, _renderIf2.default)(isOpen)(() => _react2.default.createElement(
					'ul',
					{ className: 'Criterion-tests' },
					tests.map((_ref2) => {
						let testId = _ref2.id,
						    testTitle = _ref2.title;
						return _react2.default.createElement(
							'li',
							{ className: 'Criterion-test', key: `criterion-${id}-test-${testId}` },
							_react2.default.createElement(_TestContainer2.default, { id: testId, title: testTitle })
						);
					})
				))
			)
		);
	}
	
	Criterion.propTypes = {
		id: _react.PropTypes.string.isRequired,
		title: _react.PropTypes.string.isRequired,
		level: _react.PropTypes.string,
		tests: _react.PropTypes.array.isRequired,
		isOpen: _react.PropTypes.bool.isRequired,
		importResults: _react.PropTypes.object,
		onToggle: _react.PropTypes.func.isRequired,
		isDone: _react.PropTypes.bool,
		onDone: _react.PropTypes.func.isRequired,
		intl: _reactIntl.intlShape.isRequired
	};
	
	Criterion.defaultProps = {
		isDone: false
	};
	
	exports.default = (0, _reactIntl.injectIntl)(Criterion);

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactRedux = __webpack_require__(12);
	
	var _Criterion = __webpack_require__(529);
	
	var _Criterion2 = _interopRequireDefault(_Criterion);
	
	var _criteria = __webpack_require__(179);
	
	var _criteria2 = __webpack_require__(297);
	
	var _reference = __webpack_require__(30);
	
	var _imports = __webpack_require__(96);
	
	var _tests = __webpack_require__(129);
	
	var _checklist = __webpack_require__(296);
	
	var _checklist2 = __webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = (state, _ref) => {
		let id = _ref.id;
	
		const tests = (0, _reference.getAllTestsByCriterion)(state, id);
		const open = (0, _criteria2.isOpen)(state, id);
		// get enabled test only when the criterion is closed
		const enabledTests = !open ? (0, _tests.getEnabledForCriterion)(state, id) : null;
		const enabledTest = enabledTests && enabledTests.length ? enabledTests[0] : null;
		return {
			tests,
			activeTest: enabledTest,
			isOpen: open,
			isDone: (0, _checklist.areAllTestsDone)(state, tests),
			importResults: (0, _imports.getOneCriterionResults)(state, id)
		};
	};
	
	/**
	 *
	 */
	const mergeProps = (stateProps, _ref2, ownProps) => {
		let dispatch = _ref2.dispatch;
		return _extends({}, ownProps, stateProps, {
			onToggle(event) {
				event.stopPropagation();
				dispatch((0, _criteria.toggleCriterion)(ownProps.id));
			},
			onDone(done) {
				stateProps.tests.forEach((_ref3) => {
					let id = _ref3.id;
					return dispatch((0, _checklist2.setTestDone)(id, done));
				});
			}
		});
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, null, mergeProps)(_Criterion2.default);

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const DevTools = (_ref) => {
		let onSearchCriterion = _ref.onSearchCriterion,
		    onReloadReference = _ref.onReloadReference;
		return _react2.default.createElement(
			'div',
			{
				className: 'DevTools',
				style: {
					display: 'flex'
				}
			},
			_react2.default.createElement('input', {
				placeholder: 'crit\xE8re',
				type: 'search',
				onChange: event => onSearchCriterion(event.target.value),
				style: {
					flex: '1'
				}
			}),
			_react2.default.createElement(
				'button',
				{ type: 'button', onClick: onReloadReference },
				'Recharger le r\xE9f\xE9rentiel'
			)
		);
	};
	
	DevTools.propTypes = {
		onSearchCriterion: _react.PropTypes.func,
		onReloadReference: _react.PropTypes.func
	};
	
	exports.default = DevTools;

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactRedux = __webpack_require__(12);
	
	var _reference = __webpack_require__(69);
	
	var _reference2 = __webpack_require__(30);
	
	var _DevTools = __webpack_require__(531);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		version: (0, _reference2.getVersion)(state)
	});
	
	/**
	 *
	 */
	const mergeProps = (_ref, _ref2, ownProps) => {
		let dispatch = _ref2.dispatch;
	
		let version = _ref.version,
		    stateProps = _objectWithoutProperties(_ref, ['version']);
	
		return _extends({}, ownProps, stateProps, {
			onReloadReference() {
				dispatch((0, _reference.setReferenceVersion)(version));
			},
			onSearchCriterion(id) {
				const criterion = document.querySelector(`.Criterion[data-id="${id}"]`);
	
				if (criterion) {
					criterion.scrollIntoView(true);
				}
			}
		});
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, null, mergeProps)(_DevTools2.default);

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _reactAriaMenubutton = __webpack_require__(252);
	
	var _panel = __webpack_require__(70);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const DockMenuItem = (_ref) => {
		let position = _ref.position,
		    currentPosition = _ref.currentPosition,
		    onSelect = _ref.onSelect;
	
		const disabled = position === currentPosition;
		const handleClick = () => {
			if (!disabled) {
				onSelect(position);
			}
		};
	
		return _react2.default.createElement(
			_reactAriaMenubutton.MenuItem,
			{ value: handleClick },
			_react2.default.createElement(
				'button',
				{
					className: 'DockMenu-button Button',
					type: 'button',
					disabled: disabled
				},
				_react2.default.createElement(_reactIntl.FormattedMessage, { id: `DockMenu.${position}` })
			)
		);
	};
	
	DockMenuItem.propTypes = {
		position: _react.PropTypes.string.isRequired,
		currentPosition: _react.PropTypes.string.isRequired,
		onSelect: _react.PropTypes.func.isRequired
	};
	
	/**
	 *
	 */
	function DockMenu(_ref2) {
		let position = _ref2.position,
		    onPositionChange = _ref2.onPositionChange,
		    intl = _ref2.intl;
	
		const onDropdownSelection = callback => callback();
	
		return _react2.default.createElement(
			_reactAriaMenubutton.Wrapper,
			{ onSelection: onDropdownSelection, className: 'DockMenu Dropdown-container' },
			_react2.default.createElement(
				_reactAriaMenubutton.Button,
				{
					className: 'Link Dropdown-toggle',
					title: intl.formatMessage({ id: 'DockMenu.button' })
				},
				_react2.default.createElement(_Icon2.default, {
					name: 'window-restore',
					title: intl.formatMessage({ id: 'DockMenu.button' })
				})
			),
			_react2.default.createElement(
				_reactAriaMenubutton.Menu,
				null,
				_react2.default.createElement(
					'ul',
					{ className: 'Dropdown-list Dropdown-list--right' },
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(DockMenuItem, {
							position: _panel.Position.bottom,
							currentPosition: position,
							onSelect: onPositionChange
						})
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(DockMenuItem, {
							position: _panel.Position.left,
							currentPosition: position,
							onSelect: onPositionChange
						})
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(DockMenuItem, {
							position: _panel.Position.right,
							currentPosition: position,
							onSelect: onPositionChange
						})
					),
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(DockMenuItem, {
							position: _panel.Position.popup,
							currentPosition: position,
							onSelect: onPositionChange
						})
					)
				)
			)
		);
	}
	
	DockMenu.propTypes = {
		position: _react.PropTypes.string.isRequired,
		onPositionChange: _react.PropTypes.func.isRequired,
		intl: _reactIntl.intlShape
	};
	
	exports.default = (0, _reactIntl.injectIntl)(DockMenu);

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _reactRedux = __webpack_require__(12);
	
	var _panel = __webpack_require__(71);
	
	var _panel2 = __webpack_require__(68);
	
	var _DockMenu = __webpack_require__(533);
	
	var _DockMenu2 = _interopRequireDefault(_DockMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		position: (0, _panel.getPosition)(state)
	});
	
	/**
	 *
	 */
	const mapDispatchToProps = dispatch => ({
		onPositionChange(position) {
			dispatch((0, _panel2.setPosition)(position));
		}
	});
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DockMenu2.default);

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _reactRouter = __webpack_require__(274);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	var _DockMenuContainer = __webpack_require__(534);
	
	var _DockMenuContainer2 = _interopRequireDefault(_DockMenuContainer);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const Header = (_ref) => {
		let referenceVersion = _ref.referenceVersion,
		    inPopup = _ref.inPopup,
		    title = _ref.title,
		    intl = _ref.intl,
		    onOptionsClick = _ref.onOptionsClick,
		    onCloseClick = _ref.onCloseClick,
		    onClosePopupClick = _ref.onClosePopupClick,
		    onMinimizeClick = _ref.onMinimizeClick;
		return _react2.default.createElement(
			'header',
			{ className: 'Header' },
			_react2.default.createElement(
				'h1',
				{ className: 'Header-title' },
				(0, _renderIf2.default)(inPopup)(() => `${title} | `),
				'RGAA v',
				referenceVersion
			),
			_react2.default.createElement(
				'div',
				{ className: 'Header-actions' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'Header-themes Link', to: '/' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Header.themes' })
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ className: 'Header-help Link', to: '/help' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Header.help' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'Header-dock' },
					_react2.default.createElement(_DockMenuContainer2.default, null)
				),
				_react2.default.createElement(
					'button',
					{
						type: 'button',
						onClick: onOptionsClick,
						className: 'Header-options Link',
						title: intl.formatMessage({ id: 'Header.options' })
					},
					_react2.default.createElement(_Icon2.default, {
						name: 'cog',
						title: intl.formatMessage({ id: 'Header.options' })
					})
				),
				(0, _renderIf2.default)(!inPopup)(() => _react2.default.createElement(
					'button',
					{
						type: 'button',
						onClick: onMinimizeClick,
						className: 'Header-minimize InvisibleButton',
						title: intl.formatMessage({ id: 'Header.minimize' })
					},
					_react2.default.createElement(_Icon2.default, {
						name: 'window-minimize',
						title: intl.formatMessage({ id: 'Header.minimize' })
					})
				)),
				(0, _renderIf2.default)(!inPopup)(() => _react2.default.createElement(
					'button',
					{
						type: 'button',
						onClick: onCloseClick,
						className: 'Header-close InvisibleButton',
						title: intl.formatMessage({ id: 'Header.close' })
					},
					_react2.default.createElement(_Icon2.default, {
						name: 'close',
						title: intl.formatMessage({ id: 'Header.close' })
					})
				)),
				(0, _renderIf2.default)(inPopup)(() => _react2.default.createElement(
					'button',
					{
						type: 'button',
						onClick: onClosePopupClick,
						className: 'Header-closePopup InvisibleButton',
						title: intl.formatMessage({ id: 'Header.closePopup' })
					},
					_react2.default.createElement(_Icon2.default, {
						name: 'sidebar',
						title: intl.formatMessage({ id: 'Header.closePopup' })
					})
				))
			)
		);
	};
	
	Header.propTypes = {
		referenceVersion: _react.PropTypes.string,
		title: _react.PropTypes.string,
		inPopup: _react.PropTypes.bool,
		onOptionsClick: _react.PropTypes.func.isRequired,
		onCloseClick: _react.PropTypes.func.isRequired,
		onClosePopupClick: _react.PropTypes.func.isRequired,
		onMinimizeClick: _react.PropTypes.func.isRequired,
		intl: _reactIntl.intlShape
	};
	
	exports.default = (0, _reactIntl.injectIntl)(Header);

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _truncate2 = __webpack_require__(883);
	
	var _truncate3 = _interopRequireDefault(_truncate2);
	
	var _reactRedux = __webpack_require__(12);
	
	var _options = __webpack_require__(290);
	
	var _panel = __webpack_require__(68);
	
	var _panel2 = __webpack_require__(70);
	
	var _panel3 = __webpack_require__(71);
	
	var _runtime = __webpack_require__(22);
	
	var _runtime2 = __webpack_require__(18);
	
	var _reference = __webpack_require__(30);
	
	var _Header = __webpack_require__(535);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		referenceVersion: (0, _reference.getVersion)(state),
		inPopup: (0, _panel3.getPosition)(state) === 'popup',
		title: (0, _truncate3.default)((0, _panel3.getPageTitle)(state), { omission: '…' })
	});
	
	/**
	 *
	 */
	const mapDispatchToProps = dispatch => ({
		onOptionsClick() {
			dispatch((0, _options.open)());
		},
	
		onCloseClick() {
			(0, _runtime2.sendMessage)({
				type: _runtime.CLOSE_PANEL
			});
		},
	
		onClosePopupClick() {
			dispatch((0, _panel.setPosition)(_panel2.Position.right));
		},
	
		onMinimizeClick() {
			dispatch((0, _panel.toggleFold)(true));
		}
	});
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Header2.default);

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _MarkdownPageContainer = __webpack_require__(543);
	
	var _MarkdownPageContainer2 = _interopRequireDefault(_MarkdownPageContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const HelpPage = () => _react2.default.createElement(_MarkdownPageContainer2.default, { name: 'help' });
	
	exports.default = HelpPage;

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _partial2 = __webpack_require__(874);
	
	var _partial3 = _interopRequireDefault(_partial2);
	
	exports.default = ImportForm;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function ImportForm(_ref) {
		let pending = _ref.pending,
		    valid = _ref.valid,
		    errors = _ref.errors,
		    importVersion = _ref.importVersion,
		    globalVersion = _ref.globalVersion,
		    config = _ref.config,
		    onConfigChange = _ref.onConfigChange,
		    onReset = _ref.onReset,
		    onFileSelection = _ref.onFileSelection,
		    onSubmit = _ref.onSubmit;
	
		const onFormSubmit = event => {
			event.preventDefault();
			onSubmit();
		};
	
		const onFileChange = event => {
			if (!event.target.files || !event.target.files.length) {
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				onFileSelection(reader.result);
			};
			reader.readAsText(event.target.files[0]);
		};
	
		const onTextChange = (name, event) => onConfigChange(name, event.target.value);
	
		return _react2.default.createElement(
			'form',
			{ onSubmit: onFormSubmit },
			_react2.default.createElement(
				'fieldset',
				{ className: 'ImportForm-config' },
				_react2.default.createElement(
					'legend',
					null,
					'Configuration'
				),
				_react2.default.createElement(
					'div',
					{ className: 'ImportForm-input' },
					_react2.default.createElement(
						'label',
						{ htmlFor: 'ImportForm-delimiterInput' },
						_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.delimiter.label' })
					),
					_react2.default.createElement('input', {
						id: 'ImportForm-delimiterInput',
						name: 'delimiter',
						type: 'text',
						onChange: (0, _partial3.default)(onTextChange, 'delimiter'),
						value: config.delimiter
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'ImportForm-input' },
					_react2.default.createElement(
						'label',
						{ htmlFor: 'ImportForm-quoteInput' },
						_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.quoteChar.label' })
					),
					_react2.default.createElement('input', {
						id: 'ImportForm-quoteInput',
						name: 'quote',
						type: 'text',
						onChange: (0, _partial3.default)(onTextChange, 'quoteChar'),
						value: config.quoteChar
					})
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'ImportForm-file' },
				_react2.default.createElement(
					'label',
					{ htmlFor: 'ImportForm-fileInput' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.file.label' })
				),
				_react2.default.createElement('input', {
					id: 'ImportForm-fileInput',
					className: 'ImportForm-fileInput',
					name: 'file',
					type: 'file',
					accept: 'application/json',
					onChange: onFileChange,
					value: ''
				})
			),
			(0, _renderIf2.default)(valid)(() => _react2.default.createElement(
				'p',
				{ className: 'ImportForm-success' },
				_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.success' })
			)),
			(0, _renderIf2.default)(valid && importVersion !== globalVersion)(() => _react2.default.createElement(
				'p',
				{ className: 'ImportForm-warning' },
				_react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
					id: 'Import.versionDifference',
					values: {
						version: importVersion
					}
				})
			)),
			(0, _renderIf2.default)(pending && !valid)(() => _react2.default.createElement(
				'details',
				{ className: 'ImportForm-failure', open: errors.length < 10 },
				_react2.default.createElement(
					'summary',
					null,
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.failure' })
				),
				_react2.default.createElement(
					'ul',
					{ className: 'ImportForm-errors' },
					errors.map((error, i) => _react2.default.createElement(
						'li',
						{ key: `error-${i}` },
						error
					))
				)
			)),
			_react2.default.createElement(
				'div',
				{ className: 'ImportForm-buttons' },
				_react2.default.createElement(
					'button',
					{ disabled: !valid, className: 'ImportForm-button' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.submit' })
				),
				_react2.default.createElement(
					'button',
					{ type: 'button', onClick: onReset, className: 'ImportForm-button' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.reset' })
				)
			)
		);
	}
	
	ImportForm.propTypes = {
		importVersion: _react.PropTypes.string,
		globalVersion: _react.PropTypes.string.isRequired,
		onReset: _react.PropTypes.func.isRequired,
		onFileSelection: _react.PropTypes.func.isRequired,
		onConfigChange: _react.PropTypes.func.isRequired,
		config: _react.PropTypes.shape({
			delimiter: _react.PropTypes.string,
			quoteChar: _react.PropTypes.string
		}).isRequired,
		onSubmit: _react.PropTypes.func.isRequired,
		errors: _react.PropTypes.array.isRequired,
		valid: _react.PropTypes.bool.isRequired,
		pending: _react.PropTypes.bool.isRequired
	};
	
	ImportForm.defaultProps = {};

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _property2 = __webpack_require__(49);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactRedux = __webpack_require__(12);
	
	var _recompose = __webpack_require__(43);
	
	var _renderNothingUntil = __webpack_require__(127);
	
	var _renderNothingUntil2 = _interopRequireDefault(_renderNothingUntil);
	
	var _imports = __webpack_require__(461);
	
	var _imports2 = __webpack_require__(95);
	
	var _imports3 = __webpack_require__(96);
	
	var _reference = __webpack_require__(30);
	
	var _ImportForm = __webpack_require__(538);
	
	var _ImportForm2 = _interopRequireDefault(_ImportForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		pending: (0, _imports3.isPending)(state),
		valid: (0, _imports3.isValid)(state),
		errors: (0, _imports3.getHumanReadableErrors)(state),
		importVersion: (0, _imports3.getVersion)(state),
		globalVersion: (0, _reference.getVersion)(state),
		config: (0, _imports3.getConfig)(state)
	});
	
	/**
	 *
	 */
	const mergeProps = (stateProps, _ref, ownProps) => {
		let dispatch = _ref.dispatch;
		return _extends({}, stateProps, ownProps, {
	
			onReset() {
				dispatch((0, _imports2.reset)());
			},
	
			onFileSelection(content) {
				dispatch((0, _imports2.setPending)(true));
				(0, _imports.getCsv)(content, stateProps.config).then((_ref2) => {
					let data = _ref2.data,
					    errors = _ref2.errors;
	
					if (errors.length) {
						return dispatch((0, _imports2.setErrors)(errors));
					}
					return errors.length ? dispatch((0, _imports2.setErrors)(errors)) : dispatch((0, _imports2.setContent)(data));
				});
			},
	
			onSubmit() {
				if (stateProps.valid) {
					dispatch((0, _imports2.apply)());
				}
			},
	
			onConfigChange(name, value) {
				dispatch((0, _imports2.setConfig)(name, value));
			}
		});
	};
	
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, null, mergeProps), (0, _renderNothingUntil2.default)((0, _property3.default)('globalVersion')))(_ImportForm2.default);

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	var _Page = __webpack_require__(306);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _ImportFormContainer = __webpack_require__(539);
	
	var _ImportFormContainer2 = _interopRequireDefault(_ImportFormContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function ImportPage(_ref) {
		let isImportActive = _ref.isImportActive,
		    onReset = _ref.onReset;
	
		return _react2.default.createElement(
			_Page2.default,
			{ title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.title' }) },
			(0, _renderIf2.default)(!isImportActive)(() => _react2.default.createElement(_ImportFormContainer2.default, null)),
			(0, _renderIf2.default)(isImportActive)(() => _react2.default.createElement(
				'button',
				{ type: 'button', onClick: onReset, className: 'ImportPage-singleResetButton' },
				_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Import.singleReset' })
			))
		);
	}
	
	ImportPage.propTypes = {
		isImportActive: _react.PropTypes.bool.isRequired,
		onReset: _react.PropTypes.func.isRequired
	};
	
	exports.default = ImportPage;

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(12);
	
	var _imports = __webpack_require__(96);
	
	var _imports2 = __webpack_require__(95);
	
	var _ImportPage = __webpack_require__(540);
	
	var _ImportPage2 = _interopRequireDefault(_ImportPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
	  isImportActive: (0, _imports.isImportActive)(state)
	});
	
	/**
	 *
	 */
	const mapDispatchToProps = dispatch => ({
	  onReset() {
	    dispatch((0, _imports2.reset)());
	  }
	});
	
	/**
	 *
	 */
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ImportPage2.default);

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Page = __webpack_require__(306);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _RichText = __webpack_require__(546);
	
	var _RichText2 = _interopRequireDefault(_RichText);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const MarkdownPage = (_ref) => {
		let name = _ref.name,
		    title = _ref.title,
		    html = _ref.html;
		return _react2.default.createElement(
			_Page2.default,
			{ id: name, title: title },
			_react2.default.createElement(_RichText2.default, { html: html })
		);
	};
	
	MarkdownPage.propTypes = {
		name: _react.PropTypes.string,
		title: _react.PropTypes.node,
		html: _react.PropTypes.string
	};
	
	exports.default = MarkdownPage;

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _recompose = __webpack_require__(43);
	
	var _fastmatter = __webpack_require__(661);
	
	var _fastmatter2 = _interopRequireDefault(_fastmatter);
	
	var _marked = __webpack_require__(889);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	var _markdown = __webpack_require__(463);
	
	var _MarkdownPage = __webpack_require__(542);
	
	var _MarkdownPage2 = _interopRequireDefault(_MarkdownPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const enhance = (0, _recompose.lifecycle)({
		componentDidMount() {
			const basePath = `data/pages/${this.props.name}`;
			const url = chrome.extension.getURL(`${basePath}/index.md`);
	
			fetch(url).then(response => response.text()).then(_fastmatter2.default).then((_ref) => {
				let attributes = _ref.attributes,
				    body = _ref.body;
	
				this.setState({
					title: attributes.title,
					html: (0, _marked2.default)((0, _markdown.replaceLocalUrls)(body, basePath))
				});
			});
		}
	});
	
	exports.default = enhance(_MarkdownPage2.default);

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _debounce2 = __webpack_require__(841);
	
	var _debounce3 = _interopRequireDefault(_debounce2);
	
	var _noop2 = __webpack_require__(48);
	
	var _noop3 = _interopRequireDefault(_noop2);
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ThemesListContainer = __webpack_require__(555);
	
	var _ThemesListContainer2 = _interopRequireDefault(_ThemesListContainer);
	
	var _ThemeContainer = __webpack_require__(553);
	
	var _ThemeContainer2 = _interopRequireDefault(_ThemeContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	class ReferencePage extends _react.Component {
		constructor(props) {
			super(props);
			this.bindThemes = this.bindThemes.bind(this);
			this.onScroll = (0, _debounce3.default)(this.props.onScroll, 500);
		}
	
		componentDidMount() {
			if (!this.themesElement) {
				return;
			}
	
			if (this.props.initialScrollPosition) {
				this.themesElement.scrollTop = this.props.initialScrollPosition;
			}
	
			this.themesElement.addEventListener('scroll', this.onScroll, false);
		}
	
		componentWillUnmount() {
			if (!this.themesElement) {
				return;
			}
	
			this.themesElement.removeEventListener('scroll', this.onScroll, false);
		}
	
		bindThemes(domElement) {
			this.themesElement = domElement;
		}
	
		render() {
			return _react2.default.createElement(
				'div',
				{ className: 'ReferencePage' },
				_react2.default.createElement(_ThemesListContainer2.default, null),
				_react2.default.createElement(
					'div',
					{
						ref: this.bindThemes,
						className: 'ReferencePage-themes'
					},
					(0, _map3.default)(this.props.themes, (theme, n) => _react2.default.createElement(_ThemeContainer2.default, { key: n, theme: theme }))
				)
			);
		}
	}
	
	exports.default = ReferencePage;
	ReferencePage.propTypes = {
		themes: _react.PropTypes.array.isRequired,
		initialScrollPosition: _react.PropTypes.number.isRequired,
		onScroll: _react.PropTypes.func
	};
	
	ReferencePage.defautProps = {
		onScroll: _noop3.default
	};

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _values2 = __webpack_require__(162);
	
	var _values3 = _interopRequireDefault(_values2);
	
	var _property2 = __webpack_require__(49);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _reactRedux = __webpack_require__(12);
	
	var _recompose = __webpack_require__(43);
	
	var _renderNothingUntil = __webpack_require__(127);
	
	var _renderNothingUntil2 = _interopRequireDefault(_renderNothingUntil);
	
	var _themes = __webpack_require__(181);
	
	var _themes2 = __webpack_require__(298);
	
	var _reference = __webpack_require__(30);
	
	var _ReferencePage = __webpack_require__(544);
	
	var _ReferencePage2 = _interopRequireDefault(_ReferencePage);
	
	var _deferRendering = __webpack_require__(557);
	
	var _deferRendering2 = _interopRequireDefault(_deferRendering);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		initialScrollPosition: (0, _themes2.getScrollPosition)(state),
		isReferenceLoaded: (0, _reference.isLoaded)(state),
		themes: (0, _values3.default)((0, _reference.getAllThemes)(state))
	});
	
	/**
	 *
	 */
	const mapDispatchToProps = dispatch => ({
		onScroll(event) {
			dispatch((0, _themes.saveScrollPosition)(event.target.scrollTop));
		}
	});
	
	/**
	 *
	 */
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _renderNothingUntil2.default)((0, _property3.default)('isReferenceLoaded'))
	// I couln't figure out how to use deferRendering ala recompose HoCs
	)((0, _deferRendering2.default)(_ReferencePage2.default));

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const RichText = (_ref) => {
		let html = _ref.html;
		return _react2.default.createElement("div", {
			className: "RichText"
			// eslint-disable-next-line react/no-danger
			, dangerouslySetInnerHTML: {
				__html: html
			}
		});
	};
	
	RichText.propTypes = {
		html: _react.PropTypes.string
	};
	
	exports.default = RichText;

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _noop2 = __webpack_require__(48);
	
	var _noop3 = _interopRequireDefault(_noop2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _TestInstructions = __webpack_require__(551);
	
	var _TestInstructions2 = _interopRequireDefault(_TestInstructions);
	
	var _TestHelpersContainer = __webpack_require__(550);
	
	var _TestHelpersContainer2 = _interopRequireDefault(_TestHelpersContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function Test(_ref) {
		let id = _ref.id,
		    title = _ref.title,
		    instructions = _ref.instructions,
		    importResult = _ref.importResult,
		    applicable = _ref.applicable,
		    applied = _ref.applied,
		    areInstructionsOpen = _ref.areInstructionsOpen,
		    toggleInstructions = _ref.toggleInstructions,
		    done = _ref.done,
		    onApply = _ref.onApply,
		    onDone = _ref.onDone,
		    intl = _ref.intl;
	
		const handleApplyChange = event => {
			onApply(event.target.checked);
			if (event.target.checked) {
				toggleInstructions(true);
			}
		};
	
		const handleDoneChange = event => onDone(event.target.checked);
	
		const applyTranslateKey = applied ? 'uncheck' : 'check';
		const className = (0, _classnames2.default)({
			Test: true,
			'is-applied': applied
		});
	
		return _react2.default.createElement(
			'article',
			{ className: className },
			_react2.default.createElement(
				'header',
				{ className: 'Test-header' },
				_react2.default.createElement(
					'div',
					{ className: 'Test-title' },
					_react2.default.createElement(
						'h4',
						{ className: 'Test-id' },
						intl.formatMessage({ id: 'Test.title' }, { id })
					),
					_react2.default.createElement('div', {
						className: 'Test-description',
						dangerouslySetInnerHTML: {
							__html: title
						}
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'Test-actions' },
					(0, _renderIf2.default)(importResult)(() => _react2.default.createElement(
						'div',
						{ className: 'Test-action Test-action---import' },
						_react2.default.createElement(
							'span',
							{
								className: 'Label ImportResult',
								'data-import-result': importResult,
								title: intl.formatMessage({
									id: `ImportResult.${importResult}.title`
								})
							},
							importResult
						)
					)),
					(0, _renderIf2.default)(applicable)(() => _react2.default.createElement(
						'div',
						{ className: 'Test-action Test-action---apply' },
						_react2.default.createElement('input', {
							title: intl.formatMessage({
								id: `Test.apply.${applyTranslateKey}.title`
							}, { id }),
							className: 'Test-actionInput',
							type: 'checkbox',
							id: `test-${id}-apply-input`,
							checked: applied,
							onChange: handleApplyChange
						})
					)),
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('Test-action Test-action--done', {
								'Test-action--checked': done
							})
						},
						_react2.default.createElement(
							'label',
							{
								htmlFor: `test-${id}-done-input`,
								className: 'Test-actionLabel',
								title: intl.formatMessage({
									id: done ? 'Test.done' : 'Test.todo'
								})
							},
							_react2.default.createElement(_Icon2.default, { name: 'flag' })
						),
						_react2.default.createElement('input', {
							className: 'Test-actionInput u-hidden',
							type: 'checkbox',
							id: `test-${id}-done-input`,
							checked: done,
							onChange: handleDoneChange
						})
					)
				)
			),
			(0, _renderIf2.default)(instructions)(() => _react2.default.createElement(_TestInstructions2.default, {
				id: id,
				instructions: instructions,
				isOpen: areInstructionsOpen,
				onToggleRequest: toggleInstructions
			})),
			(0, _renderIf2.default)(applied)(() => _react2.default.createElement(_TestHelpersContainer2.default, { id: id }))
		);
	}
	
	Test.propTypes = {
		id: _react.PropTypes.string.isRequired,
		title: _react.PropTypes.string.isRequired,
		instructions: _react.PropTypes.string,
		importResult: _react.PropTypes.string,
		applicable: _react.PropTypes.bool,
		applied: _react.PropTypes.bool,
		done: _react.PropTypes.bool,
		onApply: _react.PropTypes.func,
		onDone: _react.PropTypes.func,
		intl: _reactIntl.intlShape.isRequired,
		areInstructionsOpen: _react.PropTypes.bool,
		toggleInstructions: _react.PropTypes.func
	};
	
	Test.defaultProps = {
		applicable: false,
		applied: false,
		done: false,
		importResult: '',
		onApply: _noop3.default,
		onDone: _noop3.default
	};
	
	exports.default = (0, _reactIntl.injectIntl)(Test);

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _reactRedux = __webpack_require__(12);
	
	var _recompose = __webpack_require__(43);
	
	var _checklist = __webpack_require__(296);
	
	var _tests = __webpack_require__(129);
	
	var _instructions = __webpack_require__(484);
	
	var _helpers = __webpack_require__(128);
	
	var _imports = __webpack_require__(96);
	
	var _tests2 = __webpack_require__(180);
	
	var _checklist2 = __webpack_require__(124);
	
	var _Test = __webpack_require__(547);
	
	var _Test2 = _interopRequireDefault(_Test);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = (state, _ref) => {
		let id = _ref.id;
		return {
			done: (0, _checklist.isTestDone)(state, id),
			applicable: (0, _helpers.testHasHelpers)(state, id),
			applied: (0, _tests.isEnabled)(state, id),
			instructions: (0, _instructions.getInstructionsByTest)(state, id),
			importResult: (0, _imports.getOneTestResult)(state, id)
		};
	};
	
	/**
	 *
	 */
	const mapDispatchToProps = (dispatch, _ref2) => {
		let id = _ref2.id;
		return {
			onApply(applied) {
				dispatch(applied ? (0, _tests2.enable)(id) : (0, _tests2.disable)(id));
			},
			onDone(done) {
				dispatch((0, _checklist2.setTestDone)(id, done));
			}
		};
	};
	
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _recompose.withState)('areInstructionsOpen', 'toggleInstructions', props => props.applied))(_Test2.default);

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactIntl = __webpack_require__(10);
	
	var _helpers = __webpack_require__(302);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function TestHelpers(_ref) {
		let id = _ref.id,
		    helpers = _ref.helpers,
		    isOpen = _ref.isOpen,
		    onToggleRequest = _ref.onToggleRequest,
		    intl = _ref.intl;
	
		const containerClass = (0, _classnames2.default)('TestHelpers', 'TestSection', {
			'is-open': isOpen
		});
		const contentClass = (0, _classnames2.default)('TestSection-body', {
			'u-hidden': !isOpen
		});
	
		const toggle = () => onToggleRequest(!isOpen);
	
		return _react2.default.createElement(
			'div',
			{ className: containerClass },
			_react2.default.createElement(
				'h3',
				{ className: 'TestSection-header' },
				_react2.default.createElement(
					'button',
					{
						type: 'button',
						className: 'TestSection-title TestSection-toggle InvisibleButton',
						onClick: toggle,
						'aria-expanded': isOpen,
						'aria-controls': `TestHelpers-${id}`
					},
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'TestHelpers.title' })
				)
			),
			_react2.default.createElement(
				'div',
				{ id: `TestHelpers-${id}`, className: contentClass },
				_react2.default.createElement(
					'ol',
					null,
					helpers.map((helper, i) => _react2.default.createElement('li', {
						key: i,
						dangerouslySetInnerHTML: {
							__html: (0, _helpers.describe)(intl, helper)
						}
					}))
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'TestSection-body' },
				helpers.map((config, i) => {
					var _info = (0, _helpers.info)(config);
	
					const args = _info.args;
	
					const Helper = (0, _helpers.component)(config);
	
					return Helper ? _react2.default.createElement(Helper, _extends({ key: i }, args)) : null;
				}).filter(helper => !!helper)
			)
		);
	}
	
	TestHelpers.propTypes = {
		id: _react.PropTypes.string.isRequired,
		helpers: _react.PropTypes.array.isRequired,
		isOpen: _react.PropTypes.bool.isRequired,
		onToggleRequest: _react.PropTypes.func.isRequired,
		intl: _reactIntl.intlShape.isRequired
	};
	
	exports.default = (0, _reactIntl.injectIntl)(TestHelpers);

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _recompose = __webpack_require__(43);
	
	var _reactRedux = __webpack_require__(12);
	
	var _helpers = __webpack_require__(128);
	
	var _TestHelpers = __webpack_require__(549);
	
	var _TestHelpers2 = _interopRequireDefault(_TestHelpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = (state, _ref) => {
		let id = _ref.id;
		return {
			helpers: (0, _helpers.getHelpersByTest)(state, id)
		};
	};
	
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), (0, _recompose.withState)('isOpen', 'onToggleRequest', false))(_TestHelpers2.default);

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function TestInstructions(_ref) {
		let id = _ref.id,
		    isOpen = _ref.isOpen,
		    onToggleRequest = _ref.onToggleRequest,
		    instructions = _ref.instructions;
	
		const containerClass = (0, _classnames2.default)('TestInstructions', 'TestSection', {
			'is-open': isOpen
		});
		const textClass = (0, _classnames2.default)('TestSection-body', {
			'u-hidden': !isOpen
		});
	
		const toggle = () => onToggleRequest(!isOpen);
	
		return _react2.default.createElement(
			'div',
			{ className: containerClass },
			_react2.default.createElement(
				'h3',
				{ className: 'TestSection-header' },
				_react2.default.createElement(
					'button',
					{
						type: 'button',
						className: 'TestSection-title TestSection-toggle InvisibleButton',
						onClick: toggle,
						'aria-expanded': isOpen,
						'aria-controls': `TestInstructions-${id}`
					},
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Test.instructions' })
				)
			),
			_react2.default.createElement('div', {
				id: `TestInstructions-${id}`,
				className: textClass,
				dangerouslySetInnerHTML: {
					__html: instructions
				}
			})
		);
	}
	
	TestInstructions.propTypes = {
		id: _react.PropTypes.string,
		instructions: _react.PropTypes.string,
		isOpen: _react.PropTypes.bool.isRequired,
		onToggleRequest: _react.PropTypes.func.isRequired
	};
	
	exports.default = (0, _reactIntl.injectIntl)(TestInstructions);

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(10);
	
	var _CriterionContainer = __webpack_require__(530);
	
	var _CriterionContainer2 = _interopRequireDefault(_CriterionContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function Theme(_ref) {
		let theme = _ref.theme,
		    criteria = _ref.criteria;
	
		return _react2.default.createElement(
			'div',
			{ id: `theme-${theme.id}`, className: 'Theme' },
			_react2.default.createElement(
				'div',
				{ className: 'Theme-header' },
				_react2.default.createElement(
					'h2',
					{ className: 'Theme-title Title' },
					theme.title
				),
				_react2.default.createElement(
					'a',
					{
						href: '#themesMenu',
						className: 'ScreenReaderOnly Theme-menuLink'
					},
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Theme.themesMenu' })
				)
			),
			_react2.default.createElement(
				'ul',
				{ className: 'Theme-criteria' },
				(0, _map3.default)(criteria, criterion => _react2.default.createElement(_CriterionContainer2.default, _extends({
					key: `criterion-${criterion.id}`
				}, criterion)))
			)
		);
	}
	
	Theme.propTypes = {
		theme: _react.PropTypes.object,
		criteria: _react.PropTypes.array
	};
	
	exports.default = Theme;

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _property2 = __webpack_require__(49);
	
	var _property3 = _interopRequireDefault(_property2);
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _recompose = __webpack_require__(43);
	
	var _reactRedux = __webpack_require__(12);
	
	var _Theme = __webpack_require__(552);
	
	var _Theme2 = _interopRequireDefault(_Theme);
	
	var _renderNothingUntil = __webpack_require__(127);
	
	var _renderNothingUntil2 = _interopRequireDefault(_renderNothingUntil);
	
	var _reference = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = (state, ownProps) => {
		const themeId = (0, _get3.default)(ownProps.theme, 'id', null);
	
		return {
			criteria: (0, _reference.getAllCriteriaByTheme)(state, themeId)
		};
	};
	
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), (0, _renderNothingUntil2.default)((0, _property3.default)('theme')))(_Theme2.default);

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _map2 = __webpack_require__(32);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	var _reactIntl = __webpack_require__(10);
	
	var _reactAriaMenubutton = __webpack_require__(252);
	
	var _DevToolsContainer = __webpack_require__(532);
	
	var _DevToolsContainer2 = _interopRequireDefault(_DevToolsContainer);
	
	var _ThemesListItem = __webpack_require__(556);
	
	var _ThemesListItem2 = _interopRequireDefault(_ThemesListItem);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const icons = {
		1: 'image',
		2: 'window-maximize',
		3: 'paint-brush',
		4: 'film',
		5: 'table',
		6: 'chain',
		7: 'code',
		8: 'exclamation-triangle',
		9: 'mouse-pointer',
		10: 'columns',
		11: 'list-alt',
		12: 'check-square-o',
		13: 'desktop'
	};
	
	/**
	 *
	 */
	function ThemesList(_ref) {
		let themes = _ref.themes,
		    isOpen = _ref.isOpen,
		    setOpen = _ref.setOpen;
	
		return _react2.default.createElement(
			_reactAriaMenubutton.Wrapper,
			{
				className: (0, _classnames2.default)('ThemesList', { 'is-open': isOpen }),
				onSelection: href => {
					document.location.href = href;
				},
				onMenuToggle: menu => setOpen(menu.isOpen),
				id: 'ThemesList-wrapper'
			},
			_react2.default.createElement(
				'h2',
				{ className: 'ThemesList-title Title Title--accent' },
				_react2.default.createElement(
					_reactAriaMenubutton.Button,
					{
						className: 'ThemesList-toggle',
						id: 'themesMenu'
					},
					(0, _renderIf2.default)(isOpen)(() => _react2.default.createElement(
						'span',
						{ 'aria-hidden': true, className: 'ThemesList-toggleIcon' },
						'\u25BC'
					)),
					(0, _renderIf2.default)(!isOpen)(() => _react2.default.createElement(_Icon2.default, { name: 'list-ul', className: 'ThemesList-toggleIcon' })),
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'ThemesList.title' })
				)
			),
			(0, _renderIf2.default)(("production") !== 'production')(() => _react2.default.createElement(_DevToolsContainer2.default, null)),
			_react2.default.createElement(
				_reactAriaMenubutton.Menu,
				{ tag: 'ul', className: 'ThemesList-list' },
				(0, _map3.default)(themes, theme => _react2.default.createElement(_ThemesListItem2.default, _extends({}, theme, {
					icon: icons[theme.id],
					key: theme.id
				})))
			)
		);
	}
	
	ThemesList.propTypes = {
		themes: _react.PropTypes.array.isRequired,
		isOpen: _react.PropTypes.bool.isRequired,
		setOpen: _react.PropTypes.func.isRequired
	};
	
	ThemesList.defaultProps = {
		inactiveThemes: []
	};
	
	exports.default = ThemesList;

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _values2 = __webpack_require__(162);
	
	var _values3 = _interopRequireDefault(_values2);
	
	var _reactRedux = __webpack_require__(12);
	
	var _themes = __webpack_require__(181);
	
	var _reference = __webpack_require__(30);
	
	var _themes2 = __webpack_require__(298);
	
	var _ThemesList = __webpack_require__(554);
	
	var _ThemesList2 = _interopRequireDefault(_ThemesList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		themes: (0, _values3.default)((0, _reference.getAllThemes)(state)),
		isOpen: (0, _themes2.isMenuOpen)(state)
	});
	
	const mapDispatchToProps = dispatch => ({
		setOpen(toggle) {
			dispatch((0, _themes.toggleMenu)(toggle));
		}
	});
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ThemesList2.default);

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAriaMenubutton = __webpack_require__(252);
	
	var _Icon = __webpack_require__(52);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ThemesListItem(_ref) {
		let id = _ref.id,
		    title = _ref.title,
		    icon = _ref.icon;
	
		const props = {};
		const listItem = tab => _react2.default.createElement(
			'li',
			_extends({ className: 'ThemesList-item' }, props),
			tab
		);
	
		return listItem(_react2.default.createElement(
			_reactAriaMenubutton.MenuItem,
			{
				tag: 'a',
				className: 'InvisibleLink ThemesList-link',
				href: `#theme-${id}`,
				value: `#theme-${id}`
			},
			_react2.default.createElement(_Icon2.default, { name: icon, className: 'ThemesList-itemIcon' }),
			title
		));
	}
	
	ThemesListItem.propTypes = {
		id: _react.PropTypes.string.isRequired,
		title: _react.PropTypes.string.isRequired,
		icon: _react.PropTypes.string.isRequired
	};
	
	exports.default = ThemesListItem;

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = deferRendering;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hoistNonReactStatics = __webpack_require__(144);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Allows two animation frames to complete to allow other components to update
	 * and re-render before mounting and rendering an expensive `WrappedComponent`.
	 *
	 * taken from https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3#b1f2
	 */
	function deferRendering(WrappedComponent) {
		class DeferredRenderWrapper extends _react.Component {
			constructor(props, context) {
				super(props, context);
				this.state = {
					shouldRender: false
				};
			}
	
			componentDidMount() {
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(() => this.setState({
						shouldRender: true
					}));
				});
			}
	
			render() {
				return this.state.shouldRender ? _react2.default.createElement(WrappedComponent, this.props) : null;
			}
		}
	
		return (0, _hoistNonReactStatics2.default)(DeferredRenderWrapper, WrappedComponent);
	}

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createStore = __webpack_require__(126);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _reducers = __webpack_require__(51);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _getInitialState = __webpack_require__(130);
	
	var _getInitialState2 = _interopRequireDefault(_getInitialState);
	
	var _sagas = __webpack_require__(561);
	
	var _sagas2 = _interopRequireDefault(_sagas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	exports.default = () => (0, _getInitialState2.default)().then(state => (0, _createStore2.default)('panel', _reducers2.default, _sagas2.default, state));

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(62);
	
	var _reactRedux = __webpack_require__(12);
	
	var _reactIntl = __webpack_require__(10);
	
	var _fr = __webpack_require__(269);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _routes = __webpack_require__(560);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _getStore = __webpack_require__(558);
	
	var _getStore2 = _interopRequireDefault(_getStore);
	
	var _fr3 = __webpack_require__(184);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *	Registers the default locale for react-intl.
	 */
	(0, _reactIntl.addLocaleData)(_fr2.default);
	
	(0, _getStore2.default)().then(store => _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactIntl.IntlProvider,
			{ locale: 'fr', messages: _fr4.default },
			(0, _routes2.default)(store)
		)
	)).then(app => (0, _reactDom.render)(app, document.getElementById('panel')));

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function () {
		return _react2.default.createElement(
			_reactRouter.Router,
			{ history: _history2.default },
			_react2.default.createElement(
				_reactRouter.Route,
				{ path: '/', component: _AppContainer2.default },
				_react2.default.createElement(_reactRouter.IndexRoute, { component: _ReferencePageContainer2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: 'import', component: _ImportPageContainer2.default }),
				_react2.default.createElement(_reactRouter.Route, { path: 'help', component: _HelpPage2.default })
			)
		);
	};
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(274);
	
	var _history = __webpack_require__(294);
	
	var _history2 = _interopRequireDefault(_history);
	
	var _AppContainer = __webpack_require__(527);
	
	var _AppContainer2 = _interopRequireDefault(_AppContainer);
	
	var _ReferencePageContainer = __webpack_require__(545);
	
	var _ReferencePageContainer2 = _interopRequireDefault(_ReferencePageContainer);
	
	var _ImportPageContainer = __webpack_require__(541);
	
	var _ImportPageContainer2 = _interopRequireDefault(_ImportPageContainer);
	
	var _HelpPage = __webpack_require__(537);
	
	var _HelpPage2 = _interopRequireDefault(_HelpPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = sagas;
	
	var _panel = __webpack_require__(295);
	
	var panel = _interopRequireWildcard(_panel);
	
	var _imports = __webpack_require__(480);
	
	var imports = _interopRequireWildcard(_imports);
	
	var _tests = __webpack_require__(483);
	
	var tests = _interopRequireWildcard(_tests);
	
	var _criteria = __webpack_require__(478);
	
	var criteria = _interopRequireWildcard(_criteria);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *
	 */
	function* sagas() {
		yield [panel.watchSetPosition(), imports.watchApply(), tests.watchEnable(), tests.watchDisable(), criteria.watchToggleCriterion()];
	}

/***/ }),

/***/ 606:
/***/ (function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return (b64.length * 3 / 4) - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr((len * 3 / 4) - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0; i < l; i += 4) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(654);
	var isArguments = __webpack_require__(653);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),

/***/ 653:
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),

/***/ 654:
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(452)
	var writeMethods = ["write", "end", "destroy"]
	var readMethods = ["resume", "pause"]
	var readEvents = ["data", "close"]
	var slice = Array.prototype.slice
	
	module.exports = duplex
	
	function forEach (arr, fn) {
	    if (arr.forEach) {
	        return arr.forEach(fn)
	    }
	
	    for (var i = 0; i < arr.length; i++) {
	        fn(arr[i], i)
	    }
	}
	
	function duplex(writer, reader) {
	    var stream = new Stream()
	    var ended = false
	
	    forEach(writeMethods, proxyWriter)
	
	    forEach(readMethods, proxyReader)
	
	    forEach(readEvents, proxyStream)
	
	    reader.on("end", handleEnd)
	
	    writer.on("drain", function() {
	      stream.emit("drain")
	    })
	
	    writer.on("error", reemit)
	    reader.on("error", reemit)
	
	    stream.writable = writer.writable
	    stream.readable = reader.readable
	
	    return stream
	
	    function proxyWriter(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            return writer[methodName].apply(writer, arguments)
	        }
	    }
	
	    function proxyReader(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            stream.emit(methodName)
	            var func = reader[methodName]
	            if (func) {
	                return func.apply(reader, arguments)
	            }
	            reader.emit(methodName)
	        }
	    }
	
	    function proxyStream(methodName) {
	        reader.on(methodName, reemit)
	
	        function reemit() {
	            var args = slice.call(arguments)
	            args.unshift(methodName)
	            stream.emit.apply(stream, args)
	        }
	    }
	
	    function handleEnd() {
	        if (ended) {
	            return
	        }
	        ended = true
	        var args = slice.call(arguments)
	        args.unshift("end")
	        stream.emit.apply(stream, args)
	    }
	
	    function reemit(err) {
	        stream.emit("error", err)
	    }
	}


/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
	/* istanbul ignore next */
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
	/* istanbul ignore next */
		else if(typeof exports === 'object')
			exports["esprima"] = factory();
		else
			root["esprima"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/* istanbul ignore if */
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		/*
		  Copyright JS Foundation and other contributors, https://js.foundation/
	
		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:
	
		    * Redistributions of source code must retain the above copyright
		      notice, this list of conditions and the following disclaimer.
		    * Redistributions in binary form must reproduce the above copyright
		      notice, this list of conditions and the following disclaimer in the
		      documentation and/or other materials provided with the distribution.
	
		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
		Object.defineProperty(exports, "__esModule", { value: true });
		var comment_handler_1 = __webpack_require__(1);
		var jsx_parser_1 = __webpack_require__(3);
		var parser_1 = __webpack_require__(8);
		var tokenizer_1 = __webpack_require__(15);
		function parse(code, options, delegate) {
		    var commentHandler = null;
		    var proxyDelegate = function (node, metadata) {
		        if (delegate) {
		            delegate(node, metadata);
		        }
		        if (commentHandler) {
		            commentHandler.visit(node, metadata);
		        }
		    };
		    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
		    var collectComment = false;
		    if (options) {
		        collectComment = (typeof options.comment === 'boolean' && options.comment);
		        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
		        if (collectComment || attachComment) {
		            commentHandler = new comment_handler_1.CommentHandler();
		            commentHandler.attach = attachComment;
		            options.comment = true;
		            parserDelegate = proxyDelegate;
		        }
		    }
		    var isModule = false;
		    if (options && typeof options.sourceType === 'string') {
		        isModule = (options.sourceType === 'module');
		    }
		    var parser;
		    if (options && typeof options.jsx === 'boolean' && options.jsx) {
		        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
		    }
		    else {
		        parser = new parser_1.Parser(code, options, parserDelegate);
		    }
		    var program = isModule ? parser.parseModule() : parser.parseScript();
		    var ast = program;
		    if (collectComment && commentHandler) {
		        ast.comments = commentHandler.comments;
		    }
		    if (parser.config.tokens) {
		        ast.tokens = parser.tokens;
		    }
		    if (parser.config.tolerant) {
		        ast.errors = parser.errorHandler.errors;
		    }
		    return ast;
		}
		exports.parse = parse;
		function parseModule(code, options, delegate) {
		    var parsingOptions = options || {};
		    parsingOptions.sourceType = 'module';
		    return parse(code, parsingOptions, delegate);
		}
		exports.parseModule = parseModule;
		function parseScript(code, options, delegate) {
		    var parsingOptions = options || {};
		    parsingOptions.sourceType = 'script';
		    return parse(code, parsingOptions, delegate);
		}
		exports.parseScript = parseScript;
		function tokenize(code, options, delegate) {
		    var tokenizer = new tokenizer_1.Tokenizer(code, options);
		    var tokens;
		    tokens = [];
		    try {
		        while (true) {
		            var token = tokenizer.getNextToken();
		            if (!token) {
		                break;
		            }
		            if (delegate) {
		                token = delegate(token);
		            }
		            tokens.push(token);
		        }
		    }
		    catch (e) {
		        tokenizer.errorHandler.tolerate(e);
		    }
		    if (tokenizer.errorHandler.tolerant) {
		        tokens.errors = tokenizer.errors();
		    }
		    return tokens;
		}
		exports.tokenize = tokenize;
		var syntax_1 = __webpack_require__(2);
		exports.Syntax = syntax_1.Syntax;
		// Sync with *.json manifests.
		exports.version = '4.0.0';
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		var CommentHandler = (function () {
		    function CommentHandler() {
		        this.attach = false;
		        this.comments = [];
		        this.stack = [];
		        this.leading = [];
		        this.trailing = [];
		    }
		    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
		        //  innnerComments for properties empty block
		        //  `function a() {/** comments **\/}`
		        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
		            var innerComments = [];
		            for (var i = this.leading.length - 1; i >= 0; --i) {
		                var entry = this.leading[i];
		                if (metadata.end.offset >= entry.start) {
		                    innerComments.unshift(entry.comment);
		                    this.leading.splice(i, 1);
		                    this.trailing.splice(i, 1);
		                }
		            }
		            if (innerComments.length) {
		                node.innerComments = innerComments;
		            }
		        }
		    };
		    CommentHandler.prototype.findTrailingComments = function (metadata) {
		        var trailingComments = [];
		        if (this.trailing.length > 0) {
		            for (var i = this.trailing.length - 1; i >= 0; --i) {
		                var entry_1 = this.trailing[i];
		                if (entry_1.start >= metadata.end.offset) {
		                    trailingComments.unshift(entry_1.comment);
		                }
		            }
		            this.trailing.length = 0;
		            return trailingComments;
		        }
		        var entry = this.stack[this.stack.length - 1];
		        if (entry && entry.node.trailingComments) {
		            var firstComment = entry.node.trailingComments[0];
		            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
		                trailingComments = entry.node.trailingComments;
		                delete entry.node.trailingComments;
		            }
		        }
		        return trailingComments;
		    };
		    CommentHandler.prototype.findLeadingComments = function (metadata) {
		        var leadingComments = [];
		        var target;
		        while (this.stack.length > 0) {
		            var entry = this.stack[this.stack.length - 1];
		            if (entry && entry.start >= metadata.start.offset) {
		                target = entry.node;
		                this.stack.pop();
		            }
		            else {
		                break;
		            }
		        }
		        if (target) {
		            var count = target.leadingComments ? target.leadingComments.length : 0;
		            for (var i = count - 1; i >= 0; --i) {
		                var comment = target.leadingComments[i];
		                if (comment.range[1] <= metadata.start.offset) {
		                    leadingComments.unshift(comment);
		                    target.leadingComments.splice(i, 1);
		                }
		            }
		            if (target.leadingComments && target.leadingComments.length === 0) {
		                delete target.leadingComments;
		            }
		            return leadingComments;
		        }
		        for (var i = this.leading.length - 1; i >= 0; --i) {
		            var entry = this.leading[i];
		            if (entry.start <= metadata.start.offset) {
		                leadingComments.unshift(entry.comment);
		                this.leading.splice(i, 1);
		            }
		        }
		        return leadingComments;
		    };
		    CommentHandler.prototype.visitNode = function (node, metadata) {
		        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
		            return;
		        }
		        this.insertInnerComments(node, metadata);
		        var trailingComments = this.findTrailingComments(metadata);
		        var leadingComments = this.findLeadingComments(metadata);
		        if (leadingComments.length > 0) {
		            node.leadingComments = leadingComments;
		        }
		        if (trailingComments.length > 0) {
		            node.trailingComments = trailingComments;
		        }
		        this.stack.push({
		            node: node,
		            start: metadata.start.offset
		        });
		    };
		    CommentHandler.prototype.visitComment = function (node, metadata) {
		        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
		        var comment = {
		            type: type,
		            value: node.value
		        };
		        if (node.range) {
		            comment.range = node.range;
		        }
		        if (node.loc) {
		            comment.loc = node.loc;
		        }
		        this.comments.push(comment);
		        if (this.attach) {
		            var entry = {
		                comment: {
		                    type: type,
		                    value: node.value,
		                    range: [metadata.start.offset, metadata.end.offset]
		                },
		                start: metadata.start.offset
		            };
		            if (node.loc) {
		                entry.comment.loc = node.loc;
		            }
		            node.type = type;
		            this.leading.push(entry);
		            this.trailing.push(entry);
		        }
		    };
		    CommentHandler.prototype.visit = function (node, metadata) {
		        if (node.type === 'LineComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (node.type === 'BlockComment') {
		            this.visitComment(node, metadata);
		        }
		        else if (this.attach) {
		            this.visitNode(node, metadata);
		        }
		    };
		    return CommentHandler;
		}());
		exports.CommentHandler = CommentHandler;
	
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Syntax = {
		    AssignmentExpression: 'AssignmentExpression',
		    AssignmentPattern: 'AssignmentPattern',
		    ArrayExpression: 'ArrayExpression',
		    ArrayPattern: 'ArrayPattern',
		    ArrowFunctionExpression: 'ArrowFunctionExpression',
		    AwaitExpression: 'AwaitExpression',
		    BlockStatement: 'BlockStatement',
		    BinaryExpression: 'BinaryExpression',
		    BreakStatement: 'BreakStatement',
		    CallExpression: 'CallExpression',
		    CatchClause: 'CatchClause',
		    ClassBody: 'ClassBody',
		    ClassDeclaration: 'ClassDeclaration',
		    ClassExpression: 'ClassExpression',
		    ConditionalExpression: 'ConditionalExpression',
		    ContinueStatement: 'ContinueStatement',
		    DoWhileStatement: 'DoWhileStatement',
		    DebuggerStatement: 'DebuggerStatement',
		    EmptyStatement: 'EmptyStatement',
		    ExportAllDeclaration: 'ExportAllDeclaration',
		    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
		    ExportNamedDeclaration: 'ExportNamedDeclaration',
		    ExportSpecifier: 'ExportSpecifier',
		    ExpressionStatement: 'ExpressionStatement',
		    ForStatement: 'ForStatement',
		    ForOfStatement: 'ForOfStatement',
		    ForInStatement: 'ForInStatement',
		    FunctionDeclaration: 'FunctionDeclaration',
		    FunctionExpression: 'FunctionExpression',
		    Identifier: 'Identifier',
		    IfStatement: 'IfStatement',
		    ImportDeclaration: 'ImportDeclaration',
		    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
		    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
		    ImportSpecifier: 'ImportSpecifier',
		    Literal: 'Literal',
		    LabeledStatement: 'LabeledStatement',
		    LogicalExpression: 'LogicalExpression',
		    MemberExpression: 'MemberExpression',
		    MetaProperty: 'MetaProperty',
		    MethodDefinition: 'MethodDefinition',
		    NewExpression: 'NewExpression',
		    ObjectExpression: 'ObjectExpression',
		    ObjectPattern: 'ObjectPattern',
		    Program: 'Program',
		    Property: 'Property',
		    RestElement: 'RestElement',
		    ReturnStatement: 'ReturnStatement',
		    SequenceExpression: 'SequenceExpression',
		    SpreadElement: 'SpreadElement',
		    Super: 'Super',
		    SwitchCase: 'SwitchCase',
		    SwitchStatement: 'SwitchStatement',
		    TaggedTemplateExpression: 'TaggedTemplateExpression',
		    TemplateElement: 'TemplateElement',
		    TemplateLiteral: 'TemplateLiteral',
		    ThisExpression: 'ThisExpression',
		    ThrowStatement: 'ThrowStatement',
		    TryStatement: 'TryStatement',
		    UnaryExpression: 'UnaryExpression',
		    UpdateExpression: 'UpdateExpression',
		    VariableDeclaration: 'VariableDeclaration',
		    VariableDeclarator: 'VariableDeclarator',
		    WhileStatement: 'WhileStatement',
		    WithStatement: 'WithStatement',
		    YieldExpression: 'YieldExpression'
		};
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	/* istanbul ignore next */
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var character_1 = __webpack_require__(4);
		var JSXNode = __webpack_require__(5);
		var jsx_syntax_1 = __webpack_require__(6);
		var Node = __webpack_require__(7);
		var parser_1 = __webpack_require__(8);
		var token_1 = __webpack_require__(13);
		var xhtml_entities_1 = __webpack_require__(14);
		token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
		token_1.TokenName[101 /* Text */] = 'JSXText';
		// Fully qualified element name, e.g. <svg:path> returns "svg:path"
		function getQualifiedElementName(elementName) {
		    var qualifiedName;
		    switch (elementName.type) {
		        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
		            var id = elementName;
		            qualifiedName = id.name;
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
		            var ns = elementName;
		            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
		                getQualifiedElementName(ns.name);
		            break;
		        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
		            var expr = elementName;
		            qualifiedName = getQualifiedElementName(expr.object) + '.' +
		                getQualifiedElementName(expr.property);
		            break;
		        /* istanbul ignore next */
		        default:
		            break;
		    }
		    return qualifiedName;
		}
		var JSXParser = (function (_super) {
		    __extends(JSXParser, _super);
		    function JSXParser(code, options, delegate) {
		        return _super.call(this, code, options, delegate) || this;
		    }
		    JSXParser.prototype.parsePrimaryExpression = function () {
		        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
		    };
		    JSXParser.prototype.startJSX = function () {
		        // Unwind the scanner before the lookahead token.
		        this.scanner.index = this.startMarker.index;
		        this.scanner.lineNumber = this.startMarker.line;
		        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
		    };
		    JSXParser.prototype.finishJSX = function () {
		        // Prime the next lookahead.
		        this.nextToken();
		    };
		    JSXParser.prototype.reenterJSX = function () {
		        this.startJSX();
		        this.expectJSX('}');
		        // Pop the closing '}' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		    };
		    JSXParser.prototype.createJSXNode = function () {
		        this.collectComments();
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.createJSXChildNode = function () {
		        return {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    };
		    JSXParser.prototype.scanXHTMLEntity = function (quote) {
		        var result = '&';
		        var valid = true;
		        var terminated = false;
		        var numeric = false;
		        var hex = false;
		        while (!this.scanner.eof() && valid && !terminated) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === quote) {
		                break;
		            }
		            terminated = (ch === ';');
		            result += ch;
		            ++this.scanner.index;
		            if (!terminated) {
		                switch (result.length) {
		                    case 2:
		                        // e.g. '&#123;'
		                        numeric = (ch === '#');
		                        break;
		                    case 3:
		                        if (numeric) {
		                            // e.g. '&#x41;'
		                            hex = (ch === 'x');
		                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
		                            numeric = numeric && !hex;
		                        }
		                        break;
		                    default:
		                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
		                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
		                        break;
		                }
		            }
		        }
		        if (valid && terminated && result.length > 2) {
		            // e.g. '&#x41;' becomes just '#x41'
		            var str = result.substr(1, result.length - 2);
		            if (numeric && str.length > 1) {
		                result = String.fromCharCode(parseInt(str.substr(1), 10));
		            }
		            else if (hex && str.length > 2) {
		                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
		            }
		            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
		                result = xhtml_entities_1.XHTMLEntities[str];
		            }
		        }
		        return result;
		    };
		    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
		    JSXParser.prototype.lexJSX = function () {
		        var cp = this.scanner.source.charCodeAt(this.scanner.index);
		        // < > / : = { }
		        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
		            var value = this.scanner.source[this.scanner.index++];
		            return {
		                type: 7 /* Punctuator */,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index - 1,
		                end: this.scanner.index
		            };
		        }
		        // " '
		        if (cp === 34 || cp === 39) {
		            var start = this.scanner.index;
		            var quote = this.scanner.source[this.scanner.index++];
		            var str = '';
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source[this.scanner.index++];
		                if (ch === quote) {
		                    break;
		                }
		                else if (ch === '&') {
		                    str += this.scanXHTMLEntity(quote);
		                }
		                else {
		                    str += ch;
		                }
		            }
		            return {
		                type: 8 /* StringLiteral */,
		                value: str,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // ... or .
		        if (cp === 46) {
		            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
		            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
		            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
		            var start = this.scanner.index;
		            this.scanner.index += value.length;
		            return {
		                type: 7 /* Punctuator */,
		                value: value,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        // `
		        if (cp === 96) {
		            // Only placeholder, since it will be rescanned as a real assignment expression.
		            return {
		                type: 10 /* Template */,
		                value: '',
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: this.scanner.index,
		                end: this.scanner.index
		            };
		        }
		        // Identifer can not contain backslash (char code 92).
		        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
		            var start = this.scanner.index;
		            ++this.scanner.index;
		            while (!this.scanner.eof()) {
		                var ch = this.scanner.source.charCodeAt(this.scanner.index);
		                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
		                    ++this.scanner.index;
		                }
		                else if (ch === 45) {
		                    // Hyphen (char code 45) can be part of an identifier.
		                    ++this.scanner.index;
		                }
		                else {
		                    break;
		                }
		            }
		            var id = this.scanner.source.slice(start, this.scanner.index);
		            return {
		                type: 100 /* Identifier */,
		                value: id,
		                lineNumber: this.scanner.lineNumber,
		                lineStart: this.scanner.lineStart,
		                start: start,
		                end: this.scanner.index
		            };
		        }
		        return this.scanner.lex();
		    };
		    JSXParser.prototype.nextJSXToken = function () {
		        this.collectComments();
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.line = this.scanner.lineNumber;
		        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        var token = this.lexJSX();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        if (this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.nextJSXText = function () {
		        this.startMarker.index = this.scanner.index;
		        this.startMarker.line = this.scanner.lineNumber;
		        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        var start = this.scanner.index;
		        var text = '';
		        while (!this.scanner.eof()) {
		            var ch = this.scanner.source[this.scanner.index];
		            if (ch === '{' || ch === '<') {
		                break;
		            }
		            ++this.scanner.index;
		            text += ch;
		            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.scanner.lineNumber;
		                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
		                    ++this.scanner.index;
		                }
		                this.scanner.lineStart = this.scanner.index;
		            }
		        }
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        var token = {
		            type: 101 /* Text */,
		            value: text,
		            lineNumber: this.scanner.lineNumber,
		            lineStart: this.scanner.lineStart,
		            start: start,
		            end: this.scanner.index
		        };
		        if ((text.length > 0) && this.config.tokens) {
		            this.tokens.push(this.convertToken(token));
		        }
		        return token;
		    };
		    JSXParser.prototype.peekJSXToken = function () {
		        var state = this.scanner.saveState();
		        this.scanner.scanComments();
		        var next = this.lexJSX();
		        this.scanner.restoreState(state);
		        return next;
		    };
		    // Expect the next JSX token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    JSXParser.prototype.expectJSX = function (value) {
		        var token = this.nextJSXToken();
		        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next JSX token matches the specified punctuator.
		    JSXParser.prototype.matchJSX = function (value) {
		        var next = this.peekJSXToken();
		        return next.type === 7 /* Punctuator */ && next.value === value;
		    };
		    JSXParser.prototype.parseJSXIdentifier = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== 100 /* Identifier */) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
		    };
		    JSXParser.prototype.parseJSXElementName = function () {
		        var node = this.createJSXNode();
		        var elementName = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = elementName;
		            this.expectJSX(':');
		            var name_1 = this.parseJSXIdentifier();
		            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
		        }
		        else if (this.matchJSX('.')) {
		            while (this.matchJSX('.')) {
		                var object = elementName;
		                this.expectJSX('.');
		                var property = this.parseJSXIdentifier();
		                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
		            }
		        }
		        return elementName;
		    };
		    JSXParser.prototype.parseJSXAttributeName = function () {
		        var node = this.createJSXNode();
		        var attributeName;
		        var identifier = this.parseJSXIdentifier();
		        if (this.matchJSX(':')) {
		            var namespace = identifier;
		            this.expectJSX(':');
		            var name_2 = this.parseJSXIdentifier();
		            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
		        }
		        else {
		            attributeName = identifier;
		        }
		        return attributeName;
		    };
		    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
		        var node = this.createJSXNode();
		        var token = this.nextJSXToken();
		        if (token.type !== 8 /* StringLiteral */) {
		            this.throwUnexpectedToken(token);
		        }
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    JSXParser.prototype.parseJSXExpressionAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.finishJSX();
		        if (this.match('}')) {
		            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
		        }
		        var expression = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXAttributeValue = function () {
		        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
		            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
		    };
		    JSXParser.prototype.parseJSXNameValueAttribute = function () {
		        var node = this.createJSXNode();
		        var name = this.parseJSXAttributeName();
		        var value = null;
		        if (this.matchJSX('=')) {
		            this.expectJSX('=');
		            value = this.parseJSXAttributeValue();
		        }
		        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
		    };
		    JSXParser.prototype.parseJSXSpreadAttribute = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        this.expectJSX('...');
		        this.finishJSX();
		        var argument = this.parseAssignmentExpression();
		        this.reenterJSX();
		        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
		    };
		    JSXParser.prototype.parseJSXAttributes = function () {
		        var attributes = [];
		        while (!this.matchJSX('/') && !this.matchJSX('>')) {
		            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
		                this.parseJSXNameValueAttribute();
		            attributes.push(attribute);
		        }
		        return attributes;
		    };
		    JSXParser.prototype.parseJSXOpeningElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXBoundaryElement = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('<');
		        if (this.matchJSX('/')) {
		            this.expectJSX('/');
		            var name_3 = this.parseJSXElementName();
		            this.expectJSX('>');
		            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
		        }
		        var name = this.parseJSXElementName();
		        var attributes = this.parseJSXAttributes();
		        var selfClosing = this.matchJSX('/');
		        if (selfClosing) {
		            this.expectJSX('/');
		        }
		        this.expectJSX('>');
		        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
		    };
		    JSXParser.prototype.parseJSXEmptyExpression = function () {
		        var node = this.createJSXChildNode();
		        this.collectComments();
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        return this.finalize(node, new JSXNode.JSXEmptyExpression());
		    };
		    JSXParser.prototype.parseJSXExpressionContainer = function () {
		        var node = this.createJSXNode();
		        this.expectJSX('{');
		        var expression;
		        if (this.matchJSX('}')) {
		            expression = this.parseJSXEmptyExpression();
		            this.expectJSX('}');
		        }
		        else {
		            this.finishJSX();
		            expression = this.parseAssignmentExpression();
		            this.reenterJSX();
		        }
		        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
		    };
		    JSXParser.prototype.parseJSXChildren = function () {
		        var children = [];
		        while (!this.scanner.eof()) {
		            var node = this.createJSXChildNode();
		            var token = this.nextJSXText();
		            if (token.start < token.end) {
		                var raw = this.getTokenRaw(token);
		                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
		                children.push(child);
		            }
		            if (this.scanner.source[this.scanner.index] === '{') {
		                var container = this.parseJSXExpressionContainer();
		                children.push(container);
		            }
		            else {
		                break;
		            }
		        }
		        return children;
		    };
		    JSXParser.prototype.parseComplexJSXElement = function (el) {
		        var stack = [];
		        while (!this.scanner.eof()) {
		            el.children = el.children.concat(this.parseJSXChildren());
		            var node = this.createJSXChildNode();
		            var element = this.parseJSXBoundaryElement();
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
		                var opening = element;
		                if (opening.selfClosing) {
		                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
		                    el.children.push(child);
		                }
		                else {
		                    stack.push(el);
		                    el = { node: node, opening: opening, closing: null, children: [] };
		                }
		            }
		            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
		                el.closing = element;
		                var open_1 = getQualifiedElementName(el.opening.name);
		                var close_1 = getQualifiedElementName(el.closing.name);
		                if (open_1 !== close_1) {
		                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
		                }
		                if (stack.length > 0) {
		                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
		                    el = stack[stack.length - 1];
		                    el.children.push(child);
		                    stack.pop();
		                }
		                else {
		                    break;
		                }
		            }
		        }
		        return el;
		    };
		    JSXParser.prototype.parseJSXElement = function () {
		        var node = this.createJSXNode();
		        var opening = this.parseJSXOpeningElement();
		        var children = [];
		        var closing = null;
		        if (!opening.selfClosing) {
		            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
		            children = el.children;
		            closing = el.closing;
		        }
		        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
		    };
		    JSXParser.prototype.parseJSXRoot = function () {
		        // Pop the opening '<' added from the lookahead.
		        if (this.config.tokens) {
		            this.tokens.pop();
		        }
		        this.startJSX();
		        var element = this.parseJSXElement();
		        this.finishJSX();
		        return element;
		    };
		    JSXParser.prototype.isStartOfExpression = function () {
		        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
		    };
		    return JSXParser;
		}(parser_1.Parser));
		exports.JSXParser = JSXParser;
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		// See also tools/generate-unicode-regex.js.
		var Regex = {
		    // Unicode v8.0.0 NonAsciiIdentifierStart:
		    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
		    // Unicode v8.0.0 NonAsciiIdentifierPart:
		    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		};
		exports.Character = {
		    /* tslint:disable:no-bitwise */
		    fromCodePoint: function (cp) {
		        return (cp < 0x10000) ? String.fromCharCode(cp) :
		            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
		                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
		    },
		    // https://tc39.github.io/ecma262/#sec-white-space
		    isWhiteSpace: function (cp) {
		        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
		            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
		    },
		    // https://tc39.github.io/ecma262/#sec-line-terminators
		    isLineTerminator: function (cp) {
		        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
		    },
		    // https://tc39.github.io/ecma262/#sec-names-and-keywords
		    isIdentifierStart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
		    },
		    isIdentifierPart: function (cp) {
		        return (cp === 0x24) || (cp === 0x5F) ||
		            (cp >= 0x41 && cp <= 0x5A) ||
		            (cp >= 0x61 && cp <= 0x7A) ||
		            (cp >= 0x30 && cp <= 0x39) ||
		            (cp === 0x5C) ||
		            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
		    },
		    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
		    isDecimalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39); // 0..9
		    },
		    isHexDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x39) ||
		            (cp >= 0x41 && cp <= 0x46) ||
		            (cp >= 0x61 && cp <= 0x66); // a..f
		    },
		    isOctalDigit: function (cp) {
		        return (cp >= 0x30 && cp <= 0x37); // 0..7
		    }
		};
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var jsx_syntax_1 = __webpack_require__(6);
		/* tslint:disable:max-classes-per-file */
		var JSXClosingElement = (function () {
		    function JSXClosingElement(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
		        this.name = name;
		    }
		    return JSXClosingElement;
		}());
		exports.JSXClosingElement = JSXClosingElement;
		var JSXElement = (function () {
		    function JSXElement(openingElement, children, closingElement) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
		        this.openingElement = openingElement;
		        this.children = children;
		        this.closingElement = closingElement;
		    }
		    return JSXElement;
		}());
		exports.JSXElement = JSXElement;
		var JSXEmptyExpression = (function () {
		    function JSXEmptyExpression() {
		        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
		    }
		    return JSXEmptyExpression;
		}());
		exports.JSXEmptyExpression = JSXEmptyExpression;
		var JSXExpressionContainer = (function () {
		    function JSXExpressionContainer(expression) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
		        this.expression = expression;
		    }
		    return JSXExpressionContainer;
		}());
		exports.JSXExpressionContainer = JSXExpressionContainer;
		var JSXIdentifier = (function () {
		    function JSXIdentifier(name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
		        this.name = name;
		    }
		    return JSXIdentifier;
		}());
		exports.JSXIdentifier = JSXIdentifier;
		var JSXMemberExpression = (function () {
		    function JSXMemberExpression(object, property) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
		        this.object = object;
		        this.property = property;
		    }
		    return JSXMemberExpression;
		}());
		exports.JSXMemberExpression = JSXMemberExpression;
		var JSXAttribute = (function () {
		    function JSXAttribute(name, value) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
		        this.name = name;
		        this.value = value;
		    }
		    return JSXAttribute;
		}());
		exports.JSXAttribute = JSXAttribute;
		var JSXNamespacedName = (function () {
		    function JSXNamespacedName(namespace, name) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
		        this.namespace = namespace;
		        this.name = name;
		    }
		    return JSXNamespacedName;
		}());
		exports.JSXNamespacedName = JSXNamespacedName;
		var JSXOpeningElement = (function () {
		    function JSXOpeningElement(name, selfClosing, attributes) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
		        this.name = name;
		        this.selfClosing = selfClosing;
		        this.attributes = attributes;
		    }
		    return JSXOpeningElement;
		}());
		exports.JSXOpeningElement = JSXOpeningElement;
		var JSXSpreadAttribute = (function () {
		    function JSXSpreadAttribute(argument) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
		        this.argument = argument;
		    }
		    return JSXSpreadAttribute;
		}());
		exports.JSXSpreadAttribute = JSXSpreadAttribute;
		var JSXText = (function () {
		    function JSXText(value, raw) {
		        this.type = jsx_syntax_1.JSXSyntax.JSXText;
		        this.value = value;
		        this.raw = raw;
		    }
		    return JSXText;
		}());
		exports.JSXText = JSXText;
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.JSXSyntax = {
		    JSXAttribute: 'JSXAttribute',
		    JSXClosingElement: 'JSXClosingElement',
		    JSXElement: 'JSXElement',
		    JSXEmptyExpression: 'JSXEmptyExpression',
		    JSXExpressionContainer: 'JSXExpressionContainer',
		    JSXIdentifier: 'JSXIdentifier',
		    JSXMemberExpression: 'JSXMemberExpression',
		    JSXNamespacedName: 'JSXNamespacedName',
		    JSXOpeningElement: 'JSXOpeningElement',
		    JSXSpreadAttribute: 'JSXSpreadAttribute',
		    JSXText: 'JSXText'
		};
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		/* tslint:disable:max-classes-per-file */
		var ArrayExpression = (function () {
		    function ArrayExpression(elements) {
		        this.type = syntax_1.Syntax.ArrayExpression;
		        this.elements = elements;
		    }
		    return ArrayExpression;
		}());
		exports.ArrayExpression = ArrayExpression;
		var ArrayPattern = (function () {
		    function ArrayPattern(elements) {
		        this.type = syntax_1.Syntax.ArrayPattern;
		        this.elements = elements;
		    }
		    return ArrayPattern;
		}());
		exports.ArrayPattern = ArrayPattern;
		var ArrowFunctionExpression = (function () {
		    function ArrowFunctionExpression(params, body, expression) {
		        this.type = syntax_1.Syntax.ArrowFunctionExpression;
		        this.id = null;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = expression;
		        this.async = false;
		    }
		    return ArrowFunctionExpression;
		}());
		exports.ArrowFunctionExpression = ArrowFunctionExpression;
		var AssignmentExpression = (function () {
		    function AssignmentExpression(operator, left, right) {
		        this.type = syntax_1.Syntax.AssignmentExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentExpression;
		}());
		exports.AssignmentExpression = AssignmentExpression;
		var AssignmentPattern = (function () {
		    function AssignmentPattern(left, right) {
		        this.type = syntax_1.Syntax.AssignmentPattern;
		        this.left = left;
		        this.right = right;
		    }
		    return AssignmentPattern;
		}());
		exports.AssignmentPattern = AssignmentPattern;
		var AsyncArrowFunctionExpression = (function () {
		    function AsyncArrowFunctionExpression(params, body, expression) {
		        this.type = syntax_1.Syntax.ArrowFunctionExpression;
		        this.id = null;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = expression;
		        this.async = true;
		    }
		    return AsyncArrowFunctionExpression;
		}());
		exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
		var AsyncFunctionDeclaration = (function () {
		    function AsyncFunctionDeclaration(id, params, body) {
		        this.type = syntax_1.Syntax.FunctionDeclaration;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = false;
		        this.async = true;
		    }
		    return AsyncFunctionDeclaration;
		}());
		exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
		var AsyncFunctionExpression = (function () {
		    function AsyncFunctionExpression(id, params, body) {
		        this.type = syntax_1.Syntax.FunctionExpression;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = false;
		        this.expression = false;
		        this.async = true;
		    }
		    return AsyncFunctionExpression;
		}());
		exports.AsyncFunctionExpression = AsyncFunctionExpression;
		var AwaitExpression = (function () {
		    function AwaitExpression(argument) {
		        this.type = syntax_1.Syntax.AwaitExpression;
		        this.argument = argument;
		    }
		    return AwaitExpression;
		}());
		exports.AwaitExpression = AwaitExpression;
		var BinaryExpression = (function () {
		    function BinaryExpression(operator, left, right) {
		        var logical = (operator === '||' || operator === '&&');
		        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
		        this.operator = operator;
		        this.left = left;
		        this.right = right;
		    }
		    return BinaryExpression;
		}());
		exports.BinaryExpression = BinaryExpression;
		var BlockStatement = (function () {
		    function BlockStatement(body) {
		        this.type = syntax_1.Syntax.BlockStatement;
		        this.body = body;
		    }
		    return BlockStatement;
		}());
		exports.BlockStatement = BlockStatement;
		var BreakStatement = (function () {
		    function BreakStatement(label) {
		        this.type = syntax_1.Syntax.BreakStatement;
		        this.label = label;
		    }
		    return BreakStatement;
		}());
		exports.BreakStatement = BreakStatement;
		var CallExpression = (function () {
		    function CallExpression(callee, args) {
		        this.type = syntax_1.Syntax.CallExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return CallExpression;
		}());
		exports.CallExpression = CallExpression;
		var CatchClause = (function () {
		    function CatchClause(param, body) {
		        this.type = syntax_1.Syntax.CatchClause;
		        this.param = param;
		        this.body = body;
		    }
		    return CatchClause;
		}());
		exports.CatchClause = CatchClause;
		var ClassBody = (function () {
		    function ClassBody(body) {
		        this.type = syntax_1.Syntax.ClassBody;
		        this.body = body;
		    }
		    return ClassBody;
		}());
		exports.ClassBody = ClassBody;
		var ClassDeclaration = (function () {
		    function ClassDeclaration(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassDeclaration;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassDeclaration;
		}());
		exports.ClassDeclaration = ClassDeclaration;
		var ClassExpression = (function () {
		    function ClassExpression(id, superClass, body) {
		        this.type = syntax_1.Syntax.ClassExpression;
		        this.id = id;
		        this.superClass = superClass;
		        this.body = body;
		    }
		    return ClassExpression;
		}());
		exports.ClassExpression = ClassExpression;
		var ComputedMemberExpression = (function () {
		    function ComputedMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = true;
		        this.object = object;
		        this.property = property;
		    }
		    return ComputedMemberExpression;
		}());
		exports.ComputedMemberExpression = ComputedMemberExpression;
		var ConditionalExpression = (function () {
		    function ConditionalExpression(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.ConditionalExpression;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return ConditionalExpression;
		}());
		exports.ConditionalExpression = ConditionalExpression;
		var ContinueStatement = (function () {
		    function ContinueStatement(label) {
		        this.type = syntax_1.Syntax.ContinueStatement;
		        this.label = label;
		    }
		    return ContinueStatement;
		}());
		exports.ContinueStatement = ContinueStatement;
		var DebuggerStatement = (function () {
		    function DebuggerStatement() {
		        this.type = syntax_1.Syntax.DebuggerStatement;
		    }
		    return DebuggerStatement;
		}());
		exports.DebuggerStatement = DebuggerStatement;
		var Directive = (function () {
		    function Directive(expression, directive) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		        this.directive = directive;
		    }
		    return Directive;
		}());
		exports.Directive = Directive;
		var DoWhileStatement = (function () {
		    function DoWhileStatement(body, test) {
		        this.type = syntax_1.Syntax.DoWhileStatement;
		        this.body = body;
		        this.test = test;
		    }
		    return DoWhileStatement;
		}());
		exports.DoWhileStatement = DoWhileStatement;
		var EmptyStatement = (function () {
		    function EmptyStatement() {
		        this.type = syntax_1.Syntax.EmptyStatement;
		    }
		    return EmptyStatement;
		}());
		exports.EmptyStatement = EmptyStatement;
		var ExportAllDeclaration = (function () {
		    function ExportAllDeclaration(source) {
		        this.type = syntax_1.Syntax.ExportAllDeclaration;
		        this.source = source;
		    }
		    return ExportAllDeclaration;
		}());
		exports.ExportAllDeclaration = ExportAllDeclaration;
		var ExportDefaultDeclaration = (function () {
		    function ExportDefaultDeclaration(declaration) {
		        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
		        this.declaration = declaration;
		    }
		    return ExportDefaultDeclaration;
		}());
		exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
		var ExportNamedDeclaration = (function () {
		    function ExportNamedDeclaration(declaration, specifiers, source) {
		        this.type = syntax_1.Syntax.ExportNamedDeclaration;
		        this.declaration = declaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ExportNamedDeclaration;
		}());
		exports.ExportNamedDeclaration = ExportNamedDeclaration;
		var ExportSpecifier = (function () {
		    function ExportSpecifier(local, exported) {
		        this.type = syntax_1.Syntax.ExportSpecifier;
		        this.exported = exported;
		        this.local = local;
		    }
		    return ExportSpecifier;
		}());
		exports.ExportSpecifier = ExportSpecifier;
		var ExpressionStatement = (function () {
		    function ExpressionStatement(expression) {
		        this.type = syntax_1.Syntax.ExpressionStatement;
		        this.expression = expression;
		    }
		    return ExpressionStatement;
		}());
		exports.ExpressionStatement = ExpressionStatement;
		var ForInStatement = (function () {
		    function ForInStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForInStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		        this.each = false;
		    }
		    return ForInStatement;
		}());
		exports.ForInStatement = ForInStatement;
		var ForOfStatement = (function () {
		    function ForOfStatement(left, right, body) {
		        this.type = syntax_1.Syntax.ForOfStatement;
		        this.left = left;
		        this.right = right;
		        this.body = body;
		    }
		    return ForOfStatement;
		}());
		exports.ForOfStatement = ForOfStatement;
		var ForStatement = (function () {
		    function ForStatement(init, test, update, body) {
		        this.type = syntax_1.Syntax.ForStatement;
		        this.init = init;
		        this.test = test;
		        this.update = update;
		        this.body = body;
		    }
		    return ForStatement;
		}());
		exports.ForStatement = ForStatement;
		var FunctionDeclaration = (function () {
		    function FunctionDeclaration(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionDeclaration;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		        this.async = false;
		    }
		    return FunctionDeclaration;
		}());
		exports.FunctionDeclaration = FunctionDeclaration;
		var FunctionExpression = (function () {
		    function FunctionExpression(id, params, body, generator) {
		        this.type = syntax_1.Syntax.FunctionExpression;
		        this.id = id;
		        this.params = params;
		        this.body = body;
		        this.generator = generator;
		        this.expression = false;
		        this.async = false;
		    }
		    return FunctionExpression;
		}());
		exports.FunctionExpression = FunctionExpression;
		var Identifier = (function () {
		    function Identifier(name) {
		        this.type = syntax_1.Syntax.Identifier;
		        this.name = name;
		    }
		    return Identifier;
		}());
		exports.Identifier = Identifier;
		var IfStatement = (function () {
		    function IfStatement(test, consequent, alternate) {
		        this.type = syntax_1.Syntax.IfStatement;
		        this.test = test;
		        this.consequent = consequent;
		        this.alternate = alternate;
		    }
		    return IfStatement;
		}());
		exports.IfStatement = IfStatement;
		var ImportDeclaration = (function () {
		    function ImportDeclaration(specifiers, source) {
		        this.type = syntax_1.Syntax.ImportDeclaration;
		        this.specifiers = specifiers;
		        this.source = source;
		    }
		    return ImportDeclaration;
		}());
		exports.ImportDeclaration = ImportDeclaration;
		var ImportDefaultSpecifier = (function () {
		    function ImportDefaultSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
		        this.local = local;
		    }
		    return ImportDefaultSpecifier;
		}());
		exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
		var ImportNamespaceSpecifier = (function () {
		    function ImportNamespaceSpecifier(local) {
		        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
		        this.local = local;
		    }
		    return ImportNamespaceSpecifier;
		}());
		exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
		var ImportSpecifier = (function () {
		    function ImportSpecifier(local, imported) {
		        this.type = syntax_1.Syntax.ImportSpecifier;
		        this.local = local;
		        this.imported = imported;
		    }
		    return ImportSpecifier;
		}());
		exports.ImportSpecifier = ImportSpecifier;
		var LabeledStatement = (function () {
		    function LabeledStatement(label, body) {
		        this.type = syntax_1.Syntax.LabeledStatement;
		        this.label = label;
		        this.body = body;
		    }
		    return LabeledStatement;
		}());
		exports.LabeledStatement = LabeledStatement;
		var Literal = (function () {
		    function Literal(value, raw) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		    }
		    return Literal;
		}());
		exports.Literal = Literal;
		var MetaProperty = (function () {
		    function MetaProperty(meta, property) {
		        this.type = syntax_1.Syntax.MetaProperty;
		        this.meta = meta;
		        this.property = property;
		    }
		    return MetaProperty;
		}());
		exports.MetaProperty = MetaProperty;
		var MethodDefinition = (function () {
		    function MethodDefinition(key, computed, value, kind, isStatic) {
		        this.type = syntax_1.Syntax.MethodDefinition;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.static = isStatic;
		    }
		    return MethodDefinition;
		}());
		exports.MethodDefinition = MethodDefinition;
		var Module = (function () {
		    function Module(body) {
		        this.type = syntax_1.Syntax.Program;
		        this.body = body;
		        this.sourceType = 'module';
		    }
		    return Module;
		}());
		exports.Module = Module;
		var NewExpression = (function () {
		    function NewExpression(callee, args) {
		        this.type = syntax_1.Syntax.NewExpression;
		        this.callee = callee;
		        this.arguments = args;
		    }
		    return NewExpression;
		}());
		exports.NewExpression = NewExpression;
		var ObjectExpression = (function () {
		    function ObjectExpression(properties) {
		        this.type = syntax_1.Syntax.ObjectExpression;
		        this.properties = properties;
		    }
		    return ObjectExpression;
		}());
		exports.ObjectExpression = ObjectExpression;
		var ObjectPattern = (function () {
		    function ObjectPattern(properties) {
		        this.type = syntax_1.Syntax.ObjectPattern;
		        this.properties = properties;
		    }
		    return ObjectPattern;
		}());
		exports.ObjectPattern = ObjectPattern;
		var Property = (function () {
		    function Property(kind, key, computed, value, method, shorthand) {
		        this.type = syntax_1.Syntax.Property;
		        this.key = key;
		        this.computed = computed;
		        this.value = value;
		        this.kind = kind;
		        this.method = method;
		        this.shorthand = shorthand;
		    }
		    return Property;
		}());
		exports.Property = Property;
		var RegexLiteral = (function () {
		    function RegexLiteral(value, raw, pattern, flags) {
		        this.type = syntax_1.Syntax.Literal;
		        this.value = value;
		        this.raw = raw;
		        this.regex = { pattern: pattern, flags: flags };
		    }
		    return RegexLiteral;
		}());
		exports.RegexLiteral = RegexLiteral;
		var RestElement = (function () {
		    function RestElement(argument) {
		        this.type = syntax_1.Syntax.RestElement;
		        this.argument = argument;
		    }
		    return RestElement;
		}());
		exports.RestElement = RestElement;
		var ReturnStatement = (function () {
		    function ReturnStatement(argument) {
		        this.type = syntax_1.Syntax.ReturnStatement;
		        this.argument = argument;
		    }
		    return ReturnStatement;
		}());
		exports.ReturnStatement = ReturnStatement;
		var Script = (function () {
		    function Script(body) {
		        this.type = syntax_1.Syntax.Program;
		        this.body = body;
		        this.sourceType = 'script';
		    }
		    return Script;
		}());
		exports.Script = Script;
		var SequenceExpression = (function () {
		    function SequenceExpression(expressions) {
		        this.type = syntax_1.Syntax.SequenceExpression;
		        this.expressions = expressions;
		    }
		    return SequenceExpression;
		}());
		exports.SequenceExpression = SequenceExpression;
		var SpreadElement = (function () {
		    function SpreadElement(argument) {
		        this.type = syntax_1.Syntax.SpreadElement;
		        this.argument = argument;
		    }
		    return SpreadElement;
		}());
		exports.SpreadElement = SpreadElement;
		var StaticMemberExpression = (function () {
		    function StaticMemberExpression(object, property) {
		        this.type = syntax_1.Syntax.MemberExpression;
		        this.computed = false;
		        this.object = object;
		        this.property = property;
		    }
		    return StaticMemberExpression;
		}());
		exports.StaticMemberExpression = StaticMemberExpression;
		var Super = (function () {
		    function Super() {
		        this.type = syntax_1.Syntax.Super;
		    }
		    return Super;
		}());
		exports.Super = Super;
		var SwitchCase = (function () {
		    function SwitchCase(test, consequent) {
		        this.type = syntax_1.Syntax.SwitchCase;
		        this.test = test;
		        this.consequent = consequent;
		    }
		    return SwitchCase;
		}());
		exports.SwitchCase = SwitchCase;
		var SwitchStatement = (function () {
		    function SwitchStatement(discriminant, cases) {
		        this.type = syntax_1.Syntax.SwitchStatement;
		        this.discriminant = discriminant;
		        this.cases = cases;
		    }
		    return SwitchStatement;
		}());
		exports.SwitchStatement = SwitchStatement;
		var TaggedTemplateExpression = (function () {
		    function TaggedTemplateExpression(tag, quasi) {
		        this.type = syntax_1.Syntax.TaggedTemplateExpression;
		        this.tag = tag;
		        this.quasi = quasi;
		    }
		    return TaggedTemplateExpression;
		}());
		exports.TaggedTemplateExpression = TaggedTemplateExpression;
		var TemplateElement = (function () {
		    function TemplateElement(value, tail) {
		        this.type = syntax_1.Syntax.TemplateElement;
		        this.value = value;
		        this.tail = tail;
		    }
		    return TemplateElement;
		}());
		exports.TemplateElement = TemplateElement;
		var TemplateLiteral = (function () {
		    function TemplateLiteral(quasis, expressions) {
		        this.type = syntax_1.Syntax.TemplateLiteral;
		        this.quasis = quasis;
		        this.expressions = expressions;
		    }
		    return TemplateLiteral;
		}());
		exports.TemplateLiteral = TemplateLiteral;
		var ThisExpression = (function () {
		    function ThisExpression() {
		        this.type = syntax_1.Syntax.ThisExpression;
		    }
		    return ThisExpression;
		}());
		exports.ThisExpression = ThisExpression;
		var ThrowStatement = (function () {
		    function ThrowStatement(argument) {
		        this.type = syntax_1.Syntax.ThrowStatement;
		        this.argument = argument;
		    }
		    return ThrowStatement;
		}());
		exports.ThrowStatement = ThrowStatement;
		var TryStatement = (function () {
		    function TryStatement(block, handler, finalizer) {
		        this.type = syntax_1.Syntax.TryStatement;
		        this.block = block;
		        this.handler = handler;
		        this.finalizer = finalizer;
		    }
		    return TryStatement;
		}());
		exports.TryStatement = TryStatement;
		var UnaryExpression = (function () {
		    function UnaryExpression(operator, argument) {
		        this.type = syntax_1.Syntax.UnaryExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = true;
		    }
		    return UnaryExpression;
		}());
		exports.UnaryExpression = UnaryExpression;
		var UpdateExpression = (function () {
		    function UpdateExpression(operator, argument, prefix) {
		        this.type = syntax_1.Syntax.UpdateExpression;
		        this.operator = operator;
		        this.argument = argument;
		        this.prefix = prefix;
		    }
		    return UpdateExpression;
		}());
		exports.UpdateExpression = UpdateExpression;
		var VariableDeclaration = (function () {
		    function VariableDeclaration(declarations, kind) {
		        this.type = syntax_1.Syntax.VariableDeclaration;
		        this.declarations = declarations;
		        this.kind = kind;
		    }
		    return VariableDeclaration;
		}());
		exports.VariableDeclaration = VariableDeclaration;
		var VariableDeclarator = (function () {
		    function VariableDeclarator(id, init) {
		        this.type = syntax_1.Syntax.VariableDeclarator;
		        this.id = id;
		        this.init = init;
		    }
		    return VariableDeclarator;
		}());
		exports.VariableDeclarator = VariableDeclarator;
		var WhileStatement = (function () {
		    function WhileStatement(test, body) {
		        this.type = syntax_1.Syntax.WhileStatement;
		        this.test = test;
		        this.body = body;
		    }
		    return WhileStatement;
		}());
		exports.WhileStatement = WhileStatement;
		var WithStatement = (function () {
		    function WithStatement(object, body) {
		        this.type = syntax_1.Syntax.WithStatement;
		        this.object = object;
		        this.body = body;
		    }
		    return WithStatement;
		}());
		exports.WithStatement = WithStatement;
		var YieldExpression = (function () {
		    function YieldExpression(argument, delegate) {
		        this.type = syntax_1.Syntax.YieldExpression;
		        this.argument = argument;
		        this.delegate = delegate;
		    }
		    return YieldExpression;
		}());
		exports.YieldExpression = YieldExpression;
	
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var error_handler_1 = __webpack_require__(10);
		var messages_1 = __webpack_require__(11);
		var Node = __webpack_require__(7);
		var scanner_1 = __webpack_require__(12);
		var syntax_1 = __webpack_require__(2);
		var token_1 = __webpack_require__(13);
		var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
		var Parser = (function () {
		    function Parser(code, options, delegate) {
		        if (options === void 0) { options = {}; }
		        this.config = {
		            range: (typeof options.range === 'boolean') && options.range,
		            loc: (typeof options.loc === 'boolean') && options.loc,
		            source: null,
		            tokens: (typeof options.tokens === 'boolean') && options.tokens,
		            comment: (typeof options.comment === 'boolean') && options.comment,
		            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
		        };
		        if (this.config.loc && options.source && options.source !== null) {
		            this.config.source = String(options.source);
		        }
		        this.delegate = delegate;
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = this.config.tolerant;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = this.config.comment;
		        this.operatorPrecedence = {
		            ')': 0,
		            ';': 0,
		            ',': 0,
		            '=': 0,
		            ']': 0,
		            '||': 1,
		            '&&': 2,
		            '|': 3,
		            '^': 4,
		            '&': 5,
		            '==': 6,
		            '!=': 6,
		            '===': 6,
		            '!==': 6,
		            '<': 7,
		            '>': 7,
		            '<=': 7,
		            '>=': 7,
		            '<<': 8,
		            '>>': 8,
		            '>>>': 8,
		            '+': 9,
		            '-': 9,
		            '*': 11,
		            '/': 11,
		            '%': 11
		        };
		        this.lookahead = {
		            type: 2 /* EOF */,
		            value: '',
		            lineNumber: this.scanner.lineNumber,
		            lineStart: 0,
		            start: 0,
		            end: 0
		        };
		        this.hasLineTerminator = false;
		        this.context = {
		            isModule: false,
		            await: false,
		            allowIn: true,
		            allowStrictDirective: true,
		            allowYield: true,
		            firstCoverInitializedNameError: null,
		            isAssignmentTarget: false,
		            isBindingElement: false,
		            inFunctionBody: false,
		            inIteration: false,
		            inSwitch: false,
		            labelSet: {},
		            strict: false
		        };
		        this.tokens = [];
		        this.startMarker = {
		            index: 0,
		            line: this.scanner.lineNumber,
		            column: 0
		        };
		        this.lastMarker = {
		            index: 0,
		            line: this.scanner.lineNumber,
		            column: 0
		        };
		        this.nextToken();
		        this.lastMarker = {
		            index: this.scanner.index,
		            line: this.scanner.lineNumber,
		            column: this.scanner.index - this.scanner.lineStart
		        };
		    }
		    Parser.prototype.throwError = function (messageFormat) {
		        var values = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            values[_i - 1] = arguments[_i];
		        }
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.lastMarker.line;
		        var column = this.lastMarker.column + 1;
		        throw this.errorHandler.createError(index, line, column, msg);
		    };
		    Parser.prototype.tolerateError = function (messageFormat) {
		        var values = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            values[_i - 1] = arguments[_i];
		        }
		        var args = Array.prototype.slice.call(arguments, 1);
		        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
		            assert_1.assert(idx < args.length, 'Message reference must be in range');
		            return args[idx];
		        });
		        var index = this.lastMarker.index;
		        var line = this.scanner.lineNumber;
		        var column = this.lastMarker.column + 1;
		        this.errorHandler.tolerateError(index, line, column, msg);
		    };
		    // Throw an exception because of the token.
		    Parser.prototype.unexpectedTokenError = function (token, message) {
		        var msg = message || messages_1.Messages.UnexpectedToken;
		        var value;
		        if (token) {
		            if (!message) {
		                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
		                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
		                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
		                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
		                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
		                                    messages_1.Messages.UnexpectedToken;
		                if (token.type === 4 /* Keyword */) {
		                    if (this.scanner.isFutureReservedWord(token.value)) {
		                        msg = messages_1.Messages.UnexpectedReserved;
		                    }
		                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
		                        msg = messages_1.Messages.StrictReservedWord;
		                    }
		                }
		            }
		            value = token.value;
		        }
		        else {
		            value = 'ILLEGAL';
		        }
		        msg = msg.replace('%0', value);
		        if (token && typeof token.lineNumber === 'number') {
		            var index = token.start;
		            var line = token.lineNumber;
		            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
		            var column = token.start - lastMarkerLineStart + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		        else {
		            var index = this.lastMarker.index;
		            var line = this.lastMarker.line;
		            var column = this.lastMarker.column + 1;
		            return this.errorHandler.createError(index, line, column, msg);
		        }
		    };
		    Parser.prototype.throwUnexpectedToken = function (token, message) {
		        throw this.unexpectedTokenError(token, message);
		    };
		    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
		        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
		    };
		    Parser.prototype.collectComments = function () {
		        if (!this.config.comment) {
		            this.scanner.scanComments();
		        }
		        else {
		            var comments = this.scanner.scanComments();
		            if (comments.length > 0 && this.delegate) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var node = void 0;
		                    node = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
		                    };
		                    if (this.config.range) {
		                        node.range = e.range;
		                    }
		                    if (this.config.loc) {
		                        node.loc = e.loc;
		                    }
		                    var metadata = {
		                        start: {
		                            line: e.loc.start.line,
		                            column: e.loc.start.column,
		                            offset: e.range[0]
		                        },
		                        end: {
		                            line: e.loc.end.line,
		                            column: e.loc.end.column,
		                            offset: e.range[1]
		                        }
		                    };
		                    this.delegate(node, metadata);
		                }
		            }
		        }
		    };
		    // From internal representation to an external structure
		    Parser.prototype.getTokenRaw = function (token) {
		        return this.scanner.source.slice(token.start, token.end);
		    };
		    Parser.prototype.convertToken = function (token) {
		        var t = {
		            type: token_1.TokenName[token.type],
		            value: this.getTokenRaw(token)
		        };
		        if (this.config.range) {
		            t.range = [token.start, token.end];
		        }
		        if (this.config.loc) {
		            t.loc = {
		                start: {
		                    line: this.startMarker.line,
		                    column: this.startMarker.column
		                },
		                end: {
		                    line: this.scanner.lineNumber,
		                    column: this.scanner.index - this.scanner.lineStart
		                }
		            };
		        }
		        if (token.type === 9 /* RegularExpression */) {
		            var pattern = token.pattern;
		            var flags = token.flags;
		            t.regex = { pattern: pattern, flags: flags };
		        }
		        return t;
		    };
		    Parser.prototype.nextToken = function () {
		        var token = this.lookahead;
		        this.lastMarker.index = this.scanner.index;
		        this.lastMarker.line = this.scanner.lineNumber;
		        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
		        this.collectComments();
		        if (this.scanner.index !== this.startMarker.index) {
		            this.startMarker.index = this.scanner.index;
		            this.startMarker.line = this.scanner.lineNumber;
		            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
		        }
		        var next = this.scanner.lex();
		        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
		        if (next && this.context.strict && next.type === 3 /* Identifier */) {
		            if (this.scanner.isStrictModeReservedWord(next.value)) {
		                next.type = 4 /* Keyword */;
		            }
		        }
		        this.lookahead = next;
		        if (this.config.tokens && next.type !== 2 /* EOF */) {
		            this.tokens.push(this.convertToken(next));
		        }
		        return token;
		    };
		    Parser.prototype.nextRegexToken = function () {
		        this.collectComments();
		        var token = this.scanner.scanRegExp();
		        if (this.config.tokens) {
		            // Pop the previous token, '/' or '/='
		            // This is added from the lookahead token.
		            this.tokens.pop();
		            this.tokens.push(this.convertToken(token));
		        }
		        // Prime the next lookahead.
		        this.lookahead = token;
		        this.nextToken();
		        return token;
		    };
		    Parser.prototype.createNode = function () {
		        return {
		            index: this.startMarker.index,
		            line: this.startMarker.line,
		            column: this.startMarker.column
		        };
		    };
		    Parser.prototype.startNode = function (token) {
		        return {
		            index: token.start,
		            line: token.lineNumber,
		            column: token.start - token.lineStart
		        };
		    };
		    Parser.prototype.finalize = function (marker, node) {
		        if (this.config.range) {
		            node.range = [marker.index, this.lastMarker.index];
		        }
		        if (this.config.loc) {
		            node.loc = {
		                start: {
		                    line: marker.line,
		                    column: marker.column,
		                },
		                end: {
		                    line: this.lastMarker.line,
		                    column: this.lastMarker.column
		                }
		            };
		            if (this.config.source) {
		                node.loc.source = this.config.source;
		            }
		        }
		        if (this.delegate) {
		            var metadata = {
		                start: {
		                    line: marker.line,
		                    column: marker.column,
		                    offset: marker.index
		                },
		                end: {
		                    line: this.lastMarker.line,
		                    column: this.lastMarker.column,
		                    offset: this.lastMarker.index
		                }
		            };
		            this.delegate(node, metadata);
		        }
		        return node;
		    };
		    // Expect the next token to match the specified punctuator.
		    // If not, an exception will be thrown.
		    Parser.prototype.expect = function (value) {
		        var token = this.nextToken();
		        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
		    Parser.prototype.expectCommaSeparator = function () {
		        if (this.config.tolerant) {
		            var token = this.lookahead;
		            if (token.type === 7 /* Punctuator */ && token.value === ',') {
		                this.nextToken();
		            }
		            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
		                this.nextToken();
		                this.tolerateUnexpectedToken(token);
		            }
		            else {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
		            }
		        }
		        else {
		            this.expect(',');
		        }
		    };
		    // Expect the next token to match the specified keyword.
		    // If not, an exception will be thrown.
		    Parser.prototype.expectKeyword = function (keyword) {
		        var token = this.nextToken();
		        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
		            this.throwUnexpectedToken(token);
		        }
		    };
		    // Return true if the next token matches the specified punctuator.
		    Parser.prototype.match = function (value) {
		        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
		    };
		    // Return true if the next token matches the specified keyword
		    Parser.prototype.matchKeyword = function (keyword) {
		        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
		    };
		    // Return true if the next token matches the specified contextual keyword
		    // (where an identifier is sometimes a keyword depending on the context)
		    Parser.prototype.matchContextualKeyword = function (keyword) {
		        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
		    };
		    // Return true if the next token is an assignment operator
		    Parser.prototype.matchAssign = function () {
		        if (this.lookahead.type !== 7 /* Punctuator */) {
		            return false;
		        }
		        var op = this.lookahead.value;
		        return op === '=' ||
		            op === '*=' ||
		            op === '**=' ||
		            op === '/=' ||
		            op === '%=' ||
		            op === '+=' ||
		            op === '-=' ||
		            op === '<<=' ||
		            op === '>>=' ||
		            op === '>>>=' ||
		            op === '&=' ||
		            op === '^=' ||
		            op === '|=';
		    };
		    // Cover grammar support.
		    //
		    // When an assignment expression position starts with an left parenthesis, the determination of the type
		    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
		    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
		    //
		    // There are three productions that can be parsed in a parentheses pair that needs to be determined
		    // after the outermost pair is closed. They are:
		    //
		    //   1. AssignmentExpression
		    //   2. BindingElements
		    //   3. AssignmentTargets
		    //
		    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
		    // binding element or assignment target.
		    //
		    // The three productions have the relationship:
		    //
		    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
		    //
		    // with a single exception that CoverInitializedName when used directly in an Expression, generates
		    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
		    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
		    //
		    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
		    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
		    // the CoverInitializedName check is conducted.
		    //
		    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
		    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
		    // pattern. The CoverInitializedName check is deferred.
		    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        if (this.context.firstCoverInitializedNameError !== null) {
		            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
		        }
		        this.context.isBindingElement = previousIsBindingElement;
		        this.context.isAssignmentTarget = previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
		        var previousIsBindingElement = this.context.isBindingElement;
		        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		        this.context.isBindingElement = true;
		        this.context.isAssignmentTarget = true;
		        this.context.firstCoverInitializedNameError = null;
		        var result = parseFunction.call(this);
		        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
		        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
		        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
		        return result;
		    };
		    Parser.prototype.consumeSemicolon = function () {
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else if (!this.hasLineTerminator) {
		            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            this.lastMarker.index = this.startMarker.index;
		            this.lastMarker.line = this.startMarker.line;
		            this.lastMarker.column = this.startMarker.column;
		        }
		    };
		    // https://tc39.github.io/ecma262/#sec-primary-expression
		    Parser.prototype.parsePrimaryExpression = function () {
		        var node = this.createNode();
		        var expr;
		        var token, raw;
		        switch (this.lookahead.type) {
		            case 3 /* Identifier */:
		                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
		                    this.tolerateUnexpectedToken(this.lookahead);
		                }
		                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
		                break;
		            case 6 /* NumericLiteral */:
		            case 8 /* StringLiteral */:
		                if (this.context.strict && this.lookahead.octal) {
		                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
		                }
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case 1 /* BooleanLiteral */:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
		                break;
		            case 5 /* NullLiteral */:
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                token = this.nextToken();
		                raw = this.getTokenRaw(token);
		                expr = this.finalize(node, new Node.Literal(null, raw));
		                break;
		            case 10 /* Template */:
		                expr = this.parseTemplateLiteral();
		                break;
		            case 7 /* Punctuator */:
		                switch (this.lookahead.value) {
		                    case '(':
		                        this.context.isBindingElement = false;
		                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
		                        break;
		                    case '[':
		                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
		                        break;
		                    case '{':
		                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
		                        break;
		                    case '/':
		                    case '/=':
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                        this.scanner.index = this.startMarker.index;
		                        token = this.nextRegexToken();
		                        raw = this.getTokenRaw(token);
		                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
		                        break;
		                    default:
		                        expr = this.throwUnexpectedToken(this.nextToken());
		                }
		                break;
		            case 4 /* Keyword */:
		                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
		                    expr = this.parseIdentifierName();
		                }
		                else if (!this.context.strict && this.matchKeyword('let')) {
		                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
		                }
		                else {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    if (this.matchKeyword('function')) {
		                        expr = this.parseFunctionExpression();
		                    }
		                    else if (this.matchKeyword('this')) {
		                        this.nextToken();
		                        expr = this.finalize(node, new Node.ThisExpression());
		                    }
		                    else if (this.matchKeyword('class')) {
		                        expr = this.parseClassExpression();
		                    }
		                    else {
		                        expr = this.throwUnexpectedToken(this.nextToken());
		                    }
		                }
		                break;
		            default:
		                expr = this.throwUnexpectedToken(this.nextToken());
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-array-initializer
		    Parser.prototype.parseSpreadElement = function () {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
		        return this.finalize(node, new Node.SpreadElement(arg));
		    };
		    Parser.prototype.parseArrayInitializer = function () {
		        var node = this.createNode();
		        var elements = [];
		        this.expect('[');
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else if (this.match('...')) {
		                var element = this.parseSpreadElement();
		                if (!this.match(']')) {
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    this.expect(',');
		                }
		                elements.push(element);
		            }
		            else {
		                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayExpression(elements));
		    };
		    // https://tc39.github.io/ecma262/#sec-object-initializer
		    Parser.prototype.parsePropertyMethod = function (params) {
		        this.context.isAssignmentTarget = false;
		        this.context.isBindingElement = false;
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = params.simple;
		        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
		        if (this.context.strict && params.firstRestricted) {
		            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
		        }
		        if (this.context.strict && params.stricted) {
		            this.tolerateUnexpectedToken(params.stricted, params.message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        return body;
		    };
		    Parser.prototype.parsePropertyMethodFunction = function () {
		        var isGenerator = false;
		        var node = this.createNode();
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        var params = this.parseFormalParameters();
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
		        var node = this.createNode();
		        var previousAllowYield = this.context.allowYield;
		        var previousAwait = this.context.await;
		        this.context.allowYield = false;
		        this.context.await = true;
		        var params = this.parseFormalParameters();
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        this.context.await = previousAwait;
		        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
		    };
		    Parser.prototype.parseObjectPropertyKey = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        var key;
		        switch (token.type) {
		            case 8 /* StringLiteral */:
		            case 6 /* NumericLiteral */:
		                if (this.context.strict && token.octal) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
		                }
		                var raw = this.getTokenRaw(token);
		                key = this.finalize(node, new Node.Literal(token.value, raw));
		                break;
		            case 3 /* Identifier */:
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 4 /* Keyword */:
		                key = this.finalize(node, new Node.Identifier(token.value));
		                break;
		            case 7 /* Punctuator */:
		                if (token.value === '[') {
		                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    this.expect(']');
		                }
		                else {
		                    key = this.throwUnexpectedToken(token);
		                }
		                break;
		            default:
		                key = this.throwUnexpectedToken(token);
		        }
		        return key;
		    };
		    Parser.prototype.isPropertyKey = function (key, value) {
		        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
		            (key.type === syntax_1.Syntax.Literal && key.value === value);
		    };
		    Parser.prototype.parseObjectProperty = function (hasProto) {
		        var node = this.createNode();
		        var token = this.lookahead;
		        var kind;
		        var key = null;
		        var value = null;
		        var computed = false;
		        var method = false;
		        var shorthand = false;
		        var isAsync = false;
		        if (token.type === 3 /* Identifier */) {
		            var id = token.value;
		            this.nextToken();
		            computed = this.match('[');
		            isAsync = !this.hasLineTerminator && (id === 'async') &&
		                !this.match(':') && !this.match('(') && !this.match('*');
		            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
		        }
		        else if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
		            kind = 'get';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.context.allowYield = false;
		            value = this.parseGetterMethod();
		        }
		        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
		            kind = 'set';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseSetterMethod();
		        }
		        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        else {
		            if (!key) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            kind = 'init';
		            if (this.match(':') && !isAsync) {
		                if (!computed && this.isPropertyKey(key, '__proto__')) {
		                    if (hasProto.value) {
		                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
		                    }
		                    hasProto.value = true;
		                }
		                this.nextToken();
		                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
		            }
		            else if (this.match('(')) {
		                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
		                method = true;
		            }
		            else if (token.type === 3 /* Identifier */) {
		                var id = this.finalize(node, new Node.Identifier(token.value));
		                if (this.match('=')) {
		                    this.context.firstCoverInitializedNameError = this.lookahead;
		                    this.nextToken();
		                    shorthand = true;
		                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
		                }
		                else {
		                    shorthand = true;
		                    value = id;
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectInitializer = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var properties = [];
		        var hasProto = { value: false };
		        while (!this.match('}')) {
		            properties.push(this.parseObjectProperty(hasProto));
		            if (!this.match('}')) {
		                this.expectCommaSeparator();
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectExpression(properties));
		    };
		    // https://tc39.github.io/ecma262/#sec-template-literals
		    Parser.prototype.parseTemplateHead = function () {
		        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
		        var node = this.createNode();
		        var token = this.nextToken();
		        var raw = token.value;
		        var cooked = token.cooked;
		        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
		    };
		    Parser.prototype.parseTemplateElement = function () {
		        if (this.lookahead.type !== 10 /* Template */) {
		            this.throwUnexpectedToken();
		        }
		        var node = this.createNode();
		        var token = this.nextToken();
		        var raw = token.value;
		        var cooked = token.cooked;
		        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
		    };
		    Parser.prototype.parseTemplateLiteral = function () {
		        var node = this.createNode();
		        var expressions = [];
		        var quasis = [];
		        var quasi = this.parseTemplateHead();
		        quasis.push(quasi);
		        while (!quasi.tail) {
		            expressions.push(this.parseExpression());
		            quasi = this.parseTemplateElement();
		            quasis.push(quasi);
		        }
		        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
		    };
		    // https://tc39.github.io/ecma262/#sec-grouping-operator
		    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		            case syntax_1.Syntax.MemberExpression:
		            case syntax_1.Syntax.RestElement:
		            case syntax_1.Syntax.AssignmentPattern:
		                break;
		            case syntax_1.Syntax.SpreadElement:
		                expr.type = syntax_1.Syntax.RestElement;
		                this.reinterpretExpressionAsPattern(expr.argument);
		                break;
		            case syntax_1.Syntax.ArrayExpression:
		                expr.type = syntax_1.Syntax.ArrayPattern;
		                for (var i = 0; i < expr.elements.length; i++) {
		                    if (expr.elements[i] !== null) {
		                        this.reinterpretExpressionAsPattern(expr.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.ObjectExpression:
		                expr.type = syntax_1.Syntax.ObjectPattern;
		                for (var i = 0; i < expr.properties.length; i++) {
		                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
		                }
		                break;
		            case syntax_1.Syntax.AssignmentExpression:
		                expr.type = syntax_1.Syntax.AssignmentPattern;
		                delete expr.operator;
		                this.reinterpretExpressionAsPattern(expr.left);
		                break;
		            default:
		                // Allow other node type for tolerant parsing.
		                break;
		        }
		    };
		    Parser.prototype.parseGroupExpression = function () {
		        var expr;
		        this.expect('(');
		        if (this.match(')')) {
		            this.nextToken();
		            if (!this.match('=>')) {
		                this.expect('=>');
		            }
		            expr = {
		                type: ArrowParameterPlaceHolder,
		                params: [],
		                async: false
		            };
		        }
		        else {
		            var startToken = this.lookahead;
		            var params = [];
		            if (this.match('...')) {
		                expr = this.parseRestElement(params);
		                this.expect(')');
		                if (!this.match('=>')) {
		                    this.expect('=>');
		                }
		                expr = {
		                    type: ArrowParameterPlaceHolder,
		                    params: [expr],
		                    async: false
		                };
		            }
		            else {
		                var arrow = false;
		                this.context.isBindingElement = true;
		                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                if (this.match(',')) {
		                    var expressions = [];
		                    this.context.isAssignmentTarget = false;
		                    expressions.push(expr);
		                    while (this.lookahead.type !== 2 /* EOF */) {
		                        if (!this.match(',')) {
		                            break;
		                        }
		                        this.nextToken();
		                        if (this.match(')')) {
		                            this.nextToken();
		                            for (var i = 0; i < expressions.length; i++) {
		                                this.reinterpretExpressionAsPattern(expressions[i]);
		                            }
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: expressions,
		                                async: false
		                            };
		                        }
		                        else if (this.match('...')) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            expressions.push(this.parseRestElement(params));
		                            this.expect(')');
		                            if (!this.match('=>')) {
		                                this.expect('=>');
		                            }
		                            this.context.isBindingElement = false;
		                            for (var i = 0; i < expressions.length; i++) {
		                                this.reinterpretExpressionAsPattern(expressions[i]);
		                            }
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: expressions,
		                                async: false
		                            };
		                        }
		                        else {
		                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        if (arrow) {
		                            break;
		                        }
		                    }
		                    if (!arrow) {
		                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		                    }
		                }
		                if (!arrow) {
		                    this.expect(')');
		                    if (this.match('=>')) {
		                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
		                            arrow = true;
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: [expr],
		                                async: false
		                            };
		                        }
		                        if (!arrow) {
		                            if (!this.context.isBindingElement) {
		                                this.throwUnexpectedToken(this.lookahead);
		                            }
		                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
		                                for (var i = 0; i < expr.expressions.length; i++) {
		                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
		                                }
		                            }
		                            else {
		                                this.reinterpretExpressionAsPattern(expr);
		                            }
		                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
		                            expr = {
		                                type: ArrowParameterPlaceHolder,
		                                params: parameters,
		                                async: false
		                            };
		                        }
		                    }
		                    this.context.isBindingElement = false;
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
		    Parser.prototype.parseArguments = function () {
		        this.expect('(');
		        var args = [];
		        if (!this.match(')')) {
		            while (true) {
		                var expr = this.match('...') ? this.parseSpreadElement() :
		                    this.isolateCoverGrammar(this.parseAssignmentExpression);
		                args.push(expr);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expectCommaSeparator();
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return args;
		    };
		    Parser.prototype.isIdentifierName = function (token) {
		        return token.type === 3 /* Identifier */ ||
		            token.type === 4 /* Keyword */ ||
		            token.type === 1 /* BooleanLiteral */ ||
		            token.type === 5 /* NullLiteral */;
		    };
		    Parser.prototype.parseIdentifierName = function () {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (!this.isIdentifierName(token)) {
		            this.throwUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseNewExpression = function () {
		        var node = this.createNode();
		        var id = this.parseIdentifierName();
		        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
		        var expr;
		        if (this.match('.')) {
		            this.nextToken();
		            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
		                var property = this.parseIdentifierName();
		                expr = new Node.MetaProperty(id, property);
		            }
		            else {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
		            var args = this.match('(') ? this.parseArguments() : [];
		            expr = new Node.NewExpression(callee, args);
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return this.finalize(node, expr);
		    };
		    Parser.prototype.parseAsyncArgument = function () {
		        var arg = this.parseAssignmentExpression();
		        this.context.firstCoverInitializedNameError = null;
		        return arg;
		    };
		    Parser.prototype.parseAsyncArguments = function () {
		        this.expect('(');
		        var args = [];
		        if (!this.match(')')) {
		            while (true) {
		                var expr = this.match('...') ? this.parseSpreadElement() :
		                    this.isolateCoverGrammar(this.parseAsyncArgument);
		                args.push(expr);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expectCommaSeparator();
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return args;
		    };
		    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
		        var startToken = this.lookahead;
		        var maybeAsync = this.matchContextualKeyword('async');
		        var previousAllowIn = this.context.allowIn;
		        this.context.allowIn = true;
		        var expr;
		        if (this.matchKeyword('super') && this.context.inFunctionBody) {
		            expr = this.createNode();
		            this.nextToken();
		            expr = this.finalize(expr, new Node.Super());
		            if (!this.match('(') && !this.match('.') && !this.match('[')) {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        }
		        while (true) {
		            if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.match('(')) {
		                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = false;
		                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
		                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
		                if (asyncArrow && this.match('=>')) {
		                    for (var i = 0; i < args.length; ++i) {
		                        this.reinterpretExpressionAsPattern(args[i]);
		                    }
		                    expr = {
		                        type: ArrowParameterPlaceHolder,
		                        params: args,
		                        async: true
		                    };
		                }
		            }
		            else if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        this.context.allowIn = previousAllowIn;
		        return expr;
		    };
		    Parser.prototype.parseSuper = function () {
		        var node = this.createNode();
		        this.expectKeyword('super');
		        if (!this.match('[') && !this.match('.')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        return this.finalize(node, new Node.Super());
		    };
		    Parser.prototype.parseLeftHandSideExpression = function () {
		        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
		        var node = this.startNode(this.lookahead);
		        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
		            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		        while (true) {
		            if (this.match('[')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('[');
		                var property = this.isolateCoverGrammar(this.parseExpression);
		                this.expect(']');
		                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
		            }
		            else if (this.match('.')) {
		                this.context.isBindingElement = false;
		                this.context.isAssignmentTarget = true;
		                this.expect('.');
		                var property = this.parseIdentifierName();
		                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
		            }
		            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
		                var quasi = this.parseTemplateLiteral();
		                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
		            }
		            else {
		                break;
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-update-expressions
		    Parser.prototype.parseUpdateExpression = function () {
		        var expr;
		        var startToken = this.lookahead;
		        if (this.match('++') || this.match('--')) {
		            var node = this.startNode(startToken);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
		            }
		            if (!this.context.isAssignmentTarget) {
		                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		            }
		            var prefix = true;
		            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else {
		            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
		                if (this.match('++') || this.match('--')) {
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
		                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
		                    }
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    this.context.isAssignmentTarget = false;
		                    this.context.isBindingElement = false;
		                    var operator = this.nextToken().value;
		                    var prefix = false;
		                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-unary-operators
		    Parser.prototype.parseAwaitExpression = function () {
		        var node = this.createNode();
		        this.nextToken();
		        var argument = this.parseUnaryExpression();
		        return this.finalize(node, new Node.AwaitExpression(argument));
		    };
		    Parser.prototype.parseUnaryExpression = function () {
		        var expr;
		        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
		            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
		            var node = this.startNode(this.lookahead);
		            var token = this.nextToken();
		            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
		            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
		                this.tolerateError(messages_1.Messages.StrictDelete);
		            }
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        else if (this.context.await && this.matchContextualKeyword('await')) {
		            expr = this.parseAwaitExpression();
		        }
		        else {
		            expr = this.parseUpdateExpression();
		        }
		        return expr;
		    };
		    Parser.prototype.parseExponentiationExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
		            this.nextToken();
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-exp-operator
		    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
		    // https://tc39.github.io/ecma262/#sec-additive-operators
		    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
		    // https://tc39.github.io/ecma262/#sec-relational-operators
		    // https://tc39.github.io/ecma262/#sec-equality-operators
		    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
		    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
		    Parser.prototype.binaryPrecedence = function (token) {
		        var op = token.value;
		        var precedence;
		        if (token.type === 7 /* Punctuator */) {
		            precedence = this.operatorPrecedence[op] || 0;
		        }
		        else if (token.type === 4 /* Keyword */) {
		            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
		        }
		        else {
		            precedence = 0;
		        }
		        return precedence;
		    };
		    Parser.prototype.parseBinaryExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
		        var token = this.lookahead;
		        var prec = this.binaryPrecedence(token);
		        if (prec > 0) {
		            this.nextToken();
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		            var markers = [startToken, this.lookahead];
		            var left = expr;
		            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
		            var stack = [left, token.value, right];
		            var precedences = [prec];
		            while (true) {
		                prec = this.binaryPrecedence(this.lookahead);
		                if (prec <= 0) {
		                    break;
		                }
		                // Reduce: make a binary expression from the three topmost entries.
		                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
		                    right = stack.pop();
		                    var operator = stack.pop();
		                    precedences.pop();
		                    left = stack.pop();
		                    markers.pop();
		                    var node = this.startNode(markers[markers.length - 1]);
		                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
		                }
		                // Shift.
		                stack.push(this.nextToken().value);
		                precedences.push(prec);
		                markers.push(this.lookahead);
		                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
		            }
		            // Final reduce to clean-up the stack.
		            var i = stack.length - 1;
		            expr = stack[i];
		            markers.pop();
		            while (i > 1) {
		                var node = this.startNode(markers.pop());
		                var operator = stack[i - 1];
		                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
		                i -= 2;
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-conditional-operator
		    Parser.prototype.parseConditionalExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
		        if (this.match('?')) {
		            this.nextToken();
		            var previousAllowIn = this.context.allowIn;
		            this.context.allowIn = true;
		            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowIn = previousAllowIn;
		            this.expect(':');
		            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
		            this.context.isAssignmentTarget = false;
		            this.context.isBindingElement = false;
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-assignment-operators
		    Parser.prototype.checkPatternParam = function (options, param) {
		        switch (param.type) {
		            case syntax_1.Syntax.Identifier:
		                this.validateParam(options, param, param.name);
		                break;
		            case syntax_1.Syntax.RestElement:
		                this.checkPatternParam(options, param.argument);
		                break;
		            case syntax_1.Syntax.AssignmentPattern:
		                this.checkPatternParam(options, param.left);
		                break;
		            case syntax_1.Syntax.ArrayPattern:
		                for (var i = 0; i < param.elements.length; i++) {
		                    if (param.elements[i] !== null) {
		                        this.checkPatternParam(options, param.elements[i]);
		                    }
		                }
		                break;
		            case syntax_1.Syntax.ObjectPattern:
		                for (var i = 0; i < param.properties.length; i++) {
		                    this.checkPatternParam(options, param.properties[i].value);
		                }
		                break;
		            default:
		                break;
		        }
		        options.simple = options.simple && (param instanceof Node.Identifier);
		    };
		    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
		        var params = [expr];
		        var options;
		        var asyncArrow = false;
		        switch (expr.type) {
		            case syntax_1.Syntax.Identifier:
		                break;
		            case ArrowParameterPlaceHolder:
		                params = expr.params;
		                asyncArrow = expr.async;
		                break;
		            default:
		                return null;
		        }
		        options = {
		            simple: true,
		            paramSet: {}
		        };
		        for (var i = 0; i < params.length; ++i) {
		            var param = params[i];
		            if (param.type === syntax_1.Syntax.AssignmentPattern) {
		                if (param.right.type === syntax_1.Syntax.YieldExpression) {
		                    if (param.right.argument) {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                    param.right.type = syntax_1.Syntax.Identifier;
		                    param.right.name = 'yield';
		                    delete param.right.argument;
		                    delete param.right.delegate;
		                }
		            }
		            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
		                this.throwUnexpectedToken(this.lookahead);
		            }
		            this.checkPatternParam(options, param);
		            params[i] = param;
		        }
		        if (this.context.strict || !this.context.allowYield) {
		            for (var i = 0; i < params.length; ++i) {
		                var param = params[i];
		                if (param.type === syntax_1.Syntax.YieldExpression) {
		                    this.throwUnexpectedToken(this.lookahead);
		                }
		            }
		        }
		        if (options.message === messages_1.Messages.StrictParamDupe) {
		            var token = this.context.strict ? options.stricted : options.firstRestricted;
		            this.throwUnexpectedToken(token, options.message);
		        }
		        return {
		            simple: options.simple,
		            params: params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.parseAssignmentExpression = function () {
		        var expr;
		        if (!this.context.allowYield && this.matchKeyword('yield')) {
		            expr = this.parseYieldExpression();
		        }
		        else {
		            var startToken = this.lookahead;
		            var token = startToken;
		            expr = this.parseConditionalExpression();
		            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
		                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
		                    var arg = this.parsePrimaryExpression();
		                    this.reinterpretExpressionAsPattern(arg);
		                    expr = {
		                        type: ArrowParameterPlaceHolder,
		                        params: [arg],
		                        async: true
		                    };
		                }
		            }
		            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
		                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
		                this.context.isAssignmentTarget = false;
		                this.context.isBindingElement = false;
		                var isAsync = expr.async;
		                var list = this.reinterpretAsCoverFormalsList(expr);
		                if (list) {
		                    if (this.hasLineTerminator) {
		                        this.tolerateUnexpectedToken(this.lookahead);
		                    }
		                    this.context.firstCoverInitializedNameError = null;
		                    var previousStrict = this.context.strict;
		                    var previousAllowStrictDirective = this.context.allowStrictDirective;
		                    this.context.allowStrictDirective = list.simple;
		                    var previousAllowYield = this.context.allowYield;
		                    var previousAwait = this.context.await;
		                    this.context.allowYield = true;
		                    this.context.await = isAsync;
		                    var node = this.startNode(startToken);
		                    this.expect('=>');
		                    var body = void 0;
		                    if (this.match('{')) {
		                        var previousAllowIn = this.context.allowIn;
		                        this.context.allowIn = true;
		                        body = this.parseFunctionSourceElements();
		                        this.context.allowIn = previousAllowIn;
		                    }
		                    else {
		                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    }
		                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
		                    if (this.context.strict && list.firstRestricted) {
		                        this.throwUnexpectedToken(list.firstRestricted, list.message);
		                    }
		                    if (this.context.strict && list.stricted) {
		                        this.tolerateUnexpectedToken(list.stricted, list.message);
		                    }
		                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
		                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
		                    this.context.strict = previousStrict;
		                    this.context.allowStrictDirective = previousAllowStrictDirective;
		                    this.context.allowYield = previousAllowYield;
		                    this.context.await = previousAwait;
		                }
		            }
		            else {
		                if (this.matchAssign()) {
		                    if (!this.context.isAssignmentTarget) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
		                    }
		                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
		                        var id = expr;
		                        if (this.scanner.isRestrictedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
		                        }
		                        if (this.scanner.isStrictModeReservedWord(id.name)) {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		                        }
		                    }
		                    if (!this.match('=')) {
		                        this.context.isAssignmentTarget = false;
		                        this.context.isBindingElement = false;
		                    }
		                    else {
		                        this.reinterpretExpressionAsPattern(expr);
		                    }
		                    token = this.nextToken();
		                    var operator = token.value;
		                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
		                    this.context.firstCoverInitializedNameError = null;
		                }
		            }
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-comma-operator
		    Parser.prototype.parseExpression = function () {
		        var startToken = this.lookahead;
		        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        if (this.match(',')) {
		            var expressions = [];
		            expressions.push(expr);
		            while (this.lookahead.type !== 2 /* EOF */) {
		                if (!this.match(',')) {
		                    break;
		                }
		                this.nextToken();
		                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		            }
		            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		        }
		        return expr;
		    };
		    // https://tc39.github.io/ecma262/#sec-block
		    Parser.prototype.parseStatementListItem = function () {
		        var statement;
		        this.context.isAssignmentTarget = true;
		        this.context.isBindingElement = true;
		        if (this.lookahead.type === 4 /* Keyword */) {
		            switch (this.lookahead.value) {
		                case 'export':
		                    if (!this.context.isModule) {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
		                    }
		                    statement = this.parseExportDeclaration();
		                    break;
		                case 'import':
		                    if (!this.context.isModule) {
		                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
		                    }
		                    statement = this.parseImportDeclaration();
		                    break;
		                case 'const':
		                    statement = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'function':
		                    statement = this.parseFunctionDeclaration();
		                    break;
		                case 'class':
		                    statement = this.parseClassDeclaration();
		                    break;
		                case 'let':
		                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
		                    break;
		                default:
		                    statement = this.parseStatement();
		                    break;
		            }
		        }
		        else {
		            statement = this.parseStatement();
		        }
		        return statement;
		    };
		    Parser.prototype.parseBlock = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var block = [];
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            block.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.BlockStatement(block));
		    };
		    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
		    Parser.prototype.parseLexicalBinding = function (kind, options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, kind);
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(id.name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (kind === 'const') {
		            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
		                if (this.match('=')) {
		                    this.nextToken();
		                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		                }
		                else {
		                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
		                }
		            }
		        }
		        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
		            this.expect('=');
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseBindingList = function (kind, options) {
		        var list = [this.parseLexicalBinding(kind, options)];
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseLexicalBinding(kind, options));
		        }
		        return list;
		    };
		    Parser.prototype.isLexicalDeclaration = function () {
		        var state = this.scanner.saveState();
		        this.scanner.scanComments();
		        var next = this.scanner.lex();
		        this.scanner.restoreState(state);
		        return (next.type === 3 /* Identifier */) ||
		            (next.type === 7 /* Punctuator */ && next.value === '[') ||
		            (next.type === 7 /* Punctuator */ && next.value === '{') ||
		            (next.type === 4 /* Keyword */ && next.value === 'let') ||
		            (next.type === 4 /* Keyword */ && next.value === 'yield');
		    };
		    Parser.prototype.parseLexicalDeclaration = function (options) {
		        var node = this.createNode();
		        var kind = this.nextToken().value;
		        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
		        var declarations = this.parseBindingList(kind, options);
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
		    };
		    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
		    Parser.prototype.parseBindingRestElement = function (params, kind) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params, kind);
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseArrayPattern = function (params, kind) {
		        var node = this.createNode();
		        this.expect('[');
		        var elements = [];
		        while (!this.match(']')) {
		            if (this.match(',')) {
		                this.nextToken();
		                elements.push(null);
		            }
		            else {
		                if (this.match('...')) {
		                    elements.push(this.parseBindingRestElement(params, kind));
		                    break;
		                }
		                else {
		                    elements.push(this.parsePatternWithDefault(params, kind));
		                }
		                if (!this.match(']')) {
		                    this.expect(',');
		                }
		            }
		        }
		        this.expect(']');
		        return this.finalize(node, new Node.ArrayPattern(elements));
		    };
		    Parser.prototype.parsePropertyPattern = function (params, kind) {
		        var node = this.createNode();
		        var computed = false;
		        var shorthand = false;
		        var method = false;
		        var key;
		        var value;
		        if (this.lookahead.type === 3 /* Identifier */) {
		            var keyToken = this.lookahead;
		            key = this.parseVariableIdentifier();
		            var init = this.finalize(node, new Node.Identifier(keyToken.value));
		            if (this.match('=')) {
		                params.push(keyToken);
		                shorthand = true;
		                this.nextToken();
		                var expr = this.parseAssignmentExpression();
		                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
		            }
		            else if (!this.match(':')) {
		                params.push(keyToken);
		                shorthand = true;
		                value = init;
		            }
		            else {
		                this.expect(':');
		                value = this.parsePatternWithDefault(params, kind);
		            }
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            this.expect(':');
		            value = this.parsePatternWithDefault(params, kind);
		        }
		        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
		    };
		    Parser.prototype.parseObjectPattern = function (params, kind) {
		        var node = this.createNode();
		        var properties = [];
		        this.expect('{');
		        while (!this.match('}')) {
		            properties.push(this.parsePropertyPattern(params, kind));
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return this.finalize(node, new Node.ObjectPattern(properties));
		    };
		    Parser.prototype.parsePattern = function (params, kind) {
		        var pattern;
		        if (this.match('[')) {
		            pattern = this.parseArrayPattern(params, kind);
		        }
		        else if (this.match('{')) {
		            pattern = this.parseObjectPattern(params, kind);
		        }
		        else {
		            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
		                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
		            }
		            params.push(this.lookahead);
		            pattern = this.parseVariableIdentifier(kind);
		        }
		        return pattern;
		    };
		    Parser.prototype.parsePatternWithDefault = function (params, kind) {
		        var startToken = this.lookahead;
		        var pattern = this.parsePattern(params, kind);
		        if (this.match('=')) {
		            this.nextToken();
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = true;
		            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
		            this.context.allowYield = previousAllowYield;
		            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
		        }
		        return pattern;
		    };
		    // https://tc39.github.io/ecma262/#sec-variable-statement
		    Parser.prototype.parseVariableIdentifier = function (kind) {
		        var node = this.createNode();
		        var token = this.nextToken();
		        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
		            if (this.context.strict) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            else if (!this.context.allowYield) {
		                this.throwUnexpectedToken(token);
		            }
		        }
		        else if (token.type !== 3 /* Identifier */) {
		            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
		                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
		            }
		            else {
		                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
		                    this.throwUnexpectedToken(token);
		                }
		            }
		        }
		        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
		            this.tolerateUnexpectedToken(token);
		        }
		        return this.finalize(node, new Node.Identifier(token.value));
		    };
		    Parser.prototype.parseVariableDeclaration = function (options) {
		        var node = this.createNode();
		        var params = [];
		        var id = this.parsePattern(params, 'var');
		        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(id.name)) {
		                this.tolerateError(messages_1.Messages.StrictVarName);
		            }
		        }
		        var init = null;
		        if (this.match('=')) {
		            this.nextToken();
		            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		        }
		        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
		            this.expect('=');
		        }
		        return this.finalize(node, new Node.VariableDeclarator(id, init));
		    };
		    Parser.prototype.parseVariableDeclarationList = function (options) {
		        var opt = { inFor: options.inFor };
		        var list = [];
		        list.push(this.parseVariableDeclaration(opt));
		        while (this.match(',')) {
		            this.nextToken();
		            list.push(this.parseVariableDeclaration(opt));
		        }
		        return list;
		    };
		    Parser.prototype.parseVariableStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('var');
		        var declarations = this.parseVariableDeclarationList({ inFor: false });
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
		    };
		    // https://tc39.github.io/ecma262/#sec-empty-statement
		    Parser.prototype.parseEmptyStatement = function () {
		        var node = this.createNode();
		        this.expect(';');
		        return this.finalize(node, new Node.EmptyStatement());
		    };
		    // https://tc39.github.io/ecma262/#sec-expression-statement
		    Parser.prototype.parseExpressionStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ExpressionStatement(expr));
		    };
		    // https://tc39.github.io/ecma262/#sec-if-statement
		    Parser.prototype.parseIfClause = function () {
		        if (this.context.strict && this.matchKeyword('function')) {
		            this.tolerateError(messages_1.Messages.StrictFunction);
		        }
		        return this.parseStatement();
		    };
		    Parser.prototype.parseIfStatement = function () {
		        var node = this.createNode();
		        var consequent;
		        var alternate = null;
		        this.expectKeyword('if');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            consequent = this.parseIfClause();
		            if (this.matchKeyword('else')) {
		                this.nextToken();
		                alternate = this.parseIfClause();
		            }
		        }
		        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
		    };
		    // https://tc39.github.io/ecma262/#sec-do-while-statement
		    Parser.prototype.parseDoWhileStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('do');
		        var previousInIteration = this.context.inIteration;
		        this.context.inIteration = true;
		        var body = this.parseStatement();
		        this.context.inIteration = previousInIteration;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		        }
		        else {
		            this.expect(')');
		            if (this.match(';')) {
		                this.nextToken();
		            }
		        }
		        return this.finalize(node, new Node.DoWhileStatement(body, test));
		    };
		    // https://tc39.github.io/ecma262/#sec-while-statement
		    Parser.prototype.parseWhileStatement = function () {
		        var node = this.createNode();
		        var body;
		        this.expectKeyword('while');
		        this.expect('(');
		        var test = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.parseStatement();
		            this.context.inIteration = previousInIteration;
		        }
		        return this.finalize(node, new Node.WhileStatement(test, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-for-statement
		    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
		    Parser.prototype.parseForStatement = function () {
		        var init = null;
		        var test = null;
		        var update = null;
		        var forIn = true;
		        var left, right;
		        var node = this.createNode();
		        this.expectKeyword('for');
		        this.expect('(');
		        if (this.match(';')) {
		            this.nextToken();
		        }
		        else {
		            if (this.matchKeyword('var')) {
		                init = this.createNode();
		                this.nextToken();
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                var declarations = this.parseVariableDeclarationList({ inFor: true });
		                this.context.allowIn = previousAllowIn;
		                if (declarations.length === 1 && this.matchKeyword('in')) {
		                    var decl = declarations[0];
		                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
		                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
		                    }
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
		                    this.expect(';');
		                }
		            }
		            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
		                init = this.createNode();
		                var kind = this.nextToken().value;
		                if (!this.context.strict && this.lookahead.value === 'in') {
		                    init = this.finalize(init, new Node.Identifier(kind));
		                    this.nextToken();
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else {
		                    var previousAllowIn = this.context.allowIn;
		                    this.context.allowIn = false;
		                    var declarations = this.parseBindingList(kind, { inFor: true });
		                    this.context.allowIn = previousAllowIn;
		                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseExpression();
		                        init = null;
		                    }
		                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                        this.nextToken();
		                        left = init;
		                        right = this.parseAssignmentExpression();
		                        init = null;
		                        forIn = false;
		                    }
		                    else {
		                        this.consumeSemicolon();
		                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
		                    }
		                }
		            }
		            else {
		                var initStartToken = this.lookahead;
		                var previousAllowIn = this.context.allowIn;
		                this.context.allowIn = false;
		                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
		                this.context.allowIn = previousAllowIn;
		                if (this.matchKeyword('in')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseExpression();
		                    init = null;
		                }
		                else if (this.matchContextualKeyword('of')) {
		                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
		                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
		                    }
		                    this.nextToken();
		                    this.reinterpretExpressionAsPattern(init);
		                    left = init;
		                    right = this.parseAssignmentExpression();
		                    init = null;
		                    forIn = false;
		                }
		                else {
		                    if (this.match(',')) {
		                        var initSeq = [init];
		                        while (this.match(',')) {
		                            this.nextToken();
		                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
		                        }
		                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
		                    }
		                    this.expect(';');
		                }
		            }
		        }
		        if (typeof left === 'undefined') {
		            if (!this.match(';')) {
		                test = this.parseExpression();
		            }
		            this.expect(';');
		            if (!this.match(')')) {
		                update = this.parseExpression();
		            }
		        }
		        var body;
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            var previousInIteration = this.context.inIteration;
		            this.context.inIteration = true;
		            body = this.isolateCoverGrammar(this.parseStatement);
		            this.context.inIteration = previousInIteration;
		        }
		        return (typeof left === 'undefined') ?
		            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
		            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
		                this.finalize(node, new Node.ForOfStatement(left, right, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-continue-statement
		    Parser.prototype.parseContinueStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('continue');
		        var label = null;
		        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
		            var id = this.parseVariableIdentifier();
		            label = id;
		            var key = '$' + id.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, id.name);
		            }
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration) {
		            this.throwError(messages_1.Messages.IllegalContinue);
		        }
		        return this.finalize(node, new Node.ContinueStatement(label));
		    };
		    // https://tc39.github.io/ecma262/#sec-break-statement
		    Parser.prototype.parseBreakStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('break');
		        var label = null;
		        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
		            var id = this.parseVariableIdentifier();
		            var key = '$' + id.name;
		            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.UnknownLabel, id.name);
		            }
		            label = id;
		        }
		        this.consumeSemicolon();
		        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
		            this.throwError(messages_1.Messages.IllegalBreak);
		        }
		        return this.finalize(node, new Node.BreakStatement(label));
		    };
		    // https://tc39.github.io/ecma262/#sec-return-statement
		    Parser.prototype.parseReturnStatement = function () {
		        if (!this.context.inFunctionBody) {
		            this.tolerateError(messages_1.Messages.IllegalReturn);
		        }
		        var node = this.createNode();
		        this.expectKeyword('return');
		        var hasArgument = !this.match(';') && !this.match('}') &&
		            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */;
		        var argument = hasArgument ? this.parseExpression() : null;
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ReturnStatement(argument));
		    };
		    // https://tc39.github.io/ecma262/#sec-with-statement
		    Parser.prototype.parseWithStatement = function () {
		        if (this.context.strict) {
		            this.tolerateError(messages_1.Messages.StrictModeWith);
		        }
		        var node = this.createNode();
		        var body;
		        this.expectKeyword('with');
		        this.expect('(');
		        var object = this.parseExpression();
		        if (!this.match(')') && this.config.tolerant) {
		            this.tolerateUnexpectedToken(this.nextToken());
		            body = this.finalize(this.createNode(), new Node.EmptyStatement());
		        }
		        else {
		            this.expect(')');
		            body = this.parseStatement();
		        }
		        return this.finalize(node, new Node.WithStatement(object, body));
		    };
		    // https://tc39.github.io/ecma262/#sec-switch-statement
		    Parser.prototype.parseSwitchCase = function () {
		        var node = this.createNode();
		        var test;
		        if (this.matchKeyword('default')) {
		            this.nextToken();
		            test = null;
		        }
		        else {
		            this.expectKeyword('case');
		            test = this.parseExpression();
		        }
		        this.expect(':');
		        var consequent = [];
		        while (true) {
		            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
		                break;
		            }
		            consequent.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.SwitchCase(test, consequent));
		    };
		    Parser.prototype.parseSwitchStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('switch');
		        this.expect('(');
		        var discriminant = this.parseExpression();
		        this.expect(')');
		        var previousInSwitch = this.context.inSwitch;
		        this.context.inSwitch = true;
		        var cases = [];
		        var defaultFound = false;
		        this.expect('{');
		        while (true) {
		            if (this.match('}')) {
		                break;
		            }
		            var clause = this.parseSwitchCase();
		            if (clause.test === null) {
		                if (defaultFound) {
		                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
		                }
		                defaultFound = true;
		            }
		            cases.push(clause);
		        }
		        this.expect('}');
		        this.context.inSwitch = previousInSwitch;
		        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
		    };
		    // https://tc39.github.io/ecma262/#sec-labelled-statements
		    Parser.prototype.parseLabelledStatement = function () {
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        var statement;
		        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
		            this.nextToken();
		            var id = expr;
		            var key = '$' + id.name;
		            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
		                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
		            }
		            this.context.labelSet[key] = true;
		            var body = void 0;
		            if (this.matchKeyword('class')) {
		                this.tolerateUnexpectedToken(this.lookahead);
		                body = this.parseClassDeclaration();
		            }
		            else if (this.matchKeyword('function')) {
		                var token = this.lookahead;
		                var declaration = this.parseFunctionDeclaration();
		                if (this.context.strict) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
		                }
		                else if (declaration.generator) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
		                }
		                body = declaration;
		            }
		            else {
		                body = this.parseStatement();
		            }
		            delete this.context.labelSet[key];
		            statement = new Node.LabeledStatement(id, body);
		        }
		        else {
		            this.consumeSemicolon();
		            statement = new Node.ExpressionStatement(expr);
		        }
		        return this.finalize(node, statement);
		    };
		    // https://tc39.github.io/ecma262/#sec-throw-statement
		    Parser.prototype.parseThrowStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('throw');
		        if (this.hasLineTerminator) {
		            this.throwError(messages_1.Messages.NewlineAfterThrow);
		        }
		        var argument = this.parseExpression();
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ThrowStatement(argument));
		    };
		    // https://tc39.github.io/ecma262/#sec-try-statement
		    Parser.prototype.parseCatchClause = function () {
		        var node = this.createNode();
		        this.expectKeyword('catch');
		        this.expect('(');
		        if (this.match(')')) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        var params = [];
		        var param = this.parsePattern(params);
		        var paramMap = {};
		        for (var i = 0; i < params.length; i++) {
		            var key = '$' + params[i].value;
		            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
		                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
		            }
		            paramMap[key] = true;
		        }
		        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
		            if (this.scanner.isRestrictedWord(param.name)) {
		                this.tolerateError(messages_1.Messages.StrictCatchVariable);
		            }
		        }
		        this.expect(')');
		        var body = this.parseBlock();
		        return this.finalize(node, new Node.CatchClause(param, body));
		    };
		    Parser.prototype.parseFinallyClause = function () {
		        this.expectKeyword('finally');
		        return this.parseBlock();
		    };
		    Parser.prototype.parseTryStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('try');
		        var block = this.parseBlock();
		        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
		        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
		        if (!handler && !finalizer) {
		            this.throwError(messages_1.Messages.NoCatchOrFinally);
		        }
		        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
		    };
		    // https://tc39.github.io/ecma262/#sec-debugger-statement
		    Parser.prototype.parseDebuggerStatement = function () {
		        var node = this.createNode();
		        this.expectKeyword('debugger');
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.DebuggerStatement());
		    };
		    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
		    Parser.prototype.parseStatement = function () {
		        var statement;
		        switch (this.lookahead.type) {
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 6 /* NumericLiteral */:
		            case 8 /* StringLiteral */:
		            case 10 /* Template */:
		            case 9 /* RegularExpression */:
		                statement = this.parseExpressionStatement();
		                break;
		            case 7 /* Punctuator */:
		                var value = this.lookahead.value;
		                if (value === '{') {
		                    statement = this.parseBlock();
		                }
		                else if (value === '(') {
		                    statement = this.parseExpressionStatement();
		                }
		                else if (value === ';') {
		                    statement = this.parseEmptyStatement();
		                }
		                else {
		                    statement = this.parseExpressionStatement();
		                }
		                break;
		            case 3 /* Identifier */:
		                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
		                break;
		            case 4 /* Keyword */:
		                switch (this.lookahead.value) {
		                    case 'break':
		                        statement = this.parseBreakStatement();
		                        break;
		                    case 'continue':
		                        statement = this.parseContinueStatement();
		                        break;
		                    case 'debugger':
		                        statement = this.parseDebuggerStatement();
		                        break;
		                    case 'do':
		                        statement = this.parseDoWhileStatement();
		                        break;
		                    case 'for':
		                        statement = this.parseForStatement();
		                        break;
		                    case 'function':
		                        statement = this.parseFunctionDeclaration();
		                        break;
		                    case 'if':
		                        statement = this.parseIfStatement();
		                        break;
		                    case 'return':
		                        statement = this.parseReturnStatement();
		                        break;
		                    case 'switch':
		                        statement = this.parseSwitchStatement();
		                        break;
		                    case 'throw':
		                        statement = this.parseThrowStatement();
		                        break;
		                    case 'try':
		                        statement = this.parseTryStatement();
		                        break;
		                    case 'var':
		                        statement = this.parseVariableStatement();
		                        break;
		                    case 'while':
		                        statement = this.parseWhileStatement();
		                        break;
		                    case 'with':
		                        statement = this.parseWithStatement();
		                        break;
		                    default:
		                        statement = this.parseExpressionStatement();
		                        break;
		                }
		                break;
		            default:
		                statement = this.throwUnexpectedToken(this.lookahead);
		        }
		        return statement;
		    };
		    // https://tc39.github.io/ecma262/#sec-function-definitions
		    Parser.prototype.parseFunctionSourceElements = function () {
		        var node = this.createNode();
		        this.expect('{');
		        var body = this.parseDirectivePrologues();
		        var previousLabelSet = this.context.labelSet;
		        var previousInIteration = this.context.inIteration;
		        var previousInSwitch = this.context.inSwitch;
		        var previousInFunctionBody = this.context.inFunctionBody;
		        this.context.labelSet = {};
		        this.context.inIteration = false;
		        this.context.inSwitch = false;
		        this.context.inFunctionBody = true;
		        while (this.lookahead.type !== 2 /* EOF */) {
		            if (this.match('}')) {
		                break;
		            }
		            body.push(this.parseStatementListItem());
		        }
		        this.expect('}');
		        this.context.labelSet = previousLabelSet;
		        this.context.inIteration = previousInIteration;
		        this.context.inSwitch = previousInSwitch;
		        this.context.inFunctionBody = previousInFunctionBody;
		        return this.finalize(node, new Node.BlockStatement(body));
		    };
		    Parser.prototype.validateParam = function (options, param, name) {
		        var key = '$' + name;
		        if (this.context.strict) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        else if (!options.firstRestricted) {
		            if (this.scanner.isRestrictedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictParamName;
		            }
		            else if (this.scanner.isStrictModeReservedWord(name)) {
		                options.firstRestricted = param;
		                options.message = messages_1.Messages.StrictReservedWord;
		            }
		            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
		                options.stricted = param;
		                options.message = messages_1.Messages.StrictParamDupe;
		            }
		        }
		        /* istanbul ignore next */
		        if (typeof Object.defineProperty === 'function') {
		            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
		        }
		        else {
		            options.paramSet[key] = true;
		        }
		    };
		    Parser.prototype.parseRestElement = function (params) {
		        var node = this.createNode();
		        this.expect('...');
		        var arg = this.parsePattern(params);
		        if (this.match('=')) {
		            this.throwError(messages_1.Messages.DefaultRestParameter);
		        }
		        if (!this.match(')')) {
		            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
		        }
		        return this.finalize(node, new Node.RestElement(arg));
		    };
		    Parser.prototype.parseFormalParameter = function (options) {
		        var params = [];
		        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
		        for (var i = 0; i < params.length; i++) {
		            this.validateParam(options, params[i], params[i].value);
		        }
		        options.simple = options.simple && (param instanceof Node.Identifier);
		        options.params.push(param);
		    };
		    Parser.prototype.parseFormalParameters = function (firstRestricted) {
		        var options;
		        options = {
		            simple: true,
		            params: [],
		            firstRestricted: firstRestricted
		        };
		        this.expect('(');
		        if (!this.match(')')) {
		            options.paramSet = {};
		            while (this.lookahead.type !== 2 /* EOF */) {
		                this.parseFormalParameter(options);
		                if (this.match(')')) {
		                    break;
		                }
		                this.expect(',');
		                if (this.match(')')) {
		                    break;
		                }
		            }
		        }
		        this.expect(')');
		        return {
		            simple: options.simple,
		            params: options.params,
		            stricted: options.stricted,
		            firstRestricted: options.firstRestricted,
		            message: options.message
		        };
		    };
		    Parser.prototype.matchAsyncFunction = function () {
		        var match = this.matchContextualKeyword('async');
		        if (match) {
		            var state = this.scanner.saveState();
		            this.scanner.scanComments();
		            var next = this.scanner.lex();
		            this.scanner.restoreState(state);
		            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
		        }
		        return match;
		    };
		    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        var isAsync = this.matchContextualKeyword('async');
		        if (isAsync) {
		            this.nextToken();
		        }
		        this.expectKeyword('function');
		        var isGenerator = isAsync ? false : this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted = null;
		        if (!identifierIsOptional || !this.match('(')) {
		            var token = this.lookahead;
		            id = this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var previousAllowAwait = this.context.await;
		        var previousAllowYield = this.context.allowYield;
		        this.context.await = isAsync;
		        this.context.allowYield = !isGenerator;
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = formalParameters.simple;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        this.context.await = previousAllowAwait;
		        this.context.allowYield = previousAllowYield;
		        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
		            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
		    };
		    Parser.prototype.parseFunctionExpression = function () {
		        var node = this.createNode();
		        var isAsync = this.matchContextualKeyword('async');
		        if (isAsync) {
		            this.nextToken();
		        }
		        this.expectKeyword('function');
		        var isGenerator = isAsync ? false : this.match('*');
		        if (isGenerator) {
		            this.nextToken();
		        }
		        var message;
		        var id = null;
		        var firstRestricted;
		        var previousAllowAwait = this.context.await;
		        var previousAllowYield = this.context.allowYield;
		        this.context.await = isAsync;
		        this.context.allowYield = !isGenerator;
		        if (!this.match('(')) {
		            var token = this.lookahead;
		            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
		            if (this.context.strict) {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
		                }
		            }
		            else {
		                if (this.scanner.isRestrictedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictFunctionName;
		                }
		                else if (this.scanner.isStrictModeReservedWord(token.value)) {
		                    firstRestricted = token;
		                    message = messages_1.Messages.StrictReservedWord;
		                }
		            }
		        }
		        var formalParameters = this.parseFormalParameters(firstRestricted);
		        var params = formalParameters.params;
		        var stricted = formalParameters.stricted;
		        firstRestricted = formalParameters.firstRestricted;
		        if (formalParameters.message) {
		            message = formalParameters.message;
		        }
		        var previousStrict = this.context.strict;
		        var previousAllowStrictDirective = this.context.allowStrictDirective;
		        this.context.allowStrictDirective = formalParameters.simple;
		        var body = this.parseFunctionSourceElements();
		        if (this.context.strict && firstRestricted) {
		            this.throwUnexpectedToken(firstRestricted, message);
		        }
		        if (this.context.strict && stricted) {
		            this.tolerateUnexpectedToken(stricted, message);
		        }
		        this.context.strict = previousStrict;
		        this.context.allowStrictDirective = previousAllowStrictDirective;
		        this.context.await = previousAllowAwait;
		        this.context.allowYield = previousAllowYield;
		        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
		            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
		    };
		    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
		    Parser.prototype.parseDirective = function () {
		        var token = this.lookahead;
		        var node = this.createNode();
		        var expr = this.parseExpression();
		        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
		        this.consumeSemicolon();
		        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
		    };
		    Parser.prototype.parseDirectivePrologues = function () {
		        var firstRestricted = null;
		        var body = [];
		        while (true) {
		            var token = this.lookahead;
		            if (token.type !== 8 /* StringLiteral */) {
		                break;
		            }
		            var statement = this.parseDirective();
		            body.push(statement);
		            var directive = statement.directive;
		            if (typeof directive !== 'string') {
		                break;
		            }
		            if (directive === 'use strict') {
		                this.context.strict = true;
		                if (firstRestricted) {
		                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
		                }
		                if (!this.context.allowStrictDirective) {
		                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
		                }
		            }
		            else {
		                if (!firstRestricted && token.octal) {
		                    firstRestricted = token;
		                }
		            }
		        }
		        return body;
		    };
		    // https://tc39.github.io/ecma262/#sec-method-definitions
		    Parser.prototype.qualifiedPropertyName = function (token) {
		        switch (token.type) {
		            case 3 /* Identifier */:
		            case 8 /* StringLiteral */:
		            case 1 /* BooleanLiteral */:
		            case 5 /* NullLiteral */:
		            case 6 /* NumericLiteral */:
		            case 4 /* Keyword */:
		                return true;
		            case 7 /* Punctuator */:
		                return token.value === '[';
		            default:
		                break;
		        }
		        return false;
		    };
		    Parser.prototype.parseGetterMethod = function () {
		        var node = this.createNode();
		        var isGenerator = false;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        var formalParameters = this.parseFormalParameters();
		        if (formalParameters.params.length > 0) {
		            this.tolerateError(messages_1.Messages.BadGetterArity);
		        }
		        var method = this.parsePropertyMethod(formalParameters);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
		    };
		    Parser.prototype.parseSetterMethod = function () {
		        var node = this.createNode();
		        var isGenerator = false;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = false;
		        var formalParameters = this.parseFormalParameters();
		        if (formalParameters.params.length !== 1) {
		            this.tolerateError(messages_1.Messages.BadSetterArity);
		        }
		        else if (formalParameters.params[0] instanceof Node.RestElement) {
		            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
		        }
		        var method = this.parsePropertyMethod(formalParameters);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
		    };
		    Parser.prototype.parseGeneratorMethod = function () {
		        var node = this.createNode();
		        var isGenerator = true;
		        var previousAllowYield = this.context.allowYield;
		        this.context.allowYield = true;
		        var params = this.parseFormalParameters();
		        this.context.allowYield = false;
		        var method = this.parsePropertyMethod(params);
		        this.context.allowYield = previousAllowYield;
		        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
		    };
		    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
		    Parser.prototype.isStartOfExpression = function () {
		        var start = true;
		        var value = this.lookahead.value;
		        switch (this.lookahead.type) {
		            case 7 /* Punctuator */:
		                start = (value === '[') || (value === '(') || (value === '{') ||
		                    (value === '+') || (value === '-') ||
		                    (value === '!') || (value === '~') ||
		                    (value === '++') || (value === '--') ||
		                    (value === '/') || (value === '/='); // regular expression literal
		                break;
		            case 4 /* Keyword */:
		                start = (value === 'class') || (value === 'delete') ||
		                    (value === 'function') || (value === 'let') || (value === 'new') ||
		                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
		                    (value === 'void') || (value === 'yield');
		                break;
		            default:
		                break;
		        }
		        return start;
		    };
		    Parser.prototype.parseYieldExpression = function () {
		        var node = this.createNode();
		        this.expectKeyword('yield');
		        var argument = null;
		        var delegate = false;
		        if (!this.hasLineTerminator) {
		            var previousAllowYield = this.context.allowYield;
		            this.context.allowYield = false;
		            delegate = this.match('*');
		            if (delegate) {
		                this.nextToken();
		                argument = this.parseAssignmentExpression();
		            }
		            else if (this.isStartOfExpression()) {
		                argument = this.parseAssignmentExpression();
		            }
		            this.context.allowYield = previousAllowYield;
		        }
		        return this.finalize(node, new Node.YieldExpression(argument, delegate));
		    };
		    // https://tc39.github.io/ecma262/#sec-class-definitions
		    Parser.prototype.parseClassElement = function (hasConstructor) {
		        var token = this.lookahead;
		        var node = this.createNode();
		        var kind = '';
		        var key = null;
		        var value = null;
		        var computed = false;
		        var method = false;
		        var isStatic = false;
		        var isAsync = false;
		        if (this.match('*')) {
		            this.nextToken();
		        }
		        else {
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            var id = key;
		            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
		                token = this.lookahead;
		                isStatic = true;
		                computed = this.match('[');
		                if (this.match('*')) {
		                    this.nextToken();
		                }
		                else {
		                    key = this.parseObjectPropertyKey();
		                }
		            }
		            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
		                var punctuator = this.lookahead.value;
		                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
		                    isAsync = true;
		                    token = this.lookahead;
		                    key = this.parseObjectPropertyKey();
		                    if (token.type === 3 /* Identifier */) {
		                        if (token.value === 'get' || token.value === 'set') {
		                            this.tolerateUnexpectedToken(token);
		                        }
		                        else if (token.value === 'constructor') {
		                            this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
		                        }
		                    }
		                }
		            }
		        }
		        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		        if (token.type === 3 /* Identifier */) {
		            if (token.value === 'get' && lookaheadPropertyKey) {
		                kind = 'get';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                this.context.allowYield = false;
		                value = this.parseGetterMethod();
		            }
		            else if (token.value === 'set' && lookaheadPropertyKey) {
		                kind = 'set';
		                computed = this.match('[');
		                key = this.parseObjectPropertyKey();
		                value = this.parseSetterMethod();
		            }
		        }
		        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
		            kind = 'init';
		            computed = this.match('[');
		            key = this.parseObjectPropertyKey();
		            value = this.parseGeneratorMethod();
		            method = true;
		        }
		        if (!kind && key && this.match('(')) {
		            kind = 'init';
		            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
		            method = true;
		        }
		        if (!kind) {
		            this.throwUnexpectedToken(this.lookahead);
		        }
		        if (kind === 'init') {
		            kind = 'method';
		        }
		        if (!computed) {
		            if (isStatic && this.isPropertyKey(key, 'prototype')) {
		                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
		            }
		            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
		                if (kind !== 'method' || !method || (value && value.generator)) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
		                }
		                if (hasConstructor.value) {
		                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
		                }
		                else {
		                    hasConstructor.value = true;
		                }
		                kind = 'constructor';
		            }
		        }
		        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
		    };
		    Parser.prototype.parseClassElementList = function () {
		        var body = [];
		        var hasConstructor = { value: false };
		        this.expect('{');
		        while (!this.match('}')) {
		            if (this.match(';')) {
		                this.nextToken();
		            }
		            else {
		                body.push(this.parseClassElement(hasConstructor));
		            }
		        }
		        this.expect('}');
		        return body;
		    };
		    Parser.prototype.parseClassBody = function () {
		        var node = this.createNode();
		        var elementList = this.parseClassElementList();
		        return this.finalize(node, new Node.ClassBody(elementList));
		    };
		    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
		    };
		    Parser.prototype.parseClassExpression = function () {
		        var node = this.createNode();
		        var previousStrict = this.context.strict;
		        this.context.strict = true;
		        this.expectKeyword('class');
		        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
		        var superClass = null;
		        if (this.matchKeyword('extends')) {
		            this.nextToken();
		            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		        }
		        var classBody = this.parseClassBody();
		        this.context.strict = previousStrict;
		        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
		    };
		    // https://tc39.github.io/ecma262/#sec-scripts
		    // https://tc39.github.io/ecma262/#sec-modules
		    Parser.prototype.parseModule = function () {
		        this.context.strict = true;
		        this.context.isModule = true;
		        var node = this.createNode();
		        var body = this.parseDirectivePrologues();
		        while (this.lookahead.type !== 2 /* EOF */) {
		            body.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.Module(body));
		    };
		    Parser.prototype.parseScript = function () {
		        var node = this.createNode();
		        var body = this.parseDirectivePrologues();
		        while (this.lookahead.type !== 2 /* EOF */) {
		            body.push(this.parseStatementListItem());
		        }
		        return this.finalize(node, new Node.Script(body));
		    };
		    // https://tc39.github.io/ecma262/#sec-imports
		    Parser.prototype.parseModuleSpecifier = function () {
		        var node = this.createNode();
		        if (this.lookahead.type !== 8 /* StringLiteral */) {
		            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
		        }
		        var token = this.nextToken();
		        var raw = this.getTokenRaw(token);
		        return this.finalize(node, new Node.Literal(token.value, raw));
		    };
		    // import {<foo as bar>} ...;
		    Parser.prototype.parseImportSpecifier = function () {
		        var node = this.createNode();
		        var imported;
		        var local;
		        if (this.lookahead.type === 3 /* Identifier */) {
		            imported = this.parseVariableIdentifier();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		        }
		        else {
		            imported = this.parseIdentifierName();
		            local = imported;
		            if (this.matchContextualKeyword('as')) {
		                this.nextToken();
		                local = this.parseVariableIdentifier();
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		        }
		        return this.finalize(node, new Node.ImportSpecifier(local, imported));
		    };
		    // {foo, bar as bas}
		    Parser.prototype.parseNamedImports = function () {
		        this.expect('{');
		        var specifiers = [];
		        while (!this.match('}')) {
		            specifiers.push(this.parseImportSpecifier());
		            if (!this.match('}')) {
		                this.expect(',');
		            }
		        }
		        this.expect('}');
		        return specifiers;
		    };
		    // import <foo> ...;
		    Parser.prototype.parseImportDefaultSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
		    };
		    // import <* as foo> ...;
		    Parser.prototype.parseImportNamespaceSpecifier = function () {
		        var node = this.createNode();
		        this.expect('*');
		        if (!this.matchContextualKeyword('as')) {
		            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
		        }
		        this.nextToken();
		        var local = this.parseIdentifierName();
		        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
		    };
		    Parser.prototype.parseImportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalImportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('import');
		        var src;
		        var specifiers = [];
		        if (this.lookahead.type === 8 /* StringLiteral */) {
		            // import 'foo';
		            src = this.parseModuleSpecifier();
		        }
		        else {
		            if (this.match('{')) {
		                // import {bar}
		                specifiers = specifiers.concat(this.parseNamedImports());
		            }
		            else if (this.match('*')) {
		                // import * as foo
		                specifiers.push(this.parseImportNamespaceSpecifier());
		            }
		            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
		                // import foo
		                specifiers.push(this.parseImportDefaultSpecifier());
		                if (this.match(',')) {
		                    this.nextToken();
		                    if (this.match('*')) {
		                        // import foo, * as foo
		                        specifiers.push(this.parseImportNamespaceSpecifier());
		                    }
		                    else if (this.match('{')) {
		                        // import foo, {bar}
		                        specifiers = specifiers.concat(this.parseNamedImports());
		                    }
		                    else {
		                        this.throwUnexpectedToken(this.lookahead);
		                    }
		                }
		            }
		            else {
		                this.throwUnexpectedToken(this.nextToken());
		            }
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            src = this.parseModuleSpecifier();
		        }
		        this.consumeSemicolon();
		        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
		    };
		    // https://tc39.github.io/ecma262/#sec-exports
		    Parser.prototype.parseExportSpecifier = function () {
		        var node = this.createNode();
		        var local = this.parseIdentifierName();
		        var exported = local;
		        if (this.matchContextualKeyword('as')) {
		            this.nextToken();
		            exported = this.parseIdentifierName();
		        }
		        return this.finalize(node, new Node.ExportSpecifier(local, exported));
		    };
		    Parser.prototype.parseExportDeclaration = function () {
		        if (this.context.inFunctionBody) {
		            this.throwError(messages_1.Messages.IllegalExportDeclaration);
		        }
		        var node = this.createNode();
		        this.expectKeyword('export');
		        var exportDeclaration;
		        if (this.matchKeyword('default')) {
		            // export default ...
		            this.nextToken();
		            if (this.matchKeyword('function')) {
		                // export default function foo () {}
		                // export default function () {}
		                var declaration = this.parseFunctionDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else if (this.matchKeyword('class')) {
		                // export default class foo {}
		                var declaration = this.parseClassDeclaration(true);
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else if (this.matchContextualKeyword('async')) {
		                // export default async function f () {}
		                // export default async function () {}
		                // export default async x => x
		                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		            else {
		                if (this.matchContextualKeyword('from')) {
		                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
		                }
		                // export default {};
		                // export default [];
		                // export default (1 + 2);
		                var declaration = this.match('{') ? this.parseObjectInitializer() :
		                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
		                this.consumeSemicolon();
		                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
		            }
		        }
		        else if (this.match('*')) {
		            // export * from 'foo';
		            this.nextToken();
		            if (!this.matchContextualKeyword('from')) {
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            this.nextToken();
		            var src = this.parseModuleSpecifier();
		            this.consumeSemicolon();
		            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
		        }
		        else if (this.lookahead.type === 4 /* Keyword */) {
		            // export var f = 1;
		            var declaration = void 0;
		            switch (this.lookahead.value) {
		                case 'let':
		                case 'const':
		                    declaration = this.parseLexicalDeclaration({ inFor: false });
		                    break;
		                case 'var':
		                case 'class':
		                case 'function':
		                    declaration = this.parseStatementListItem();
		                    break;
		                default:
		                    this.throwUnexpectedToken(this.lookahead);
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		        }
		        else if (this.matchAsyncFunction()) {
		            var declaration = this.parseFunctionDeclaration();
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		        }
		        else {
		            var specifiers = [];
		            var source = null;
		            var isExportFromIdentifier = false;
		            this.expect('{');
		            while (!this.match('}')) {
		                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
		                specifiers.push(this.parseExportSpecifier());
		                if (!this.match('}')) {
		                    this.expect(',');
		                }
		            }
		            this.expect('}');
		            if (this.matchContextualKeyword('from')) {
		                // export {default} from 'foo';
		                // export {foo} from 'foo';
		                this.nextToken();
		                source = this.parseModuleSpecifier();
		                this.consumeSemicolon();
		            }
		            else if (isExportFromIdentifier) {
		                // export {default}; // missing fromClause
		                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
		                this.throwError(message, this.lookahead.value);
		            }
		            else {
		                // export {foo};
		                this.consumeSemicolon();
		            }
		            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
		        }
		        return exportDeclaration;
		    };
		    return Parser;
		}());
		exports.Parser = Parser;
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		"use strict";
		// Ensure the condition is true, otherwise throw an error.
		// This is only to have a better contract semantic, i.e. another safety net
		// to catch a logic error. The condition shall be fulfilled in normal case.
		// Do NOT use this to enforce a certain condition on any user input.
		Object.defineProperty(exports, "__esModule", { value: true });
		function assert(condition, message) {
		    /* istanbul ignore if */
		    if (!condition) {
		        throw new Error('ASSERT: ' + message);
		    }
		}
		exports.assert = assert;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		"use strict";
		/* tslint:disable:max-classes-per-file */
		Object.defineProperty(exports, "__esModule", { value: true });
		var ErrorHandler = (function () {
		    function ErrorHandler() {
		        this.errors = [];
		        this.tolerant = false;
		    }
		    ErrorHandler.prototype.recordError = function (error) {
		        this.errors.push(error);
		    };
		    ErrorHandler.prototype.tolerate = function (error) {
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    ErrorHandler.prototype.constructError = function (msg, column) {
		        var error = new Error(msg);
		        try {
		            throw error;
		        }
		        catch (base) {
		            /* istanbul ignore else */
		            if (Object.create && Object.defineProperty) {
		                error = Object.create(base);
		                Object.defineProperty(error, 'column', { value: column });
		            }
		        }
		        /* istanbul ignore next */
		        return error;
		    };
		    ErrorHandler.prototype.createError = function (index, line, col, description) {
		        var msg = 'Line ' + line + ': ' + description;
		        var error = this.constructError(msg, col);
		        error.index = index;
		        error.lineNumber = line;
		        error.description = description;
		        return error;
		    };
		    ErrorHandler.prototype.throwError = function (index, line, col, description) {
		        throw this.createError(index, line, col, description);
		    };
		    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
		        var error = this.createError(index, line, col, description);
		        if (this.tolerant) {
		            this.recordError(error);
		        }
		        else {
		            throw error;
		        }
		    };
		    return ErrorHandler;
		}());
		exports.ErrorHandler = ErrorHandler;
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		// Error messages should be identical to V8.
		exports.Messages = {
		    BadGetterArity: 'Getter must not have any formal parameters',
		    BadSetterArity: 'Setter must have exactly one formal parameter',
		    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
		    ConstructorIsAsync: 'Class constructor may not be an async method',
		    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
		    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
		    DefaultRestParameter: 'Unexpected token =',
		    DuplicateBinding: 'Duplicate binding %0',
		    DuplicateConstructor: 'A class may only have one constructor',
		    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
		    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
		    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
		    IllegalBreak: 'Illegal break statement',
		    IllegalContinue: 'Illegal continue statement',
		    IllegalExportDeclaration: 'Unexpected token',
		    IllegalImportDeclaration: 'Unexpected token',
		    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
		    IllegalReturn: 'Illegal return statement',
		    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
		    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
		    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
		    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
		    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
		    InvalidModuleSpecifier: 'Unexpected token',
		    InvalidRegExp: 'Invalid regular expression',
		    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
		    MissingFromClause: 'Unexpected token',
		    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
		    NewlineAfterThrow: 'Illegal newline after throw',
		    NoAsAfterImportNamespace: 'Unexpected token',
		    NoCatchOrFinally: 'Missing catch or finally after try',
		    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
		    Redeclaration: '%0 \'%1\' has already been declared',
		    StaticPrototype: 'Classes may not have static property named prototype',
		    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
		    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
		    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
		    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
		    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
		    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
		    StrictModeWith: 'Strict mode code may not include a with statement',
		    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
		    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
		    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
		    StrictReservedWord: 'Use of future reserved word in strict mode',
		    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
		    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
		    UnexpectedEOS: 'Unexpected end of input',
		    UnexpectedIdentifier: 'Unexpected identifier',
		    UnexpectedNumber: 'Unexpected number',
		    UnexpectedReserved: 'Unexpected reserved word',
		    UnexpectedString: 'Unexpected string',
		    UnexpectedTemplate: 'Unexpected quasi %0',
		    UnexpectedToken: 'Unexpected token %0',
		    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
		    UnknownLabel: 'Undefined label \'%0\'',
		    UnterminatedRegExp: 'Invalid regular expression: missing /'
		};
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var character_1 = __webpack_require__(4);
		var messages_1 = __webpack_require__(11);
		function hexValue(ch) {
		    return '0123456789abcdef'.indexOf(ch.toLowerCase());
		}
		function octalValue(ch) {
		    return '01234567'.indexOf(ch);
		}
		var Scanner = (function () {
		    function Scanner(code, handler) {
		        this.source = code;
		        this.errorHandler = handler;
		        this.trackComment = false;
		        this.length = code.length;
		        this.index = 0;
		        this.lineNumber = (code.length > 0) ? 1 : 0;
		        this.lineStart = 0;
		        this.curlyStack = [];
		    }
		    Scanner.prototype.saveState = function () {
		        return {
		            index: this.index,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart
		        };
		    };
		    Scanner.prototype.restoreState = function (state) {
		        this.index = state.index;
		        this.lineNumber = state.lineNumber;
		        this.lineStart = state.lineStart;
		    };
		    Scanner.prototype.eof = function () {
		        return this.index >= this.length;
		    };
		    Scanner.prototype.throwUnexpectedToken = function (message) {
		        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
		        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
		    };
		    Scanner.prototype.tolerateUnexpectedToken = function (message) {
		        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
		        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
		    };
		    // https://tc39.github.io/ecma262/#sec-comments
		    Scanner.prototype.skipSingleLineComment = function (offset) {
		        var comments = [];
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - offset;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - offset
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            ++this.index;
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (this.trackComment) {
		                    loc.end = {
		                        line: this.lineNumber,
		                        column: this.index - this.lineStart - 1
		                    };
		                    var entry = {
		                        multiLine: false,
		                        slice: [start + offset, this.index - 1],
		                        range: [start, this.index - 1],
		                        loc: loc
		                    };
		                    comments.push(entry);
		                }
		                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                return comments;
		            }
		        }
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: false,
		                slice: [start + offset, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        return comments;
		    };
		    Scanner.prototype.skipMultiLineComment = function () {
		        var comments = [];
		        var start, loc;
		        if (this.trackComment) {
		            comments = [];
		            start = this.index - 2;
		            loc = {
		                start: {
		                    line: this.lineNumber,
		                    column: this.index - this.lineStart - 2
		                },
		                end: {}
		            };
		        }
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isLineTerminator(ch)) {
		                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                ++this.index;
		                this.lineStart = this.index;
		            }
		            else if (ch === 0x2A) {
		                // Block comment ends with '*/'.
		                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
		                    this.index += 2;
		                    if (this.trackComment) {
		                        loc.end = {
		                            line: this.lineNumber,
		                            column: this.index - this.lineStart
		                        };
		                        var entry = {
		                            multiLine: true,
		                            slice: [start + 2, this.index - 2],
		                            range: [start, this.index],
		                            loc: loc
		                        };
		                        comments.push(entry);
		                    }
		                    return comments;
		                }
		                ++this.index;
		            }
		            else {
		                ++this.index;
		            }
		        }
		        // Ran off the end of the file - the whole thing is a comment
		        if (this.trackComment) {
		            loc.end = {
		                line: this.lineNumber,
		                column: this.index - this.lineStart
		            };
		            var entry = {
		                multiLine: true,
		                slice: [start + 2, this.index],
		                range: [start, this.index],
		                loc: loc
		            };
		            comments.push(entry);
		        }
		        this.tolerateUnexpectedToken();
		        return comments;
		    };
		    Scanner.prototype.scanComments = function () {
		        var comments;
		        if (this.trackComment) {
		            comments = [];
		        }
		        var start = (this.index === 0);
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (character_1.Character.isWhiteSpace(ch)) {
		                ++this.index;
		            }
		            else if (character_1.Character.isLineTerminator(ch)) {
		                ++this.index;
		                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
		                    ++this.index;
		                }
		                ++this.lineNumber;
		                this.lineStart = this.index;
		                start = true;
		            }
		            else if (ch === 0x2F) {
		                ch = this.source.charCodeAt(this.index + 1);
		                if (ch === 0x2F) {
		                    this.index += 2;
		                    var comment = this.skipSingleLineComment(2);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                    start = true;
		                }
		                else if (ch === 0x2A) {
		                    this.index += 2;
		                    var comment = this.skipMultiLineComment();
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (start && ch === 0x2D) {
		                // U+003E is '>'
		                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
		                    // '-->' is a single-line comment
		                    this.index += 3;
		                    var comment = this.skipSingleLineComment(3);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else if (ch === 0x3C) {
		                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
		                    this.index += 4; // `<!--`
		                    var comment = this.skipSingleLineComment(4);
		                    if (this.trackComment) {
		                        comments = comments.concat(comment);
		                    }
		                }
		                else {
		                    break;
		                }
		            }
		            else {
		                break;
		            }
		        }
		        return comments;
		    };
		    // https://tc39.github.io/ecma262/#sec-future-reserved-words
		    Scanner.prototype.isFutureReservedWord = function (id) {
		        switch (id) {
		            case 'enum':
		            case 'export':
		            case 'import':
		            case 'super':
		                return true;
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.isStrictModeReservedWord = function (id) {
		        switch (id) {
		            case 'implements':
		            case 'interface':
		            case 'package':
		            case 'private':
		            case 'protected':
		            case 'public':
		            case 'static':
		            case 'yield':
		            case 'let':
		                return true;
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.isRestrictedWord = function (id) {
		        return id === 'eval' || id === 'arguments';
		    };
		    // https://tc39.github.io/ecma262/#sec-keywords
		    Scanner.prototype.isKeyword = function (id) {
		        switch (id.length) {
		            case 2:
		                return (id === 'if') || (id === 'in') || (id === 'do');
		            case 3:
		                return (id === 'var') || (id === 'for') || (id === 'new') ||
		                    (id === 'try') || (id === 'let');
		            case 4:
		                return (id === 'this') || (id === 'else') || (id === 'case') ||
		                    (id === 'void') || (id === 'with') || (id === 'enum');
		            case 5:
		                return (id === 'while') || (id === 'break') || (id === 'catch') ||
		                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
		                    (id === 'class') || (id === 'super');
		            case 6:
		                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
		                    (id === 'switch') || (id === 'export') || (id === 'import');
		            case 7:
		                return (id === 'default') || (id === 'finally') || (id === 'extends');
		            case 8:
		                return (id === 'function') || (id === 'continue') || (id === 'debugger');
		            case 10:
		                return (id === 'instanceof');
		            default:
		                return false;
		        }
		    };
		    Scanner.prototype.codePointAt = function (i) {
		        var cp = this.source.charCodeAt(i);
		        if (cp >= 0xD800 && cp <= 0xDBFF) {
		            var second = this.source.charCodeAt(i + 1);
		            if (second >= 0xDC00 && second <= 0xDFFF) {
		                var first = cp;
		                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
		            }
		        }
		        return cp;
		    };
		    Scanner.prototype.scanHexEscape = function (prefix) {
		        var len = (prefix === 'u') ? 4 : 2;
		        var code = 0;
		        for (var i = 0; i < len; ++i) {
		            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                code = code * 16 + hexValue(this.source[this.index++]);
		            }
		            else {
		                return null;
		            }
		        }
		        return String.fromCharCode(code);
		    };
		    Scanner.prototype.scanUnicodeCodePointEscape = function () {
		        var ch = this.source[this.index];
		        var code = 0;
		        // At least, one hex digit is required.
		        if (ch === '}') {
		            this.throwUnexpectedToken();
		        }
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
		                break;
		            }
		            code = code * 16 + hexValue(ch);
		        }
		        if (code > 0x10FFFF || ch !== '}') {
		            this.throwUnexpectedToken();
		        }
		        return character_1.Character.fromCodePoint(code);
		    };
		    Scanner.prototype.getIdentifier = function () {
		        var start = this.index++;
		        while (!this.eof()) {
		            var ch = this.source.charCodeAt(this.index);
		            if (ch === 0x5C) {
		                // Blackslash (U+005C) marks Unicode escape sequence.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            else if (ch >= 0xD800 && ch < 0xDFFF) {
		                // Need to handle surrogate pairs.
		                this.index = start;
		                return this.getComplexIdentifier();
		            }
		            if (character_1.Character.isIdentifierPart(ch)) {
		                ++this.index;
		            }
		            else {
		                break;
		            }
		        }
		        return this.source.slice(start, this.index);
		    };
		    Scanner.prototype.getComplexIdentifier = function () {
		        var cp = this.codePointAt(this.index);
		        var id = character_1.Character.fromCodePoint(cp);
		        this.index += id.length;
		        // '\u' (U+005C, U+0075) denotes an escaped character.
		        var ch;
		        if (cp === 0x5C) {
		            if (this.source.charCodeAt(this.index) !== 0x75) {
		                this.throwUnexpectedToken();
		            }
		            ++this.index;
		            if (this.source[this.index] === '{') {
		                ++this.index;
		                ch = this.scanUnicodeCodePointEscape();
		            }
		            else {
		                ch = this.scanHexEscape('u');
		                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
		                    this.throwUnexpectedToken();
		                }
		            }
		            id = ch;
		        }
		        while (!this.eof()) {
		            cp = this.codePointAt(this.index);
		            if (!character_1.Character.isIdentifierPart(cp)) {
		                break;
		            }
		            ch = character_1.Character.fromCodePoint(cp);
		            id += ch;
		            this.index += ch.length;
		            // '\u' (U+005C, U+0075) denotes an escaped character.
		            if (cp === 0x5C) {
		                id = id.substr(0, id.length - 1);
		                if (this.source.charCodeAt(this.index) !== 0x75) {
		                    this.throwUnexpectedToken();
		                }
		                ++this.index;
		                if (this.source[this.index] === '{') {
		                    ++this.index;
		                    ch = this.scanUnicodeCodePointEscape();
		                }
		                else {
		                    ch = this.scanHexEscape('u');
		                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
		                        this.throwUnexpectedToken();
		                    }
		                }
		                id += ch;
		            }
		        }
		        return id;
		    };
		    Scanner.prototype.octalToDecimal = function (ch) {
		        // \0 is not octal escape sequence
		        var octal = (ch !== '0');
		        var code = octalValue(ch);
		        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		            octal = true;
		            code = code * 8 + octalValue(this.source[this.index++]);
		            // 3 digits are only allowed when string starts
		            // with 0, 1, 2, 3
		            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                code = code * 8 + octalValue(this.source[this.index++]);
		            }
		        }
		        return {
		            code: code,
		            octal: octal
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-names-and-keywords
		    Scanner.prototype.scanIdentifier = function () {
		        var type;
		        var start = this.index;
		        // Backslash (U+005C) starts an escaped character.
		        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
		        // There is no keyword or literal with only one character.
		        // Thus, it must be an identifier.
		        if (id.length === 1) {
		            type = 3 /* Identifier */;
		        }
		        else if (this.isKeyword(id)) {
		            type = 4 /* Keyword */;
		        }
		        else if (id === 'null') {
		            type = 5 /* NullLiteral */;
		        }
		        else if (id === 'true' || id === 'false') {
		            type = 1 /* BooleanLiteral */;
		        }
		        else {
		            type = 3 /* Identifier */;
		        }
		        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
		            var restore = this.index;
		            this.index = start;
		            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
		            this.index = restore;
		        }
		        return {
		            type: type,
		            value: id,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-punctuators
		    Scanner.prototype.scanPunctuator = function () {
		        var start = this.index;
		        // Check for most common single-character punctuators.
		        var str = this.source[this.index];
		        switch (str) {
		            case '(':
		            case '{':
		                if (str === '{') {
		                    this.curlyStack.push('{');
		                }
		                ++this.index;
		                break;
		            case '.':
		                ++this.index;
		                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
		                    // Spread operator: ...
		                    this.index += 2;
		                    str = '...';
		                }
		                break;
		            case '}':
		                ++this.index;
		                this.curlyStack.pop();
		                break;
		            case ')':
		            case ';':
		            case ',':
		            case '[':
		            case ']':
		            case ':':
		            case '?':
		            case '~':
		                ++this.index;
		                break;
		            default:
		                // 4-character punctuator.
		                str = this.source.substr(this.index, 4);
		                if (str === '>>>=') {
		                    this.index += 4;
		                }
		                else {
		                    // 3-character punctuators.
		                    str = str.substr(0, 3);
		                    if (str === '===' || str === '!==' || str === '>>>' ||
		                        str === '<<=' || str === '>>=' || str === '**=') {
		                        this.index += 3;
		                    }
		                    else {
		                        // 2-character punctuators.
		                        str = str.substr(0, 2);
		                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
		                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
		                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
		                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
		                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
		                            this.index += 2;
		                        }
		                        else {
		                            // 1-character punctuators.
		                            str = this.source[this.index];
		                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
		                                ++this.index;
		                            }
		                        }
		                    }
		                }
		        }
		        if (this.index === start) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 7 /* Punctuator */,
		            value: str,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
		    Scanner.prototype.scanHexLiteral = function (start) {
		        var num = '';
		        while (!this.eof()) {
		            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (num.length === 0) {
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt('0x' + num, 16),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.scanBinaryLiteral = function (start) {
		        var num = '';
		        var ch;
		        while (!this.eof()) {
		            ch = this.source[this.index];
		            if (ch !== '0' && ch !== '1') {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (num.length === 0) {
		            // only 0b or 0B
		            this.throwUnexpectedToken();
		        }
		        if (!this.eof()) {
		            ch = this.source.charCodeAt(this.index);
		            /* istanbul ignore else */
		            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
		                this.throwUnexpectedToken();
		            }
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt(num, 2),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
		        var num = '';
		        var octal = false;
		        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
		            octal = true;
		            num = '0' + this.source[this.index++];
		        }
		        else {
		            ++this.index;
		        }
		        while (!this.eof()) {
		            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
		                break;
		            }
		            num += this.source[this.index++];
		        }
		        if (!octal && num.length === 0) {
		            // only 0o or 0O
		            this.throwUnexpectedToken();
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseInt(num, 8),
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.isImplicitOctalLiteral = function () {
		        // Implicit octal, unless there is a non-octal digit.
		        // (Annex B.1.1 on Numeric Literals)
		        for (var i = this.index + 1; i < this.length; ++i) {
		            var ch = this.source[i];
		            if (ch === '8' || ch === '9') {
		                return false;
		            }
		            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                return true;
		            }
		        }
		        return true;
		    };
		    Scanner.prototype.scanNumericLiteral = function () {
		        var start = this.index;
		        var ch = this.source[start];
		        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
		        var num = '';
		        if (ch !== '.') {
		            num = this.source[this.index++];
		            ch = this.source[this.index];
		            // Hex number starts with '0x'.
		            // Octal number starts with '0'.
		            // Octal number in ES6 starts with '0o'.
		            // Binary number in ES6 starts with '0b'.
		            if (num === '0') {
		                if (ch === 'x' || ch === 'X') {
		                    ++this.index;
		                    return this.scanHexLiteral(start);
		                }
		                if (ch === 'b' || ch === 'B') {
		                    ++this.index;
		                    return this.scanBinaryLiteral(start);
		                }
		                if (ch === 'o' || ch === 'O') {
		                    return this.scanOctalLiteral(ch, start);
		                }
		                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                    if (this.isImplicitOctalLiteral()) {
		                        return this.scanOctalLiteral(ch, start);
		                    }
		                }
		            }
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                num += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === '.') {
		            num += this.source[this.index++];
		            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                num += this.source[this.index++];
		            }
		            ch = this.source[this.index];
		        }
		        if (ch === 'e' || ch === 'E') {
		            num += this.source[this.index++];
		            ch = this.source[this.index];
		            if (ch === '+' || ch === '-') {
		                num += this.source[this.index++];
		            }
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                    num += this.source[this.index++];
		                }
		            }
		            else {
		                this.throwUnexpectedToken();
		            }
		        }
		        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 6 /* NumericLiteral */,
		            value: parseFloat(num),
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-string-literals
		    Scanner.prototype.scanStringLiteral = function () {
		        var start = this.index;
		        var quote = this.source[start];
		        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
		        ++this.index;
		        var octal = false;
		        var str = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === quote) {
		                quote = '';
		                break;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'u':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                str += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var unescaped_1 = this.scanHexEscape(ch);
		                                if (unescaped_1 === null) {
		                                    this.throwUnexpectedToken();
		                                }
		                                str += unescaped_1;
		                            }
		                            break;
		                        case 'x':
		                            var unescaped = this.scanHexEscape(ch);
		                            if (unescaped === null) {
		                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
		                            }
		                            str += unescaped;
		                            break;
		                        case 'n':
		                            str += '\n';
		                            break;
		                        case 'r':
		                            str += '\r';
		                            break;
		                        case 't':
		                            str += '\t';
		                            break;
		                        case 'b':
		                            str += '\b';
		                            break;
		                        case 'f':
		                            str += '\f';
		                            break;
		                        case 'v':
		                            str += '\x0B';
		                            break;
		                        case '8':
		                        case '9':
		                            str += ch;
		                            this.tolerateUnexpectedToken();
		                            break;
		                        default:
		                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                var octToDec = this.octalToDecimal(ch);
		                                octal = octToDec.octal || octal;
		                                str += String.fromCharCode(octToDec.code);
		                            }
		                            else {
		                                str += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                break;
		            }
		            else {
		                str += ch;
		            }
		        }
		        if (quote !== '') {
		            this.index = start;
		            this.throwUnexpectedToken();
		        }
		        return {
		            type: 8 /* StringLiteral */,
		            value: str,
		            octal: octal,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
		    Scanner.prototype.scanTemplate = function () {
		        var cooked = '';
		        var terminated = false;
		        var start = this.index;
		        var head = (this.source[start] === '`');
		        var tail = false;
		        var rawOffset = 2;
		        ++this.index;
		        while (!this.eof()) {
		            var ch = this.source[this.index++];
		            if (ch === '`') {
		                rawOffset = 1;
		                tail = true;
		                terminated = true;
		                break;
		            }
		            else if (ch === '$') {
		                if (this.source[this.index] === '{') {
		                    this.curlyStack.push('${');
		                    ++this.index;
		                    terminated = true;
		                    break;
		                }
		                cooked += ch;
		            }
		            else if (ch === '\\') {
		                ch = this.source[this.index++];
		                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    switch (ch) {
		                        case 'n':
		                            cooked += '\n';
		                            break;
		                        case 'r':
		                            cooked += '\r';
		                            break;
		                        case 't':
		                            cooked += '\t';
		                            break;
		                        case 'u':
		                            if (this.source[this.index] === '{') {
		                                ++this.index;
		                                cooked += this.scanUnicodeCodePointEscape();
		                            }
		                            else {
		                                var restore = this.index;
		                                var unescaped_2 = this.scanHexEscape(ch);
		                                if (unescaped_2 !== null) {
		                                    cooked += unescaped_2;
		                                }
		                                else {
		                                    this.index = restore;
		                                    cooked += ch;
		                                }
		                            }
		                            break;
		                        case 'x':
		                            var unescaped = this.scanHexEscape(ch);
		                            if (unescaped === null) {
		                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
		                            }
		                            cooked += unescaped;
		                            break;
		                        case 'b':
		                            cooked += '\b';
		                            break;
		                        case 'f':
		                            cooked += '\f';
		                            break;
		                        case 'v':
		                            cooked += '\v';
		                            break;
		                        default:
		                            if (ch === '0') {
		                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
		                                    // Illegal: \01 \02 and so on
		                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                                }
		                                cooked += '\0';
		                            }
		                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
		                                // Illegal: \1 \2
		                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
		                            }
		                            else {
		                                cooked += ch;
		                            }
		                            break;
		                    }
		                }
		                else {
		                    ++this.lineNumber;
		                    if (ch === '\r' && this.source[this.index] === '\n') {
		                        ++this.index;
		                    }
		                    this.lineStart = this.index;
		                }
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                ++this.lineNumber;
		                if (ch === '\r' && this.source[this.index] === '\n') {
		                    ++this.index;
		                }
		                this.lineStart = this.index;
		                cooked += '\n';
		            }
		            else {
		                cooked += ch;
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken();
		        }
		        if (!head) {
		            this.curlyStack.pop();
		        }
		        return {
		            type: 10 /* Template */,
		            value: this.source.slice(start + 1, this.index - rawOffset),
		            cooked: cooked,
		            head: head,
		            tail: tail,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
		    Scanner.prototype.testRegExp = function (pattern, flags) {
		        // The BMP character to use as a replacement for astral symbols when
		        // translating an ES6 "u"-flagged pattern to an ES5-compatible
		        // approximation.
		        // Note: replacing with '\uFFFF' enables false positives in unlikely
		        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
		        // pattern that would not be detected by this substitution.
		        var astralSubstitute = '\uFFFF';
		        var tmp = pattern;
		        var self = this;
		        if (flags.indexOf('u') >= 0) {
		            tmp = tmp
		                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
		                var codePoint = parseInt($1 || $2, 16);
		                if (codePoint > 0x10FFFF) {
		                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		                }
		                if (codePoint <= 0xFFFF) {
		                    return String.fromCharCode(codePoint);
		                }
		                return astralSubstitute;
		            })
		                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
		        }
		        // First, detect invalid regular expressions.
		        try {
		            RegExp(tmp);
		        }
		        catch (e) {
		            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
		        }
		        // Return a regular expression object for this pattern-flag pair, or
		        // `null` in case the current environment doesn't support the flags it
		        // uses.
		        try {
		            return new RegExp(pattern, flags);
		        }
		        catch (exception) {
		            /* istanbul ignore next */
		            return null;
		        }
		    };
		    Scanner.prototype.scanRegExpBody = function () {
		        var ch = this.source[this.index];
		        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
		        var str = this.source[this.index++];
		        var classMarker = false;
		        var terminated = false;
		        while (!this.eof()) {
		            ch = this.source[this.index++];
		            str += ch;
		            if (ch === '\\') {
		                ch = this.source[this.index++];
		                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
		                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		                }
		                str += ch;
		            }
		            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
		                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		            }
		            else if (classMarker) {
		                if (ch === ']') {
		                    classMarker = false;
		                }
		            }
		            else {
		                if (ch === '/') {
		                    terminated = true;
		                    break;
		                }
		                else if (ch === '[') {
		                    classMarker = true;
		                }
		            }
		        }
		        if (!terminated) {
		            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
		        }
		        // Exclude leading and trailing slash.
		        return str.substr(1, str.length - 2);
		    };
		    Scanner.prototype.scanRegExpFlags = function () {
		        var str = '';
		        var flags = '';
		        while (!this.eof()) {
		            var ch = this.source[this.index];
		            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
		                break;
		            }
		            ++this.index;
		            if (ch === '\\' && !this.eof()) {
		                ch = this.source[this.index];
		                if (ch === 'u') {
		                    ++this.index;
		                    var restore = this.index;
		                    var char = this.scanHexEscape('u');
		                    if (char !== null) {
		                        flags += char;
		                        for (str += '\\u'; restore < this.index; ++restore) {
		                            str += this.source[restore];
		                        }
		                    }
		                    else {
		                        this.index = restore;
		                        flags += 'u';
		                        str += '\\u';
		                    }
		                    this.tolerateUnexpectedToken();
		                }
		                else {
		                    str += '\\';
		                    this.tolerateUnexpectedToken();
		                }
		            }
		            else {
		                flags += ch;
		                str += ch;
		            }
		        }
		        return flags;
		    };
		    Scanner.prototype.scanRegExp = function () {
		        var start = this.index;
		        var pattern = this.scanRegExpBody();
		        var flags = this.scanRegExpFlags();
		        var value = this.testRegExp(pattern, flags);
		        return {
		            type: 9 /* RegularExpression */,
		            value: '',
		            pattern: pattern,
		            flags: flags,
		            regex: value,
		            lineNumber: this.lineNumber,
		            lineStart: this.lineStart,
		            start: start,
		            end: this.index
		        };
		    };
		    Scanner.prototype.lex = function () {
		        if (this.eof()) {
		            return {
		                type: 2 /* EOF */,
		                value: '',
		                lineNumber: this.lineNumber,
		                lineStart: this.lineStart,
		                start: this.index,
		                end: this.index
		            };
		        }
		        var cp = this.source.charCodeAt(this.index);
		        if (character_1.Character.isIdentifierStart(cp)) {
		            return this.scanIdentifier();
		        }
		        // Very common: ( and ) and ;
		        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
		            return this.scanPunctuator();
		        }
		        // String literal starts with single quote (U+0027) or double quote (U+0022).
		        if (cp === 0x27 || cp === 0x22) {
		            return this.scanStringLiteral();
		        }
		        // Dot (.) U+002E can also start a floating-point number, hence the need
		        // to check the next character.
		        if (cp === 0x2E) {
		            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
		                return this.scanNumericLiteral();
		            }
		            return this.scanPunctuator();
		        }
		        if (character_1.Character.isDecimalDigit(cp)) {
		            return this.scanNumericLiteral();
		        }
		        // Template literals start with ` (U+0060) for template head
		        // or } (U+007D) for template middle or template tail.
		        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
		            return this.scanTemplate();
		        }
		        // Possible identifier start in a surrogate pair.
		        if (cp >= 0xD800 && cp < 0xDFFF) {
		            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
		                return this.scanIdentifier();
		            }
		        }
		        return this.scanPunctuator();
		    };
		    return Scanner;
		}());
		exports.Scanner = Scanner;
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.TokenName = {};
		exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
		exports.TokenName[2 /* EOF */] = '<end>';
		exports.TokenName[3 /* Identifier */] = 'Identifier';
		exports.TokenName[4 /* Keyword */] = 'Keyword';
		exports.TokenName[5 /* NullLiteral */] = 'Null';
		exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
		exports.TokenName[7 /* Punctuator */] = 'Punctuator';
		exports.TokenName[8 /* StringLiteral */] = 'String';
		exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
		exports.TokenName[10 /* Template */] = 'Template';
	
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		"use strict";
		// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.XHTMLEntities = {
		    quot: '\u0022',
		    amp: '\u0026',
		    apos: '\u0027',
		    gt: '\u003E',
		    nbsp: '\u00A0',
		    iexcl: '\u00A1',
		    cent: '\u00A2',
		    pound: '\u00A3',
		    curren: '\u00A4',
		    yen: '\u00A5',
		    brvbar: '\u00A6',
		    sect: '\u00A7',
		    uml: '\u00A8',
		    copy: '\u00A9',
		    ordf: '\u00AA',
		    laquo: '\u00AB',
		    not: '\u00AC',
		    shy: '\u00AD',
		    reg: '\u00AE',
		    macr: '\u00AF',
		    deg: '\u00B0',
		    plusmn: '\u00B1',
		    sup2: '\u00B2',
		    sup3: '\u00B3',
		    acute: '\u00B4',
		    micro: '\u00B5',
		    para: '\u00B6',
		    middot: '\u00B7',
		    cedil: '\u00B8',
		    sup1: '\u00B9',
		    ordm: '\u00BA',
		    raquo: '\u00BB',
		    frac14: '\u00BC',
		    frac12: '\u00BD',
		    frac34: '\u00BE',
		    iquest: '\u00BF',
		    Agrave: '\u00C0',
		    Aacute: '\u00C1',
		    Acirc: '\u00C2',
		    Atilde: '\u00C3',
		    Auml: '\u00C4',
		    Aring: '\u00C5',
		    AElig: '\u00C6',
		    Ccedil: '\u00C7',
		    Egrave: '\u00C8',
		    Eacute: '\u00C9',
		    Ecirc: '\u00CA',
		    Euml: '\u00CB',
		    Igrave: '\u00CC',
		    Iacute: '\u00CD',
		    Icirc: '\u00CE',
		    Iuml: '\u00CF',
		    ETH: '\u00D0',
		    Ntilde: '\u00D1',
		    Ograve: '\u00D2',
		    Oacute: '\u00D3',
		    Ocirc: '\u00D4',
		    Otilde: '\u00D5',
		    Ouml: '\u00D6',
		    times: '\u00D7',
		    Oslash: '\u00D8',
		    Ugrave: '\u00D9',
		    Uacute: '\u00DA',
		    Ucirc: '\u00DB',
		    Uuml: '\u00DC',
		    Yacute: '\u00DD',
		    THORN: '\u00DE',
		    szlig: '\u00DF',
		    agrave: '\u00E0',
		    aacute: '\u00E1',
		    acirc: '\u00E2',
		    atilde: '\u00E3',
		    auml: '\u00E4',
		    aring: '\u00E5',
		    aelig: '\u00E6',
		    ccedil: '\u00E7',
		    egrave: '\u00E8',
		    eacute: '\u00E9',
		    ecirc: '\u00EA',
		    euml: '\u00EB',
		    igrave: '\u00EC',
		    iacute: '\u00ED',
		    icirc: '\u00EE',
		    iuml: '\u00EF',
		    eth: '\u00F0',
		    ntilde: '\u00F1',
		    ograve: '\u00F2',
		    oacute: '\u00F3',
		    ocirc: '\u00F4',
		    otilde: '\u00F5',
		    ouml: '\u00F6',
		    divide: '\u00F7',
		    oslash: '\u00F8',
		    ugrave: '\u00F9',
		    uacute: '\u00FA',
		    ucirc: '\u00FB',
		    uuml: '\u00FC',
		    yacute: '\u00FD',
		    thorn: '\u00FE',
		    yuml: '\u00FF',
		    OElig: '\u0152',
		    oelig: '\u0153',
		    Scaron: '\u0160',
		    scaron: '\u0161',
		    Yuml: '\u0178',
		    fnof: '\u0192',
		    circ: '\u02C6',
		    tilde: '\u02DC',
		    Alpha: '\u0391',
		    Beta: '\u0392',
		    Gamma: '\u0393',
		    Delta: '\u0394',
		    Epsilon: '\u0395',
		    Zeta: '\u0396',
		    Eta: '\u0397',
		    Theta: '\u0398',
		    Iota: '\u0399',
		    Kappa: '\u039A',
		    Lambda: '\u039B',
		    Mu: '\u039C',
		    Nu: '\u039D',
		    Xi: '\u039E',
		    Omicron: '\u039F',
		    Pi: '\u03A0',
		    Rho: '\u03A1',
		    Sigma: '\u03A3',
		    Tau: '\u03A4',
		    Upsilon: '\u03A5',
		    Phi: '\u03A6',
		    Chi: '\u03A7',
		    Psi: '\u03A8',
		    Omega: '\u03A9',
		    alpha: '\u03B1',
		    beta: '\u03B2',
		    gamma: '\u03B3',
		    delta: '\u03B4',
		    epsilon: '\u03B5',
		    zeta: '\u03B6',
		    eta: '\u03B7',
		    theta: '\u03B8',
		    iota: '\u03B9',
		    kappa: '\u03BA',
		    lambda: '\u03BB',
		    mu: '\u03BC',
		    nu: '\u03BD',
		    xi: '\u03BE',
		    omicron: '\u03BF',
		    pi: '\u03C0',
		    rho: '\u03C1',
		    sigmaf: '\u03C2',
		    sigma: '\u03C3',
		    tau: '\u03C4',
		    upsilon: '\u03C5',
		    phi: '\u03C6',
		    chi: '\u03C7',
		    psi: '\u03C8',
		    omega: '\u03C9',
		    thetasym: '\u03D1',
		    upsih: '\u03D2',
		    piv: '\u03D6',
		    ensp: '\u2002',
		    emsp: '\u2003',
		    thinsp: '\u2009',
		    zwnj: '\u200C',
		    zwj: '\u200D',
		    lrm: '\u200E',
		    rlm: '\u200F',
		    ndash: '\u2013',
		    mdash: '\u2014',
		    lsquo: '\u2018',
		    rsquo: '\u2019',
		    sbquo: '\u201A',
		    ldquo: '\u201C',
		    rdquo: '\u201D',
		    bdquo: '\u201E',
		    dagger: '\u2020',
		    Dagger: '\u2021',
		    bull: '\u2022',
		    hellip: '\u2026',
		    permil: '\u2030',
		    prime: '\u2032',
		    Prime: '\u2033',
		    lsaquo: '\u2039',
		    rsaquo: '\u203A',
		    oline: '\u203E',
		    frasl: '\u2044',
		    euro: '\u20AC',
		    image: '\u2111',
		    weierp: '\u2118',
		    real: '\u211C',
		    trade: '\u2122',
		    alefsym: '\u2135',
		    larr: '\u2190',
		    uarr: '\u2191',
		    rarr: '\u2192',
		    darr: '\u2193',
		    harr: '\u2194',
		    crarr: '\u21B5',
		    lArr: '\u21D0',
		    uArr: '\u21D1',
		    rArr: '\u21D2',
		    dArr: '\u21D3',
		    hArr: '\u21D4',
		    forall: '\u2200',
		    part: '\u2202',
		    exist: '\u2203',
		    empty: '\u2205',
		    nabla: '\u2207',
		    isin: '\u2208',
		    notin: '\u2209',
		    ni: '\u220B',
		    prod: '\u220F',
		    sum: '\u2211',
		    minus: '\u2212',
		    lowast: '\u2217',
		    radic: '\u221A',
		    prop: '\u221D',
		    infin: '\u221E',
		    ang: '\u2220',
		    and: '\u2227',
		    or: '\u2228',
		    cap: '\u2229',
		    cup: '\u222A',
		    int: '\u222B',
		    there4: '\u2234',
		    sim: '\u223C',
		    cong: '\u2245',
		    asymp: '\u2248',
		    ne: '\u2260',
		    equiv: '\u2261',
		    le: '\u2264',
		    ge: '\u2265',
		    sub: '\u2282',
		    sup: '\u2283',
		    nsub: '\u2284',
		    sube: '\u2286',
		    supe: '\u2287',
		    oplus: '\u2295',
		    otimes: '\u2297',
		    perp: '\u22A5',
		    sdot: '\u22C5',
		    lceil: '\u2308',
		    rceil: '\u2309',
		    lfloor: '\u230A',
		    rfloor: '\u230B',
		    loz: '\u25CA',
		    spades: '\u2660',
		    clubs: '\u2663',
		    hearts: '\u2665',
		    diams: '\u2666',
		    lang: '\u27E8',
		    rang: '\u27E9'
		};
	
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var error_handler_1 = __webpack_require__(10);
		var scanner_1 = __webpack_require__(12);
		var token_1 = __webpack_require__(13);
		var Reader = (function () {
		    function Reader() {
		        this.values = [];
		        this.curly = this.paren = -1;
		    }
		    // A function following one of those tokens is an expression.
		    Reader.prototype.beforeFunctionExpression = function (t) {
		        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
		            'return', 'case', 'delete', 'throw', 'void',
		            // assignment operators
		            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
		            '&=', '|=', '^=', ',',
		            // binary/unary operators
		            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
		            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
		            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
		    };
		    // Determine if forward slash (/) is an operator or part of a regular expression
		    // https://github.com/mozilla/sweet.js/wiki/design
		    Reader.prototype.isRegexStart = function () {
		        var previous = this.values[this.values.length - 1];
		        var regex = (previous !== null);
		        switch (previous) {
		            case 'this':
		            case ']':
		                regex = false;
		                break;
		            case ')':
		                var keyword = this.values[this.paren - 1];
		                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
		                break;
		            case '}':
		                // Dividing a function by anything makes little sense,
		                // but we have to check for that.
		                regex = false;
		                if (this.values[this.curly - 3] === 'function') {
		                    // Anonymous function, e.g. function(){} /42
		                    var check = this.values[this.curly - 4];
		                    regex = check ? !this.beforeFunctionExpression(check) : false;
		                }
		                else if (this.values[this.curly - 4] === 'function') {
		                    // Named function, e.g. function f(){} /42/
		                    var check = this.values[this.curly - 5];
		                    regex = check ? !this.beforeFunctionExpression(check) : true;
		                }
		                break;
		            default:
		                break;
		        }
		        return regex;
		    };
		    Reader.prototype.push = function (token) {
		        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
		            if (token.value === '{') {
		                this.curly = this.values.length;
		            }
		            else if (token.value === '(') {
		                this.paren = this.values.length;
		            }
		            this.values.push(token.value);
		        }
		        else {
		            this.values.push(null);
		        }
		    };
		    return Reader;
		}());
		var Tokenizer = (function () {
		    function Tokenizer(code, config) {
		        this.errorHandler = new error_handler_1.ErrorHandler();
		        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
		        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
		        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
		        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
		        this.buffer = [];
		        this.reader = new Reader();
		    }
		    Tokenizer.prototype.errors = function () {
		        return this.errorHandler.errors;
		    };
		    Tokenizer.prototype.getNextToken = function () {
		        if (this.buffer.length === 0) {
		            var comments = this.scanner.scanComments();
		            if (this.scanner.trackComment) {
		                for (var i = 0; i < comments.length; ++i) {
		                    var e = comments[i];
		                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
		                    var comment = {
		                        type: e.multiLine ? 'BlockComment' : 'LineComment',
		                        value: value
		                    };
		                    if (this.trackRange) {
		                        comment.range = e.range;
		                    }
		                    if (this.trackLoc) {
		                        comment.loc = e.loc;
		                    }
		                    this.buffer.push(comment);
		                }
		            }
		            if (!this.scanner.eof()) {
		                var loc = void 0;
		                if (this.trackLoc) {
		                    loc = {
		                        start: {
		                            line: this.scanner.lineNumber,
		                            column: this.scanner.index - this.scanner.lineStart
		                        },
		                        end: {}
		                    };
		                }
		                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
		                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
		                this.reader.push(token);
		                var entry = {
		                    type: token_1.TokenName[token.type],
		                    value: this.scanner.source.slice(token.start, token.end)
		                };
		                if (this.trackRange) {
		                    entry.range = [token.start, token.end];
		                }
		                if (this.trackLoc) {
		                    loc.end = {
		                        line: this.scanner.lineNumber,
		                        column: this.scanner.index - this.scanner.lineStart
		                    };
		                    entry.loc = loc;
		                }
		                if (token.type === 9 /* RegularExpression */) {
		                    var pattern = token.pattern;
		                    var flags = token.flags;
		                    entry.regex = { pattern: pattern, flags: flags };
		                }
		                this.buffer.push(entry);
		            }
		        }
		        return this.buffer.shift();
		    };
		    return Tokenizer;
		}());
		exports.Tokenizer = Tokenizer;
	
	
	/***/ }
	/******/ ])
	});
	;

/***/ }),

/***/ 660:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var combine = __webpack_require__(1093);
	var jsYaml = __webpack_require__(697).load;
	var noop = function() {};
	var split = __webpack_require__(1092);
	var through = __webpack_require__(1097);
	
	var isSeparator = function(line) {
	
	  // the '---' separator can have trailing whitespace but not leading whitespace
	  return line[0] === '-' && line.trim() === '---';
	
	};
	
	var NEWLINE = '\n';
	
	var fastmatter = function(str) {
	
	  var bodyOnly = {
	    attributes: {},
	    body: str
	  };
	
	  var lines = str.split(NEWLINE);
	
	  if (!isSeparator(lines[0])) { // no attributes; entire `str` is body
	    return bodyOnly;
	  }
	
	  var attributes = [];
	  var i = 1;
	  var len = lines.length;
	  while (i < len) {
	    if (isSeparator(lines[i])) { // end of attributes
	      break;
	    }
	    attributes.push(lines[i]);
	    i += 1;
	  }
	
	  if (i === lines.length) { // second '---' is missing; assume entire `str` is body
	    return bodyOnly;
	  }
	
	  return {
	    attributes: attributes.length ? jsYaml(attributes.join(NEWLINE)) : {},
	    body: lines.slice(i + 1).join(NEWLINE)
	  };
	
	};
	
	var SPLIT_REGEX = /(\n)/;
	
	fastmatter.stream = function(cb) {
	
	  cb = cb || noop;
	
	  var isFirstLine = true;
	  var bodyFlag = 0;
	  var firstSeparator = '';
	  var attributes = [];
	
	  var transform = function(chunk, encoding, transformCb) {
	    var line = chunk.toString();
	    if (bodyFlag === 0) { // not in `body`
	      if (isFirstLine) {
	        isFirstLine = false;
	        if (isSeparator(line)) { // start of `attributes`
	          firstSeparator = line; // we need this if the second '---' is missing
	        } else { // no attributes; the entire stream is `body`
	          bodyFlag = 2; // the next line is the second line of `body`
	          cb.call(this, {});
	          cb = noop;
	          this.push(line);
	        }
	      } else {
	        if (isSeparator(line)) {
	          bodyFlag = 1; // the next line is the first line of `body`
	          cb.call(this, jsYaml(attributes.join('')) || {});
	          cb = noop;
	          firstSeparator = '';
	          attributes = [];
	        } else {
	          attributes.push(line);
	        }
	      }
	    } else { // in `body`
	      if (bodyFlag === 1) {
	        bodyFlag = 2; // the next line is the second line of `body`
	        line = line.substring(1); // drop the initial '\n'
	      }
	      this.push(line);
	    }
	    transformCb();
	  };
	
	  var flush = function(flushCb) {
	    cb.call(this, {});
	    if (firstSeparator.length) {
	      this.push(firstSeparator);
	    }
	    if (attributes.length) {
	      this.push(attributes.join(''));
	    }
	    flushCb();
	  };
	
	  return combine(split(SPLIT_REGEX), through(transform, flush));
	
	};
	
	module.exports = fastmatter;


/***/ }),

/***/ 674:
/***/ (function(module, exports) {

	function FocusGroup(options) {
	  options = options || {};
	  var userKeybindings = options.keybindings || {};
	  this._settings = {
	    keybindings: {
	      next: (userKeybindings.next) || { keyCode: 40 },
	      prev: (userKeybindings.prev) || { keyCode: 38 },
	      first: userKeybindings.first,
	      last: userKeybindings.last,
	    },
	    wrap: options.wrap,
	    stringSearch: options.stringSearch,
	    stringSearchDelay: 800
	  };
	
	  // Construct a keybinding lookup that will be more useful later
	  this._keybindingsLookup = [];
	  var action;
	  var eventMatchers
	  for (action in this._settings.keybindings) {
	    eventMatchers = this._settings.keybindings[action];
	    if (!eventMatchers) continue;
	    [].concat(eventMatchers).forEach(function(eventMatcher) {
	      eventMatcher.metaKey = eventMatcher.metaKey || false;
	      eventMatcher.ctrlKey = eventMatcher.ctrlKey || false;
	      eventMatcher.altKey = eventMatcher.altKey || false;
	      eventMatcher.shiftKey = eventMatcher.shiftKey || false;
	      this._keybindingsLookup.push({
	        action: action,
	        eventMatcher: eventMatcher
	      });
	    }.bind(this));
	  }
	
	  this._searchString = '';
	  this._members = [];
	  if (options.members) this.setMembers(options.members);
	  this._boundHandleKeydownEvent = this._handleKeydownEvent.bind(this);
	}
	
	FocusGroup.prototype.activate = function() {
	  // Use capture in case other libraries might grab it first -- i.e. React
	  document.addEventListener('keydown', this._boundHandleKeydownEvent, true);
	  return this;
	};
	
	FocusGroup.prototype.deactivate = function() {
	  document.removeEventListener('keydown', this._boundHandleKeydownEvent, true);
	  this._clearSearchStringRefreshTimer();
	  return this;
	};
	
	FocusGroup.prototype._handleKeydownEvent = function(event) {
	  // Only respond to keyboard events when
	  // focus is already within the focus-group
	  var activeElementIndex = this._getActiveElementIndex();
	  if (activeElementIndex === -1) return;
	
	  // See if the event matches any registered keybinds
	  var eventBound = false;
	  this._keybindingsLookup.forEach(function(keybinding) {
	    if (!matchesEvent(keybinding.eventMatcher, event)) return;
	    eventBound = true;
	    event.preventDefault();
	    switch (keybinding.action) {
	      case 'next':
	        this.moveFocusForward();
	        break;
	      case 'prev':
	        this.moveFocusBack();
	        break;
	      case 'first':
	        this.moveFocusToFirst();
	        break;
	      case 'last':
	        this.moveFocusToLast();
	        break;
	      default: return;
	    }
	  }.bind(this));
	
	  if (!eventBound) {
	    this._handleUnboundKey(event);
	  }
	};
	
	FocusGroup.prototype.moveFocusForward = function() {
	  var activeElementIndex = this._getActiveElementIndex();
	  var targetIndex;
	  if (activeElementIndex < this._members.length - 1) {
	    targetIndex = activeElementIndex + 1;
	  } else if (this._settings.wrap) {
	    targetIndex = 0;
	  } else {
	    targetIndex = activeElementIndex;
	  }
	  this.focusNodeAtIndex(targetIndex);
	  return targetIndex;
	};
	
	FocusGroup.prototype.moveFocusBack = function() {
	  var activeElementIndex = this._getActiveElementIndex();
	  var targetIndex;
	  if (activeElementIndex > 0) {
	    targetIndex = activeElementIndex - 1;
	  } else if (this._settings.wrap) {
	    targetIndex = this._members.length - 1;
	  } else {
	    targetIndex = activeElementIndex;
	  }
	  this.focusNodeAtIndex(targetIndex);
	  return targetIndex;
	};
	
	FocusGroup.prototype.moveFocusToFirst = function() {
	  this.focusNodeAtIndex(0);
	};
	
	FocusGroup.prototype.moveFocusToLast = function() {
	  this.focusNodeAtIndex(this._members.length - 1);
	};
	
	FocusGroup.prototype._handleUnboundKey = function(event) {
	  if (!this._settings.stringSearch) return;
	
	  // While a string search is underway, ignore spaces
	  // and prevent the default space-key behavior
	  if (this._searchString !== '' && (event.key === ' ' || event.keyCode === 32)) {
	    event.preventDefault();
	    return -1;
	  }
	
	  // Only respond to letter keys
	  if (!isLetterKeyCode(event.keyCode)) return -1;
	
	  // If the letter key is part of a key combo,
	  // let it do whatever it was going to do
	  if (event.ctrlKey || event.metaKey || event.altKey) return -1;
	
	  event.preventDefault();
	
	  this._addToSearchString(String.fromCharCode(event.keyCode));
	  this._runStringSearch();
	};
	
	FocusGroup.prototype._clearSearchString = function() {
	  this._searchString = '';
	};
	
	FocusGroup.prototype._addToSearchString = function(letter) {
	  // Always store the lowercase version of the letter
	  this._searchString += letter.toLowerCase();
	};
	
	FocusGroup.prototype._startSearchStringRefreshTimer = function() {
	  var self = this;
	  this._clearSearchStringRefreshTimer();
	  this._stringSearchTimer = setTimeout(function() {
	    self._clearSearchString();
	  }, this._settings.stringSearchDelay);
	};
	
	FocusGroup.prototype._clearSearchStringRefreshTimer = function() {
	  clearTimeout(this._stringSearchTimer);
	};
	
	FocusGroup.prototype._runStringSearch = function() {
	  this._startSearchStringRefreshTimer();
	  this.moveFocusByString(this._searchString);
	};
	
	FocusGroup.prototype.moveFocusByString = function(str) {
	  var member;
	  for (var i = 0, l = this._members.length; i < l; i++) {
	    member = this._members[i];
	    if (!member.text) continue;
	
	    if (member.text.indexOf(str) === 0) {
	      return focusNode(member.node);
	    }
	  }
	};
	
	FocusGroup.prototype._findIndexOfNode = function(searchNode) {
	  for (var i = 0, l = this._members.length; i < l; i++) {
	    if (this._members[i].node === searchNode) {
	      return i;
	    }
	  }
	  return -1;
	};
	
	FocusGroup.prototype._getActiveElementIndex = function() {
	  return this._findIndexOfNode(document.activeElement);
	};
	
	FocusGroup.prototype.focusNodeAtIndex = function(index) {
	  var member = this._members[index];
	  if (member) focusNode(member.node);
	  return this;
	};
	
	FocusGroup.prototype.addMember = function(memberData, index) {
	  var node = memberData.node || memberData;
	  var nodeText = memberData.text || node.getAttribute('data-focus-group-text') || node.textContent || '';
	
	  this._checkNode(node);
	
	  var cleanedNodeText = nodeText.replace(/[\W_]/g, '').toLowerCase();
	  var member = {
	    node: node,
	    text: cleanedNodeText,
	  };
	
	  if (index !== null && index !== undefined) {
	    this._members.splice(index, 0, member);
	  } else {
	    this._members.push(member);
	  }
	  return this;
	};
	
	FocusGroup.prototype.removeMember = function(member) {
	  var removalIndex = (typeof member === 'number')
	    ? member
	    : this._findIndexOfNode(member);
	  if (removalIndex === -1) return;
	  this._members.splice(removalIndex, 1);
	  return this;
	};
	
	FocusGroup.prototype.clearMembers = function() {
	  this._members = [];
	  return this;
	};
	
	FocusGroup.prototype.setMembers = function(nextMembers) {
	  this.clearMembers();
	  for (var i = 0, l = nextMembers.length; i < l; i++) {
	    this.addMember(nextMembers[i]);
	  }
	  return this;
	};
	
	FocusGroup.prototype.getMembers = function() {
	  return this._members;
	};
	
	FocusGroup.prototype._checkNode = function(node) {
	  if (!node.nodeType || node.nodeType !== window.Node.ELEMENT_NODE) {
	    throw new Error('focus-group: only DOM nodes allowed');
	  }
	  return node;
	};
	
	function matchesEvent(matcher, event) {
	  for (var key in matcher) {
	    if (event[key] !== undefined && matcher[key] !== event[key]) return false;
	  }
	  return true;
	}
	
	function isLetterKeyCode(keyCode) {
	  return keyCode >= 65 && keyCode <= 90;
	}
	
	function focusNode(node) {
	  if (!node || !node.focus) return;
	  node.focus();
	  if (node.tagName.toLowerCase() === 'input') node.select();
	}
	
	module.exports = function createFocusGroup(options) {
	  return new FocusGroup(options);
	};


/***/ }),

/***/ 675:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(79);
	
	var _PathUtils = __webpack_require__(55);
	
	var _ExecutionEnvironment = __webpack_require__(142);
	
	var _DOMUtils = __webpack_require__(211);
	
	var _DOMStateStorage = __webpack_require__(328);
	
	var _createDOMHistory = __webpack_require__(329);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Actions = __webpack_require__(79);
	
	var _PathUtils = __webpack_require__(55);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	  if (typeof action === 'object') {
	     false ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(34);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PathUtils = __webpack_require__(55);
	
	var _Actions = __webpack_require__(79);
	
	var _createHistory = __webpack_require__(331);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	     true ?  false ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ?  false ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	         false ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ }),

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var yaml = __webpack_require__(698);
	
	
	module.exports = yaml;


/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var loader = __webpack_require__(700);
	var dumper = __webpack_require__(699);
	
	
	function deprecated(name) {
	  return function () {
	    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
	  };
	}
	
	
	module.exports.Type                = __webpack_require__(11);
	module.exports.Schema              = __webpack_require__(82);
	module.exports.FAILSAFE_SCHEMA     = __webpack_require__(214);
	module.exports.JSON_SCHEMA         = __webpack_require__(337);
	module.exports.CORE_SCHEMA         = __webpack_require__(336);
	module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(102);
	module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(145);
	module.exports.load                = loader.load;
	module.exports.loadAll             = loader.loadAll;
	module.exports.safeLoad            = loader.safeLoad;
	module.exports.safeLoadAll         = loader.safeLoadAll;
	module.exports.dump                = dumper.dump;
	module.exports.safeDump            = dumper.safeDump;
	module.exports.YAMLException       = __webpack_require__(101);
	
	// Deprecated schema names from JS-YAML 2.0.x
	module.exports.MINIMAL_SCHEMA = __webpack_require__(214);
	module.exports.SAFE_SCHEMA    = __webpack_require__(102);
	module.exports.DEFAULT_SCHEMA = __webpack_require__(145);
	
	// Deprecated functions from JS-YAML 1.x.x
	module.exports.scan           = deprecated('scan');
	module.exports.parse          = deprecated('parse');
	module.exports.compose        = deprecated('compose');
	module.exports.addConstructor = deprecated('addConstructor');


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable no-use-before-define*/
	
	var common              = __webpack_require__(81);
	var YAMLException       = __webpack_require__(101);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(145);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(102);
	
	var _toString       = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var CHAR_TAB                  = 0x09; /* Tab */
	var CHAR_LINE_FEED            = 0x0A; /* LF */
	var CHAR_SPACE                = 0x20; /* Space */
	var CHAR_EXCLAMATION          = 0x21; /* ! */
	var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
	var CHAR_SHARP                = 0x23; /* # */
	var CHAR_PERCENT              = 0x25; /* % */
	var CHAR_AMPERSAND            = 0x26; /* & */
	var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
	var CHAR_ASTERISK             = 0x2A; /* * */
	var CHAR_COMMA                = 0x2C; /* , */
	var CHAR_MINUS                = 0x2D; /* - */
	var CHAR_COLON                = 0x3A; /* : */
	var CHAR_GREATER_THAN         = 0x3E; /* > */
	var CHAR_QUESTION             = 0x3F; /* ? */
	var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
	var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
	var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
	var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
	var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
	var CHAR_VERTICAL_LINE        = 0x7C; /* | */
	var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */
	
	var ESCAPE_SEQUENCES = {};
	
	ESCAPE_SEQUENCES[0x00]   = '\\0';
	ESCAPE_SEQUENCES[0x07]   = '\\a';
	ESCAPE_SEQUENCES[0x08]   = '\\b';
	ESCAPE_SEQUENCES[0x09]   = '\\t';
	ESCAPE_SEQUENCES[0x0A]   = '\\n';
	ESCAPE_SEQUENCES[0x0B]   = '\\v';
	ESCAPE_SEQUENCES[0x0C]   = '\\f';
	ESCAPE_SEQUENCES[0x0D]   = '\\r';
	ESCAPE_SEQUENCES[0x1B]   = '\\e';
	ESCAPE_SEQUENCES[0x22]   = '\\"';
	ESCAPE_SEQUENCES[0x5C]   = '\\\\';
	ESCAPE_SEQUENCES[0x85]   = '\\N';
	ESCAPE_SEQUENCES[0xA0]   = '\\_';
	ESCAPE_SEQUENCES[0x2028] = '\\L';
	ESCAPE_SEQUENCES[0x2029] = '\\P';
	
	var DEPRECATED_BOOLEANS_SYNTAX = [
	  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
	  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
	];
	
	function compileStyleMap(schema, map) {
	  var result, keys, index, length, tag, style, type;
	
	  if (map === null) return {};
	
	  result = {};
	  keys = Object.keys(map);
	
	  for (index = 0, length = keys.length; index < length; index += 1) {
	    tag = keys[index];
	    style = String(map[tag]);
	
	    if (tag.slice(0, 2) === '!!') {
	      tag = 'tag:yaml.org,2002:' + tag.slice(2);
	    }
	    type = schema.compiledTypeMap['fallback'][tag];
	
	    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
	      style = type.styleAliases[style];
	    }
	
	    result[tag] = style;
	  }
	
	  return result;
	}
	
	function encodeHex(character) {
	  var string, handle, length;
	
	  string = character.toString(16).toUpperCase();
	
	  if (character <= 0xFF) {
	    handle = 'x';
	    length = 2;
	  } else if (character <= 0xFFFF) {
	    handle = 'u';
	    length = 4;
	  } else if (character <= 0xFFFFFFFF) {
	    handle = 'U';
	    length = 8;
	  } else {
	    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
	  }
	
	  return '\\' + handle + common.repeat('0', length - string.length) + string;
	}
	
	function State(options) {
	  this.schema       = options['schema'] || DEFAULT_FULL_SCHEMA;
	  this.indent       = Math.max(1, (options['indent'] || 2));
	  this.skipInvalid  = options['skipInvalid'] || false;
	  this.flowLevel    = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
	  this.styleMap     = compileStyleMap(this.schema, options['styles'] || null);
	  this.sortKeys     = options['sortKeys'] || false;
	  this.lineWidth    = options['lineWidth'] || 80;
	  this.noRefs       = options['noRefs'] || false;
	  this.noCompatMode = options['noCompatMode'] || false;
	  this.condenseFlow = options['condenseFlow'] || false;
	
	  this.implicitTypes = this.schema.compiledImplicit;
	  this.explicitTypes = this.schema.compiledExplicit;
	
	  this.tag = null;
	  this.result = '';
	
	  this.duplicates = [];
	  this.usedDuplicates = null;
	}
	
	// Indents every line in a string. Empty lines (\n only) are not indented.
	function indentString(string, spaces) {
	  var ind = common.repeat(' ', spaces),
	      position = 0,
	      next = -1,
	      result = '',
	      line,
	      length = string.length;
	
	  while (position < length) {
	    next = string.indexOf('\n', position);
	    if (next === -1) {
	      line = string.slice(position);
	      position = length;
	    } else {
	      line = string.slice(position, next + 1);
	      position = next + 1;
	    }
	
	    if (line.length && line !== '\n') result += ind;
	
	    result += line;
	  }
	
	  return result;
	}
	
	function generateNextLine(state, level) {
	  return '\n' + common.repeat(' ', state.indent * level);
	}
	
	function testImplicitResolving(state, str) {
	  var index, length, type;
	
	  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
	    type = state.implicitTypes[index];
	
	    if (type.resolve(str)) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	// [33] s-white ::= s-space | s-tab
	function isWhitespace(c) {
	  return c === CHAR_SPACE || c === CHAR_TAB;
	}
	
	// Returns true if the character can be printed without escaping.
	// From YAML 1.2: "any allowed characters known to be non-printable
	// should also be escaped. [However,] This isn’t mandatory"
	// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
	function isPrintable(c) {
	  return  (0x00020 <= c && c <= 0x00007E)
	      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
	      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
	      ||  (0x10000 <= c && c <= 0x10FFFF);
	}
	
	// Simplified test for values allowed after the first character in plain style.
	function isPlainSafe(c) {
	  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
	  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
	  return isPrintable(c) && c !== 0xFEFF
	    // - c-flow-indicator
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // - ":" - "#"
	    && c !== CHAR_COLON
	    && c !== CHAR_SHARP;
	}
	
	// Simplified test for values allowed as the first character in plain style.
	function isPlainSafeFirst(c) {
	  // Uses a subset of ns-char - c-indicator
	  // where ns-char = nb-char - s-white.
	  return isPrintable(c) && c !== 0xFEFF
	    && !isWhitespace(c) // - s-white
	    // - (c-indicator ::=
	    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
	    && c !== CHAR_MINUS
	    && c !== CHAR_QUESTION
	    && c !== CHAR_COLON
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
	    && c !== CHAR_SHARP
	    && c !== CHAR_AMPERSAND
	    && c !== CHAR_ASTERISK
	    && c !== CHAR_EXCLAMATION
	    && c !== CHAR_VERTICAL_LINE
	    && c !== CHAR_GREATER_THAN
	    && c !== CHAR_SINGLE_QUOTE
	    && c !== CHAR_DOUBLE_QUOTE
	    // | “%” | “@” | “`”)
	    && c !== CHAR_PERCENT
	    && c !== CHAR_COMMERCIAL_AT
	    && c !== CHAR_GRAVE_ACCENT;
	}
	
	var STYLE_PLAIN   = 1,
	    STYLE_SINGLE  = 2,
	    STYLE_LITERAL = 3,
	    STYLE_FOLDED  = 4,
	    STYLE_DOUBLE  = 5;
	
	// Determines which scalar styles are possible and returns the preferred style.
	// lineWidth = -1 => no limit.
	// Pre-conditions: str.length > 0.
	// Post-conditions:
	//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
	//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
	//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
	  var i;
	  var char;
	  var hasLineBreak = false;
	  var hasFoldableLine = false; // only checked if shouldTrackWidth
	  var shouldTrackWidth = lineWidth !== -1;
	  var previousLineBreak = -1; // count the first line correctly
	  var plain = isPlainSafeFirst(string.charCodeAt(0))
	          && !isWhitespace(string.charCodeAt(string.length - 1));
	
	  if (singleLineOnly) {
	    // Case: no block styles.
	    // Check for disallowed characters to rule out plain and single.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	  } else {
	    // Case: block styles permitted.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (char === CHAR_LINE_FEED) {
	        hasLineBreak = true;
	        // Check if any line can be folded.
	        if (shouldTrackWidth) {
	          hasFoldableLine = hasFoldableLine ||
	            // Foldable line = too long, and not more-indented.
	            (i - previousLineBreak - 1 > lineWidth &&
	             string[previousLineBreak + 1] !== ' ');
	          previousLineBreak = i;
	        }
	      } else if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	    // in case the end is missing a \n
	    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
	      (i - previousLineBreak - 1 > lineWidth &&
	       string[previousLineBreak + 1] !== ' '));
	  }
	  // Although every style can represent \n without escaping, prefer block styles
	  // for multiline, since they're more readable and they don't add empty lines.
	  // Also prefer folding a super-long line.
	  if (!hasLineBreak && !hasFoldableLine) {
	    // Strings interpretable as another type have to be quoted;
	    // e.g. the string 'true' vs. the boolean true.
	    return plain && !testAmbiguousType(string)
	      ? STYLE_PLAIN : STYLE_SINGLE;
	  }
	  // Edge case: block indentation indicator can only have one digit.
	  if (string[0] === ' ' && indentPerLevel > 9) {
	    return STYLE_DOUBLE;
	  }
	  // At this point we know block styles are valid.
	  // Prefer literal style unless we want to fold.
	  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
	}
	
	// Note: line breaking/folding is implemented for only the folded style.
	// NB. We drop the last trailing newline (if any) of a returned block scalar
	//  since the dumper adds its own newline. This always works:
	//    • No ending newline => unaffected; already using strip "-" chomping.
	//    • Ending newline    => removed then restored.
	//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
	function writeScalar(state, string, level, iskey) {
	  state.dump = (function () {
	    if (string.length === 0) {
	      return "''";
	    }
	    if (!state.noCompatMode &&
	        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
	      return "'" + string + "'";
	    }
	
	    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
	    // As indentation gets deeper, let the width decrease monotonically
	    // to the lower bound min(state.lineWidth, 40).
	    // Note that this implies
	    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
	    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
	    // This behaves better than a constant minimum width which disallows narrower options,
	    // or an indent threshold which causes the width to suddenly increase.
	    var lineWidth = state.lineWidth === -1
	      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
	
	    // Without knowing if keys are implicit/explicit, assume implicit for safety.
	    var singleLineOnly = iskey
	      // No block styles in flow mode.
	      || (state.flowLevel > -1 && level >= state.flowLevel);
	    function testAmbiguity(string) {
	      return testImplicitResolving(state, string);
	    }
	
	    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
	      case STYLE_PLAIN:
	        return string;
	      case STYLE_SINGLE:
	        return "'" + string.replace(/'/g, "''") + "'";
	      case STYLE_LITERAL:
	        return '|' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(string, indent));
	      case STYLE_FOLDED:
	        return '>' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
	      case STYLE_DOUBLE:
	        return '"' + escapeString(string, lineWidth) + '"';
	      default:
	        throw new YAMLException('impossible error: invalid scalar style');
	    }
	  }());
	}
	
	// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
	function blockHeader(string, indentPerLevel) {
	  var indentIndicator = (string[0] === ' ') ? String(indentPerLevel) : '';
	
	  // note the special case: the string '\n' counts as a "trailing" empty line.
	  var clip =          string[string.length - 1] === '\n';
	  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
	  var chomp = keep ? '+' : (clip ? '' : '-');
	
	  return indentIndicator + chomp + '\n';
	}
	
	// (See the note for writeScalar.)
	function dropEndingNewline(string) {
	  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
	}
	
	// Note: a long line without a suitable break point will exceed the width limit.
	// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
	function foldString(string, width) {
	  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
	  // unless they're before or after a more-indented line, or at the very
	  // beginning or end, in which case $k$ maps to $k$.
	  // Therefore, parse each chunk as newline(s) followed by a content line.
	  var lineRe = /(\n+)([^\n]*)/g;
	
	  // first line (possibly an empty line)
	  var result = (function () {
	    var nextLF = string.indexOf('\n');
	    nextLF = nextLF !== -1 ? nextLF : string.length;
	    lineRe.lastIndex = nextLF;
	    return foldLine(string.slice(0, nextLF), width);
	  }());
	  // If we haven't reached the first content line yet, don't add an extra \n.
	  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
	  var moreIndented;
	
	  // rest of the lines
	  var match;
	  while ((match = lineRe.exec(string))) {
	    var prefix = match[1], line = match[2];
	    moreIndented = (line[0] === ' ');
	    result += prefix
	      + (!prevMoreIndented && !moreIndented && line !== ''
	        ? '\n' : '')
	      + foldLine(line, width);
	    prevMoreIndented = moreIndented;
	  }
	
	  return result;
	}
	
	// Greedy line breaking.
	// Picks the longest line under the limit each time,
	// otherwise settles for the shortest line over the limit.
	// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
	function foldLine(line, width) {
	  if (line === '' || line[0] === ' ') return line;
	
	  // Since a more-indented line adds a \n, breaks can't be followed by a space.
	  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
	  var match;
	  // start is an inclusive index. end, curr, and next are exclusive.
	  var start = 0, end, curr = 0, next = 0;
	  var result = '';
	
	  // Invariants: 0 <= start <= length-1.
	  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
	  // Inside the loop:
	  //   A match implies length >= 2, so curr and next are <= length-2.
	  while ((match = breakRe.exec(line))) {
	    next = match.index;
	    // maintain invariant: curr - start <= width
	    if (next - start > width) {
	      end = (curr > start) ? curr : next; // derive end <= length-2
	      result += '\n' + line.slice(start, end);
	      // skip the space that was output as \n
	      start = end + 1;                    // derive start <= length-1
	    }
	    curr = next;
	  }
	
	  // By the invariants, start <= length-1, so there is something left over.
	  // It is either the whole string or a part starting from non-whitespace.
	  result += '\n';
	  // Insert a break if the remainder is too long and there is a break available.
	  if (line.length - start > width && curr > start) {
	    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
	  } else {
	    result += line.slice(start);
	  }
	
	  return result.slice(1); // drop extra \n joiner
	}
	
	// Escapes a double-quoted string.
	function escapeString(string) {
	  var result = '';
	  var char, nextChar;
	  var escapeSeq;
	
	  for (var i = 0; i < string.length; i++) {
	    char = string.charCodeAt(i);
	    // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
	    if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
	      nextChar = string.charCodeAt(i + 1);
	      if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
	        // Combine the surrogate pair and store it escaped.
	        result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
	        // Advance index one extra since we already used that char here.
	        i++; continue;
	      }
	    }
	    escapeSeq = ESCAPE_SEQUENCES[char];
	    result += !escapeSeq && isPrintable(char)
	      ? string[i]
	      : escapeSeq || encodeHex(char);
	  }
	
	  return result;
	}
	
	function writeFlowSequence(state, level, object) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level, object[index], false, false)) {
	      if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
	      _result += state.dump;
	    }
	  }
	
	  state.tag = _tag;
	  state.dump = '[' + _result + ']';
	}
	
	function writeBlockSequence(state, level, object, compact) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level + 1, object[index], true, true)) {
	      if (!compact || index !== 0) {
	        _result += generateNextLine(state, level);
	      }
	
	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        _result += '-';
	      } else {
	        _result += '- ';
	      }
	
	      _result += state.dump;
	    }
	  }
	
	  state.tag = _tag;
	  state.dump = _result || '[]'; // Empty sequence if no valid values.
	}
	
	function writeFlowMapping(state, level, object) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      pairBuffer;
	
	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = state.condenseFlow ? '"' : '';
	
	    if (index !== 0) pairBuffer += ', ';
	
	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];
	
	    if (!writeNode(state, level, objectKey, false, false)) {
	      continue; // Skip this pair because of invalid key;
	    }
	
	    if (state.dump.length > 1024) pairBuffer += '? ';
	
	    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');
	
	    if (!writeNode(state, level, objectValue, false, false)) {
	      continue; // Skip this pair because of invalid value.
	    }
	
	    pairBuffer += state.dump;
	
	    // Both key and value are valid.
	    _result += pairBuffer;
	  }
	
	  state.tag = _tag;
	  state.dump = '{' + _result + '}';
	}
	
	function writeBlockMapping(state, level, object, compact) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      explicitPair,
	      pairBuffer;
	
	  // Allow sorting keys so that the output file is deterministic
	  if (state.sortKeys === true) {
	    // Default sorting
	    objectKeyList.sort();
	  } else if (typeof state.sortKeys === 'function') {
	    // Custom sort function
	    objectKeyList.sort(state.sortKeys);
	  } else if (state.sortKeys) {
	    // Something is wrong
	    throw new YAMLException('sortKeys must be a boolean or a function');
	  }
	
	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';
	
	    if (!compact || index !== 0) {
	      pairBuffer += generateNextLine(state, level);
	    }
	
	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];
	
	    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
	      continue; // Skip this pair because of invalid key.
	    }
	
	    explicitPair = (state.tag !== null && state.tag !== '?') ||
	                   (state.dump && state.dump.length > 1024);
	
	    if (explicitPair) {
	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        pairBuffer += '?';
	      } else {
	        pairBuffer += '? ';
	      }
	    }
	
	    pairBuffer += state.dump;
	
	    if (explicitPair) {
	      pairBuffer += generateNextLine(state, level);
	    }
	
	    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
	      continue; // Skip this pair because of invalid value.
	    }
	
	    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	      pairBuffer += ':';
	    } else {
	      pairBuffer += ': ';
	    }
	
	    pairBuffer += state.dump;
	
	    // Both key and value are valid.
	    _result += pairBuffer;
	  }
	
	  state.tag = _tag;
	  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
	}
	
	function detectType(state, object, explicit) {
	  var _result, typeList, index, length, type, style;
	
	  typeList = explicit ? state.explicitTypes : state.implicitTypes;
	
	  for (index = 0, length = typeList.length; index < length; index += 1) {
	    type = typeList[index];
	
	    if ((type.instanceOf  || type.predicate) &&
	        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
	        (!type.predicate  || type.predicate(object))) {
	
	      state.tag = explicit ? type.tag : '?';
	
	      if (type.represent) {
	        style = state.styleMap[type.tag] || type.defaultStyle;
	
	        if (_toString.call(type.represent) === '[object Function]') {
	          _result = type.represent(object, style);
	        } else if (_hasOwnProperty.call(type.represent, style)) {
	          _result = type.represent[style](object, style);
	        } else {
	          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
	        }
	
	        state.dump = _result;
	      }
	
	      return true;
	    }
	  }
	
	  return false;
	}
	
	// Serializes `object` and writes it to global `result`.
	// Returns true on success, or false on invalid object.
	//
	function writeNode(state, level, object, block, compact, iskey) {
	  state.tag = null;
	  state.dump = object;
	
	  if (!detectType(state, object, false)) {
	    detectType(state, object, true);
	  }
	
	  var type = _toString.call(state.dump);
	
	  if (block) {
	    block = (state.flowLevel < 0 || state.flowLevel > level);
	  }
	
	  var objectOrArray = type === '[object Object]' || type === '[object Array]',
	      duplicateIndex,
	      duplicate;
	
	  if (objectOrArray) {
	    duplicateIndex = state.duplicates.indexOf(object);
	    duplicate = duplicateIndex !== -1;
	  }
	
	  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
	    compact = false;
	  }
	
	  if (duplicate && state.usedDuplicates[duplicateIndex]) {
	    state.dump = '*ref_' + duplicateIndex;
	  } else {
	    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
	      state.usedDuplicates[duplicateIndex] = true;
	    }
	    if (type === '[object Object]') {
	      if (block && (Object.keys(state.dump).length !== 0)) {
	        writeBlockMapping(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowMapping(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object Array]') {
	      if (block && (state.dump.length !== 0)) {
	        writeBlockSequence(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowSequence(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object String]') {
	      if (state.tag !== '?') {
	        writeScalar(state, state.dump, level, iskey);
	      }
	    } else {
	      if (state.skipInvalid) return false;
	      throw new YAMLException('unacceptable kind of an object to dump ' + type);
	    }
	
	    if (state.tag !== null && state.tag !== '?') {
	      state.dump = '!<' + state.tag + '> ' + state.dump;
	    }
	  }
	
	  return true;
	}
	
	function getDuplicateReferences(object, state) {
	  var objects = [],
	      duplicatesIndexes = [],
	      index,
	      length;
	
	  inspectNode(object, objects, duplicatesIndexes);
	
	  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
	    state.duplicates.push(objects[duplicatesIndexes[index]]);
	  }
	  state.usedDuplicates = new Array(length);
	}
	
	function inspectNode(object, objects, duplicatesIndexes) {
	  var objectKeyList,
	      index,
	      length;
	
	  if (object !== null && typeof object === 'object') {
	    index = objects.indexOf(object);
	    if (index !== -1) {
	      if (duplicatesIndexes.indexOf(index) === -1) {
	        duplicatesIndexes.push(index);
	      }
	    } else {
	      objects.push(object);
	
	      if (Array.isArray(object)) {
	        for (index = 0, length = object.length; index < length; index += 1) {
	          inspectNode(object[index], objects, duplicatesIndexes);
	        }
	      } else {
	        objectKeyList = Object.keys(object);
	
	        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
	        }
	      }
	    }
	  }
	}
	
	function dump(input, options) {
	  options = options || {};
	
	  var state = new State(options);
	
	  if (!state.noRefs) getDuplicateReferences(input, state);
	
	  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';
	
	  return '';
	}
	
	function safeDump(input, options) {
	  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}
	
	module.exports.dump     = dump;
	module.exports.safeDump = safeDump;


/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable max-len,no-use-before-define*/
	
	var common              = __webpack_require__(81);
	var YAMLException       = __webpack_require__(101);
	var Mark                = __webpack_require__(701);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(102);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(145);
	
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	
	var CONTEXT_FLOW_IN   = 1;
	var CONTEXT_FLOW_OUT  = 2;
	var CONTEXT_BLOCK_IN  = 3;
	var CONTEXT_BLOCK_OUT = 4;
	
	
	var CHOMPING_CLIP  = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP  = 3;
	
	
	var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	
	
	function is_EOL(c) {
	  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
	}
	
	function is_WHITE_SPACE(c) {
	  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
	}
	
	function is_WS_OR_EOL(c) {
	  return (c === 0x09/* Tab */) ||
	         (c === 0x20/* Space */) ||
	         (c === 0x0A/* LF */) ||
	         (c === 0x0D/* CR */);
	}
	
	function is_FLOW_INDICATOR(c) {
	  return c === 0x2C/* , */ ||
	         c === 0x5B/* [ */ ||
	         c === 0x5D/* ] */ ||
	         c === 0x7B/* { */ ||
	         c === 0x7D/* } */;
	}
	
	function fromHexCode(c) {
	  var lc;
	
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }
	
	  /*eslint-disable no-bitwise*/
	  lc = c | 0x20;
	
	  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
	    return lc - 0x61 + 10;
	  }
	
	  return -1;
	}
	
	function escapedHexLen(c) {
	  if (c === 0x78/* x */) { return 2; }
	  if (c === 0x75/* u */) { return 4; }
	  if (c === 0x55/* U */) { return 8; }
	  return 0;
	}
	
	function fromDecimalCode(c) {
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }
	
	  return -1;
	}
	
	function simpleEscapeSequence(c) {
	  /* eslint-disable indent */
	  return (c === 0x30/* 0 */) ? '\x00' :
	        (c === 0x61/* a */) ? '\x07' :
	        (c === 0x62/* b */) ? '\x08' :
	        (c === 0x74/* t */) ? '\x09' :
	        (c === 0x09/* Tab */) ? '\x09' :
	        (c === 0x6E/* n */) ? '\x0A' :
	        (c === 0x76/* v */) ? '\x0B' :
	        (c === 0x66/* f */) ? '\x0C' :
	        (c === 0x72/* r */) ? '\x0D' :
	        (c === 0x65/* e */) ? '\x1B' :
	        (c === 0x20/* Space */) ? ' ' :
	        (c === 0x22/* " */) ? '\x22' :
	        (c === 0x2F/* / */) ? '/' :
	        (c === 0x5C/* \ */) ? '\x5C' :
	        (c === 0x4E/* N */) ? '\x85' :
	        (c === 0x5F/* _ */) ? '\xA0' :
	        (c === 0x4C/* L */) ? '\u2028' :
	        (c === 0x50/* P */) ? '\u2029' : '';
	}
	
	function charFromCodepoint(c) {
	  if (c <= 0xFFFF) {
	    return String.fromCharCode(c);
	  }
	  // Encode UTF-16 surrogate pair
	  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
	  return String.fromCharCode(
	    ((c - 0x010000) >> 10) + 0xD800,
	    ((c - 0x010000) & 0x03FF) + 0xDC00
	  );
	}
	
	var simpleEscapeCheck = new Array(256); // integer, for fast access
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
	  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	  simpleEscapeMap[i] = simpleEscapeSequence(i);
	}
	
	
	function State(input, options) {
	  this.input = input;
	
	  this.filename  = options['filename']  || null;
	  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
	  this.onWarning = options['onWarning'] || null;
	  this.legacy    = options['legacy']    || false;
	  this.json      = options['json']      || false;
	  this.listener  = options['listener']  || null;
	
	  this.implicitTypes = this.schema.compiledImplicit;
	  this.typeMap       = this.schema.compiledTypeMap;
	
	  this.length     = input.length;
	  this.position   = 0;
	  this.line       = 0;
	  this.lineStart  = 0;
	  this.lineIndent = 0;
	
	  this.documents = [];
	
	  /*
	  this.version;
	  this.checkLineBreaks;
	  this.tagMap;
	  this.anchorMap;
	  this.tag;
	  this.anchor;
	  this.kind;
	  this.result;*/
	
	}
	
	
	function generateError(state, message) {
	  return new YAMLException(
	    message,
	    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
	}
	
	function throwError(state, message) {
	  throw generateError(state, message);
	}
	
	function throwWarning(state, message) {
	  if (state.onWarning) {
	    state.onWarning.call(null, generateError(state, message));
	  }
	}
	
	
	var directiveHandlers = {
	
	  YAML: function handleYamlDirective(state, name, args) {
	
	    var match, major, minor;
	
	    if (state.version !== null) {
	      throwError(state, 'duplication of %YAML directive');
	    }
	
	    if (args.length !== 1) {
	      throwError(state, 'YAML directive accepts exactly one argument');
	    }
	
	    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
	
	    if (match === null) {
	      throwError(state, 'ill-formed argument of the YAML directive');
	    }
	
	    major = parseInt(match[1], 10);
	    minor = parseInt(match[2], 10);
	
	    if (major !== 1) {
	      throwError(state, 'unacceptable YAML version of the document');
	    }
	
	    state.version = args[0];
	    state.checkLineBreaks = (minor < 2);
	
	    if (minor !== 1 && minor !== 2) {
	      throwWarning(state, 'unsupported YAML version of the document');
	    }
	  },
	
	  TAG: function handleTagDirective(state, name, args) {
	
	    var handle, prefix;
	
	    if (args.length !== 2) {
	      throwError(state, 'TAG directive accepts exactly two arguments');
	    }
	
	    handle = args[0];
	    prefix = args[1];
	
	    if (!PATTERN_TAG_HANDLE.test(handle)) {
	      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
	    }
	
	    if (_hasOwnProperty.call(state.tagMap, handle)) {
	      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
	    }
	
	    if (!PATTERN_TAG_URI.test(prefix)) {
	      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
	    }
	
	    state.tagMap[handle] = prefix;
	  }
	};
	
	
	function captureSegment(state, start, end, checkJson) {
	  var _position, _length, _character, _result;
	
	  if (start < end) {
	    _result = state.input.slice(start, end);
	
	    if (checkJson) {
	      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
	        _character = _result.charCodeAt(_position);
	        if (!(_character === 0x09 ||
	              (0x20 <= _character && _character <= 0x10FFFF))) {
	          throwError(state, 'expected valid JSON character');
	        }
	      }
	    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
	      throwError(state, 'the stream contains non-printable characters');
	    }
	
	    state.result += _result;
	  }
	}
	
	function mergeMappings(state, destination, source, overridableKeys) {
	  var sourceKeys, key, index, quantity;
	
	  if (!common.isObject(source)) {
	    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
	  }
	
	  sourceKeys = Object.keys(source);
	
	  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
	    key = sourceKeys[index];
	
	    if (!_hasOwnProperty.call(destination, key)) {
	      destination[key] = source[key];
	      overridableKeys[key] = true;
	    }
	  }
	}
	
	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
	  var index, quantity;
	
	  keyNode = String(keyNode);
	
	  if (_result === null) {
	    _result = {};
	  }
	
	  if (keyTag === 'tag:yaml.org,2002:merge') {
	    if (Array.isArray(valueNode)) {
	      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
	        mergeMappings(state, _result, valueNode[index], overridableKeys);
	      }
	    } else {
	      mergeMappings(state, _result, valueNode, overridableKeys);
	    }
	  } else {
	    if (!state.json &&
	        !_hasOwnProperty.call(overridableKeys, keyNode) &&
	        _hasOwnProperty.call(_result, keyNode)) {
	      state.line = startLine || state.line;
	      state.position = startPos || state.position;
	      throwError(state, 'duplicated mapping key');
	    }
	    _result[keyNode] = valueNode;
	    delete overridableKeys[keyNode];
	  }
	
	  return _result;
	}
	
	function readLineBreak(state) {
	  var ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x0A/* LF */) {
	    state.position++;
	  } else if (ch === 0x0D/* CR */) {
	    state.position++;
	    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
	      state.position++;
	    }
	  } else {
	    throwError(state, 'a line break is expected');
	  }
	
	  state.line += 1;
	  state.lineStart = state.position;
	}
	
	function skipSeparationSpace(state, allowComments, checkIndent) {
	  var lineBreaks = 0,
	      ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	    while (is_WHITE_SPACE(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    if (allowComments && ch === 0x23/* # */) {
	      do {
	        ch = state.input.charCodeAt(++state.position);
	      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
	    }
	
	    if (is_EOL(ch)) {
	      readLineBreak(state);
	
	      ch = state.input.charCodeAt(state.position);
	      lineBreaks++;
	      state.lineIndent = 0;
	
	      while (ch === 0x20/* Space */) {
	        state.lineIndent++;
	        ch = state.input.charCodeAt(++state.position);
	      }
	    } else {
	      break;
	    }
	  }
	
	  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
	    throwWarning(state, 'deficient indentation');
	  }
	
	  return lineBreaks;
	}
	
	function testDocumentSeparator(state) {
	  var _position = state.position,
	      ch;
	
	  ch = state.input.charCodeAt(_position);
	
	  // Condition state.position === state.lineStart is tested
	  // in parent on each call, for efficiency. No needs to test here again.
	  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
	      ch === state.input.charCodeAt(_position + 1) &&
	      ch === state.input.charCodeAt(_position + 2)) {
	
	    _position += 3;
	
	    ch = state.input.charCodeAt(_position);
	
	    if (ch === 0 || is_WS_OR_EOL(ch)) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	function writeFoldedLines(state, count) {
	  if (count === 1) {
	    state.result += ' ';
	  } else if (count > 1) {
	    state.result += common.repeat('\n', count - 1);
	  }
	}
	
	
	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
	  var preceding,
	      following,
	      captureStart,
	      captureEnd,
	      hasPendingContent,
	      _line,
	      _lineStart,
	      _lineIndent,
	      _kind = state.kind,
	      _result = state.result,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (is_WS_OR_EOL(ch)      ||
	      is_FLOW_INDICATOR(ch) ||
	      ch === 0x23/* # */    ||
	      ch === 0x26/* & */    ||
	      ch === 0x2A/* * */    ||
	      ch === 0x21/* ! */    ||
	      ch === 0x7C/* | */    ||
	      ch === 0x3E/* > */    ||
	      ch === 0x27/* ' */    ||
	      ch === 0x22/* " */    ||
	      ch === 0x25/* % */    ||
	      ch === 0x40/* @ */    ||
	      ch === 0x60/* ` */) {
	    return false;
	  }
	
	  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
	    following = state.input.charCodeAt(state.position + 1);
	
	    if (is_WS_OR_EOL(following) ||
	        withinFlowCollection && is_FLOW_INDICATOR(following)) {
	      return false;
	    }
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  captureStart = captureEnd = state.position;
	  hasPendingContent = false;
	
	  while (ch !== 0) {
	    if (ch === 0x3A/* : */) {
	      following = state.input.charCodeAt(state.position + 1);
	
	      if (is_WS_OR_EOL(following) ||
	          withinFlowCollection && is_FLOW_INDICATOR(following)) {
	        break;
	      }
	
	    } else if (ch === 0x23/* # */) {
	      preceding = state.input.charCodeAt(state.position - 1);
	
	      if (is_WS_OR_EOL(preceding)) {
	        break;
	      }
	
	    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
	               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
	      break;
	
	    } else if (is_EOL(ch)) {
	      _line = state.line;
	      _lineStart = state.lineStart;
	      _lineIndent = state.lineIndent;
	      skipSeparationSpace(state, false, -1);
	
	      if (state.lineIndent >= nodeIndent) {
	        hasPendingContent = true;
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      } else {
	        state.position = captureEnd;
	        state.line = _line;
	        state.lineStart = _lineStart;
	        state.lineIndent = _lineIndent;
	        break;
	      }
	    }
	
	    if (hasPendingContent) {
	      captureSegment(state, captureStart, captureEnd, false);
	      writeFoldedLines(state, state.line - _line);
	      captureStart = captureEnd = state.position;
	      hasPendingContent = false;
	    }
	
	    if (!is_WHITE_SPACE(ch)) {
	      captureEnd = state.position + 1;
	    }
	
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  captureSegment(state, captureStart, captureEnd, false);
	
	  if (state.result) {
	    return true;
	  }
	
	  state.kind = _kind;
	  state.result = _result;
	  return false;
	}
	
	function readSingleQuotedScalar(state, nodeIndent) {
	  var ch,
	      captureStart, captureEnd;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x27/* ' */) {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x27/* ' */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);
	
	      if (ch === 0x27/* ' */) {
	        captureStart = state.position;
	        state.position++;
	        captureEnd = state.position;
	      } else {
	        return true;
	      }
	
	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;
	
	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a single quoted scalar');
	
	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a single quoted scalar');
	}
	
	function readDoubleQuotedScalar(state, nodeIndent) {
	  var captureStart,
	      captureEnd,
	      hexLength,
	      hexResult,
	      tmp,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x22/* " */) {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x22/* " */) {
	      captureSegment(state, captureStart, state.position, true);
	      state.position++;
	      return true;
	
	    } else if (ch === 0x5C/* \ */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);
	
	      if (is_EOL(ch)) {
	        skipSeparationSpace(state, false, nodeIndent);
	
	        // TODO: rework to inline fn with no type cast?
	      } else if (ch < 256 && simpleEscapeCheck[ch]) {
	        state.result += simpleEscapeMap[ch];
	        state.position++;
	
	      } else if ((tmp = escapedHexLen(ch)) > 0) {
	        hexLength = tmp;
	        hexResult = 0;
	
	        for (; hexLength > 0; hexLength--) {
	          ch = state.input.charCodeAt(++state.position);
	
	          if ((tmp = fromHexCode(ch)) >= 0) {
	            hexResult = (hexResult << 4) + tmp;
	
	          } else {
	            throwError(state, 'expected hexadecimal character');
	          }
	        }
	
	        state.result += charFromCodepoint(hexResult);
	
	        state.position++;
	
	      } else {
	        throwError(state, 'unknown escape sequence');
	      }
	
	      captureStart = captureEnd = state.position;
	
	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;
	
	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a double quoted scalar');
	
	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a double quoted scalar');
	}
	
	function readFlowCollection(state, nodeIndent) {
	  var readNext = true,
	      _line,
	      _tag     = state.tag,
	      _result,
	      _anchor  = state.anchor,
	      following,
	      terminator,
	      isPair,
	      isExplicitPair,
	      isMapping,
	      overridableKeys = {},
	      keyNode,
	      keyTag,
	      valueNode,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x5B/* [ */) {
	    terminator = 0x5D;/* ] */
	    isMapping = false;
	    _result = [];
	  } else if (ch === 0x7B/* { */) {
	    terminator = 0x7D;/* } */
	    isMapping = true;
	    _result = {};
	  } else {
	    return false;
	  }
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	
	  while (ch !== 0) {
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (ch === terminator) {
	      state.position++;
	      state.tag = _tag;
	      state.anchor = _anchor;
	      state.kind = isMapping ? 'mapping' : 'sequence';
	      state.result = _result;
	      return true;
	    } else if (!readNext) {
	      throwError(state, 'missed comma between flow collection entries');
	    }
	
	    keyTag = keyNode = valueNode = null;
	    isPair = isExplicitPair = false;
	
	    if (ch === 0x3F/* ? */) {
	      following = state.input.charCodeAt(state.position + 1);
	
	      if (is_WS_OR_EOL(following)) {
	        isPair = isExplicitPair = true;
	        state.position++;
	        skipSeparationSpace(state, true, nodeIndent);
	      }
	    }
	
	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	    keyTag = state.tag;
	    keyNode = state.result;
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
	      isPair = true;
	      ch = state.input.charCodeAt(++state.position);
	      skipSeparationSpace(state, true, nodeIndent);
	      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	      valueNode = state.result;
	    }
	
	    if (isMapping) {
	      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
	    } else if (isPair) {
	      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
	    } else {
	      _result.push(keyNode);
	    }
	
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (ch === 0x2C/* , */) {
	      readNext = true;
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      readNext = false;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a flow collection');
	}
	
	function readBlockScalar(state, nodeIndent) {
	  var captureStart,
	      folding,
	      chomping       = CHOMPING_CLIP,
	      didReadContent = false,
	      detectedIndent = false,
	      textIndent     = nodeIndent,
	      emptyLines     = 0,
	      atMoreIndented = false,
	      tmp,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x7C/* | */) {
	    folding = false;
	  } else if (ch === 0x3E/* > */) {
	    folding = true;
	  } else {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	
	  while (ch !== 0) {
	    ch = state.input.charCodeAt(++state.position);
	
	    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
	      if (CHOMPING_CLIP === chomping) {
	        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
	      } else {
	        throwError(state, 'repeat of a chomping mode identifier');
	      }
	
	    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
	      if (tmp === 0) {
	        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
	      } else if (!detectedIndent) {
	        textIndent = nodeIndent + tmp - 1;
	        detectedIndent = true;
	      } else {
	        throwError(state, 'repeat of an indentation width identifier');
	      }
	
	    } else {
	      break;
	    }
	  }
	
	  if (is_WHITE_SPACE(ch)) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (is_WHITE_SPACE(ch));
	
	    if (ch === 0x23/* # */) {
	      do { ch = state.input.charCodeAt(++state.position); }
	      while (!is_EOL(ch) && (ch !== 0));
	    }
	  }
	
	  while (ch !== 0) {
	    readLineBreak(state);
	    state.lineIndent = 0;
	
	    ch = state.input.charCodeAt(state.position);
	
	    while ((!detectedIndent || state.lineIndent < textIndent) &&
	           (ch === 0x20/* Space */)) {
	      state.lineIndent++;
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    if (!detectedIndent && state.lineIndent > textIndent) {
	      textIndent = state.lineIndent;
	    }
	
	    if (is_EOL(ch)) {
	      emptyLines++;
	      continue;
	    }
	
	    // End of the scalar.
	    if (state.lineIndent < textIndent) {
	
	      // Perform the chomping.
	      if (chomping === CHOMPING_KEEP) {
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	      } else if (chomping === CHOMPING_CLIP) {
	        if (didReadContent) { // i.e. only if the scalar is not empty.
	          state.result += '\n';
	        }
	      }
	
	      // Break this `while` cycle and go to the funciton's epilogue.
	      break;
	    }
	
	    // Folded style: use fancy rules to handle line breaks.
	    if (folding) {
	
	      // Lines starting with white space characters (more-indented lines) are not folded.
	      if (is_WHITE_SPACE(ch)) {
	        atMoreIndented = true;
	        // except for the first content line (cf. Example 8.1)
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	
	      // End of more-indented block.
	      } else if (atMoreIndented) {
	        atMoreIndented = false;
	        state.result += common.repeat('\n', emptyLines + 1);
	
	      // Just one line break - perceive as the same line.
	      } else if (emptyLines === 0) {
	        if (didReadContent) { // i.e. only if we have already read some scalar content.
	          state.result += ' ';
	        }
	
	      // Several line breaks - perceive as different lines.
	      } else {
	        state.result += common.repeat('\n', emptyLines);
	      }
	
	    // Literal style: just add exact number of line breaks between content lines.
	    } else {
	      // Keep all line breaks except the header line break.
	      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	    }
	
	    didReadContent = true;
	    detectedIndent = true;
	    emptyLines = 0;
	    captureStart = state.position;
	
	    while (!is_EOL(ch) && (ch !== 0)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    captureSegment(state, captureStart, state.position, false);
	  }
	
	  return true;
	}
	
	function readBlockSequence(state, nodeIndent) {
	  var _line,
	      _tag      = state.tag,
	      _anchor   = state.anchor,
	      _result   = [],
	      following,
	      detected  = false,
	      ch;
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	
	    if (ch !== 0x2D/* - */) {
	      break;
	    }
	
	    following = state.input.charCodeAt(state.position + 1);
	
	    if (!is_WS_OR_EOL(following)) {
	      break;
	    }
	
	    detected = true;
	    state.position++;
	
	    if (skipSeparationSpace(state, true, -1)) {
	      if (state.lineIndent <= nodeIndent) {
	        _result.push(null);
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      }
	    }
	
	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
	    _result.push(state.result);
	    skipSeparationSpace(state, true, -1);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
	      throwError(state, 'bad indentation of a sequence entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }
	
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'sequence';
	    state.result = _result;
	    return true;
	  }
	  return false;
	}
	
	function readBlockMapping(state, nodeIndent, flowIndent) {
	  var following,
	      allowCompact,
	      _line,
	      _pos,
	      _tag          = state.tag,
	      _anchor       = state.anchor,
	      _result       = {},
	      overridableKeys = {},
	      keyTag        = null,
	      keyNode       = null,
	      valueNode     = null,
	      atExplicitKey = false,
	      detected      = false,
	      ch;
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	    following = state.input.charCodeAt(state.position + 1);
	    _line = state.line; // Save the current line.
	    _pos = state.position;
	
	    //
	    // Explicit notation case. There are two separate blocks:
	    // first for the key (denoted by "?") and second for the value (denoted by ":")
	    //
	    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {
	
	      if (ch === 0x3F/* ? */) {
	        if (atExplicitKey) {
	          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	          keyTag = keyNode = valueNode = null;
	        }
	
	        detected = true;
	        atExplicitKey = true;
	        allowCompact = true;
	
	      } else if (atExplicitKey) {
	        // i.e. 0x3A/* : */ === character after the explicit key.
	        atExplicitKey = false;
	        allowCompact = true;
	
	      } else {
	        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
	      }
	
	      state.position += 1;
	      ch = following;
	
	    //
	    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
	    //
	    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
	
	      if (state.line === _line) {
	        ch = state.input.charCodeAt(state.position);
	
	        while (is_WHITE_SPACE(ch)) {
	          ch = state.input.charCodeAt(++state.position);
	        }
	
	        if (ch === 0x3A/* : */) {
	          ch = state.input.charCodeAt(++state.position);
	
	          if (!is_WS_OR_EOL(ch)) {
	            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
	          }
	
	          if (atExplicitKey) {
	            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	            keyTag = keyNode = valueNode = null;
	          }
	
	          detected = true;
	          atExplicitKey = false;
	          allowCompact = false;
	          keyTag = state.tag;
	          keyNode = state.result;
	
	        } else if (detected) {
	          throwError(state, 'can not read an implicit mapping pair; a colon is missed');
	
	        } else {
	          state.tag = _tag;
	          state.anchor = _anchor;
	          return true; // Keep the result of `composeNode`.
	        }
	
	      } else if (detected) {
	        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
	
	      } else {
	        state.tag = _tag;
	        state.anchor = _anchor;
	        return true; // Keep the result of `composeNode`.
	      }
	
	    } else {
	      break; // Reading is done. Go to the epilogue.
	    }
	
	    //
	    // Common reading code for both explicit and implicit notations.
	    //
	    if (state.line === _line || state.lineIndent > nodeIndent) {
	      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
	        if (atExplicitKey) {
	          keyNode = state.result;
	        } else {
	          valueNode = state.result;
	        }
	      }
	
	      if (!atExplicitKey) {
	        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
	        keyTag = keyNode = valueNode = null;
	      }
	
	      skipSeparationSpace(state, true, -1);
	      ch = state.input.charCodeAt(state.position);
	    }
	
	    if (state.lineIndent > nodeIndent && (ch !== 0)) {
	      throwError(state, 'bad indentation of a mapping entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }
	
	  //
	  // Epilogue.
	  //
	
	  // Special case: last mapping's node contains only the key in explicit notation.
	  if (atExplicitKey) {
	    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	  }
	
	  // Expose the resulting mapping.
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'mapping';
	    state.result = _result;
	  }
	
	  return detected;
	}
	
	function readTagProperty(state) {
	  var _position,
	      isVerbatim = false,
	      isNamed    = false,
	      tagHandle,
	      tagName,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x21/* ! */) return false;
	
	  if (state.tag !== null) {
	    throwError(state, 'duplication of a tag property');
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	
	  if (ch === 0x3C/* < */) {
	    isVerbatim = true;
	    ch = state.input.charCodeAt(++state.position);
	
	  } else if (ch === 0x21/* ! */) {
	    isNamed = true;
	    tagHandle = '!!';
	    ch = state.input.charCodeAt(++state.position);
	
	  } else {
	    tagHandle = '!';
	  }
	
	  _position = state.position;
	
	  if (isVerbatim) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (ch !== 0 && ch !== 0x3E/* > */);
	
	    if (state.position < state.length) {
	      tagName = state.input.slice(_position, state.position);
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      throwError(state, 'unexpected end of the stream within a verbatim tag');
	    }
	  } else {
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	
	      if (ch === 0x21/* ! */) {
	        if (!isNamed) {
	          tagHandle = state.input.slice(_position - 1, state.position + 1);
	
	          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
	            throwError(state, 'named tag handle cannot contain such characters');
	          }
	
	          isNamed = true;
	          _position = state.position + 1;
	        } else {
	          throwError(state, 'tag suffix cannot contain exclamation marks');
	        }
	      }
	
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    tagName = state.input.slice(_position, state.position);
	
	    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
	      throwError(state, 'tag suffix cannot contain flow indicator characters');
	    }
	  }
	
	  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
	    throwError(state, 'tag name cannot contain such characters: ' + tagName);
	  }
	
	  if (isVerbatim) {
	    state.tag = tagName;
	
	  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
	    state.tag = state.tagMap[tagHandle] + tagName;
	
	  } else if (tagHandle === '!') {
	    state.tag = '!' + tagName;
	
	  } else if (tagHandle === '!!') {
	    state.tag = 'tag:yaml.org,2002:' + tagName;
	
	  } else {
	    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
	  }
	
	  return true;
	}
	
	function readAnchorProperty(state) {
	  var _position,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x26/* & */) return false;
	
	  if (state.anchor !== null) {
	    throwError(state, 'duplication of an anchor property');
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;
	
	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  if (state.position === _position) {
	    throwError(state, 'name of an anchor node must contain at least one character');
	  }
	
	  state.anchor = state.input.slice(_position, state.position);
	  return true;
	}
	
	function readAlias(state) {
	  var _position, alias,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x2A/* * */) return false;
	
	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;
	
	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  if (state.position === _position) {
	    throwError(state, 'name of an alias node must contain at least one character');
	  }
	
	  alias = state.input.slice(_position, state.position);
	
	  if (!state.anchorMap.hasOwnProperty(alias)) {
	    throwError(state, 'unidentified alias "' + alias + '"');
	  }
	
	  state.result = state.anchorMap[alias];
	  skipSeparationSpace(state, true, -1);
	  return true;
	}
	
	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
	  var allowBlockStyles,
	      allowBlockScalars,
	      allowBlockCollections,
	      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
	      atNewLine  = false,
	      hasContent = false,
	      typeIndex,
	      typeQuantity,
	      type,
	      flowIndent,
	      blockIndent;
	
	  if (state.listener !== null) {
	    state.listener('open', state);
	  }
	
	  state.tag    = null;
	  state.anchor = null;
	  state.kind   = null;
	  state.result = null;
	
	  allowBlockStyles = allowBlockScalars = allowBlockCollections =
	    CONTEXT_BLOCK_OUT === nodeContext ||
	    CONTEXT_BLOCK_IN  === nodeContext;
	
	  if (allowToSeek) {
	    if (skipSeparationSpace(state, true, -1)) {
	      atNewLine = true;
	
	      if (state.lineIndent > parentIndent) {
	        indentStatus = 1;
	      } else if (state.lineIndent === parentIndent) {
	        indentStatus = 0;
	      } else if (state.lineIndent < parentIndent) {
	        indentStatus = -1;
	      }
	    }
	  }
	
	  if (indentStatus === 1) {
	    while (readTagProperty(state) || readAnchorProperty(state)) {
	      if (skipSeparationSpace(state, true, -1)) {
	        atNewLine = true;
	        allowBlockCollections = allowBlockStyles;
	
	        if (state.lineIndent > parentIndent) {
	          indentStatus = 1;
	        } else if (state.lineIndent === parentIndent) {
	          indentStatus = 0;
	        } else if (state.lineIndent < parentIndent) {
	          indentStatus = -1;
	        }
	      } else {
	        allowBlockCollections = false;
	      }
	    }
	  }
	
	  if (allowBlockCollections) {
	    allowBlockCollections = atNewLine || allowCompact;
	  }
	
	  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
	    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
	      flowIndent = parentIndent;
	    } else {
	      flowIndent = parentIndent + 1;
	    }
	
	    blockIndent = state.position - state.lineStart;
	
	    if (indentStatus === 1) {
	      if (allowBlockCollections &&
	          (readBlockSequence(state, blockIndent) ||
	           readBlockMapping(state, blockIndent, flowIndent)) ||
	          readFlowCollection(state, flowIndent)) {
	        hasContent = true;
	      } else {
	        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
	            readSingleQuotedScalar(state, flowIndent) ||
	            readDoubleQuotedScalar(state, flowIndent)) {
	          hasContent = true;
	
	        } else if (readAlias(state)) {
	          hasContent = true;
	
	          if (state.tag !== null || state.anchor !== null) {
	            throwError(state, 'alias node should not have any properties');
	          }
	
	        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
	          hasContent = true;
	
	          if (state.tag === null) {
	            state.tag = '?';
	          }
	        }
	
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else if (indentStatus === 0) {
	      // Special case: block sequences are allowed to have same indentation level as the parent.
	      // http://www.yaml.org/spec/1.2/spec.html#id2799784
	      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
	    }
	  }
	
	  if (state.tag !== null && state.tag !== '!') {
	    if (state.tag === '?') {
	      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
	        type = state.implicitTypes[typeIndex];
	
	        // Implicit resolving is not allowed for non-scalar types, and '?'
	        // non-specific tag is only assigned to plain scalars. So, it isn't
	        // needed to check for 'kind' conformity.
	
	        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
	          state.result = type.construct(state.result);
	          state.tag = type.tag;
	          if (state.anchor !== null) {
	            state.anchorMap[state.anchor] = state.result;
	          }
	          break;
	        }
	      }
	    } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
	      type = state.typeMap[state.kind || 'fallback'][state.tag];
	
	      if (state.result !== null && type.kind !== state.kind) {
	        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
	      }
	
	      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
	        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
	      } else {
	        state.result = type.construct(state.result);
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else {
	      throwError(state, 'unknown tag !<' + state.tag + '>');
	    }
	  }
	
	  if (state.listener !== null) {
	    state.listener('close', state);
	  }
	  return state.tag !== null ||  state.anchor !== null || hasContent;
	}
	
	function readDocument(state) {
	  var documentStart = state.position,
	      _position,
	      directiveName,
	      directiveArgs,
	      hasDirectives = false,
	      ch;
	
	  state.version = null;
	  state.checkLineBreaks = state.legacy;
	  state.tagMap = {};
	  state.anchorMap = {};
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    skipSeparationSpace(state, true, -1);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
	      break;
	    }
	
	    hasDirectives = true;
	    ch = state.input.charCodeAt(++state.position);
	    _position = state.position;
	
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    directiveName = state.input.slice(_position, state.position);
	    directiveArgs = [];
	
	    if (directiveName.length < 1) {
	      throwError(state, 'directive name must not be less than one character in length');
	    }
	
	    while (ch !== 0) {
	      while (is_WHITE_SPACE(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }
	
	      if (ch === 0x23/* # */) {
	        do { ch = state.input.charCodeAt(++state.position); }
	        while (ch !== 0 && !is_EOL(ch));
	        break;
	      }
	
	      if (is_EOL(ch)) break;
	
	      _position = state.position;
	
	      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }
	
	      directiveArgs.push(state.input.slice(_position, state.position));
	    }
	
	    if (ch !== 0) readLineBreak(state);
	
	    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
	      directiveHandlers[directiveName](state, directiveName, directiveArgs);
	    } else {
	      throwWarning(state, 'unknown document directive "' + directiveName + '"');
	    }
	  }
	
	  skipSeparationSpace(state, true, -1);
	
	  if (state.lineIndent === 0 &&
	      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
	    state.position += 3;
	    skipSeparationSpace(state, true, -1);
	
	  } else if (hasDirectives) {
	    throwError(state, 'directives end mark is expected');
	  }
	
	  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
	  skipSeparationSpace(state, true, -1);
	
	  if (state.checkLineBreaks &&
	      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
	    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
	  }
	
	  state.documents.push(state.result);
	
	  if (state.position === state.lineStart && testDocumentSeparator(state)) {
	
	    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
	      state.position += 3;
	      skipSeparationSpace(state, true, -1);
	    }
	    return;
	  }
	
	  if (state.position < (state.length - 1)) {
	    throwError(state, 'end of the stream or a document separator is expected');
	  } else {
	    return;
	  }
	}
	
	
	function loadDocuments(input, options) {
	  input = String(input);
	  options = options || {};
	
	  if (input.length !== 0) {
	
	    // Add tailing `\n` if not exists
	    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
	        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
	      input += '\n';
	    }
	
	    // Strip BOM
	    if (input.charCodeAt(0) === 0xFEFF) {
	      input = input.slice(1);
	    }
	  }
	
	  var state = new State(input, options);
	
	  // Use 0 as string terminator. That significantly simplifies bounds check.
	  state.input += '\0';
	
	  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
	    state.lineIndent += 1;
	    state.position += 1;
	  }
	
	  while (state.position < (state.length - 1)) {
	    readDocument(state);
	  }
	
	  return state.documents;
	}
	
	
	function loadAll(input, iterator, options) {
	  var documents = loadDocuments(input, options), index, length;
	
	  if (typeof iterator !== 'function') {
	    return documents;
	  }
	
	  for (index = 0, length = documents.length; index < length; index += 1) {
	    iterator(documents[index]);
	  }
	}
	
	
	function load(input, options) {
	  var documents = loadDocuments(input, options);
	
	  if (documents.length === 0) {
	    /*eslint-disable no-undefined*/
	    return undefined;
	  } else if (documents.length === 1) {
	    return documents[0];
	  }
	  throw new YAMLException('expected a single document in the stream, but found more');
	}
	
	
	function safeLoadAll(input, output, options) {
	  if (typeof output === 'function') {
	    loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	  } else {
	    return loadAll(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	  }
	}
	
	
	function safeLoad(input, options) {
	  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}
	
	
	module.exports.loadAll     = loadAll;
	module.exports.load        = load;
	module.exports.safeLoadAll = safeLoadAll;
	module.exports.safeLoad    = safeLoad;


/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var common = __webpack_require__(81);
	
	
	function Mark(name, buffer, position, line, column) {
	  this.name     = name;
	  this.buffer   = buffer;
	  this.position = position;
	  this.line     = line;
	  this.column   = column;
	}
	
	
	Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
	  var head, start, tail, end, snippet;
	
	  if (!this.buffer) return null;
	
	  indent = indent || 4;
	  maxLength = maxLength || 75;
	
	  head = '';
	  start = this.position;
	
	  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
	    start -= 1;
	    if (this.position - start > (maxLength / 2 - 1)) {
	      head = ' ... ';
	      start += 5;
	      break;
	    }
	  }
	
	  tail = '';
	  end = this.position;
	
	  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
	    end += 1;
	    if (end - this.position > (maxLength / 2 - 1)) {
	      tail = ' ... ';
	      end -= 5;
	      break;
	    }
	  }
	
	  snippet = this.buffer.slice(start, end);
	
	  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
	         common.repeat(' ', indent + this.position - start + head.length) + '^';
	};
	
	
	Mark.prototype.toString = function toString(compact) {
	  var snippet, where = '';
	
	  if (this.name) {
	    where += 'in "' + this.name + '" ';
	  }
	
	  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
	
	  if (!compact) {
	    snippet = this.getSnippet();
	
	    if (snippet) {
	      where += ':\n' + snippet;
	    }
	  }
	
	  return where;
	};
	
	
	module.exports = Mark;


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

	var require;'use strict';
	
	/*eslint-disable no-bitwise*/
	
	var NodeBuffer;
	
	try {
	  // A trick for browserified version, to not include `Buffer` shim
	  var _require = require;
	  NodeBuffer = __webpack_require__(193).Buffer;
	} catch (__) {}
	
	var Type       = __webpack_require__(11);
	
	
	// [ 64, 65, 66 ] -> [ padding, CR, LF ]
	var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
	
	
	function resolveYamlBinary(data) {
	  if (data === null) return false;
	
	  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
	
	  // Convert one by one.
	  for (idx = 0; idx < max; idx++) {
	    code = map.indexOf(data.charAt(idx));
	
	    // Skip CR/LF
	    if (code > 64) continue;
	
	    // Fail on illegal characters
	    if (code < 0) return false;
	
	    bitlen += 6;
	  }
	
	  // If there are any bits left, source was corrupted
	  return (bitlen % 8) === 0;
	}
	
	function constructYamlBinary(data) {
	  var idx, tailbits,
	      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
	      max = input.length,
	      map = BASE64_MAP,
	      bits = 0,
	      result = [];
	
	  // Collect by 6*4 bits (3 bytes)
	
	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 4 === 0) && idx) {
	      result.push((bits >> 16) & 0xFF);
	      result.push((bits >> 8) & 0xFF);
	      result.push(bits & 0xFF);
	    }
	
	    bits = (bits << 6) | map.indexOf(input.charAt(idx));
	  }
	
	  // Dump tail
	
	  tailbits = (max % 4) * 6;
	
	  if (tailbits === 0) {
	    result.push((bits >> 16) & 0xFF);
	    result.push((bits >> 8) & 0xFF);
	    result.push(bits & 0xFF);
	  } else if (tailbits === 18) {
	    result.push((bits >> 10) & 0xFF);
	    result.push((bits >> 2) & 0xFF);
	  } else if (tailbits === 12) {
	    result.push((bits >> 4) & 0xFF);
	  }
	
	  // Wrap into Buffer for NodeJS and leave Array for browser
	  if (NodeBuffer) {
	    // Support node 6.+ Buffer API when available
	    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
	  }
	
	  return result;
	}
	
	function representYamlBinary(object /*, style*/) {
	  var result = '', bits = 0, idx, tail,
	      max = object.length,
	      map = BASE64_MAP;
	
	  // Convert every three bytes to 4 ASCII characters.
	
	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 3 === 0) && idx) {
	      result += map[(bits >> 18) & 0x3F];
	      result += map[(bits >> 12) & 0x3F];
	      result += map[(bits >> 6) & 0x3F];
	      result += map[bits & 0x3F];
	    }
	
	    bits = (bits << 8) + object[idx];
	  }
	
	  // Dump tail
	
	  tail = max % 3;
	
	  if (tail === 0) {
	    result += map[(bits >> 18) & 0x3F];
	    result += map[(bits >> 12) & 0x3F];
	    result += map[(bits >> 6) & 0x3F];
	    result += map[bits & 0x3F];
	  } else if (tail === 2) {
	    result += map[(bits >> 10) & 0x3F];
	    result += map[(bits >> 4) & 0x3F];
	    result += map[(bits << 2) & 0x3F];
	    result += map[64];
	  } else if (tail === 1) {
	    result += map[(bits >> 2) & 0x3F];
	    result += map[(bits << 4) & 0x3F];
	    result += map[64];
	    result += map[64];
	  }
	
	  return result;
	}
	
	function isBinary(object) {
	  return NodeBuffer && NodeBuffer.isBuffer(object);
	}
	
	module.exports = new Type('tag:yaml.org,2002:binary', {
	  kind: 'scalar',
	  resolve: resolveYamlBinary,
	  construct: constructYamlBinary,
	  predicate: isBinary,
	  represent: representYamlBinary
	});


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	function resolveYamlBoolean(data) {
	  if (data === null) return false;
	
	  var max = data.length;
	
	  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
	         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
	}
	
	function constructYamlBoolean(data) {
	  return data === 'true' ||
	         data === 'True' ||
	         data === 'TRUE';
	}
	
	function isBoolean(object) {
	  return Object.prototype.toString.call(object) === '[object Boolean]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:bool', {
	  kind: 'scalar',
	  resolve: resolveYamlBoolean,
	  construct: constructYamlBoolean,
	  predicate: isBoolean,
	  represent: {
	    lowercase: function (object) { return object ? 'true' : 'false'; },
	    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
	    camelcase: function (object) { return object ? 'True' : 'False'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var common = __webpack_require__(81);
	var Type   = __webpack_require__(11);
	
	var YAML_FLOAT_PATTERN = new RegExp(
	  // 2.5e4, 2.5 and integers
	  '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
	  // .2e4, .2
	  // special case, seems not from spec
	  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
	  // 20:59
	  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
	  // .inf
	  '|[-+]?\\.(?:inf|Inf|INF)' +
	  // .nan
	  '|\\.(?:nan|NaN|NAN))$');
	
	function resolveYamlFloat(data) {
	  if (data === null) return false;
	
	  if (!YAML_FLOAT_PATTERN.test(data) ||
	      // Quick hack to not allow integers end with `_`
	      // Probably should update regexp & check speed
	      data[data.length - 1] === '_') {
	    return false;
	  }
	
	  return true;
	}
	
	function constructYamlFloat(data) {
	  var value, sign, base, digits;
	
	  value  = data.replace(/_/g, '').toLowerCase();
	  sign   = value[0] === '-' ? -1 : 1;
	  digits = [];
	
	  if ('+-'.indexOf(value[0]) >= 0) {
	    value = value.slice(1);
	  }
	
	  if (value === '.inf') {
	    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	
	  } else if (value === '.nan') {
	    return NaN;
	
	  } else if (value.indexOf(':') >= 0) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseFloat(v, 10));
	    });
	
	    value = 0.0;
	    base = 1;
	
	    digits.forEach(function (d) {
	      value += d * base;
	      base *= 60;
	    });
	
	    return sign * value;
	
	  }
	  return sign * parseFloat(value, 10);
	}
	
	
	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
	
	function representYamlFloat(object, style) {
	  var res;
	
	  if (isNaN(object)) {
	    switch (style) {
	      case 'lowercase': return '.nan';
	      case 'uppercase': return '.NAN';
	      case 'camelcase': return '.NaN';
	    }
	  } else if (Number.POSITIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '.inf';
	      case 'uppercase': return '.INF';
	      case 'camelcase': return '.Inf';
	    }
	  } else if (Number.NEGATIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '-.inf';
	      case 'uppercase': return '-.INF';
	      case 'camelcase': return '-.Inf';
	    }
	  } else if (common.isNegativeZero(object)) {
	    return '-0.0';
	  }
	
	  res = object.toString(10);
	
	  // JS stringifier can build scientific format without dots: 5e-100,
	  // while YAML requres dot: 5.e-100. Fix it with simple hack
	
	  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
	}
	
	function isFloat(object) {
	  return (Object.prototype.toString.call(object) === '[object Number]') &&
	         (object % 1 !== 0 || common.isNegativeZero(object));
	}
	
	module.exports = new Type('tag:yaml.org,2002:float', {
	  kind: 'scalar',
	  resolve: resolveYamlFloat,
	  construct: constructYamlFloat,
	  predicate: isFloat,
	  represent: representYamlFloat,
	  defaultStyle: 'lowercase'
	});


/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var common = __webpack_require__(81);
	var Type   = __webpack_require__(11);
	
	function isHexCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
	         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
	         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
	}
	
	function isOctCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
	}
	
	function isDecCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
	}
	
	function resolveYamlInteger(data) {
	  if (data === null) return false;
	
	  var max = data.length,
	      index = 0,
	      hasDigits = false,
	      ch;
	
	  if (!max) return false;
	
	  ch = data[index];
	
	  // sign
	  if (ch === '-' || ch === '+') {
	    ch = data[++index];
	  }
	
	  if (ch === '0') {
	    // 0
	    if (index + 1 === max) return true;
	    ch = data[++index];
	
	    // base 2, base 8, base 16
	
	    if (ch === 'b') {
	      // base 2
	      index++;
	
	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (ch !== '0' && ch !== '1') return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }
	
	
	    if (ch === 'x') {
	      // base 16
	      index++;
	
	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (!isHexCode(data.charCodeAt(index))) return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }
	
	    // base 8
	    for (; index < max; index++) {
	      ch = data[index];
	      if (ch === '_') continue;
	      if (!isOctCode(data.charCodeAt(index))) return false;
	      hasDigits = true;
	    }
	    return hasDigits && ch !== '_';
	  }
	
	  // base 10 (except 0) or base 60
	
	  // value should not start with `_`;
	  if (ch === '_') return false;
	
	  for (; index < max; index++) {
	    ch = data[index];
	    if (ch === '_') continue;
	    if (ch === ':') break;
	    if (!isDecCode(data.charCodeAt(index))) {
	      return false;
	    }
	    hasDigits = true;
	  }
	
	  // Should have digits and should not end with `_`
	  if (!hasDigits || ch === '_') return false;
	
	  // if !base60 - done;
	  if (ch !== ':') return true;
	
	  // base60 almost not used, no needs to optimize
	  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
	}
	
	function constructYamlInteger(data) {
	  var value = data, sign = 1, ch, base, digits = [];
	
	  if (value.indexOf('_') !== -1) {
	    value = value.replace(/_/g, '');
	  }
	
	  ch = value[0];
	
	  if (ch === '-' || ch === '+') {
	    if (ch === '-') sign = -1;
	    value = value.slice(1);
	    ch = value[0];
	  }
	
	  if (value === '0') return 0;
	
	  if (ch === '0') {
	    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
	    if (value[1] === 'x') return sign * parseInt(value, 16);
	    return sign * parseInt(value, 8);
	  }
	
	  if (value.indexOf(':') !== -1) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseInt(v, 10));
	    });
	
	    value = 0;
	    base = 1;
	
	    digits.forEach(function (d) {
	      value += (d * base);
	      base *= 60;
	    });
	
	    return sign * value;
	
	  }
	
	  return sign * parseInt(value, 10);
	}
	
	function isInteger(object) {
	  return (Object.prototype.toString.call(object)) === '[object Number]' &&
	         (object % 1 === 0 && !common.isNegativeZero(object));
	}
	
	module.exports = new Type('tag:yaml.org,2002:int', {
	  kind: 'scalar',
	  resolve: resolveYamlInteger,
	  construct: constructYamlInteger,
	  predicate: isInteger,
	  represent: {
	    binary:      function (object) { return '0b' + object.toString(2); },
	    octal:       function (object) { return '0'  + object.toString(8); },
	    decimal:     function (object) { return        object.toString(10); },
	    hexadecimal: function (object) { return '0x' + object.toString(16).toUpperCase(); }
	  },
	  defaultStyle: 'decimal',
	  styleAliases: {
	    binary:      [ 2,  'bin' ],
	    octal:       [ 8,  'oct' ],
	    decimal:     [ 10, 'dec' ],
	    hexadecimal: [ 16, 'hex' ]
	  }
	});


/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

	var require;'use strict';
	
	var esprima;
	
	// Browserified version does not have esprima
	//
	// 1. For node.js just require module as deps
	// 2. For browser try to require mudule via external AMD system.
	//    If not found - try to fallback to window.esprima. If not
	//    found too - then fail to parse.
	//
	try {
	  // workaround to exclude package from browserify list.
	  var _require = require;
	  esprima = __webpack_require__(656);
	} catch (_) {
	  /*global window */
	  if (typeof window !== 'undefined') esprima = window.esprima;
	}
	
	var Type = __webpack_require__(11);
	
	function resolveJavascriptFunction(data) {
	  if (data === null) return false;
	
	  try {
	    var source = '(' + data + ')',
	        ast    = esprima.parse(source, { range: true });
	
	    if (ast.type                    !== 'Program'             ||
	        ast.body.length             !== 1                     ||
	        ast.body[0].type            !== 'ExpressionStatement' ||
	        ast.body[0].expression.type !== 'FunctionExpression') {
	      return false;
	    }
	
	    return true;
	  } catch (err) {
	    return false;
	  }
	}
	
	function constructJavascriptFunction(data) {
	  /*jslint evil:true*/
	
	  var source = '(' + data + ')',
	      ast    = esprima.parse(source, { range: true }),
	      params = [],
	      body;
	
	  if (ast.type                    !== 'Program'             ||
	      ast.body.length             !== 1                     ||
	      ast.body[0].type            !== 'ExpressionStatement' ||
	      ast.body[0].expression.type !== 'FunctionExpression') {
	    throw new Error('Failed to resolve function');
	  }
	
	  ast.body[0].expression.params.forEach(function (param) {
	    params.push(param.name);
	  });
	
	  body = ast.body[0].expression.body.range;
	
	  // Esprima's ranges include the first '{' and the last '}' characters on
	  // function expressions. So cut them out.
	  /*eslint-disable no-new-func*/
	  return new Function(params, source.slice(body[0] + 1, body[1] - 1));
	}
	
	function representJavascriptFunction(object /*, style*/) {
	  return object.toString();
	}
	
	function isFunction(object) {
	  return Object.prototype.toString.call(object) === '[object Function]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/function', {
	  kind: 'scalar',
	  resolve: resolveJavascriptFunction,
	  construct: constructJavascriptFunction,
	  predicate: isFunction,
	  represent: representJavascriptFunction
	});


/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	function resolveJavascriptRegExp(data) {
	  if (data === null) return false;
	  if (data.length === 0) return false;
	
	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';
	
	  // if regexp starts with '/' it can have modifiers and must be properly closed
	  // `/foo/gim` - modifiers tail can be maximum 3 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];
	
	    if (modifiers.length > 3) return false;
	    // if expression starts with /, is should be properly terminated
	    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
	  }
	
	  return true;
	}
	
	function constructJavascriptRegExp(data) {
	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';
	
	  // `/foo/gim` - tail can be maximum 4 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];
	    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
	  }
	
	  return new RegExp(regexp, modifiers);
	}
	
	function representJavascriptRegExp(object /*, style*/) {
	  var result = '/' + object.source + '/';
	
	  if (object.global) result += 'g';
	  if (object.multiline) result += 'm';
	  if (object.ignoreCase) result += 'i';
	
	  return result;
	}
	
	function isRegExp(object) {
	  return Object.prototype.toString.call(object) === '[object RegExp]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/regexp', {
	  kind: 'scalar',
	  resolve: resolveJavascriptRegExp,
	  construct: constructJavascriptRegExp,
	  predicate: isRegExp,
	  represent: representJavascriptRegExp
	});


/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	function resolveJavascriptUndefined() {
	  return true;
	}
	
	function constructJavascriptUndefined() {
	  /*eslint-disable no-undefined*/
	  return undefined;
	}
	
	function representJavascriptUndefined() {
	  return '';
	}
	
	function isUndefined(object) {
	  return typeof object === 'undefined';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/undefined', {
	  kind: 'scalar',
	  resolve: resolveJavascriptUndefined,
	  construct: constructJavascriptUndefined,
	  predicate: isUndefined,
	  represent: representJavascriptUndefined
	});


/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	module.exports = new Type('tag:yaml.org,2002:map', {
	  kind: 'mapping',
	  construct: function (data) { return data !== null ? data : {}; }
	});


/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	function resolveYamlMerge(data) {
	  return data === '<<' || data === null;
	}
	
	module.exports = new Type('tag:yaml.org,2002:merge', {
	  kind: 'scalar',
	  resolve: resolveYamlMerge
	});


/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	function resolveYamlNull(data) {
	  if (data === null) return true;
	
	  var max = data.length;
	
	  return (max === 1 && data === '~') ||
	         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
	}
	
	function constructYamlNull() {
	  return null;
	}
	
	function isNull(object) {
	  return object === null;
	}
	
	module.exports = new Type('tag:yaml.org,2002:null', {
	  kind: 'scalar',
	  resolve: resolveYamlNull,
	  construct: constructYamlNull,
	  predicate: isNull,
	  represent: {
	    canonical: function () { return '~';    },
	    lowercase: function () { return 'null'; },
	    uppercase: function () { return 'NULL'; },
	    camelcase: function () { return 'Null'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _toString       = Object.prototype.toString;
	
	function resolveYamlOmap(data) {
	  if (data === null) return true;
	
	  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
	      object = data;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	    pairHasKey = false;
	
	    if (_toString.call(pair) !== '[object Object]') return false;
	
	    for (pairKey in pair) {
	      if (_hasOwnProperty.call(pair, pairKey)) {
	        if (!pairHasKey) pairHasKey = true;
	        else return false;
	      }
	    }
	
	    if (!pairHasKey) return false;
	
	    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
	    else return false;
	  }
	
	  return true;
	}
	
	function constructYamlOmap(data) {
	  return data !== null ? data : [];
	}
	
	module.exports = new Type('tag:yaml.org,2002:omap', {
	  kind: 'sequence',
	  resolve: resolveYamlOmap,
	  construct: constructYamlOmap
	});


/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	var _toString = Object.prototype.toString;
	
	function resolveYamlPairs(data) {
	  if (data === null) return true;
	
	  var index, length, pair, keys, result,
	      object = data;
	
	  result = new Array(object.length);
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	
	    if (_toString.call(pair) !== '[object Object]') return false;
	
	    keys = Object.keys(pair);
	
	    if (keys.length !== 1) return false;
	
	    result[index] = [ keys[0], pair[keys[0]] ];
	  }
	
	  return true;
	}
	
	function constructYamlPairs(data) {
	  if (data === null) return [];
	
	  var index, length, pair, keys, result,
	      object = data;
	
	  result = new Array(object.length);
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	
	    keys = Object.keys(pair);
	
	    result[index] = [ keys[0], pair[keys[0]] ];
	  }
	
	  return result;
	}
	
	module.exports = new Type('tag:yaml.org,2002:pairs', {
	  kind: 'sequence',
	  resolve: resolveYamlPairs,
	  construct: constructYamlPairs
	});


/***/ }),

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	module.exports = new Type('tag:yaml.org,2002:seq', {
	  kind: 'sequence',
	  construct: function (data) { return data !== null ? data : []; }
	});


/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function resolveYamlSet(data) {
	  if (data === null) return true;
	
	  var key, object = data;
	
	  for (key in object) {
	    if (_hasOwnProperty.call(object, key)) {
	      if (object[key] !== null) return false;
	    }
	  }
	
	  return true;
	}
	
	function constructYamlSet(data) {
	  return data !== null ? data : {};
	}
	
	module.exports = new Type('tag:yaml.org,2002:set', {
	  kind: 'mapping',
	  resolve: resolveYamlSet,
	  construct: constructYamlSet
	});


/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	module.exports = new Type('tag:yaml.org,2002:str', {
	  kind: 'scalar',
	  construct: function (data) { return data !== null ? data : ''; }
	});


/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(11);
	
	var YAML_DATE_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9])'                    + // [2] month
	  '-([0-9][0-9])$');                   // [3] day
	
	var YAML_TIMESTAMP_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9]?)'                   + // [2] month
	  '-([0-9][0-9]?)'                   + // [3] day
	  '(?:[Tt]|[ \\t]+)'                 + // ...
	  '([0-9][0-9]?)'                    + // [4] hour
	  ':([0-9][0-9])'                    + // [5] minute
	  ':([0-9][0-9])'                    + // [6] second
	  '(?:\\.([0-9]*))?'                 + // [7] fraction
	  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
	  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute
	
	function resolveYamlTimestamp(data) {
	  if (data === null) return false;
	  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
	  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
	  return false;
	}
	
	function constructYamlTimestamp(data) {
	  var match, year, month, day, hour, minute, second, fraction = 0,
	      delta = null, tz_hour, tz_minute, date;
	
	  match = YAML_DATE_REGEXP.exec(data);
	  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
	
	  if (match === null) throw new Error('Date resolve error');
	
	  // match: [1] year [2] month [3] day
	
	  year = +(match[1]);
	  month = +(match[2]) - 1; // JS month starts with 0
	  day = +(match[3]);
	
	  if (!match[4]) { // no hour
	    return new Date(Date.UTC(year, month, day));
	  }
	
	  // match: [4] hour [5] minute [6] second [7] fraction
	
	  hour = +(match[4]);
	  minute = +(match[5]);
	  second = +(match[6]);
	
	  if (match[7]) {
	    fraction = match[7].slice(0, 3);
	    while (fraction.length < 3) { // milli-seconds
	      fraction += '0';
	    }
	    fraction = +fraction;
	  }
	
	  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
	
	  if (match[9]) {
	    tz_hour = +(match[10]);
	    tz_minute = +(match[11] || 0);
	    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
	    if (match[9] === '-') delta = -delta;
	  }
	
	  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
	
	  if (delta) date.setTime(date.getTime() - delta);
	
	  return date;
	}
	
	function representYamlTimestamp(object /*, style*/) {
	  return object.toISOString();
	}
	
	module.exports = new Type('tag:yaml.org,2002:timestamp', {
	  kind: 'scalar',
	  resolve: resolveYamlTimestamp,
	  construct: constructYamlTimestamp,
	  instanceOf: Date,
	  represent: representYamlTimestamp
	});


/***/ }),

/***/ 727:
/***/ (function(module, exports) {

	/**
	 * A specialized version of `baseAggregator` for arrays.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} setter The function to set `accumulator` values.
	 * @param {Function} iteratee The iteratee to transform keys.
	 * @param {Object} accumulator The initial aggregated object.
	 * @returns {Function} Returns `accumulator`.
	 */
	function arrayAggregator(array, setter, iteratee, accumulator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    setter(accumulator, value, iteratee(value), array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayAggregator;


/***/ }),

/***/ 728:
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = arrayEvery;


/***/ }),

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(351);
	
	/**
	 * Gets the size of an ASCII `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	var asciiSize = baseProperty('length');
	
	module.exports = asciiSize;


/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(104);
	
	/**
	 * Aggregates elements of `collection` on `accumulator` with keys transformed
	 * by `iteratee` and values set by `setter`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} setter The function to set `accumulator` values.
	 * @param {Function} iteratee The iteratee to transform keys.
	 * @param {Object} accumulator The initial aggregated object.
	 * @returns {Function} Returns `accumulator`.
	 */
	function baseAggregator(collection, setter, iteratee, accumulator) {
	  baseEach(collection, function(value, key, collection) {
	    setter(accumulator, value, iteratee(value), collection);
	  });
	  return accumulator;
	}
	
	module.exports = baseAggregator;


/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(104);
	
	/**
	 * The base implementation of `_.every` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}
	
	module.exports = baseEvery;


/***/ }),

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

	var asciiSize = __webpack_require__(730),
	    hasUnicode = __webpack_require__(109),
	    unicodeSize = __webpack_require__(827);
	
	/**
	 * Gets the number of symbols in `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the string size.
	 */
	function stringSize(string) {
	  return hasUnicode(string)
	    ? unicodeSize(string)
	    : asciiSize(string);
	}
	
	module.exports = stringSize;


/***/ }),

/***/ 827:
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Gets the size of a Unicode `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	function unicodeSize(string) {
	  var result = reUnicode.lastIndex = 0;
	  while (reUnicode.test(string)) {
	    ++result;
	  }
	  return result;
	}
	
	module.exports = unicodeSize;


/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(84),
	    createAggregator = __webpack_require__(357);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an object composed of keys generated from the results of running
	 * each element of `collection` thru `iteratee`. The corresponding value of
	 * each key is the number of times the key was returned by `iteratee`. The
	 * iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
	 * @returns {Object} Returns the composed aggregate object.
	 * @example
	 *
	 * _.countBy([6.1, 4.2, 6.3], Math.floor);
	 * // => { '4': 1, '6': 2 }
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.countBy(['one', 'two', 'three'], 'length');
	 * // => { '3': 2, '5': 1 }
	 */
	var countBy = createAggregator(function(result, value, key) {
	  if (hasOwnProperty.call(result, key)) {
	    ++result[key];
	  } else {
	    baseAssignValue(result, key, 1);
	  }
	});
	
	module.exports = countBy;


/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(27),
	    now = __webpack_require__(872),
	    toNumber = __webpack_require__(388);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(243);


/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(728),
	    baseEvery = __webpack_require__(735),
	    baseIteratee = __webpack_require__(37),
	    isArray = __webpack_require__(5),
	    isIterateeCall = __webpack_require__(238);
	
	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * Iteration is stopped once `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * **Note:** This method returns `true` for
	 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	 * elements of empty collections.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': false },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.every(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, guard) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}
	
	module.exports = every;


/***/ }),

/***/ 860:
/***/ (function(module, exports) {

	/**
	 * The inverse of `_.toPairs`; this method returns an object composed
	 * from key-value `pairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} pairs The key-value pairs.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.fromPairs([['a', 1], ['b', 2]]);
	 * // => { 'a': 1, 'b': 2 }
	 */
	function fromPairs(pairs) {
	  var index = -1,
	      length = pairs == null ? 0 : pairs.length,
	      result = {};
	
	  while (++index < length) {
	    var pair = pairs[index];
	    result[pair[0]] = pair[1];
	  }
	  return result;
	}
	
	module.exports = fromPairs;


/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(84),
	    createAggregator = __webpack_require__(357);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an object composed of keys generated from the results of running
	 * each element of `collection` thru `iteratee`. The order of grouped values
	 * is determined by the order they occur in `collection`. The corresponding
	 * value of each key is an array of elements responsible for generating the
	 * key. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
	 * @returns {Object} Returns the composed aggregate object.
	 * @example
	 *
	 * _.groupBy([6.1, 4.2, 6.3], Math.floor);
	 * // => { '4': [4.2], '6': [6.1, 6.3] }
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.groupBy(['one', 'two', 'three'], 'length');
	 * // => { '3': ['one', 'two'], '5': ['three'] }
	 */
	var groupBy = createAggregator(function(result, value, key) {
	  if (hasOwnProperty.call(result, key)) {
	    result[key].push(value);
	  } else {
	    baseAssignValue(result, key, [value]);
	  }
	});
	
	module.exports = groupBy;


/***/ }),

/***/ 871:
/***/ (function(module, exports) {

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that negates the result of the predicate `func`. The
	 * `func` predicate is invoked with the `this` binding and arguments of the
	 * created function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} predicate The predicate to negate.
	 * @returns {Function} Returns the new negated function.
	 * @example
	 *
	 * function isEven(n) {
	 *   return n % 2 == 0;
	 * }
	 *
	 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	 * // => [1, 3, 5]
	 */
	function negate(predicate) {
	  if (typeof predicate != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  return function() {
	    var args = arguments;
	    switch (args.length) {
	      case 0: return !predicate.call(this);
	      case 1: return !predicate.call(this, args[0]);
	      case 2: return !predicate.call(this, args[0], args[1]);
	      case 3: return !predicate.call(this, args[0], args[1], args[2]);
	    }
	    return !predicate.apply(this, args);
	  };
	}
	
	module.exports = negate;


/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	module.exports = now;


/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(57),
	    createWrap = __webpack_require__(108),
	    getHolder = __webpack_require__(153),
	    replaceHolders = __webpack_require__(111);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with `partials` prepended to the
	 * arguments it receives. This method is like `_.bind` except it does **not**
	 * alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.2.0
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // Partially applied with placeholders.
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partial));
	  return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
	});
	
	// Assign default placeholders.
	partial.placeholder = {};
	
	module.exports = partial;


/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(221),
	    baseFilter = __webpack_require__(346),
	    baseIteratee = __webpack_require__(37),
	    isArray = __webpack_require__(5),
	    negate = __webpack_require__(871);
	
	/**
	 * The opposite of `_.filter`; this method returns the elements of `collection`
	 * that `predicate` does **not** return truthy for.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.filter
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': false },
	 *   { 'user': 'fred',   'age': 40, 'active': true }
	 * ];
	 *
	 * _.reject(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.reject(users, { 'age': 40, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.reject(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.reject(users, 'active');
	 * // => objects for ['barney']
	 */
	function reject(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, negate(baseIteratee(predicate, 3)));
	}
	
	module.exports = reject;


/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(106),
	    castSlice = __webpack_require__(233),
	    hasUnicode = __webpack_require__(109),
	    isObject = __webpack_require__(27),
	    isRegExp = __webpack_require__(383),
	    stringSize = __webpack_require__(826),
	    stringToArray = __webpack_require__(158),
	    toInteger = __webpack_require__(61),
	    toString = __webpack_require__(39);
	
	/** Used as default options for `_.truncate`. */
	var DEFAULT_TRUNC_LENGTH = 30,
	    DEFAULT_TRUNC_OMISSION = '...';
	
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Truncates `string` if it's longer than the given maximum string length.
	 * The last characters of the truncated string are replaced with the omission
	 * string which defaults to "...".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to truncate.
	 * @param {Object} [options={}] The options object.
	 * @param {number} [options.length=30] The maximum string length.
	 * @param {string} [options.omission='...'] The string to indicate text is omitted.
	 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	 * @returns {string} Returns the truncated string.
	 * @example
	 *
	 * _.truncate('hi-diddly-ho there, neighborino');
	 * // => 'hi-diddly-ho there, neighbo...'
	 *
	 * _.truncate('hi-diddly-ho there, neighborino', {
	 *   'length': 24,
	 *   'separator': ' '
	 * });
	 * // => 'hi-diddly-ho there,...'
	 *
	 * _.truncate('hi-diddly-ho there, neighborino', {
	 *   'length': 24,
	 *   'separator': /,? +/
	 * });
	 * // => 'hi-diddly-ho there...'
	 *
	 * _.truncate('hi-diddly-ho there, neighborino', {
	 *   'omission': ' [...]'
	 * });
	 * // => 'hi-diddly-ho there, neig [...]'
	 */
	function truncate(string, options) {
	  var length = DEFAULT_TRUNC_LENGTH,
	      omission = DEFAULT_TRUNC_OMISSION;
	
	  if (isObject(options)) {
	    var separator = 'separator' in options ? options.separator : separator;
	    length = 'length' in options ? toInteger(options.length) : length;
	    omission = 'omission' in options ? baseToString(options.omission) : omission;
	  }
	  string = toString(string);
	
	  var strLength = string.length;
	  if (hasUnicode(string)) {
	    var strSymbols = stringToArray(string);
	    strLength = strSymbols.length;
	  }
	  if (length >= strLength) {
	    return string;
	  }
	  var end = length - stringSize(omission);
	  if (end < 1) {
	    return omission;
	  }
	  var result = strSymbols
	    ? castSlice(strSymbols, 0, end).join('')
	    : string.slice(0, end);
	
	  if (separator === undefined) {
	    return result + omission;
	  }
	  if (strSymbols) {
	    end += (result.length - end);
	  }
	  if (isRegExp(separator)) {
	    if (string.slice(end).search(separator)) {
	      var match,
	          substring = result;
	
	      if (!separator.global) {
	        separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
	      }
	      separator.lastIndex = 0;
	      while ((match = separator.exec(substring))) {
	        var newEnd = match.index;
	      }
	      result = result.slice(0, newEnd === undefined ? end : newEnd);
	    }
	  } else if (string.indexOf(baseToString(separator), end) != end) {
	    var index = result.lastIndexOf(separator);
	    if (index > -1) {
	      result = result.slice(0, index);
	    }
	  }
	  return result + omission;
	}
	
	module.exports = truncate;


/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(353);
	
	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each element
	 * is kept. The order of result values is determined by the order they occur
	 * in the array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length) ? baseUniq(array) : [];
	}
	
	module.exports = uniq;


/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	
	;(function() {
	
	/**
	 * Block-Level Grammar
	 */
	
	var block = {
	  newline: /^\n+/,
	  code: /^( {4}[^\n]+\n*)+/,
	  fences: noop,
	  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	  nptable: noop,
	  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	  table: noop,
	  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	  text: /^[^\n]+/
	};
	
	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	  (/bull/g, block.bullet)
	  ();
	
	block.list = replace(block.list)
	  (/bull/g, block.bullet)
	  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	  ('def', '\\n+(?=' + block.def.source + ')')
	  ();
	
	block.blockquote = replace(block.blockquote)
	  ('def', block.def)
	  ();
	
	block._tag = '(?!(?:'
	  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
	
	block.html = replace(block.html)
	  ('comment', /<!--[\s\S]*?-->/)
	  ('closed', /<(tag)[\s\S]+?<\/\1>/)
	  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	  (/tag/g, block._tag)
	  ();
	
	block.paragraph = replace(block.paragraph)
	  ('hr', block.hr)
	  ('heading', block.heading)
	  ('lheading', block.lheading)
	  ('blockquote', block.blockquote)
	  ('tag', '<' + block._tag)
	  ('def', block.def)
	  ();
	
	/**
	 * Normal Block Grammar
	 */
	
	block.normal = merge({}, block);
	
	/**
	 * GFM Block Grammar
	 */
	
	block.gfm = merge({}, block.normal, {
	  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	  paragraph: /^/,
	  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});
	
	block.gfm.paragraph = replace(block.paragraph)
	  ('(?!', '(?!'
	    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	    + block.list.source.replace('\\1', '\\3') + '|')
	  ();
	
	/**
	 * GFM + Tables Block Grammar
	 */
	
	block.tables = merge({}, block.gfm, {
	  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});
	
	/**
	 * Block Lexer
	 */
	
	function Lexer(options) {
	  this.tokens = [];
	  this.tokens.links = {};
	  this.options = options || marked.defaults;
	  this.rules = block.normal;
	
	  if (this.options.gfm) {
	    if (this.options.tables) {
	      this.rules = block.tables;
	    } else {
	      this.rules = block.gfm;
	    }
	  }
	}
	
	/**
	 * Expose Block Rules
	 */
	
	Lexer.rules = block;
	
	/**
	 * Static Lex Method
	 */
	
	Lexer.lex = function(src, options) {
	  var lexer = new Lexer(options);
	  return lexer.lex(src);
	};
	
	/**
	 * Preprocessing
	 */
	
	Lexer.prototype.lex = function(src) {
	  src = src
	    .replace(/\r\n|\r/g, '\n')
	    .replace(/\t/g, '    ')
	    .replace(/\u00a0/g, ' ')
	    .replace(/\u2424/g, '\n');
	
	  return this.token(src, true);
	};
	
	/**
	 * Lexing
	 */
	
	Lexer.prototype.token = function(src, top, bq) {
	  var src = src.replace(/^ +$/gm, '')
	    , next
	    , loose
	    , cap
	    , bull
	    , b
	    , item
	    , space
	    , i
	    , l;
	
	  while (src) {
	    // newline
	    if (cap = this.rules.newline.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[0].length > 1) {
	        this.tokens.push({
	          type: 'space'
	        });
	      }
	    }
	
	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      cap = cap[0].replace(/^ {4}/gm, '');
	      this.tokens.push({
	        type: 'code',
	        text: !this.options.pedantic
	          ? cap.replace(/\n+$/, '')
	          : cap
	      });
	      continue;
	    }
	
	    // fences (gfm)
	    if (cap = this.rules.fences.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'code',
	        lang: cap[2],
	        text: cap[3] || ''
	      });
	      continue;
	    }
	
	    // heading
	    if (cap = this.rules.heading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[1].length,
	        text: cap[2]
	      });
	      continue;
	    }
	
	    // table no leading pipe (gfm)
	    if (top && (cap = this.rules.nptable.exec(src))) {
	      src = src.substring(cap[0].length);
	
	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/\n$/, '').split('\n')
	      };
	
	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }
	
	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i].split(/ *\| */);
	      }
	
	      this.tokens.push(item);
	
	      continue;
	    }
	
	    // lheading
	    if (cap = this.rules.lheading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[2] === '=' ? 1 : 2,
	        text: cap[1]
	      });
	      continue;
	    }
	
	    // hr
	    if (cap = this.rules.hr.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'hr'
	      });
	      continue;
	    }
	
	    // blockquote
	    if (cap = this.rules.blockquote.exec(src)) {
	      src = src.substring(cap[0].length);
	
	      this.tokens.push({
	        type: 'blockquote_start'
	      });
	
	      cap = cap[0].replace(/^ *> ?/gm, '');
	
	      // Pass `top` to keep the current
	      // "toplevel" state. This is exactly
	      // how markdown.pl works.
	      this.token(cap, top, true);
	
	      this.tokens.push({
	        type: 'blockquote_end'
	      });
	
	      continue;
	    }
	
	    // list
	    if (cap = this.rules.list.exec(src)) {
	      src = src.substring(cap[0].length);
	      bull = cap[2];
	
	      this.tokens.push({
	        type: 'list_start',
	        ordered: bull.length > 1
	      });
	
	      // Get each top-level item.
	      cap = cap[0].match(this.rules.item);
	
	      next = false;
	      l = cap.length;
	      i = 0;
	
	      for (; i < l; i++) {
	        item = cap[i];
	
	        // Remove the list item's bullet
	        // so it is seen as the next token.
	        space = item.length;
	        item = item.replace(/^ *([*+-]|\d+\.) +/, '');
	
	        // Outdent whatever the
	        // list item contains. Hacky.
	        if (~item.indexOf('\n ')) {
	          space -= item.length;
	          item = !this.options.pedantic
	            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	            : item.replace(/^ {1,4}/gm, '');
	        }
	
	        // Determine whether the next list item belongs here.
	        // Backpedal if it does not belong in this list.
	        if (this.options.smartLists && i !== l - 1) {
	          b = block.bullet.exec(cap[i + 1])[0];
	          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	            src = cap.slice(i + 1).join('\n') + src;
	            i = l - 1;
	          }
	        }
	
	        // Determine whether item is loose or not.
	        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	        // for discount behavior.
	        loose = next || /\n\n(?!\s*$)/.test(item);
	        if (i !== l - 1) {
	          next = item.charAt(item.length - 1) === '\n';
	          if (!loose) loose = next;
	        }
	
	        this.tokens.push({
	          type: loose
	            ? 'loose_item_start'
	            : 'list_item_start'
	        });
	
	        // Recurse.
	        this.token(item, false, bq);
	
	        this.tokens.push({
	          type: 'list_item_end'
	        });
	      }
	
	      this.tokens.push({
	        type: 'list_end'
	      });
	
	      continue;
	    }
	
	    // html
	    if (cap = this.rules.html.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: this.options.sanitize
	          ? 'paragraph'
	          : 'html',
	        pre: !this.options.sanitizer
	          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	        text: cap[0]
	      });
	      continue;
	    }
	
	    // def
	    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.links[cap[1].toLowerCase()] = {
	        href: cap[2],
	        title: cap[3]
	      };
	      continue;
	    }
	
	    // table (gfm)
	    if (top && (cap = this.rules.table.exec(src))) {
	      src = src.substring(cap[0].length);
	
	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	      };
	
	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }
	
	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i]
	          .replace(/^ *\| *| *\| *$/g, '')
	          .split(/ *\| */);
	      }
	
	      this.tokens.push(item);
	
	      continue;
	    }
	
	    // top-level paragraph
	    if (top && (cap = this.rules.paragraph.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'paragraph',
	        text: cap[1].charAt(cap[1].length - 1) === '\n'
	          ? cap[1].slice(0, -1)
	          : cap[1]
	      });
	      continue;
	    }
	
	    // text
	    if (cap = this.rules.text.exec(src)) {
	      // Top-level should never reach here.
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'text',
	        text: cap[0]
	      });
	      continue;
	    }
	
	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }
	
	  return this.tokens;
	};
	
	/**
	 * Inline-Level Grammar
	 */
	
	var inline = {
	  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	  url: noop,
	  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	  link: /^!?\[(inside)\]\(href\)/,
	  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	  br: /^ {2,}\n(?!\s*$)/,
	  del: noop,
	  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};
	
	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
	
	inline.link = replace(inline.link)
	  ('inside', inline._inside)
	  ('href', inline._href)
	  ();
	
	inline.reflink = replace(inline.reflink)
	  ('inside', inline._inside)
	  ();
	
	/**
	 * Normal Inline Grammar
	 */
	
	inline.normal = merge({}, inline);
	
	/**
	 * Pedantic Inline Grammar
	 */
	
	inline.pedantic = merge({}, inline.normal, {
	  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});
	
	/**
	 * GFM Inline Grammar
	 */
	
	inline.gfm = merge({}, inline.normal, {
	  escape: replace(inline.escape)('])', '~|])')(),
	  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	  del: /^~~(?=\S)([\s\S]*?\S)~~/,
	  text: replace(inline.text)
	    (']|', '~]|')
	    ('|', '|https?://|')
	    ()
	});
	
	/**
	 * GFM + Line Breaks Inline Grammar
	 */
	
	inline.breaks = merge({}, inline.gfm, {
	  br: replace(inline.br)('{2,}', '*')(),
	  text: replace(inline.gfm.text)('{2,}', '*')()
	});
	
	/**
	 * Inline Lexer & Compiler
	 */
	
	function InlineLexer(links, options) {
	  this.options = options || marked.defaults;
	  this.links = links;
	  this.rules = inline.normal;
	  this.renderer = this.options.renderer || new Renderer;
	  this.renderer.options = this.options;
	
	  if (!this.links) {
	    throw new
	      Error('Tokens array requires a `links` property.');
	  }
	
	  if (this.options.gfm) {
	    if (this.options.breaks) {
	      this.rules = inline.breaks;
	    } else {
	      this.rules = inline.gfm;
	    }
	  } else if (this.options.pedantic) {
	    this.rules = inline.pedantic;
	  }
	}
	
	/**
	 * Expose Inline Rules
	 */
	
	InlineLexer.rules = inline;
	
	/**
	 * Static Lexing/Compiling Method
	 */
	
	InlineLexer.output = function(src, links, options) {
	  var inline = new InlineLexer(links, options);
	  return inline.output(src);
	};
	
	/**
	 * Lexing/Compiling
	 */
	
	InlineLexer.prototype.output = function(src) {
	  var out = ''
	    , link
	    , text
	    , href
	    , cap;
	
	  while (src) {
	    // escape
	    if (cap = this.rules.escape.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += cap[1];
	      continue;
	    }
	
	    // autolink
	    if (cap = this.rules.autolink.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[2] === '@') {
	        text = cap[1].charAt(6) === ':'
	          ? this.mangle(cap[1].substring(7))
	          : this.mangle(cap[1]);
	        href = this.mangle('mailto:') + text;
	      } else {
	        text = escape(cap[1]);
	        href = text;
	      }
	      out += this.renderer.link(href, null, text);
	      continue;
	    }
	
	    // url (gfm)
	    if (!this.inLink && (cap = this.rules.url.exec(src))) {
	      src = src.substring(cap[0].length);
	      text = escape(cap[1]);
	      href = text;
	      out += this.renderer.link(href, null, text);
	      continue;
	    }
	
	    // tag
	    if (cap = this.rules.tag.exec(src)) {
	      if (!this.inLink && /^<a /i.test(cap[0])) {
	        this.inLink = true;
	      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	        this.inLink = false;
	      }
	      src = src.substring(cap[0].length);
	      out += this.options.sanitize
	        ? this.options.sanitizer
	          ? this.options.sanitizer(cap[0])
	          : escape(cap[0])
	        : cap[0]
	      continue;
	    }
	
	    // link
	    if (cap = this.rules.link.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.inLink = true;
	      out += this.outputLink(cap, {
	        href: cap[2],
	        title: cap[3]
	      });
	      this.inLink = false;
	      continue;
	    }
	
	    // reflink, nolink
	    if ((cap = this.rules.reflink.exec(src))
	        || (cap = this.rules.nolink.exec(src))) {
	      src = src.substring(cap[0].length);
	      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	      link = this.links[link.toLowerCase()];
	      if (!link || !link.href) {
	        out += cap[0].charAt(0);
	        src = cap[0].substring(1) + src;
	        continue;
	      }
	      this.inLink = true;
	      out += this.outputLink(cap, link);
	      this.inLink = false;
	      continue;
	    }
	
	    // strong
	    if (cap = this.rules.strong.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.strong(this.output(cap[2] || cap[1]));
	      continue;
	    }
	
	    // em
	    if (cap = this.rules.em.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.em(this.output(cap[2] || cap[1]));
	      continue;
	    }
	
	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.codespan(escape(cap[2], true));
	      continue;
	    }
	
	    // br
	    if (cap = this.rules.br.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.br();
	      continue;
	    }
	
	    // del (gfm)
	    if (cap = this.rules.del.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.del(this.output(cap[1]));
	      continue;
	    }
	
	    // text
	    if (cap = this.rules.text.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.text(escape(this.smartypants(cap[0])));
	      continue;
	    }
	
	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }
	
	  return out;
	};
	
	/**
	 * Compile Link
	 */
	
	InlineLexer.prototype.outputLink = function(cap, link) {
	  var href = escape(link.href)
	    , title = link.title ? escape(link.title) : null;
	
	  return cap[0].charAt(0) !== '!'
	    ? this.renderer.link(href, title, this.output(cap[1]))
	    : this.renderer.image(href, title, escape(cap[1]));
	};
	
	/**
	 * Smartypants Transformations
	 */
	
	InlineLexer.prototype.smartypants = function(text) {
	  if (!this.options.smartypants) return text;
	  return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	    // closing doubles
	    .replace(/"/g, '\u201d')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	};
	
	/**
	 * Mangle Links
	 */
	
	InlineLexer.prototype.mangle = function(text) {
	  if (!this.options.mangle) return text;
	  var out = ''
	    , l = text.length
	    , i = 0
	    , ch;
	
	  for (; i < l; i++) {
	    ch = text.charCodeAt(i);
	    if (Math.random() > 0.5) {
	      ch = 'x' + ch.toString(16);
	    }
	    out += '&#' + ch + ';';
	  }
	
	  return out;
	};
	
	/**
	 * Renderer
	 */
	
	function Renderer(options) {
	  this.options = options || {};
	}
	
	Renderer.prototype.code = function(code, lang, escaped) {
	  if (this.options.highlight) {
	    var out = this.options.highlight(code, lang);
	    if (out != null && out !== code) {
	      escaped = true;
	      code = out;
	    }
	  }
	
	  if (!lang) {
	    return '<pre><code>'
	      + (escaped ? code : escape(code, true))
	      + '\n</code></pre>';
	  }
	
	  return '<pre><code class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + (escaped ? code : escape(code, true))
	    + '\n</code></pre>\n';
	};
	
	Renderer.prototype.blockquote = function(quote) {
	  return '<blockquote>\n' + quote + '</blockquote>\n';
	};
	
	Renderer.prototype.html = function(html) {
	  return html;
	};
	
	Renderer.prototype.heading = function(text, level, raw) {
	  return '<h'
	    + level
	    + ' id="'
	    + this.options.headerPrefix
	    + raw.toLowerCase().replace(/[^\w]+/g, '-')
	    + '">'
	    + text
	    + '</h'
	    + level
	    + '>\n';
	};
	
	Renderer.prototype.hr = function() {
	  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};
	
	Renderer.prototype.list = function(body, ordered) {
	  var type = ordered ? 'ol' : 'ul';
	  return '<' + type + '>\n' + body + '</' + type + '>\n';
	};
	
	Renderer.prototype.listitem = function(text) {
	  return '<li>' + text + '</li>\n';
	};
	
	Renderer.prototype.paragraph = function(text) {
	  return '<p>' + text + '</p>\n';
	};
	
	Renderer.prototype.table = function(header, body) {
	  return '<table>\n'
	    + '<thead>\n'
	    + header
	    + '</thead>\n'
	    + '<tbody>\n'
	    + body
	    + '</tbody>\n'
	    + '</table>\n';
	};
	
	Renderer.prototype.tablerow = function(content) {
	  return '<tr>\n' + content + '</tr>\n';
	};
	
	Renderer.prototype.tablecell = function(content, flags) {
	  var type = flags.header ? 'th' : 'td';
	  var tag = flags.align
	    ? '<' + type + ' style="text-align:' + flags.align + '">'
	    : '<' + type + '>';
	  return tag + content + '</' + type + '>\n';
	};
	
	// span level renderer
	Renderer.prototype.strong = function(text) {
	  return '<strong>' + text + '</strong>';
	};
	
	Renderer.prototype.em = function(text) {
	  return '<em>' + text + '</em>';
	};
	
	Renderer.prototype.codespan = function(text) {
	  return '<code>' + text + '</code>';
	};
	
	Renderer.prototype.br = function() {
	  return this.options.xhtml ? '<br/>' : '<br>';
	};
	
	Renderer.prototype.del = function(text) {
	  return '<del>' + text + '</del>';
	};
	
	Renderer.prototype.link = function(href, title, text) {
	  if (this.options.sanitize) {
	    try {
	      var prot = decodeURIComponent(unescape(href))
	        .replace(/[^\w:]/g, '')
	        .toLowerCase();
	    } catch (e) {
	      return '';
	    }
	    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	      return '';
	    }
	  }
	  var out = '<a href="' + href + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += '>' + text + '</a>';
	  return out;
	};
	
	Renderer.prototype.image = function(href, title, text) {
	  var out = '<img src="' + href + '" alt="' + text + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += this.options.xhtml ? '/>' : '>';
	  return out;
	};
	
	Renderer.prototype.text = function(text) {
	  return text;
	};
	
	/**
	 * Parsing & Compiling
	 */
	
	function Parser(options) {
	  this.tokens = [];
	  this.token = null;
	  this.options = options || marked.defaults;
	  this.options.renderer = this.options.renderer || new Renderer;
	  this.renderer = this.options.renderer;
	  this.renderer.options = this.options;
	}
	
	/**
	 * Static Parse Method
	 */
	
	Parser.parse = function(src, options, renderer) {
	  var parser = new Parser(options, renderer);
	  return parser.parse(src);
	};
	
	/**
	 * Parse Loop
	 */
	
	Parser.prototype.parse = function(src) {
	  this.inline = new InlineLexer(src.links, this.options, this.renderer);
	  this.tokens = src.reverse();
	
	  var out = '';
	  while (this.next()) {
	    out += this.tok();
	  }
	
	  return out;
	};
	
	/**
	 * Next Token
	 */
	
	Parser.prototype.next = function() {
	  return this.token = this.tokens.pop();
	};
	
	/**
	 * Preview Next Token
	 */
	
	Parser.prototype.peek = function() {
	  return this.tokens[this.tokens.length - 1] || 0;
	};
	
	/**
	 * Parse Text Tokens
	 */
	
	Parser.prototype.parseText = function() {
	  var body = this.token.text;
	
	  while (this.peek().type === 'text') {
	    body += '\n' + this.next().text;
	  }
	
	  return this.inline.output(body);
	};
	
	/**
	 * Parse Current Token
	 */
	
	Parser.prototype.tok = function() {
	  switch (this.token.type) {
	    case 'space': {
	      return '';
	    }
	    case 'hr': {
	      return this.renderer.hr();
	    }
	    case 'heading': {
	      return this.renderer.heading(
	        this.inline.output(this.token.text),
	        this.token.depth,
	        this.token.text);
	    }
	    case 'code': {
	      return this.renderer.code(this.token.text,
	        this.token.lang,
	        this.token.escaped);
	    }
	    case 'table': {
	      var header = ''
	        , body = ''
	        , i
	        , row
	        , cell
	        , flags
	        , j;
	
	      // header
	      cell = '';
	      for (i = 0; i < this.token.header.length; i++) {
	        flags = { header: true, align: this.token.align[i] };
	        cell += this.renderer.tablecell(
	          this.inline.output(this.token.header[i]),
	          { header: true, align: this.token.align[i] }
	        );
	      }
	      header += this.renderer.tablerow(cell);
	
	      for (i = 0; i < this.token.cells.length; i++) {
	        row = this.token.cells[i];
	
	        cell = '';
	        for (j = 0; j < row.length; j++) {
	          cell += this.renderer.tablecell(
	            this.inline.output(row[j]),
	            { header: false, align: this.token.align[j] }
	          );
	        }
	
	        body += this.renderer.tablerow(cell);
	      }
	      return this.renderer.table(header, body);
	    }
	    case 'blockquote_start': {
	      var body = '';
	
	      while (this.next().type !== 'blockquote_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.blockquote(body);
	    }
	    case 'list_start': {
	      var body = ''
	        , ordered = this.token.ordered;
	
	      while (this.next().type !== 'list_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.list(body, ordered);
	    }
	    case 'list_item_start': {
	      var body = '';
	
	      while (this.next().type !== 'list_item_end') {
	        body += this.token.type === 'text'
	          ? this.parseText()
	          : this.tok();
	      }
	
	      return this.renderer.listitem(body);
	    }
	    case 'loose_item_start': {
	      var body = '';
	
	      while (this.next().type !== 'list_item_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.listitem(body);
	    }
	    case 'html': {
	      var html = !this.token.pre && !this.options.pedantic
	        ? this.inline.output(this.token.text)
	        : this.token.text;
	      return this.renderer.html(html);
	    }
	    case 'paragraph': {
	      return this.renderer.paragraph(this.inline.output(this.token.text));
	    }
	    case 'text': {
	      return this.renderer.paragraph(this.parseText());
	    }
	  }
	};
	
	/**
	 * Helpers
	 */
	
	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}
	
	function unescape(html) {
		// explicitly match decimal, hex, and named HTML entities 
	  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
	    n = n.toLowerCase();
	    if (n === 'colon') return ':';
	    if (n.charAt(0) === '#') {
	      return n.charAt(1) === 'x'
	        ? String.fromCharCode(parseInt(n.substring(2), 16))
	        : String.fromCharCode(+n.substring(1));
	    }
	    return '';
	  });
	}
	
	function replace(regex, opt) {
	  regex = regex.source;
	  opt = opt || '';
	  return function self(name, val) {
	    if (!name) return new RegExp(regex, opt);
	    val = val.source || val;
	    val = val.replace(/(^|[^\[])\^/g, '$1');
	    regex = regex.replace(name, val);
	    return self;
	  };
	}
	
	function noop() {}
	noop.exec = noop;
	
	function merge(obj) {
	  var i = 1
	    , target
	    , key;
	
	  for (; i < arguments.length; i++) {
	    target = arguments[i];
	    for (key in target) {
	      if (Object.prototype.hasOwnProperty.call(target, key)) {
	        obj[key] = target[key];
	      }
	    }
	  }
	
	  return obj;
	}
	
	
	/**
	 * Marked
	 */
	
	function marked(src, opt, callback) {
	  if (callback || typeof opt === 'function') {
	    if (!callback) {
	      callback = opt;
	      opt = null;
	    }
	
	    opt = merge({}, marked.defaults, opt || {});
	
	    var highlight = opt.highlight
	      , tokens
	      , pending
	      , i = 0;
	
	    try {
	      tokens = Lexer.lex(src, opt)
	    } catch (e) {
	      return callback(e);
	    }
	
	    pending = tokens.length;
	
	    var done = function(err) {
	      if (err) {
	        opt.highlight = highlight;
	        return callback(err);
	      }
	
	      var out;
	
	      try {
	        out = Parser.parse(tokens, opt);
	      } catch (e) {
	        err = e;
	      }
	
	      opt.highlight = highlight;
	
	      return err
	        ? callback(err)
	        : callback(null, out);
	    };
	
	    if (!highlight || highlight.length < 3) {
	      return done();
	    }
	
	    delete opt.highlight;
	
	    if (!pending) return done();
	
	    for (; i < tokens.length; i++) {
	      (function(token) {
	        if (token.type !== 'code') {
	          return --pending || done();
	        }
	        return highlight(token.text, token.lang, function(err, code) {
	          if (err) return done(err);
	          if (code == null || code === token.text) {
	            return --pending || done();
	          }
	          token.text = code;
	          token.escaped = true;
	          --pending || done();
	        });
	      })(tokens[i]);
	    }
	
	    return;
	  }
	  try {
	    if (opt) opt = merge({}, marked.defaults, opt);
	    return Parser.parse(Lexer.lex(src, opt), opt);
	  } catch (e) {
	    e.message += '\nPlease report this to https://github.com/chjj/marked.';
	    if ((opt || marked.defaults).silent) {
	      return '<p>An error occured:</p><pre>'
	        + escape(e.message + '', true)
	        + '</pre>';
	    }
	    throw e;
	  }
	}
	
	/**
	 * Options
	 */
	
	marked.options =
	marked.setOptions = function(opt) {
	  merge(marked.defaults, opt);
	  return marked;
	};
	
	marked.defaults = {
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  sanitizer: null,
	  mangle: true,
	  smartLists: false,
	  silent: false,
	  highlight: null,
	  langPrefix: 'lang-',
	  smartypants: false,
	  headerPrefix: '',
	  renderer: new Renderer,
	  xhtml: false
	};
	
	/**
	 * Expose
	 */
	
	marked.Parser = Parser;
	marked.parser = Parser.parse;
	
	marked.Renderer = Renderer;
	
	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;
	
	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;
	
	marked.parse = marked;
	
	if (true) {
	  module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
	  define(function() { return marked; });
	} else {
	  this.marked = marked;
	}
	
	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		Papa Parse
		v4.3.6
		https://github.com/mholt/PapaParse
		License: MIT
	*/
	(function(root, factory)
	{
		if (true)
		{
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof module === 'object' && typeof exports !== 'undefined')
		{
			// Node. Does not work with strict CommonJS, but
			// only CommonJS-like environments that support module.exports,
			// like Node.
			module.exports = factory();
		}
		else
		{
			// Browser globals (root is window)
			root.Papa = factory();
		}
	}(this, function()
	{
		'use strict';
	
		var global = (function () {
			// alternative method, similar to `Function('return this')()`
			// but without using `eval` (which is disabled when
			// using Content Security Policy).
	
			if (typeof self !== 'undefined') { return self; }
			if (typeof window !== 'undefined') { return window; }
			if (typeof global !== 'undefined') { return global; }
	
			// When running tests none of the above have been defined
			return {};
		})();
	
	
		var IS_WORKER = !global.document && !!global.postMessage,
			IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
			LOADED_SYNC = false, AUTO_SCRIPT_PATH;
		var workers = {}, workerIdCounter = 0;
	
		var Papa = {};
	
		Papa.parse = CsvToJson;
		Papa.unparse = JsonToCsv;
	
		Papa.RECORD_SEP = String.fromCharCode(30);
		Papa.UNIT_SEP = String.fromCharCode(31);
		Papa.BYTE_ORDER_MARK = '\ufeff';
		Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
		Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
		Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously
	
		// Configurable chunk sizes for local and remote files, respectively
		Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
		Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
		Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails
	
		// Exposed for testing and development only
		Papa.Parser = Parser;
		Papa.ParserHandle = ParserHandle;
		Papa.NetworkStreamer = NetworkStreamer;
		Papa.FileStreamer = FileStreamer;
		Papa.StringStreamer = StringStreamer;
		Papa.ReadableStreamStreamer = ReadableStreamStreamer;
	
		if (global.jQuery)
		{
			var $ = global.jQuery;
			$.fn.parse = function(options)
			{
				var config = options.config || {};
				var queue = [];
	
				this.each(function(idx)
				{
					var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
									&& $(this).attr('type').toLowerCase() === 'file'
									&& global.FileReader;
	
					if (!supported || !this.files || this.files.length === 0)
						return true;	// continue to next input element
	
					for (var i = 0; i < this.files.length; i++)
					{
						queue.push({
							file: this.files[i],
							inputElem: this,
							instanceConfig: $.extend({}, config)
						});
					}
				});
	
				parseNextFile();	// begin parsing
				return this;		// maintains chainability
	
	
				function parseNextFile()
				{
					if (queue.length === 0)
					{
						if (isFunction(options.complete))
							options.complete();
						return;
					}
	
					var f = queue[0];
	
					if (isFunction(options.before))
					{
						var returned = options.before(f.file, f.inputElem);
	
						if (typeof returned === 'object')
						{
							if (returned.action === 'abort')
							{
								error('AbortError', f.file, f.inputElem, returned.reason);
								return;	// Aborts all queued files immediately
							}
							else if (returned.action === 'skip')
							{
								fileComplete();	// parse the next file in the queue, if any
								return;
							}
							else if (typeof returned.config === 'object')
								f.instanceConfig = $.extend(f.instanceConfig, returned.config);
						}
						else if (returned === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
					}
	
					// Wrap up the user's complete callback, if any, so that ours also gets executed
					var userCompleteFunc = f.instanceConfig.complete;
					f.instanceConfig.complete = function(results)
					{
						if (isFunction(userCompleteFunc))
							userCompleteFunc(results, f.file, f.inputElem);
						fileComplete();
					};
	
					Papa.parse(f.file, f.instanceConfig);
				}
	
				function error(name, file, elem, reason)
				{
					if (isFunction(options.error))
						options.error({name: name}, file, elem, reason);
				}
	
				function fileComplete()
				{
					queue.splice(0, 1);
					parseNextFile();
				}
			}
		}
	
	
		if (IS_PAPA_WORKER)
		{
			global.onmessage = workerThreadReceivedMessage;
		}
		else if (Papa.WORKERS_SUPPORTED)
		{
			AUTO_SCRIPT_PATH = getScriptPath();
	
			// Check if the script was loaded synchronously
			if (!document.body)
			{
				// Body doesn't exist yet, must be synchronous
				LOADED_SYNC = true;
			}
			else
			{
				document.addEventListener('DOMContentLoaded', function () {
					LOADED_SYNC = true;
				}, true);
			}
		}
	
	
	
	
		function CsvToJson(_input, _config)
		{
			_config = _config || {};
			var dynamicTyping = _config.dynamicTyping || false;
			if (isFunction(dynamicTyping)) {
				_config.dynamicTypingFunction = dynamicTyping;
				// Will be filled on first row call
				dynamicTyping = {};
			}
			_config.dynamicTyping = dynamicTyping;
	
			if (_config.worker && Papa.WORKERS_SUPPORTED)
			{
				var w = newWorker();
	
				w.userStep = _config.step;
				w.userChunk = _config.chunk;
				w.userComplete = _config.complete;
				w.userError = _config.error;
	
				_config.step = isFunction(_config.step);
				_config.chunk = isFunction(_config.chunk);
				_config.complete = isFunction(_config.complete);
				_config.error = isFunction(_config.error);
				delete _config.worker;	// prevent infinite loop
	
				w.postMessage({
					input: _input,
					config: _config,
					workerId: w.id
				});
	
				return;
			}
	
			var streamer = null;
			if (typeof _input === 'string')
			{
				if (_config.download)
					streamer = new NetworkStreamer(_config);
				else
					streamer = new StringStreamer(_config);
			}
			else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
			{
				streamer = new ReadableStreamStreamer(_config);
			}
			else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
				streamer = new FileStreamer(_config);
	
			return streamer.stream(_input);
		}
	
	
	
	
	
	
		function JsonToCsv(_input, _config)
		{
			var _output = '';
			var _fields = [];
	
			// Default configuration
	
			/** whether to surround every datum with quotes */
			var _quotes = false;
	
			/** whether to write headers */
			var _writeHeader = true;
	
			/** delimiting character */
			var _delimiter = ',';
	
			/** newline character(s) */
			var _newline = '\r\n';
	
			/** quote character */
			var _quoteChar = '"';
	
			unpackConfig();
	
			var quoteCharRegex = new RegExp(_quoteChar, 'g');
	
			if (typeof _input === 'string')
				_input = JSON.parse(_input);
	
			if (_input instanceof Array)
			{
				if (!_input.length || _input[0] instanceof Array)
					return serialize(null, _input);
				else if (typeof _input[0] === 'object')
					return serialize(objectKeys(_input[0]), _input);
			}
			else if (typeof _input === 'object')
			{
				if (typeof _input.data === 'string')
					_input.data = JSON.parse(_input.data);
	
				if (_input.data instanceof Array)
				{
					if (!_input.fields)
						_input.fields =  _input.meta && _input.meta.fields;
	
					if (!_input.fields)
						_input.fields =  _input.data[0] instanceof Array
										? _input.fields
										: objectKeys(_input.data[0]);
	
					if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
						_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
				}
	
				return serialize(_input.fields || [], _input.data || []);
			}
	
			// Default (any valid paths should return before this)
			throw 'exception: Unable to serialize unrecognized input';
	
	
			function unpackConfig()
			{
				if (typeof _config !== 'object')
					return;
	
				if (typeof _config.delimiter === 'string'
					&& _config.delimiter.length === 1
					&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
				{
					_delimiter = _config.delimiter;
				}
	
				if (typeof _config.quotes === 'boolean'
					|| _config.quotes instanceof Array)
					_quotes = _config.quotes;
	
				if (typeof _config.newline === 'string')
					_newline = _config.newline;
	
				if (typeof _config.quoteChar === 'string')
					_quoteChar = _config.quoteChar;
	
				if (typeof _config.header === 'boolean')
					_writeHeader = _config.header;
			}
	
	
			/** Turns an object's keys into an array */
			function objectKeys(obj)
			{
				if (typeof obj !== 'object')
					return [];
				var keys = [];
				for (var key in obj)
					keys.push(key);
				return keys;
			}
	
			/** The double for loop that iterates the data and writes out a CSV string including header row */
			function serialize(fields, data)
			{
				var csv = '';
	
				if (typeof fields === 'string')
					fields = JSON.parse(fields);
				if (typeof data === 'string')
					data = JSON.parse(data);
	
				var hasHeader = fields instanceof Array && fields.length > 0;
				var dataKeyedByField = !(data[0] instanceof Array);
	
				// If there a header row, write it first
				if (hasHeader && _writeHeader)
				{
					for (var i = 0; i < fields.length; i++)
					{
						if (i > 0)
							csv += _delimiter;
						csv += safe(fields[i], i);
					}
					if (data.length > 0)
						csv += _newline;
				}
	
				// Then write out the data
				for (var row = 0; row < data.length; row++)
				{
					var maxCol = hasHeader ? fields.length : data[row].length;
	
					for (var col = 0; col < maxCol; col++)
					{
						if (col > 0)
							csv += _delimiter;
						var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
						csv += safe(data[row][colIdx], col);
					}
	
					if (row < data.length - 1)
						csv += _newline;
				}
	
				return csv;
			}
	
			/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
			function safe(str, col)
			{
				if (typeof str === 'undefined' || str === null)
					return '';
	
				str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);
	
				var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
								|| (_quotes instanceof Array && _quotes[col])
								|| hasAny(str, Papa.BAD_DELIMITERS)
								|| str.indexOf(_delimiter) > -1
								|| str.charAt(0) === ' '
								|| str.charAt(str.length - 1) === ' ';
	
				return needsQuotes ? _quoteChar + str + _quoteChar : str;
			}
	
			function hasAny(str, substrings)
			{
				for (var i = 0; i < substrings.length; i++)
					if (str.indexOf(substrings[i]) > -1)
						return true;
				return false;
			}
		}
	
		/** ChunkStreamer is the base prototype for various streamer implementations. */
		function ChunkStreamer(config)
		{
			this._handle = null;
			this._paused = false;
			this._finished = false;
			this._input = null;
			this._baseIndex = 0;
			this._partialLine = '';
			this._rowCount = 0;
			this._start = 0;
			this._nextChunk = null;
			this.isFirstChunk = true;
			this._completeResults = {
				data: [],
				errors: [],
				meta: {}
			};
			replaceConfig.call(this, config);
	
			this.parseChunk = function(chunk)
			{
				// First chunk pre-processing
				if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
				{
					var modifiedChunk = this._config.beforeFirstChunk(chunk);
					if (modifiedChunk !== undefined)
						chunk = modifiedChunk;
				}
				this.isFirstChunk = false;
	
				// Rejoin the line we likely just split in two by chunking the file
				var aggregate = this._partialLine + chunk;
				this._partialLine = '';
	
				var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
	
				if (this._handle.paused() || this._handle.aborted())
					return;
	
				var lastIndex = results.meta.cursor;
	
				if (!this._finished)
				{
					this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
					this._baseIndex = lastIndex;
				}
	
				if (results && results.data)
					this._rowCount += results.data.length;
	
				var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);
	
				if (IS_PAPA_WORKER)
				{
					global.postMessage({
						results: results,
						workerId: Papa.WORKER_ID,
						finished: finishedIncludingPreview
					});
				}
				else if (isFunction(this._config.chunk))
				{
					this._config.chunk(results, this._handle);
					if (this._paused)
						return;
					results = undefined;
					this._completeResults = undefined;
				}
	
				if (!this._config.step && !this._config.chunk) {
					this._completeResults.data = this._completeResults.data.concat(results.data);
					this._completeResults.errors = this._completeResults.errors.concat(results.errors);
					this._completeResults.meta = results.meta;
				}
	
				if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
					this._config.complete(this._completeResults, this._input);
	
				if (!finishedIncludingPreview && (!results || !results.meta.paused))
					this._nextChunk();
	
				return results;
			};
	
			this._sendError = function(error)
			{
				if (isFunction(this._config.error))
					this._config.error(error);
				else if (IS_PAPA_WORKER && this._config.error)
				{
					global.postMessage({
						workerId: Papa.WORKER_ID,
						error: error,
						finished: false
					});
				}
			};
	
			function replaceConfig(config)
			{
				// Deep-copy the config so we can edit it
				var configCopy = copy(config);
				configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
				if (!config.step && !config.chunk)
					configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
				this._handle = new ParserHandle(configCopy);
				this._handle.streamer = this;
				this._config = configCopy;	// persist the copy to the caller
			}
		}
	
	
		function NetworkStreamer(config)
		{
			config = config || {};
			if (!config.chunkSize)
				config.chunkSize = Papa.RemoteChunkSize;
			ChunkStreamer.call(this, config);
	
			var xhr;
	
			if (IS_WORKER)
			{
				this._nextChunk = function()
				{
					this._readChunk();
					this._chunkLoaded();
				};
			}
			else
			{
				this._nextChunk = function()
				{
					this._readChunk();
				};
			}
	
			this.stream = function(url)
			{
				this._input = url;
				this._nextChunk();	// Starts streaming
			};
	
			this._readChunk = function()
			{
				if (this._finished)
				{
					this._chunkLoaded();
					return;
				}
	
				xhr = new XMLHttpRequest();
	
				if (this._config.withCredentials)
				{
					xhr.withCredentials = this._config.withCredentials;
				}
	
				if (!IS_WORKER)
				{
					xhr.onload = bindFunction(this._chunkLoaded, this);
					xhr.onerror = bindFunction(this._chunkError, this);
				}
	
				xhr.open('GET', this._input, !IS_WORKER);
				// Headers can only be set when once the request state is OPENED
				if (this._config.downloadRequestHeaders)
				{
					var headers = this._config.downloadRequestHeaders;
	
					for (var headerName in headers)
					{
						xhr.setRequestHeader(headerName, headers[headerName]);
					}
				}
	
				if (this._config.chunkSize)
				{
					var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
					xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
					xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
				}
	
				try {
					xhr.send();
				}
				catch (err) {
					this._chunkError(err.message);
				}
	
				if (IS_WORKER && xhr.status === 0)
					this._chunkError();
				else
					this._start += this._config.chunkSize;
			}
	
			this._chunkLoaded = function()
			{
				if (xhr.readyState != 4)
					return;
	
				if (xhr.status < 200 || xhr.status >= 400)
				{
					this._chunkError();
					return;
				}
	
				this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
				this.parseChunk(xhr.responseText);
			}
	
			this._chunkError = function(errorMessage)
			{
				var errorText = xhr.statusText || errorMessage;
				this._sendError(errorText);
			}
	
			function getFileSize(xhr)
			{
				var contentRange = xhr.getResponseHeader('Content-Range');
				if (contentRange === null) { // no content range, then finish!
						return -1;
						}
				return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
			}
		}
		NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
		NetworkStreamer.prototype.constructor = NetworkStreamer;
	
	
		function FileStreamer(config)
		{
			config = config || {};
			if (!config.chunkSize)
				config.chunkSize = Papa.LocalChunkSize;
			ChunkStreamer.call(this, config);
	
			var reader, slice;
	
			// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
			// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
			var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105
	
			this.stream = function(file)
			{
				this._input = file;
				slice = file.slice || file.webkitSlice || file.mozSlice;
	
				if (usingAsyncReader)
				{
					reader = new FileReader();		// Preferred method of reading files, even in workers
					reader.onload = bindFunction(this._chunkLoaded, this);
					reader.onerror = bindFunction(this._chunkError, this);
				}
				else
					reader = new FileReaderSync();	// Hack for running in a web worker in Firefox
	
				this._nextChunk();	// Starts streaming
			};
	
			this._nextChunk = function()
			{
				if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
					this._readChunk();
			}
	
			this._readChunk = function()
			{
				var input = this._input;
				if (this._config.chunkSize)
				{
					var end = Math.min(this._start + this._config.chunkSize, this._input.size);
					input = slice.call(input, this._start, end);
				}
				var txt = reader.readAsText(input, this._config.encoding);
				if (!usingAsyncReader)
					this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
			}
	
			this._chunkLoaded = function(event)
			{
				// Very important to increment start each time before handling results
				this._start += this._config.chunkSize;
				this._finished = !this._config.chunkSize || this._start >= this._input.size;
				this.parseChunk(event.target.result);
			}
	
			this._chunkError = function()
			{
				this._sendError(reader.error);
			}
	
		}
		FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
		FileStreamer.prototype.constructor = FileStreamer;
	
	
		function StringStreamer(config)
		{
			config = config || {};
			ChunkStreamer.call(this, config);
	
			var string;
			var remaining;
			this.stream = function(s)
			{
				string = s;
				remaining = s;
				return this._nextChunk();
			}
			this._nextChunk = function()
			{
				if (this._finished) return;
				var size = this._config.chunkSize;
				var chunk = size ? remaining.substr(0, size) : remaining;
				remaining = size ? remaining.substr(size) : '';
				this._finished = !remaining;
				return this.parseChunk(chunk);
			}
		}
		StringStreamer.prototype = Object.create(StringStreamer.prototype);
		StringStreamer.prototype.constructor = StringStreamer;
	
	
		function ReadableStreamStreamer(config)
		{
			config = config || {};
	
			ChunkStreamer.call(this, config);
	
			var queue = [];
			var parseOnData = true;
	
			this.stream = function(stream)
			{
				this._input = stream;
	
				this._input.on('data', this._streamData);
				this._input.on('end', this._streamEnd);
				this._input.on('error', this._streamError);
			}
	
			this._nextChunk = function()
			{
				if (queue.length)
				{
					this.parseChunk(queue.shift());
				}
				else
				{
					parseOnData = true;
				}
			}
	
			this._streamData = bindFunction(function(chunk)
			{
				try
				{
					queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));
	
					if (parseOnData)
					{
						parseOnData = false;
						this.parseChunk(queue.shift());
					}
				}
				catch (error)
				{
					this._streamError(error);
				}
			}, this);
	
			this._streamError = bindFunction(function(error)
			{
				this._streamCleanUp();
				this._sendError(error.message);
			}, this);
	
			this._streamEnd = bindFunction(function()
			{
				this._streamCleanUp();
				this._finished = true;
				this._streamData('');
			}, this);
	
			this._streamCleanUp = bindFunction(function()
			{
				this._input.removeListener('data', this._streamData);
				this._input.removeListener('end', this._streamEnd);
				this._input.removeListener('error', this._streamError);
			}, this);
		}
		ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
		ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;
	
	
		// Use one ParserHandle per entire CSV file or string
		function ParserHandle(_config)
		{
			// One goal is to minimize the use of regular expressions...
			var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
	
			var self = this;
			var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
			var _input;				// The input being parsed
			var _parser;			// The core parser being used
			var _paused = false;	// Whether we are paused or not
			var _aborted = false;	// Whether the parser has aborted or not
			var _delimiterError;	// Temporary state between delimiter detection and processing results
			var _fields = [];		// Fields are from the header row of the input, if there is one
			var _results = {		// The last results returned from the parser
				data: [],
				errors: [],
				meta: {}
			};
	
			if (isFunction(_config.step))
			{
				var userStep = _config.step;
				_config.step = function(results)
				{
					_results = results;
	
					if (needsHeaderRow())
						processResults();
					else	// only call user's step function after header row
					{
						processResults();
	
						// It's possbile that this line was empty and there's no row here after all
						if (_results.data.length === 0)
							return;
	
						_stepCounter += results.data.length;
						if (_config.preview && _stepCounter > _config.preview)
							_parser.abort();
						else
							userStep(_results, self);
					}
				};
			}
	
			/**
			 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
			 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
			 * when an input comes in multiple chunks, like from a file.
			 */
			this.parse = function(input, baseIndex, ignoreLastRow)
			{
				if (!_config.newline)
					_config.newline = guessLineEndings(input);
	
				_delimiterError = false;
				if (!_config.delimiter)
				{
					var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
					if (delimGuess.successful)
						_config.delimiter = delimGuess.bestDelimiter;
					else
					{
						_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
						_config.delimiter = Papa.DefaultDelimiter;
					}
					_results.meta.delimiter = _config.delimiter;
				}
				else if(isFunction(_config.delimiter))
				{
					_config.delimiter = _config.delimiter(input);
					_results.meta.delimiter = _config.delimiter;
				}
	
				var parserConfig = copy(_config);
				if (_config.preview && _config.header)
					parserConfig.preview++;	// to compensate for header row
	
				_input = input;
				_parser = new Parser(parserConfig);
				_results = _parser.parse(_input, baseIndex, ignoreLastRow);
				processResults();
				return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
			};
	
			this.paused = function()
			{
				return _paused;
			};
	
			this.pause = function()
			{
				_paused = true;
				_parser.abort();
				_input = _input.substr(_parser.getCharIndex());
			};
	
			this.resume = function()
			{
				_paused = false;
				self.streamer.parseChunk(_input);
			};
	
			this.aborted = function ()
			{
				return _aborted;
			};
	
			this.abort = function()
			{
				_aborted = true;
				_parser.abort();
				_results.meta.aborted = true;
				if (isFunction(_config.complete))
					_config.complete(_results);
				_input = '';
			};
	
			function processResults()
			{
				if (_results && _delimiterError)
				{
					addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
					_delimiterError = false;
				}
	
				if (_config.skipEmptyLines)
				{
					for (var i = 0; i < _results.data.length; i++)
						if (_results.data[i].length === 1 && _results.data[i][0] === '')
							_results.data.splice(i--, 1);
				}
	
				if (needsHeaderRow())
					fillHeaderFields();
	
				return applyHeaderAndDynamicTyping();
			}
	
			function needsHeaderRow()
			{
				return _config.header && _fields.length === 0;
			}
	
			function fillHeaderFields()
			{
				if (!_results)
					return;
				for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
					for (var j = 0; j < _results.data[i].length; j++)
						_fields.push(_results.data[i][j]);
				_results.data.splice(0, 1);
			}
	
			function shouldApplyDynamicTyping(field) {
				// Cache function values to avoid calling it for each row
				if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
					_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
				}
				return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
			}
	
			function parseDynamic(field, value)
			{
				if (shouldApplyDynamicTyping(field))
				{
					if (value === 'true' || value === 'TRUE')
						return true;
					else if (value === 'false' || value === 'FALSE')
						return false;
					else
						return tryParseFloat(value);
				}
				return value;
			}
	
			function applyHeaderAndDynamicTyping()
			{
				if (!_results || (!_config.header && !_config.dynamicTyping))
					return _results;
	
				for (var i = 0; i < _results.data.length; i++)
				{
					var row = _config.header ? {} : [];
	
					for (var j = 0; j < _results.data[i].length; j++)
					{
						var field = j;
						var value = _results.data[i][j];
	
						if (_config.header)
							field = j >= _fields.length ? '__parsed_extra' : _fields[j];
	
						value = parseDynamic(field, value);
	
						if (field === '__parsed_extra')
						{
							row[field] = row[field] || [];
							row[field].push(value);
						}
						else
							row[field] = value;
					}
	
					_results.data[i] = row;
	
					if (_config.header)
					{
						if (j > _fields.length)
							addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
						else if (j < _fields.length)
							addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					}
				}
	
				if (_config.header && _results.meta)
					_results.meta.fields = _fields;
				return _results;
			}
	
			function guessDelimiter(input, newline, skipEmptyLines)
			{
				var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
				var bestDelim, bestDelta, fieldCountPrevRow;
	
				for (var i = 0; i < delimChoices.length; i++)
				{
					var delim = delimChoices[i];
					var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
					fieldCountPrevRow = undefined;
	
					var preview = new Parser({
						delimiter: delim,
						newline: newline,
						preview: 10
					}).parse(input);
	
					for (var j = 0; j < preview.data.length; j++)
					{
						if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
							emptyLinesCount++
							continue
						}
						var fieldCount = preview.data[j].length;
						avgFieldCount += fieldCount;
	
						if (typeof fieldCountPrevRow === 'undefined')
						{
							fieldCountPrevRow = fieldCount;
							continue;
						}
						else if (fieldCount > 1)
						{
							delta += Math.abs(fieldCount - fieldCountPrevRow);
							fieldCountPrevRow = fieldCount;
						}
					}
	
					if (preview.data.length > 0)
						avgFieldCount /= (preview.data.length - emptyLinesCount);
	
					if ((typeof bestDelta === 'undefined' || delta < bestDelta)
						&& avgFieldCount > 1.99)
					{
						bestDelta = delta;
						bestDelim = delim;
					}
				}
	
				_config.delimiter = bestDelim;
	
				return {
					successful: !!bestDelim,
					bestDelimiter: bestDelim
				}
			}
	
			function guessLineEndings(input)
			{
				input = input.substr(0, 1024*1024);	// max length 1 MB
	
				var r = input.split('\r');
	
				var n = input.split('\n');
	
				var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);
	
				if (r.length === 1 || nAppearsFirst)
					return '\n';
	
				var numWithN = 0;
				for (var i = 0; i < r.length; i++)
				{
					if (r[i][0] === '\n')
						numWithN++;
				}
	
				return numWithN >= r.length / 2 ? '\r\n' : '\r';
			}
	
			function tryParseFloat(val)
			{
				var isNumber = FLOAT.test(val);
				return isNumber ? parseFloat(val) : val;
			}
	
			function addError(type, code, msg, row)
			{
				_results.errors.push({
					type: type,
					code: code,
					message: msg,
					row: row
				});
			}
		}
	
	
	
	
	
		/** The core parser implements speedy and correct CSV parsing */
		function Parser(config)
		{
			// Unpack the config object
			config = config || {};
			var delim = config.delimiter;
			var newline = config.newline;
			var comments = config.comments;
			var step = config.step;
			var preview = config.preview;
			var fastMode = config.fastMode;
			var quoteChar = config.quoteChar || '"';
	
			// Delimiter must be valid
			if (typeof delim !== 'string'
				|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
				delim = ',';
	
			// Comment character must be valid
			if (comments === delim)
				throw 'Comment character same as delimiter';
			else if (comments === true)
				comments = '#';
			else if (typeof comments !== 'string'
				|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
				comments = false;
	
			// Newline must be valid: \r, \n, or \r\n
			if (newline != '\n' && newline != '\r' && newline != '\r\n')
				newline = '\n';
	
			// We're gonna need these at the Parser scope
			var cursor = 0;
			var aborted = false;
	
			this.parse = function(input, baseIndex, ignoreLastRow)
			{
				// For some reason, in Chrome, this speeds things up (!?)
				if (typeof input !== 'string')
					throw 'Input must be a string';
	
				// We don't need to compute some of these every time parse() is called,
				// but having them in a more local scope seems to perform better
				var inputLen = input.length,
					delimLen = delim.length,
					newlineLen = newline.length,
					commentsLen = comments.length;
				var stepIsFunction = isFunction(step);
	
				// Establish starting state
				cursor = 0;
				var data = [], errors = [], row = [], lastCursor = 0;
	
				if (!input)
					return returnable();
	
				if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
				{
					var rows = input.split(newline);
					for (var i = 0; i < rows.length; i++)
					{
						var row = rows[i];
						cursor += row.length;
						if (i !== rows.length - 1)
							cursor += newline.length;
						else if (ignoreLastRow)
							return returnable();
						if (comments && row.substr(0, commentsLen) === comments)
							continue;
						if (stepIsFunction)
						{
							data = [];
							pushRow(row.split(delim));
							doStep();
							if (aborted)
								return returnable();
						}
						else
							pushRow(row.split(delim));
						if (preview && i >= preview)
						{
							data = data.slice(0, preview);
							return returnable(true);
						}
					}
					return returnable();
				}
	
				var nextDelim = input.indexOf(delim, cursor);
				var nextNewline = input.indexOf(newline, cursor);
				var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');
	
				// Parser loop
				for (;;)
				{
					// Field has opening quote
					if (input[cursor] === quoteChar)
					{
						// Start our search for the closing quote where the cursor is
						var quoteSearch = cursor;
	
						// Skip the opening quote
						cursor++;
	
						for (;;)
						{
							// Find closing quote
							var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);
	
							//No other quotes are found - no other delimiters
							if (quoteSearch === -1)
							{
								if (!ignoreLastRow) {
									// No closing quote... what a pity
									errors.push({
										type: 'Quotes',
										code: 'MissingQuotes',
										message: 'Quoted field unterminated',
										row: data.length,	// row has yet to be inserted
										index: cursor
									});
								}
								return finish();
							}
	
							// Closing quote at EOF
							if (quoteSearch === inputLen-1)
							{
								var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
								return finish(value);
							}
	
							// If this quote is escaped, it's part of the data; skip it
							if (input[quoteSearch+1] === quoteChar)
							{
								quoteSearch++;
								continue;
							}
	
							// Closing quote followed by delimiter
							if (input[quoteSearch+1] === delim)
							{
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								cursor = quoteSearch + 1 + delimLen;
								nextDelim = input.indexOf(delim, cursor);
								nextNewline = input.indexOf(newline, cursor);
								break;
							}
	
							// Closing quote followed by newline
							if (input.substr(quoteSearch+1, newlineLen) === newline)
							{
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								saveRow(quoteSearch + 1 + newlineLen);
								nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field
	
								if (stepIsFunction)
								{
									doStep();
									if (aborted)
										return returnable();
								}
	
								if (preview && data.length >= preview)
									return returnable(true);
	
								break;
							}
	
	
							// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
							errors.push({
								type: 'Quotes',
								code: 'InvalidQuotes',
								message: 'Trailing quote on quoted field is malformed',
								row: data.length,	// row has yet to be inserted
								index: cursor
							});
	
							quoteSearch++;
							continue;
	
						}
	
						continue;
					}
	
					// Comment found at start of new line
					if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
					{
						if (nextNewline === -1)	// Comment ends at EOF
							return returnable();
						cursor = nextNewline + newlineLen;
						nextNewline = input.indexOf(newline, cursor);
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}
	
					// Next delimiter comes before next newline, so we've reached end of field
					if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
					{
						row.push(input.substring(cursor, nextDelim));
						cursor = nextDelim + delimLen;
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}
	
					// End of row
					if (nextNewline !== -1)
					{
						row.push(input.substring(cursor, nextNewline));
						saveRow(nextNewline + newlineLen);
	
						if (stepIsFunction)
						{
							doStep();
							if (aborted)
								return returnable();
						}
	
						if (preview && data.length >= preview)
							return returnable(true);
	
						continue;
					}
	
					break;
				}
	
	
				return finish();
	
	
				function pushRow(row)
				{
					data.push(row);
					lastCursor = cursor;
				}
	
				/**
				 * Appends the remaining input from cursor to the end into
				 * row, saves the row, calls step, and returns the results.
				 */
				function finish(value)
				{
					if (ignoreLastRow)
						return returnable();
					if (typeof value === 'undefined')
						value = input.substr(cursor);
					row.push(value);
					cursor = inputLen;	// important in case parsing is paused
					pushRow(row);
					if (stepIsFunction)
						doStep();
					return returnable();
				}
	
				/**
				 * Appends the current row to the results. It sets the cursor
				 * to newCursor and finds the nextNewline. The caller should
				 * take care to execute user's step function and check for
				 * preview and end parsing if necessary.
				 */
				function saveRow(newCursor)
				{
					cursor = newCursor;
					pushRow(row);
					row = [];
					nextNewline = input.indexOf(newline, cursor);
				}
	
				/** Returns an object with the results, errors, and meta. */
				function returnable(stopped)
				{
					return {
						data: data,
						errors: errors,
						meta: {
							delimiter: delim,
							linebreak: newline,
							aborted: aborted,
							truncated: !!stopped,
							cursor: lastCursor + (baseIndex || 0)
						}
					};
				}
	
				/** Executes the user's step function and resets data & errors. */
				function doStep()
				{
					step(returnable());
					data = [], errors = [];
				}
			};
	
			/** Sets the abort flag */
			this.abort = function()
			{
				aborted = true;
			};
	
			/** Gets the cursor position */
			this.getCharIndex = function()
			{
				return cursor;
			};
		}
	
	
		// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
		// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
		function getScriptPath()
		{
			var scripts = document.getElementsByTagName('script');
			return scripts.length ? scripts[scripts.length - 1].src : '';
		}
	
		function newWorker()
		{
			if (!Papa.WORKERS_SUPPORTED)
				return false;
			if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
				throw new Error(
					'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
					'You need to set Papa.SCRIPT_PATH manually.'
				);
			var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
			// Append 'papaworker' to the search string to tell papaparse that this is our worker.
			workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
			var w = new global.Worker(workerUrl);
			w.onmessage = mainThreadReceivedMessage;
			w.id = workerIdCounter++;
			workers[w.id] = w;
			return w;
		}
	
		/** Callback when main thread receives a message */
		function mainThreadReceivedMessage(e)
		{
			var msg = e.data;
			var worker = workers[msg.workerId];
			var aborted = false;
	
			if (msg.error)
				worker.userError(msg.error, msg.file);
			else if (msg.results && msg.results.data)
			{
				var abort = function() {
					aborted = true;
					completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
				};
	
				var handle = {
					abort: abort,
					pause: notImplemented,
					resume: notImplemented
				};
	
				if (isFunction(worker.userStep))
				{
					for (var i = 0; i < msg.results.data.length; i++)
					{
						worker.userStep({
							data: [msg.results.data[i]],
							errors: msg.results.errors,
							meta: msg.results.meta
						}, handle);
						if (aborted)
							break;
					}
					delete msg.results;	// free memory ASAP
				}
				else if (isFunction(worker.userChunk))
				{
					worker.userChunk(msg.results, handle, msg.file);
					delete msg.results;
				}
			}
	
			if (msg.finished && !aborted)
				completeWorker(msg.workerId, msg.results);
		}
	
		function completeWorker(workerId, results) {
			var worker = workers[workerId];
			if (isFunction(worker.userComplete))
				worker.userComplete(results);
			worker.terminate();
			delete workers[workerId];
		}
	
		function notImplemented() {
			throw 'Not implemented.';
		}
	
		/** Callback when worker thread receives a message */
		function workerThreadReceivedMessage(e)
		{
			var msg = e.data;
	
			if (typeof Papa.WORKER_ID === 'undefined' && msg)
				Papa.WORKER_ID = msg.workerId;
	
			if (typeof msg.input === 'string')
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: Papa.parse(msg.input, msg.config),
					finished: true
				});
			}
			else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
			{
				var results = Papa.parse(msg.input, msg.config);
				if (results)
					global.postMessage({
						workerId: Papa.WORKER_ID,
						results: results,
						finished: true
					});
			}
		}
	
		/** Makes a deep copy of an array or object (mostly) */
		function copy(obj)
		{
			if (typeof obj !== 'object')
				return obj;
			var cpy = obj instanceof Array ? [] : {};
			for (var key in obj)
				cpy[key] = copy(obj[key]);
			return cpy;
		}
	
		function bindFunction(f, self)
		{
			return function() { f.apply(self, arguments); };
		}
	
		function isFunction(func)
		{
			return typeof func === 'function';
		}
	
		return Papa;
	}));


/***/ }),

/***/ 902:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(1094);
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return {};
		}
	
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
	
			return ret;
		}, {});
	};
	
	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return key;
			}
	
			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}
	
			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var PropTypes = __webpack_require__(8);
	var specialAssign = __webpack_require__(164);
	
	var checkedProps = {
	  children: PropTypes.node.isRequired,
	  disabled: PropTypes.bool,
	  tag: PropTypes.string
	};
	
	var AriaMenuButtonButton = function (_React$Component) {
	  _inherits(AriaMenuButtonButton, _React$Component);
	
	  function AriaMenuButtonButton() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, AriaMenuButtonButton);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AriaMenuButtonButton.__proto__ || Object.getPrototypeOf(AriaMenuButtonButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (event) {
	      if (_this.props.disabled) return;
	
	      var ambManager = _this.context.ambManager;
	
	      switch (event.key) {
	        case 'ArrowDown':
	          event.preventDefault();
	          if (!ambManager.isOpen) {
	            ambManager.openMenu({ focusMenu: true });
	          } else {
	            ambManager.focusItem(0);
	          }
	          break;
	        case 'Enter':
	        case ' ':
	          event.preventDefault();
	          ambManager.toggleMenu();
	          break;
	        case 'Escape':
	          ambManager.handleMenuKey(event);
	          break;
	        default:
	          // (Potential) letter keys
	          ambManager.handleButtonNonArrowKey(event);
	      }
	    }, _this.handleClick = function () {
	      if (_this.props.disabled) return;
	      _this.context.ambManager.toggleMenu();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(AriaMenuButtonButton, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.context.ambManager.button = this;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.context.ambManager.destroy();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	
	      var buttonProps = {
	        // "The menu button itself has a role of button."
	        role: 'button',
	        tabIndex: props.disabled ? '' : '0',
	        // "The menu button has an aria-haspopup property, set to true."
	        'aria-haspopup': true,
	        'aria-expanded': this.context.ambManager.isOpen,
	        'aria-disabled': props.disabled,
	        onKeyDown: this.handleKeyDown,
	        onClick: this.handleClick,
	        onBlur: this.context.ambManager.handleBlur
	      };
	
	      specialAssign(buttonProps, props, checkedProps);
	
	      return React.createElement(props.tag, buttonProps, props.children);
	    }
	  }]);
	
	  return AriaMenuButtonButton;
	}(React.Component);
	
	AriaMenuButtonButton.propTypes = checkedProps;
	AriaMenuButtonButton.contextTypes = {
	  ambManager: PropTypes.object.isRequired
	};
	AriaMenuButtonButton.defaultProps = { tag: 'span' };
	
	
	module.exports = AriaMenuButtonButton;

/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp2;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(62);
	var PropTypes = __webpack_require__(8);
	var createTapListener = __webpack_require__(1096);
	var specialAssign = __webpack_require__(164);
	
	var checkedProps = {
	  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
	  tag: PropTypes.string
	};
	
	module.exports = (_temp2 = _class = function (_React$Component) {
	  _inherits(_class, _React$Component);
	
	  function _class() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, _class);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.addTapListener = function () {
	      var el = ReactDOM.findDOMNode(_this);
	      if (!el) return;
	      var doc = el.ownerDocument;
	      if (!doc) return;
	      _this.tapListener = createTapListener(doc.documentElement, _this.handleTap);
	    }, _this.handleTap = function (event) {
	      if (ReactDOM.findDOMNode(_this).contains(event.target)) return;
	      if (ReactDOM.findDOMNode(_this.context.ambManager.button).contains(event.target)) return;
	      _this.context.ambManager.closeMenu();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(_class, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.context.ambManager.menu = this;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var ambManager = this.context.ambManager;
	      if (ambManager.isOpen && !this.tapListener) {
	        this.addTapListener();
	      } else if (!ambManager.isOpen && this.tapListener) {
	        this.tapListener.remove();
	        delete this.tapListener;
	      }
	
	      if (!ambManager.isOpen) {
	        // Clear the ambManager's items, so they
	        // can be reloaded next time this menu opens
	        ambManager.clearItems();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.tapListener) this.tapListener.remove();
	      this.context.ambManager.destroy();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var ambManager = this.context.ambManager;
	
	      var childrenToRender = function () {
	        if (typeof props.children === 'function') {
	          return props.children({ isOpen: ambManager.isOpen });
	        }
	        if (ambManager.isOpen) return props.children;
	        return false;
	      }();
	
	      if (!childrenToRender) return false;
	
	      var menuProps = {
	        onKeyDown: ambManager.handleMenuKey,
	        role: 'menu',
	        onBlur: ambManager.handleBlur
	      };
	
	      specialAssign(menuProps, props, checkedProps);
	
	      return React.createElement(props.tag, menuProps, childrenToRender);
	    }
	  }]);
	
	  return _class;
	}(React.Component), _class.propTypes = checkedProps, _class.defaultProps = { tag: 'div' }, _class.contextTypes = {
	  ambManager: PropTypes.object.isRequired
	}, _temp2);

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var PropTypes = __webpack_require__(8);
	var specialAssign = __webpack_require__(164);
	
	var checkedProps = {
	  children: PropTypes.node.isRequired,
	  tag: PropTypes.string,
	  text: PropTypes.string,
	  value: PropTypes.any
	};
	
	var AriaMenuButtonMenuItem = function (_React$Component) {
	  _inherits(AriaMenuButtonMenuItem, _React$Component);
	
	  function AriaMenuButtonMenuItem() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, AriaMenuButtonMenuItem);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AriaMenuButtonMenuItem.__proto__ || Object.getPrototypeOf(AriaMenuButtonMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (event) {
	      if (event.key !== 'Enter' && event.key !== ' ') return;
	      event.preventDefault();
	      _this.selectItem(event);
	    }, _this.selectItem = function (event) {
	      // If there's no value, we'll send the child
	      var value = typeof _this.props.value !== 'undefined' ? _this.props.value : _this.props.children;
	      _this.context.ambManager.handleSelection(value, event);
	    }, _this.registerNode = function (node) {
	      _this.node = node;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(AriaMenuButtonMenuItem, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.ambManager.addItem({
	        node: this.node,
	        text: this.props.text
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var menuItemProps = {
	        onClick: this.selectItem,
	        onKeyDown: this.handleKeyDown,
	        role: 'menuitem',
	        tabIndex: '-1',
	        ref: this.registerNode
	      };
	
	      specialAssign(menuItemProps, this.props, checkedProps);
	
	      return React.createElement(this.props.tag, menuItemProps, this.props.children);
	    }
	  }]);
	
	  return AriaMenuButtonMenuItem;
	}(React.Component);
	
	AriaMenuButtonMenuItem.propTypes = checkedProps;
	AriaMenuButtonMenuItem.defaultProps = { tag: 'div' };
	AriaMenuButtonMenuItem.contextTypes = {
	  ambManager: PropTypes.object.isRequired
	};
	
	
	module.exports = AriaMenuButtonMenuItem;

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var PropTypes = __webpack_require__(8);
	var createManager = __webpack_require__(907);
	var specialAssign = __webpack_require__(164);
	
	var checkedProps = {
	  children: PropTypes.node.isRequired,
	  onMenuToggle: PropTypes.func,
	  onSelection: PropTypes.func.isRequired,
	  closeOnSelection: PropTypes.bool,
	  tag: PropTypes.string
	};
	
	var AriaMenuButtonWrapper = function (_React$Component) {
	  _inherits(AriaMenuButtonWrapper, _React$Component);
	
	  function AriaMenuButtonWrapper() {
	    _classCallCheck(this, AriaMenuButtonWrapper);
	
	    return _possibleConstructorReturn(this, (AriaMenuButtonWrapper.__proto__ || Object.getPrototypeOf(AriaMenuButtonWrapper)).apply(this, arguments));
	  }
	
	  _createClass(AriaMenuButtonWrapper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        ambManager: this.manager
	      };
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.manager = createManager({
	        onMenuToggle: this.props.onMenuToggle,
	        onSelection: this.props.onSelection,
	        closeOnSelection: this.props.closeOnSelection,
	        id: this.props.id
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var wrapperProps = {};
	      specialAssign(wrapperProps, this.props, checkedProps);
	      return React.createElement(this.props.tag, wrapperProps, this.props.children);
	    }
	  }]);
	
	  return AriaMenuButtonWrapper;
	}(React.Component);
	
	AriaMenuButtonWrapper.propTypes = checkedProps;
	AriaMenuButtonWrapper.defaultProps = { tag: 'div' };
	AriaMenuButtonWrapper.childContextTypes = {
	  ambManager: PropTypes.object
	};
	
	
	module.exports = AriaMenuButtonWrapper;

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var ReactDOM = __webpack_require__(62);
	var createFocusGroup = __webpack_require__(674);
	var externalStateControl = __webpack_require__(393);
	
	var focusGroupOptions = {
	  wrap: true,
	  stringSearch: true
	};
	
	var protoManager = {
	  init: function init(options) {
	    this.options = options || {};
	
	    if (typeof this.options.closeOnSelection === 'undefined') {
	      this.options.closeOnSelection = true;
	    }
	
	    if (this.options.id) {
	      externalStateControl.registerManager(this.options.id, this);
	    }
	
	    this.handleBlur = handleBlur.bind(this);
	    this.handleSelection = handleSelection.bind(this);
	    this.handleMenuKey = handleMenuKey.bind(this);
	
	    // "With focus on the drop-down menu, the Up and Down Arrow
	    // keys move focus within the menu items, "wrapping" at the top and bottom."
	    // "Typing a letter (printable character) key moves focus to the next
	    // instance of a visible node whose title begins with that printable letter."
	    //
	    // All of the above is handled by focus-group.
	    this.focusGroup = createFocusGroup(focusGroupOptions);
	
	    // These component references are added when the relevant components mount
	    this.button = null;
	    this.menu = null;
	
	    // State trackers
	    this.isOpen = false;
	  },
	  focusItem: function focusItem(index) {
	    this.focusGroup.focusNodeAtIndex(index);
	  },
	  addItem: function addItem(item) {
	    this.focusGroup.addMember(item);
	  },
	  clearItems: function clearItems() {
	    this.focusGroup.clearMembers();
	  },
	  handleButtonNonArrowKey: function handleButtonNonArrowKey(event) {
	    this.focusGroup._handleUnboundKey(event);
	  },
	  destroy: function destroy() {
	    this.button = null;
	    this.menu = null;
	    this.focusGroup.deactivate();
	    clearTimeout(this.blurTimer);
	    clearTimeout(this.moveFocusTimer);
	  },
	  update: function update() {
	    this.menu.setState({ isOpen: this.isOpen });
	    this.button.setState({ menuOpen: this.isOpen });
	    this.options.onMenuToggle && this.options.onMenuToggle({ isOpen: this.isOpen });
	  },
	  openMenu: function openMenu(openOptions) {
	    if (this.isOpen) return;
	    openOptions = openOptions || {};
	    this.isOpen = true;
	    this.update();
	    this.focusGroup.activate();
	    if (openOptions.focusMenu) {
	      var self = this;
	      this.moveFocusTimer = setTimeout(function () {
	        self.focusItem(0);
	      }, 0);
	    }
	  },
	  closeMenu: function closeMenu(closeOptions) {
	    if (!this.isOpen) return;
	    closeOptions = closeOptions || {};
	    this.isOpen = false;
	    this.update();
	    if (closeOptions.focusButton) {
	      ReactDOM.findDOMNode(this.button).focus();
	    }
	  },
	  toggleMenu: function toggleMenu() {
	    if (this.isOpen) {
	      this.closeMenu();
	    } else {
	      this.openMenu();
	    }
	  }
	};
	
	function handleBlur() {
	  var self = this;
	  self.blurTimer = setTimeout(function () {
	    var buttonNode = ReactDOM.findDOMNode(self.button);
	    var menuNode = ReactDOM.findDOMNode(self.menu);
	    var activeEl = buttonNode.ownerDocument.activeElement;
	    if (buttonNode && activeEl === buttonNode) return;
	    if (menuNode && menuNode.contains(activeEl)) return;
	    if (self.isOpen) self.closeMenu({ focusButton: false });
	  }, 0);
	}
	
	function handleSelection(value, event) {
	  if (this.options.closeOnSelection) this.closeMenu({ focusButton: true });
	  this.options.onSelection(value, event);
	}
	
	function handleMenuKey(event) {
	  // "With focus on the drop-down menu, pressing Escape closes
	  // the menu and returns focus to the button.
	  if (this.isOpen && event.key === 'Escape') {
	    event.preventDefault();
	    this.closeMenu({ focusButton: true });
	  }
	}
	
	module.exports = function (options) {
	  var newManager = Object.create(protoManager);
	  newManager.init(options);
	  return newManager;
	};

/***/ }),

/***/ 990:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {
	
	  contextTypes: {
	    history: _InternalPropTypes.history
	  },
	
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};
	
	exports.default = History;
	module.exports = exports['default'];

/***/ }),

/***/ 991:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Link = __webpack_require__(421);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2.default.createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});
	
	exports.default = IndexLink;
	module.exports = exports['default'];

/***/ }),

/***/ 992:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Redirect = __webpack_require__(422);
	
	var _Redirect2 = _interopRequireDefault(_Redirect);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */
	
	var IndexRedirect = _react2.default.createClass({
	  displayName: 'IndexRedirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
	      } else {
	         false ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRedirect;
	module.exports = exports['default'];

/***/ }),

/***/ 993:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react2.default.PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	
	var IndexRoute = _react2.default.createClass({
	  displayName: 'IndexRoute',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	         false ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRoute;
	module.exports = exports['default'];

/***/ }),

/***/ 994:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	
	var Lifecycle = {
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  componentDidMount: function componentDidMount() {
	     false ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ?  false ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;
	
	    var route = this.props.route || this.context.route;
	
	    !route ?  false ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;
	
	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};
	
	exports.default = Lifecycle;
	module.exports = exports['default'];

/***/ }),

/***/ 995:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */
	
	var Route = _react2.default.createClass({
	  displayName: 'Route',
	
	
	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },
	
	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Route;
	module.exports = exports['default'];

/***/ }),

/***/ 996:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};
	
	exports.default = RouteContext;
	module.exports = exports['default'];

/***/ }),

/***/ 997:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createHashHistory = __webpack_require__(330);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _useQueries = __webpack_require__(143);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createTransitionManager = __webpack_require__(273);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _InternalPropTypes = __webpack_require__(64);
	
	var _RouterContext = __webpack_require__(170);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _RouterUtils = __webpack_require__(423);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}
	
	/* istanbul ignore next: sanity check */
	function isUnsupportedHistory(history) {
	  // v3 histories expose getCurrentLocation, but aren't currently supported.
	  return history && history.getCurrentLocation;
	}
	
	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */
	
	var Router = _react2.default.createClass({
	  displayName: 'Router',
	
	
	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,
	
	    // Deprecated:
	    parseQueryString: func,
	    stringifyQuery: func,
	
	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2.default.createElement(_RouterContext2.default, props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;
	
	     false ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;
	
	    var _createRouterObjects = this.createRouterObjects();
	
	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;
	
	
	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	
	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;
	
	    if (matchContext) {
	      return matchContext;
	    }
	
	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;
	
	
	    !!isUnsupportedHistory(history) ?  false ? (0, _invariant2.default)(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }
	
	    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;
	
	
	    var createHistory = void 0;
	    if (history) {
	       false ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	       false ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2.default;
	    }
	
	    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },
	
	
	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	     false ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;
	
	     false ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;
	
	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);
	
	    if (location == null) return null; // Async match
	
	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });
	
	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});
	
	exports.default = Router;
	module.exports = exports['default'];

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(170);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RoutingContext = _react2.default.createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2.default.createElement(_RouterContext2.default, this.props);
	  }
	});
	
	exports.default = RoutingContext;
	module.exports = exports['default'];

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(271);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    hook.apply(route, args);
	
	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));
	
	    return hooks;
	  }, []);
	}
	
	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}
	
	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	       false ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };
	
	      return;
	    }
	
	    redirectInfo = location;
	  }
	
	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes, prevState) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
	  }
	}

/***/ }),

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(170);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  if (false) {
	    middlewares.forEach(function (middleware, index) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
	    });
	  }
	
	  var withContext = middlewares.map(function (middleware) {
	    return middleware.renderRouterContext;
	  }).filter(Boolean);
	  var withComponent = middlewares.map(function (middleware) {
	    return middleware.renderRouteComponent;
	  }).filter(Boolean);
	
	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };
	
	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};
	
	module.exports = exports['default'];

/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createBrowserHistory = __webpack_require__(676);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _createRouterHistory = __webpack_require__(425);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
	module.exports = exports['default'];

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(91);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });
	
	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();
	
	      enterRoutes = [];
	      changeRoutes = [];
	
	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;
	
	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports.default = computeChangedRoutes;
	module.exports = exports['default'];

/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(271);
	
	var _makeStateWithLocation = __webpack_require__(426);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }
	
	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }
	
	  var location = nextState.location;
	
	  var nextStateWithLocation = (0, _makeStateWithLocation2.default)(nextState, location);
	
	  getComponent.call(route, nextStateWithLocation, callback);
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}
	
	exports.default = getComponents;
	module.exports = exports['default'];

/***/ }),

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(91);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
	    if (Object.prototype.hasOwnProperty.call(params, p)) {
	      routeParams[p] = params[p];
	    }
	  });
	
	  return routeParams;
	}
	
	exports.default = getRouteParams;
	module.exports = exports['default'];

/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createHashHistory = __webpack_require__(330);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _createRouterHistory = __webpack_require__(425);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
	module.exports = exports['default'];

/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = isActive;
	
	var _PatternUtils = __webpack_require__(91);
	
	function deepEqual(a, b) {
	  if (a == b) return true;
	
	  if (a == null || b == null) return false;
	
	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }
	
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }
	
	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  return String(a) === String(b);
	}
	
	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }
	
	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }
	
	  return currentPathname === pathname;
	}
	
	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];
	
	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';
	
	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }
	
	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	
	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }
	
	  return false;
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  return deepEqual(query, activeQuery);
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;
	
	  if (currentLocation == null) return false;
	
	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }
	
	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }
	
	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _Actions = __webpack_require__(79);
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _createMemoryHistory = __webpack_require__(424);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _createTransitionManager = __webpack_require__(273);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _RouteUtils = __webpack_require__(50);
	
	var _RouterUtils = __webpack_require__(423);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;
	
	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);
	
	  !(history || location) ?  false ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;
	
	  history = history ? history : (0, _createMemoryHistory2.default)(options);
	  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));
	
	  var unlisten = void 0;
	
	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }
	
	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation && router.createLocation(redirectLocation, _Actions.REPLACE), nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));
	
	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}
	
	exports.default = match;
	module.exports = exports['default'];

/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = matchRoutes;
	
	var _AsyncUtils = __webpack_require__(271);
	
	var _makeStateWithLocation = __webpack_require__(426);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	var _PatternUtils = __webpack_require__(91);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _RouteUtils = __webpack_require__(50);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getChildRoutes(route, location, paramNames, paramValues, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }
	
	  var sync = true,
	      result = void 0;
	
	  var partialNextState = {
	    location: location,
	    params: createParams(paramNames, paramValues)
	  };
	
	  var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }
	
	    callback(error, childRoutes);
	  });
	
	  sync = false;
	  return result; // Might be undefined.
	}
	
	function getIndexRoute(route, location, paramNames, paramValues, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    var partialNextState = {
	      location: location,
	      params: createParams(paramNames, paramValues)
	    };
	
	    var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });
	
	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }
	
	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }
	
	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };
	
	        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;
	
	               false ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	               false ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }
	
	            callback(null, match);
	          }
	        });
	
	        return {
	          v: void 0
	        };
	      }();
	
	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }
	
	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };
	
	    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	
	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }
	
	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _useQueries = __webpack_require__(143);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _createTransitionManager = __webpack_require__(273);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _routerWarning = __webpack_require__(14);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	   false ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;
	
	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var routes = _ref.routes;
	
	    var options = _objectWithoutProperties(_ref, ['routes']);
	
	    var history = (0, _useQueries2.default)(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}
	
	exports.default = useRoutes;
	module.exports = exports['default'];

/***/ }),

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = withRouter;
	
	var _invariant = __webpack_require__(13);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hoistNonReactStatics = __webpack_require__(144);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _PropTypes = __webpack_require__(272);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	function withRouter(WrappedComponent, options) {
	  var withRef = options && options.withRef;
	
	  var WithRouter = _react2.default.createClass({
	    displayName: 'WithRouter',
	
	    contextTypes: { router: _PropTypes.routerShape },
	    propTypes: { router: _PropTypes.routerShape },
	
	    getWrappedInstance: function getWrappedInstance() {
	      !withRef ?  false ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;
	
	      return this.wrappedInstance;
	    },
	    render: function render() {
	      var _this = this;
	
	      var router = this.props.router || this.context.router;
	      var props = _extends({}, this.props, { router: router });
	
	      if (withRef) {
	        props.ref = function (c) {
	          _this.wrappedInstance = c;
	        };
	      }
	
	      return _react2.default.createElement(WrappedComponent, props);
	    }
	  });
	
	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;
	
	  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 1011:
34,

/***/ 1024:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


/***/ }),

/***/ 1025:
/***/ (function(module, exports, __webpack_require__) {

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
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	'use strict';
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(434);
	
	/*<replacement>*/
	var util = __webpack_require__(100);
	util.inherits = __webpack_require__(80);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ }),

/***/ 1026:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*<replacement>*/
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Buffer = __webpack_require__(177).Buffer;
	/*</replacement>*/
	
	function copyBuffer(src, target, offset) {
	  src.copy(target, offset);
	}
	
	module.exports = function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);
	
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }
	
	  BufferList.prototype.push = function push(v) {
	    var entry = { data: v, next: null };
	    if (this.length > 0) this.tail.next = entry;else this.head = entry;
	    this.tail = entry;
	    ++this.length;
	  };
	
	  BufferList.prototype.unshift = function unshift(v) {
	    var entry = { data: v, next: this.head };
	    if (this.length === 0) this.tail = entry;
	    this.head = entry;
	    ++this.length;
	  };
	
	  BufferList.prototype.shift = function shift() {
	    if (this.length === 0) return;
	    var ret = this.head.data;
	    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	    --this.length;
	    return ret;
	  };
	
	  BufferList.prototype.clear = function clear() {
	    this.head = this.tail = null;
	    this.length = 0;
	  };
	
	  BufferList.prototype.join = function join(s) {
	    if (this.length === 0) return '';
	    var p = this.head;
	    var ret = '' + p.data;
	    while (p = p.next) {
	      ret += s + p.data;
	    }return ret;
	  };
	
	  BufferList.prototype.concat = function concat(n) {
	    if (this.length === 0) return Buffer.alloc(0);
	    if (this.length === 1) return this.head.data;
	    var ret = Buffer.allocUnsafe(n >>> 0);
	    var p = this.head;
	    var i = 0;
	    while (p) {
	      copyBuffer(p.data, ret, i);
	      i += p.data.length;
	      p = p.next;
	    }
	    return ret;
	  };
	
	  return BufferList;
	}();

/***/ }),

/***/ 1027:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(276).PassThrough


/***/ }),

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(275);


/***/ }),

/***/ 1090:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(40)))

/***/ }),

/***/ 1092:
/***/ (function(module, exports, __webpack_require__) {

	//filter will reemit the data if cb(err,pass) pass is truthy
	
	// reduce is more tricky
	// maybe we want to group the reductions or emit progress updates occasionally
	// the most basic reduce just emits one 'data' event after it has recieved 'end'
	
	
	var through = __webpack_require__(453)
	var Decoder = __webpack_require__(285).StringDecoder
	
	module.exports = split
	
	//TODO pass in a function to map across the lines.
	
	function split (matcher, mapper, options) {
	  var decoder = new Decoder()
	  var soFar = ''
	  var maxLength = options && options.maxLength;
	  var trailing = options && options.trailing === false ? false : true
	  if('function' === typeof matcher)
	    mapper = matcher, matcher = null
	  if (!matcher)
	    matcher = /\r?\n/
	
	  function emit(stream, piece) {
	    if(mapper) {
	      try {
	        piece = mapper(piece)
	      }
	      catch (err) {
	        return stream.emit('error', err)
	      }
	      if('undefined' !== typeof piece)
	        stream.queue(piece)
	    }
	    else
	      stream.queue(piece)
	  }
	
	  function next (stream, buffer) {
	    var pieces = ((soFar != null ? soFar : '') + buffer).split(matcher)
	    soFar = pieces.pop()
	
	    if (maxLength && soFar.length > maxLength)
	      return stream.emit('error', new Error('maximum buffer reached'))
	
	    for (var i = 0; i < pieces.length; i++) {
	      var piece = pieces[i]
	      emit(stream, piece)
	    }
	  }
	
	  return through(function (b) {
	    next(this, decoder.write(b))
	  },
	  function () {
	    if(decoder.end)
	      next(this, decoder.end())
	    if(trailing && soFar != null)
	      emit(this, soFar)
	    this.queue(null)
	  })
	}


/***/ }),

/***/ 1093:
/***/ (function(module, exports, __webpack_require__) {

	var duplexer = __webpack_require__(655)
	var through = __webpack_require__(453)
	
	module.exports = function () {
	  var streams
	
	  if(arguments.length == 1 && Array.isArray(arguments[0])) {
	    streams = arguments[0]
	  } else {
	    streams = [].slice.call(arguments)
	  }
	
	  if(streams.length == 0)
	    return through()
	  else if(streams.length == 1)
	    return streams[0]
	
	  var first = streams[0]
	    , last = streams[streams.length - 1]
	    , thepipe = duplexer(first, last)
	
	  //pipe all the streams together
	
	  function recurse (streams) {
	    if(streams.length < 2)
	      return
	    streams[0].pipe(streams[1])
	    recurse(streams.slice(1))
	  }
	
	  recurse(streams)
	
	  function onerror () {
	    var args = [].slice.call(arguments)
	    args.unshift('error')
	    thepipe.emit.apply(thepipe, args)
	  }
	
	  //es.duplex already reemits the error from the first and last stream.
	  //add a listener for the inner streams in the pipeline.
	  for(var i = 1; i < streams.length - 1; i ++)
	    streams[i].on('error', onerror)
	
	  return thepipe
	}


/***/ }),

/***/ 1094:
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }),

/***/ 1096:
/***/ (function(module, exports) {

	module.exports = function createTapListener(el, callback, useCapture) {
	  var startX = 0;
	  var startY = 0;
	  var touchStarted = false;
	  var touchMoved = false;
	  // Assume that if a touchstart event initiates, the user is
	  // using touch and click events should be ignored.
	  // If this isn't done, touch-clicks will fire the callback
	  // twice: once on touchend, once on the subsequent "click".
	  var usingTouch = false;
	
	  el.addEventListener('click', handleClick, useCapture);
	  el.addEventListener('touchstart', handleTouchstart, useCapture);
	
	  function handleClick(e) {
	    if (usingTouch) return;
	    callback(e);
	  }
	
	  function handleTouchstart(e) {
	    usingTouch = true;
	
	    if (touchStarted) return;
	    touchStarted = true;
	
	    el.addEventListener('touchmove', handleTouchmove, useCapture);
	    el.addEventListener('touchend', handleTouchend, useCapture);
	    el.addEventListener('touchcancel', handleTouchcancel, useCapture);
	
	    touchMoved = false;
	    startX = e.touches[0].clientX;
	    startY = e.touches[0].clientY;
	  }
	
	  function handleTouchmove(e) {
	    if (touchMoved) return;
	
	    if (
	      Math.abs(e.touches[0].clientX - startX) <= 10
	      && Math.abs(e.touches[0].clientY - startY) <= 10
	    ) return;
	
	    touchMoved = true;
	  }
	
	  function handleTouchend(e) {
	    touchStarted = false;
	    removeSecondaryTouchListeners();
	    if (!touchMoved) {
	      callback(e);
	    }
	  }
	
	  function handleTouchcancel() {
	    touchStarted = false;
	    touchMoved = false;
	    startX = 0;
	    startY = 0;
	  }
	
	  function removeSecondaryTouchListeners() {
	    el.removeEventListener('touchmove', handleTouchmove, useCapture);
	    el.removeEventListener('touchend', handleTouchend, useCapture);
	    el.removeEventListener('touchcancel', handleTouchcancel, useCapture);
	  }
	
	  function removeTapListener() {
	    el.removeEventListener('click', handleClick, useCapture);
	    el.removeEventListener('touchstart', handleTouchstart, useCapture);
	    removeSecondaryTouchListeners();
	  }
	
	  return {
	    remove: removeTapListener,
	  };
	};


/***/ }),

/***/ 1097:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Transform = __webpack_require__(437)
	  , inherits  = __webpack_require__(1102).inherits
	  , xtend     = __webpack_require__(1103)
	
	function DestroyableTransform(opts) {
	  Transform.call(this, opts)
	  this._destroyed = false
	}
	
	inherits(DestroyableTransform, Transform)
	
	DestroyableTransform.prototype.destroy = function(err) {
	  if (this._destroyed) return
	  this._destroyed = true
	  
	  var self = this
	  process.nextTick(function() {
	    if (err)
	      self.emit('error', err)
	    self.emit('close')
	  })
	}
	
	// a noop _transform function
	function noop (chunk, enc, callback) {
	  callback(null, chunk)
	}
	
	
	// create a new export function, used by both the main export and
	// the .ctor export, contains common logic for dealing with arguments
	function through2 (construct) {
	  return function (options, transform, flush) {
	    if (typeof options == 'function') {
	      flush     = transform
	      transform = options
	      options   = {}
	    }
	
	    if (typeof transform != 'function')
	      transform = noop
	
	    if (typeof flush != 'function')
	      flush = null
	
	    return construct(options, transform, flush)
	  }
	}
	
	
	// main export, just make me a transform stream!
	module.exports = through2(function (options, transform, flush) {
	  var t2 = new DestroyableTransform(options)
	
	  t2._transform = transform
	
	  if (flush)
	    t2._flush = flush
	
	  return t2
	})
	
	
	// make me a reusable prototype that I can `new`, or implicitly `new`
	// with a constructor call
	module.exports.ctor = through2(function (options, transform, flush) {
	  function Through2 (override) {
	    if (!(this instanceof Through2))
	      return new Through2(override)
	
	    this.options = xtend(options, override)
	
	    DestroyableTransform.call(this, this.options)
	  }
	
	  inherits(Through2, DestroyableTransform)
	
	  Through2.prototype._transform = transform
	
	  if (flush)
	    Through2.prototype._flush = flush
	
	  return Through2
	})
	
	
	module.exports.obj = through2(function (options, transform, flush) {
	  var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options))
	
	  t2._transform = transform
	
	  if (flush)
	    t2._flush = flush
	
	  return t2
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ }),

/***/ 1098:
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(1090);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 1099:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 1100:
80,

/***/ 1101:
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),

/***/ 1102:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(1101);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(1100);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(40)))

/***/ }),

/***/ 1103:
/***/ (function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ }),

/***/ 1107:
1104

});
//# sourceMappingURL=panel.js.map