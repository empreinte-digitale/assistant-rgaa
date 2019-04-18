webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(490);
	module.exports = __webpack_require__(657);


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = App;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _container = __webpack_require__(131);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ResizeHandle = __webpack_require__(488);
	
	var _ResizeHandle2 = _interopRequireDefault(_ResizeHandle);
	
	var _PanelIframe = __webpack_require__(487);
	
	var _PanelIframe2 = _interopRequireDefault(_PanelIframe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const HandlePosition = {
		right: 'left',
		left: 'right',
		bottom: 'top'
	};
	
	/**
	 *
	 */
	function App(_ref) {
		let position = _ref.position,
		    folded = _ref.folded;
	
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)({
					[`${_container.CONTAINER_ID}-wrapper`]: true,
					[`${_container.CONTAINER_ID}-wrapper--${position}`]: true,
					[`${_container.CONTAINER_ID}-wrapper--folded`]: folded
				})
			},
			_react2.default.createElement(
				_ResizeHandle2.default,
				{
					position: HandlePosition[position],
					enabled: !folded,
					useOverlay: true,
					handleProps: {
						title: 'Redimensionner le panneau'
					}
				},
				_react2.default.createElement(_PanelIframe2.default, null)
			)
		);
	}
	
	App.propTypes = {
		position: _react.PropTypes.oneOf(['left', 'right', 'bottom']).isRequired,
		folded: _react.PropTypes.bool.isRequired
	};

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _recompose = __webpack_require__(43);
	
	var _reactRedux = __webpack_require__(12);
	
	var _renderNothingUntil = __webpack_require__(127);
	
	var _renderNothingUntil2 = _interopRequireDefault(_renderNothingUntil);
	
	var _panel = __webpack_require__(71);
	
	var _panel2 = __webpack_require__(70);
	
	var _App = __webpack_require__(485);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		position: (0, _panel.getPosition)(state),
		folded: (0, _panel.isFolded)(state)
	});
	
	exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), (0, _renderNothingUntil2.default)((_ref) => {
		let position = _ref.position;
		return position !== _panel2.Position.popup;
	}))(_App2.default);

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = PanelIframe;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _container = __webpack_require__(131);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function PanelIframe() {
		const IFRAME_SRC = chrome.runtime.getURL(_container.IFRAME_FILE);
	
		return _react2.default.createElement('iframe', {
			src: IFRAME_SRC,
			className: `${_container.CONTAINER_ID}-panel`,
			style: {
				display: 'block'
			}
		});
	}

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _bindAll2 = __webpack_require__(835);
	
	var _bindAll3 = _interopRequireDefault(_bindAll2);
	
	var _omit2 = __webpack_require__(873);
	
	var _omit3 = _interopRequireDefault(_omit2);
	
	var _isEqual2 = __webpack_require__(865);
	
	var _isEqual3 = _interopRequireDefault(_isEqual2);
	
	var _upperFirst2 = __webpack_require__(389);
	
	var _upperFirst3 = _interopRequireDefault(_upperFirst2);
	
	var _assign2 = __webpack_require__(833);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _includes2 = __webpack_require__(113);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _isNumber2 = __webpack_require__(866);
	
	var _isNumber3 = _interopRequireDefault(_isNumber2);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDraggable = __webpack_require__(975);
	
	var _classnames = __webpack_require__(19);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _renderIf = __webpack_require__(24);
	
	var _renderIf2 = _interopRequireDefault(_renderIf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const defaultStyles = {
		container: {
			position: 'relative'
		},
		handle: {
			position: 'absolute',
			display: 'block',
			margin: 'auto',
			padding: 0,
			border: 0,
			background: '#ccc',
			cursor: 'col-resize',
			zIndex: 50
		},
		overlay: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			margin: 'auto',
			padding: 0,
			zIndex: 55,
			width: '100%',
			height: '100%'
		},
		// all "handle<Position>" styles are merged with "handle" styles for the given position
		handleLeft: {
			left: '-8px',
			right: 'auto',
			top: 0,
			bottom: 0,
			width: '8px'
		},
		handleRight: {
			left: 'auto',
			right: '-8px',
			top: 0,
			bottom: 0,
			width: '8px'
		},
		handleTop: {
			left: 0,
			right: 0,
			top: '-8px',
			bottom: 'auto',
			height: '8px',
			cursor: 'row-resize'
		},
		handleBottom: {
			left: 0,
			right: 0,
			top: '-auto',
			bottom: '8px',
			height: '8px',
			cursor: 'row-resize'
		}
	};
	
	/**
	 *
	 */
	class ResizeHandle extends _react.Component {
		constructor(props) {
			super(props);
			this.state = {
				length: null,
				lengthProperty: this.lengthProperty(props.position),
				dragging: false,
				folded: props.folded
			};
	
			(0, _bindAll3.default)(this, 'onDrag', 'onDragStop');
		}
	
		componentDidMount() {
			if (this.props.enabled) {
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					length: this.getContainerLength()
				});
			}
		}
	
		componentWillReceiveProps(_ref) {
			let newPosition = _ref.position,
			    newFolded = _ref.folded;
	
			if (!this.props.enabled) {
				return;
			}
	
			const newLengthProperty = this.lengthProperty(newPosition);
			if (newLengthProperty === this.state.lengthProperty) {
				return;
			}
	
			if (newFolded !== this.state.folded) {
				this.toggleFolding();
			}
	
			this.setState({
				lengthProperty: newLengthProperty
			});
		}
	
		onDrag(event, _ref2) {
			let deltaX = _ref2.deltaX,
			    deltaY = _ref2.deltaY;
	
			// set dragging state onDrag and not onDragStart because when only clicking
			// then handle, we pass in onDragStart but not on onDrag.
			// So, we think we start dragging when doing a normal click because
			// we pass in onDragStart, but we're actually not dragging until a onDrag event is sent
			if (!this.state.dragging) {
				this.setState({
					dragging: true
				});
			}
	
			let value = this.state.lengthProperty === 'width' ? deltaX : deltaY;
			if (value === 0) {
				return;
			}
			if ((0, _includes3.default)(['left', 'top'], this.props.position)) {
				value = value * -1;
			}
			this.setState({
				length: this.state.length + value
			});
		}
	
		onDragStop() {
			const justAClick = !this.state.dragging;
	
			if (justAClick && this.props.onToggleFoldRequest) {
				return this.props.onToggleFoldRequest(this.state.folded);
			}
	
			if (justAClick && this.props.foldOnClick) {
				return this.toggleFolding();
			}
	
			return this.setState({
				dragging: false
			});
		}
	
		getContainerLength() {
			const rect = this.refs.container.getBoundingClientRect();
			return rect[this.state.lengthProperty];
		}
	
		lengthProperty(position) {
			return (0, _includes3.default)(['left', 'right'], position) ? 'width' : 'height';
		}
	
		toggleFolding() {
			const wantToFold = !this.state.folded;
			if (wantToFold) {
				return this.setState({
					beforeFold: (0, _omit3.default)(this.state, 'beforeFold', 'folded'),
					length: 0,
					folded: true
				});
			}
	
			return this.setState(_extends({}, this.state.beforeFold, {
				beforeFold: {},
				folded: false
			}));
		}
	
		render() {
			var _props = this.props;
			const classes = _props.classes,
			      styles = _props.styles,
			      position = _props.position,
			      useOverlay = _props.useOverlay,
			      enabled = _props.enabled,
			      children = _props.children;
	
			const defaultClasses = ResizeHandle.defaultProps.classes;
	
			const containerStyles = (0, _isEqual3.default)(classes.container, defaultClasses.container) ? (0, _assign3.default)({}, defaultStyles.container, styles.container) : {};
			const containerClasses = (0, _classnames2.default)(classes.container, {
				[`${classes.container}--${position}`]: true,
				[`${classes.container}--dragging`]: this.state.dragging,
				[`${classes.container}--folded`]: this.state.folded,
				[`${classes.container}--enabled`]: enabled
			});
			const handleStyles = (0, _isEqual3.default)(classes.handle, defaultClasses.handle) ? (0, _assign3.default)({}, defaultStyles.handle, defaultStyles[`handle${(0, _upperFirst3.default)(position)}`], styles.handle) : {};
			const overlayStyles = useOverlay && (0, _isEqual3.default)(classes.overlay, defaultClasses.overlay) ? (0, _assign3.default)({}, defaultStyles.overlay, styles.overlay) : {};
	
			if ((0, _isNumber3.default)(this.state.length)) {
				containerStyles[this.state.lengthProperty] = `${this.state.length}px`;
			}
	
			if (!enabled) {
				return _react2.default.createElement(
					'div',
					{ className: classes.disabledContainer },
					children
				);
			}
	
			return _react2.default.createElement(
				'div',
				{ ref: 'container', style: containerStyles, className: containerClasses },
				children,
				_react2.default.createElement(
					_reactDraggable.DraggableCore,
					_extends({
						offsetParent: document.body,
						onDrag: this.onDrag,
						onStop: this.onDragStop
					}, this.props.draggableProps),
					_react2.default.createElement('div', _extends({
						className: classes.handle,
						style: handleStyles
					}, this.props.handleProps))
				),
				(0, _renderIf2.default)(useOverlay && this.state.dragging)(() => _react2.default.createElement('div', {
					className: classes.overlay,
					style: overlayStyles
				}))
			);
		}
	}
	
	exports.default = ResizeHandle;
	
	
	ResizeHandle.propTypes = {
		position: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
		useOverlay: _react.PropTypes.bool,
		foldOnClick: _react.PropTypes.bool,
		folded: _react.PropTypes.bool,
		enabled: _react.PropTypes.bool,
		onToggleFoldRequest: _react.PropTypes.func,
		styles: _react.PropTypes.object.isRequired,
		classes: _react.PropTypes.object.isRequired,
		children: _react.PropTypes.element.isRequired,
		draggableProps: _react.PropTypes.object,
		handleProps: _react.PropTypes.object
	};
	
	ResizeHandle.defaultProps = {
		position: 'right',
		useOverlay: false,
		foldOnClick: false,
		folded: false,
		classes: {
			container: 'rgaaExt-ResizeHandle',
			disabledContainer: 'rgaaExt-DisabledResizeHandle',
			handle: 'rgaaExt-ResizeHandle-handle',
			overlay: 'rgaaExt-ResizeHandle-overlay'
		},
		styles: {
			container: {},
			handle: {},
			overlay: {}
		}
	};

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getStore;
	
	var _createStore = __webpack_require__(126);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _reducers = __webpack_require__(51);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _getInitialState = __webpack_require__(130);
	
	var _getInitialState2 = _interopRequireDefault(_getInitialState);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function getStore() {
		return (0, _getInitialState2.default)().then(state => (0, _createStore2.default)('container', _reducers2.default, undefined, state));
	}

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _noop2 = __webpack_require__(48);
	
	var _noop3 = _interopRequireDefault(_noop2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(62);
	
	var _reactRedux = __webpack_require__(12);
	
	var _reactIntl = __webpack_require__(10);
	
	var _fr = __webpack_require__(269);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(184);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	var _runtime = __webpack_require__(22);
	
	var _getStore = __webpack_require__(489);
	
	var _getStore2 = _interopRequireDefault(_getStore);
	
	var _container = __webpack_require__(131);
	
	var _AppContainer = __webpack_require__(486);
	
	var _AppContainer2 = _interopRequireDefault(_AppContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	(0, _reactIntl.addLocaleData)(_fr2.default);
	
	/**
	 *	A DOM node containing the application.
	 */
	let container = null;
	
	/**
	 *	Renders the panel.
	 */
	const start = () => {
		if (container) {
			container.style.display = '';
			return true;
		}
	
		return (0, _getStore2.default)().then(store => {
			container = document.createElement('div');
			container.className = _container.CONTAINER_ID;
			document.body.appendChild(container);
	
			(0, _reactDom.render)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_reactIntl.IntlProvider,
					{ locale: 'fr', messages: _fr4.default },
					_react2.default.createElement(_AppContainer2.default, null)
				)
			), container);
		}, _noop3.default);
	};
	
	/**
	 *	Removes the panel from the page.
	 */
	const hide = () => {
		if (container) {
			container.style.display = 'none';
		}
	};
	
	/**
	 *
	 */
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		Promise.resolve(message)
		// eslint-disable-next-line consistent-return
		.then((_ref) => {
			let type = _ref.type;
	
			// eslint-disable-next-line default-case
			switch (type) {
				case _runtime.OPEN_PANEL:
					return start();
	
				case _runtime.CLOSE_PANEL:
					return hide();
			}
		}).then(() => sendResponse({ message: 'ok' }));
	
		// Returning true states that sendResponse is asynchronous
		return true;
	});

/***/ }),

/***/ 657:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(57),
	    isIterateeCall = __webpack_require__(238);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

	var isPlainObject = __webpack_require__(114);
	
	/**
	 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	 * objects.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {string} key The key of the property to inspect.
	 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	 */
	function customOmitClone(value) {
	  return isPlainObject(value) ? undefined : value;
	}
	
	module.exports = customOmitClone;


/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(224),
	    copyObject = __webpack_require__(86),
	    createAssigner = __webpack_require__(768),
	    isArrayLike = __webpack_require__(26),
	    isPrototype = __webpack_require__(110),
	    keys = __webpack_require__(38);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(57),
	    createWrap = __webpack_require__(108),
	    getHolder = __webpack_require__(153),
	    replaceHolders = __webpack_require__(111);
	
	/** Used to compose bitmasks for function metadata. */
	var WRAP_BIND_FLAG = 1,
	    WRAP_PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of `thisArg`
	 * and `partials` prepended to the arguments it receives.
	 *
	 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
	 * property of bound functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * function greet(greeting, punctuation) {
	 *   return greeting + ' ' + this.user + punctuation;
	 * }
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * var bound = _.bind(greet, object, 'hi');
	 * bound('!');
	 * // => 'hi fred!'
	 *
	 * // Bound with placeholders.
	 * var bound = _.bind(greet, object, _, '!');
	 * bound('hi');
	 * // => 'hi fred!'
	 */
	var bind = baseRest(function(func, thisArg, partials) {
	  var bitmask = WRAP_BIND_FLAG;
	  if (partials.length) {
	    var holders = replaceHolders(partials, getHolder(bind));
	    bitmask |= WRAP_PARTIAL_FLAG;
	  }
	  return createWrap(func, bitmask, thisArg, partials, holders);
	});
	
	// Assign default placeholders.
	bind.placeholder = {};
	
	module.exports = bind;


/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(103),
	    baseAssignValue = __webpack_require__(84),
	    bind = __webpack_require__(834),
	    flatRest = __webpack_require__(152),
	    toKey = __webpack_require__(47);
	
	/**
	 * Binds methods of an object to the object itself, overwriting the existing
	 * method.
	 *
	 * **Note:** This method doesn't set the "length" property of bound functions.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {Object} object The object to bind and assign the bound methods to.
	 * @param {...(string|string[])} methodNames The object method names to bind.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var view = {
	 *   'label': 'docs',
	 *   'click': function() {
	 *     console.log('clicked ' + this.label);
	 *   }
	 * };
	 *
	 * _.bindAll(view, ['click']);
	 * jQuery(element).on('click', view.click);
	 * // => Logs 'clicked docs' when clicked.
	 */
	var bindAll = flatRest(function(object, methodNames) {
	  arrayEach(methodNames, function(key) {
	    key = toKey(key);
	    baseAssignValue(object, key, bind(object[key], object));
	  });
	  return object;
	});
	
	module.exports = bindAll;


/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(227);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	
	module.exports = isEqual;


/***/ }),

/***/ 866:
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(36),
	    isObjectLike = __webpack_require__(28);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && baseGetTag(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(83),
	    baseClone = __webpack_require__(225),
	    baseUnset = __webpack_require__(354),
	    castPath = __webpack_require__(107),
	    copyObject = __webpack_require__(86),
	    customOmitClone = __webpack_require__(779),
	    flatRest = __webpack_require__(152),
	    getAllKeysIn = __webpack_require__(364);
	
	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable property paths of `object` that are not omitted.
	 *
	 * **Note:** This method is considerably slower than `_.pick`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, paths) {
	  var result = {};
	  if (object == null) {
	    return result;
	  }
	  var isDeep = false;
	  paths = arrayMap(paths, function(path) {
	    path = castPath(path, object);
	    isDeep || (isDeep = path.length > 1);
	    return path;
	  });
	  copyObject(object, getAllKeysIn(object), result);
	  if (isDeep) {
	    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	  }
	  var length = paths.length;
	  while (length--) {
	    baseUnset(result, paths[length]);
	  }
	  return result;
	});
	
	module.exports = omit;


/***/ }),

/***/ 975:
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(1), __webpack_require__(62));
		else if(typeof define === 'function' && define.amd)
			define(["react", "react-dom"], factory);
		else if(typeof exports === 'object')
			exports["ReactDraggable"] = factory(require("react"), require("react-dom"));
		else
			root["ReactDraggable"] = factory(root["React"], root["ReactDOM"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_11__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		module.exports = __webpack_require__(1).default;
		module.exports.DraggableCore = __webpack_require__(17).default;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _react = __webpack_require__(2);
		
		var _react2 = _interopRequireDefault(_react);
		
		var _propTypes = __webpack_require__(3);
		
		var _propTypes2 = _interopRequireDefault(_propTypes);
		
		var _reactDom = __webpack_require__(11);
		
		var _reactDom2 = _interopRequireDefault(_reactDom);
		
		var _classnames = __webpack_require__(12);
		
		var _classnames2 = _interopRequireDefault(_classnames);
		
		var _domFns = __webpack_require__(13);
		
		var _positionFns = __webpack_require__(16);
		
		var _shims = __webpack_require__(14);
		
		var _DraggableCore = __webpack_require__(17);
		
		var _DraggableCore2 = _interopRequireDefault(_DraggableCore);
		
		var _log = __webpack_require__(19);
		
		var _log2 = _interopRequireDefault(_log);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		// $FlowIgnore
		
		
		/*:: import type {DraggableEventHandler} from './utils/types';*/
		/*:: type DraggableState = {
		  dragging: boolean,
		  dragged: boolean,
		  x: number, y: number,
		  slackX: number, slackY: number,
		  isElementSVG: boolean
		};*/
		
		
		//
		// Define <Draggable>
		//
		
		/*:: type ConstructorProps = {
		  position: { x: number, y: number },
		  defaultPosition: { x: number, y: number }
		};*/
		
		var Draggable = function (_React$Component) {
		  _inherits(Draggable, _React$Component);
		
		  function Draggable(props /*: ConstructorProps*/) {
		    _classCallCheck(this, Draggable);
		
		    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));
		
		    _this.onDragStart = function (e, coreData) {
		      (0, _log2.default)('Draggable: onDragStart: %j', coreData);
		
		      // Short-circuit if user's callback killed it.
		      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_this, coreData));
		      // Kills start event on core as well, so move handlers are never bound.
		      if (shouldStart === false) return false;
		
		      _this.setState({ dragging: true, dragged: true });
		    };
		
		    _this.onDrag = function (e, coreData) {
		      if (!_this.state.dragging) return false;
		      (0, _log2.default)('Draggable: onDrag: %j', coreData);
		
		      var uiData = (0, _positionFns.createDraggableData)(_this, coreData);
		
		      var newState /*: $Shape<DraggableState>*/ = {
		        x: uiData.x,
		        y: uiData.y
		      };
		
		      // Keep within bounds.
		      if (_this.props.bounds) {
		        // Save original x and y.
		        var _x = newState.x,
		            _y = newState.y;
		
		        // Add slack to the values used to calculate bound position. This will ensure that if
		        // we start removing slack, the element won't react to it right away until it's been
		        // completely removed.
		
		        newState.x += _this.state.slackX;
		        newState.y += _this.state.slackY;
		
		        // Get bound position. This will ceil/floor the x and y within the boundaries.
		        // $FlowBug
		
		        // Recalculate slack by noting how much was shaved by the boundPosition handler.
		        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.x, newState.y);
		
		        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);
		
		        newState.x = _getBoundPosition2[0];
		        newState.y = _getBoundPosition2[1];
		        newState.slackX = _this.state.slackX + (_x - newState.x);
		        newState.slackY = _this.state.slackY + (_y - newState.y);
		
		        // Update the event we fire to reflect what really happened after bounds took effect.
		        uiData.x = _x;
		        uiData.y = _y;
		        uiData.deltaX = newState.x - _this.state.x;
		        uiData.deltaY = newState.y - _this.state.y;
		      }
		
		      // Short-circuit if user's callback killed it.
		      var shouldUpdate = _this.props.onDrag(e, uiData);
		      if (shouldUpdate === false) return false;
		
		      _this.setState(newState);
		    };
		
		    _this.onDragStop = function (e, coreData) {
		      if (!_this.state.dragging) return false;
		
		      // Short-circuit if user's callback killed it.
		      var shouldStop = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_this, coreData));
		      if (shouldStop === false) return false;
		
		      (0, _log2.default)('Draggable: onDragStop: %j', coreData);
		
		      var newState /*: $Shape<DraggableState>*/ = {
		        dragging: false,
		        slackX: 0,
		        slackY: 0
		      };
		
		      // If this is a controlled component, the result of this operation will be to
		      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
		      var controlled = Boolean(_this.props.position);
		      if (controlled) {
		        var _this$props$position = _this.props.position,
		            _x2 = _this$props$position.x,
		            _y2 = _this$props$position.y;
		
		        newState.x = _x2;
		        newState.y = _y2;
		      }
		
		      _this.setState(newState);
		    };
		
		    _this.state = {
		      // Whether or not we are currently dragging.
		      dragging: false,
		
		      // Whether or not we have been dragged before.
		      dragged: false,
		
		      // Current transform x and y.
		      x: props.position ? props.position.x : props.defaultPosition.x,
		      y: props.position ? props.position.y : props.defaultPosition.y,
		
		      // Used for compensating for out-of-bounds drags
		      slackX: 0, slackY: 0,
		
		      // Can only determine if SVG after mounting
		      isElementSVG: false
		    };
		    return _this;
		  }
		
		  _createClass(Draggable, [{
		    key: 'componentWillMount',
		    value: function componentWillMount() {
		      if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
		        // eslint-disable-next-line
		        console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
		      }
		    }
		  }, {
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      // Check to see if the element passed is an instanceof SVGElement
		      if (typeof SVGElement !== 'undefined' && _reactDom2.default.findDOMNode(this) instanceof SVGElement) {
		        this.setState({ isElementSVG: true });
		      }
		    }
		  }, {
		    key: 'componentWillReceiveProps',
		    value: function componentWillReceiveProps(nextProps /*: Object*/) {
		      // Set x/y if position has changed
		      if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
		        this.setState({ x: nextProps.position.x, y: nextProps.position.y });
		      }
		    }
		  }, {
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
		    }
		  }, {
		    key: 'render',
		    value: function render() /*: React.Element<any>*/ {
		      var _classNames;
		
		      var style = {},
		          svgTransform = null;
		
		      // If this is controlled, we don't want to move it - unless it's dragging.
		      var controlled = Boolean(this.props.position);
		      var draggable = !controlled || this.state.dragging;
		
		      var position = this.props.position || this.props.defaultPosition;
		      var transformOpts = {
		        // Set left if horizontal drag is enabled
		        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : position.x,
		
		        // Set top if vertical drag is enabled
		        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : position.y
		      };
		
		      // If this element was SVG, we use the `transform` attribute.
		      if (this.state.isElementSVG) {
		        svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
		      } else {
		        // Add a CSS transform to move the element around. This allows us to move the element around
		        // without worrying about whether or not it is relatively or absolutely positioned.
		        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
		        // has a clean slate.
		        style = (0, _domFns.createCSSTransform)(transformOpts);
		      }
		
		      var _props = this.props,
		          defaultClassName = _props.defaultClassName,
		          defaultClassNameDragging = _props.defaultClassNameDragging,
		          defaultClassNameDragged = _props.defaultClassNameDragged;
		
		      // Mark with class while dragging
		
		      var className = (0, _classnames2.default)(this.props.children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));
		
		      // Reuse the child provided
		      // This makes it flexible to use whatever element is wanted (div, ul, etc)
		      return _react2.default.createElement(
		        _DraggableCore2.default,
		        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
		        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
		          className: className,
		          style: _extends({}, this.props.children.props.style, style),
		          transform: svgTransform
		        })
		      );
		    }
		  }]);
		
		  return Draggable;
		}(_react2.default.Component);
		
		Draggable.displayName = 'Draggable';
		Draggable.propTypes = _extends({}, _DraggableCore2.default.propTypes, {
		
		  /**
		   * `axis` determines which axis the draggable can move.
		   *
		   *  Note that all callbacks will still return data as normal. This only
		   *  controls flushing to the DOM.
		   *
		   * 'both' allows movement horizontally and vertically.
		   * 'x' limits movement to horizontal axis.
		   * 'y' limits movement to vertical axis.
		   * 'none' limits all movement.
		   *
		   * Defaults to 'both'.
		   */
		  axis: _propTypes2.default.oneOf(['both', 'x', 'y', 'none']),
		
		  /**
		   * `bounds` determines the range of movement available to the element.
		   * Available values are:
		   *
		   * 'parent' restricts movement within the Draggable's parent node.
		   *
		   * Alternatively, pass an object with the following properties, all of which are optional:
		   *
		   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
		   *
		   * All values are in px.
		   *
		   * Example:
		   *
		   * ```jsx
		   *   let App = React.createClass({
		   *       render: function () {
		   *         return (
		   *            <Draggable bounds={{right: 300, bottom: 300}}>
		   *              <div>Content</div>
		   *           </Draggable>
		   *         );
		   *       }
		   *   });
		   * ```
		   */
		  bounds: _propTypes2.default.oneOfType([_propTypes2.default.shape({
		    left: _propTypes2.default.number,
		    right: _propTypes2.default.number,
		    top: _propTypes2.default.number,
		    bottom: _propTypes2.default.number
		  }), _propTypes2.default.string, _propTypes2.default.oneOf([false])]),
		
		  defaultClassName: _propTypes2.default.string,
		  defaultClassNameDragging: _propTypes2.default.string,
		  defaultClassNameDragged: _propTypes2.default.string,
		
		  /**
		   * `defaultPosition` specifies the x and y that the dragged item should start at
		   *
		   * Example:
		   *
		   * ```jsx
		   *      let App = React.createClass({
		   *          render: function () {
		   *              return (
		   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
		   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
		   *                  </Draggable>
		   *              );
		   *          }
		   *      });
		   * ```
		   */
		  defaultPosition: _propTypes2.default.shape({
		    x: _propTypes2.default.number,
		    y: _propTypes2.default.number
		  }),
		
		  /**
		   * `position`, if present, defines the current position of the element.
		   *
		   *  This is similar to how form elements in React work - if no `position` is supplied, the component
		   *  is uncontrolled.
		   *
		   * Example:
		   *
		   * ```jsx
		   *      let App = React.createClass({
		   *          render: function () {
		   *              return (
		   *                  <Draggable position={{x: 25, y: 25}}>
		   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
		   *                  </Draggable>
		   *              );
		   *          }
		   *      });
		   * ```
		   */
		  position: _propTypes2.default.shape({
		    x: _propTypes2.default.number,
		    y: _propTypes2.default.number
		  }),
		
		  /**
		   * These properties should be defined on the child, not here.
		   */
		  className: _shims.dontSetMe,
		  style: _shims.dontSetMe,
		  transform: _shims.dontSetMe
		});
		Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
		  axis: 'both',
		  bounds: false,
		  defaultClassName: 'react-draggable',
		  defaultClassNameDragging: 'react-draggable-dragging',
		  defaultClassNameDragged: 'react-draggable-dragged',
		  defaultPosition: { x: 0, y: 0 },
		  position: null
		});
		exports.default = Draggable;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
		    Symbol.for &&
		    Symbol.for('react.element')) ||
		    0xeac7;
		
		  var isValidElement = function(object) {
		    return typeof object === 'object' &&
		      object !== null &&
		      object.$$typeof === REACT_ELEMENT_TYPE;
		  };
		
		  // By explicitly using `prop-types` you are opting into new development behavior.
		  // http://fb.me/prop-types-in-prod
		  var throwOnDirectAccess = true;
		  module.exports = __webpack_require__(4)(isValidElement, throwOnDirectAccess);
		} else {
		  // By explicitly using `prop-types` you are opting into new production behavior.
		  // http://fb.me/prop-types-in-prod
		  module.exports = __webpack_require__(10)();
		}
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(5);
		var invariant = __webpack_require__(6);
		var warning = __webpack_require__(7);
		
		var ReactPropTypesSecret = __webpack_require__(8);
		var checkPropTypes = __webpack_require__(9);
		
		module.exports = function(isValidElement, throwOnDirectAccess) {
		  /* global Symbol */
		  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
		
		  /**
		   * Returns the iterator method function contained on the iterable object.
		   *
		   * Be sure to invoke the function with the iterable as context:
		   *
		   *     var iteratorFn = getIteratorFn(myIterable);
		   *     if (iteratorFn) {
		   *       var iterator = iteratorFn.call(myIterable);
		   *       ...
		   *     }
		   *
		   * @param {?object} maybeIterable
		   * @return {?function}
		   */
		  function getIteratorFn(maybeIterable) {
		    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
		    if (typeof iteratorFn === 'function') {
		      return iteratorFn;
		    }
		  }
		
		  /**
		   * Collection of methods that allow declaration and validation of props that are
		   * supplied to React components. Example usage:
		   *
		   *   var Props = require('ReactPropTypes');
		   *   var MyArticle = React.createClass({
		   *     propTypes: {
		   *       // An optional string prop named "description".
		   *       description: Props.string,
		   *
		   *       // A required enum prop named "category".
		   *       category: Props.oneOf(['News','Photos']).isRequired,
		   *
		   *       // A prop named "dialog" that requires an instance of Dialog.
		   *       dialog: Props.instanceOf(Dialog).isRequired
		   *     },
		   *     render: function() { ... }
		   *   });
		   *
		   * A more formal specification of how these methods are used:
		   *
		   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
		   *   decl := ReactPropTypes.{type}(.isRequired)?
		   *
		   * Each and every declaration produces a function with the same signature. This
		   * allows the creation of custom validation functions. For example:
		   *
		   *  var MyLink = React.createClass({
		   *    propTypes: {
		   *      // An optional string or URI prop named "href".
		   *      href: function(props, propName, componentName) {
		   *        var propValue = props[propName];
		   *        if (propValue != null && typeof propValue !== 'string' &&
		   *            !(propValue instanceof URI)) {
		   *          return new Error(
		   *            'Expected a string or an URI for ' + propName + ' in ' +
		   *            componentName
		   *          );
		   *        }
		   *      }
		   *    },
		   *    render: function() {...}
		   *  });
		   *
		   * @internal
		   */
		
		  var ANONYMOUS = '<<anonymous>>';
		
		  // Important!
		  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
		  var ReactPropTypes = {
		    array: createPrimitiveTypeChecker('array'),
		    bool: createPrimitiveTypeChecker('boolean'),
		    func: createPrimitiveTypeChecker('function'),
		    number: createPrimitiveTypeChecker('number'),
		    object: createPrimitiveTypeChecker('object'),
		    string: createPrimitiveTypeChecker('string'),
		    symbol: createPrimitiveTypeChecker('symbol'),
		
		    any: createAnyTypeChecker(),
		    arrayOf: createArrayOfTypeChecker,
		    element: createElementTypeChecker(),
		    instanceOf: createInstanceTypeChecker,
		    node: createNodeChecker(),
		    objectOf: createObjectOfTypeChecker,
		    oneOf: createEnumTypeChecker,
		    oneOfType: createUnionTypeChecker,
		    shape: createShapeTypeChecker
		  };
		
		  /**
		   * inlined Object.is polyfill to avoid requiring consumers ship their own
		   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
		   */
		  /*eslint-disable no-self-compare*/
		  function is(x, y) {
		    // SameValue algorithm
		    if (x === y) {
		      // Steps 1-5, 7-10
		      // Steps 6.b-6.e: +0 != -0
		      return x !== 0 || 1 / x === 1 / y;
		    } else {
		      // Step 6.a: NaN == NaN
		      return x !== x && y !== y;
		    }
		  }
		  /*eslint-enable no-self-compare*/
		
		  /**
		   * We use an Error-like object for backward compatibility as people may call
		   * PropTypes directly and inspect their output. However, we don't use real
		   * Errors anymore. We don't inspect their stack anyway, and creating them
		   * is prohibitively expensive if they are created too often, such as what
		   * happens in oneOfType() for any type before the one that matched.
		   */
		  function PropTypeError(message) {
		    this.message = message;
		    this.stack = '';
		  }
		  // Make `instanceof Error` still work for returned errors.
		  PropTypeError.prototype = Error.prototype;
		
		  function createChainableTypeChecker(validate) {
		    if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		      var manualPropTypeCallCache = {};
		      var manualPropTypeWarningCount = 0;
		    }
		    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
		      componentName = componentName || ANONYMOUS;
		      propFullName = propFullName || propName;
		
		      if (secret !== ReactPropTypesSecret) {
		        if (throwOnDirectAccess) {
		          // New behavior only for users of `prop-types` package
		          invariant(
		            false,
		            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
		            'Use `PropTypes.checkPropTypes()` to call them. ' +
		            'Read more at http://fb.me/use-check-prop-types'
		          );
		        } else if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' && typeof console !== 'undefined') {
		          // Old behavior for people using React.PropTypes
		          var cacheKey = componentName + ':' + propName;
		          if (
		            !manualPropTypeCallCache[cacheKey] &&
		            // Avoid spamming the console because they are often not actionable except for lib authors
		            manualPropTypeWarningCount < 3
		          ) {
		            warning(
		              false,
		              'You are manually calling a React.PropTypes validation ' +
		              'function for the `%s` prop on `%s`. This is deprecated ' +
		              'and will throw in the standalone `prop-types` package. ' +
		              'You may be seeing this warning due to a third-party PropTypes ' +
		              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
		              propFullName,
		              componentName
		            );
		            manualPropTypeCallCache[cacheKey] = true;
		            manualPropTypeWarningCount++;
		          }
		        }
		      }
		      if (props[propName] == null) {
		        if (isRequired) {
		          if (props[propName] === null) {
		            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
		          }
		          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
		        }
		        return null;
		      } else {
		        return validate(props, propName, componentName, location, propFullName);
		      }
		    }
		
		    var chainedCheckType = checkType.bind(null, false);
		    chainedCheckType.isRequired = checkType.bind(null, true);
		
		    return chainedCheckType;
		  }
		
		  function createPrimitiveTypeChecker(expectedType) {
		    function validate(props, propName, componentName, location, propFullName, secret) {
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== expectedType) {
		        // `propValue` being instance of, say, date/regexp, pass the 'object'
		        // check, but we can offer a more precise error message here rather than
		        // 'of type `object`'.
		        var preciseType = getPreciseType(propValue);
		
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createAnyTypeChecker() {
		    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
		  }
		
		  function createArrayOfTypeChecker(typeChecker) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (typeof typeChecker !== 'function') {
		        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
		      }
		      var propValue = props[propName];
		      if (!Array.isArray(propValue)) {
		        var propType = getPropType(propValue);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
		      }
		      for (var i = 0; i < propValue.length; i++) {
		        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
		        if (error instanceof Error) {
		          return error;
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createElementTypeChecker() {
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      if (!isValidElement(propValue)) {
		        var propType = getPropType(propValue);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createInstanceTypeChecker(expectedClass) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (!(props[propName] instanceof expectedClass)) {
		        var expectedClassName = expectedClass.name || ANONYMOUS;
		        var actualClassName = getClassName(props[propName]);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createEnumTypeChecker(expectedValues) {
		    if (!Array.isArray(expectedValues)) {
		      ({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
		      return emptyFunction.thatReturnsNull;
		    }
		
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      for (var i = 0; i < expectedValues.length; i++) {
		        if (is(propValue, expectedValues[i])) {
		          return null;
		        }
		      }
		
		      var valuesString = JSON.stringify(expectedValues);
		      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createObjectOfTypeChecker(typeChecker) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (typeof typeChecker !== 'function') {
		        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
		      }
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== 'object') {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
		      }
		      for (var key in propValue) {
		        if (propValue.hasOwnProperty(key)) {
		          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
		          if (error instanceof Error) {
		            return error;
		          }
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createUnionTypeChecker(arrayOfTypeCheckers) {
		    if (!Array.isArray(arrayOfTypeCheckers)) {
		      ({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
		      return emptyFunction.thatReturnsNull;
		    }
		
		    function validate(props, propName, componentName, location, propFullName) {
		      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
		        var checker = arrayOfTypeCheckers[i];
		        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
		          return null;
		        }
		      }
		
		      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createNodeChecker() {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (!isNode(props[propName])) {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createShapeTypeChecker(shapeTypes) {
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== 'object') {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
		      }
		      for (var key in shapeTypes) {
		        var checker = shapeTypes[key];
		        if (!checker) {
		          continue;
		        }
		        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
		        if (error) {
		          return error;
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function isNode(propValue) {
		    switch (typeof propValue) {
		      case 'number':
		      case 'string':
		      case 'undefined':
		        return true;
		      case 'boolean':
		        return !propValue;
		      case 'object':
		        if (Array.isArray(propValue)) {
		          return propValue.every(isNode);
		        }
		        if (propValue === null || isValidElement(propValue)) {
		          return true;
		        }
		
		        var iteratorFn = getIteratorFn(propValue);
		        if (iteratorFn) {
		          var iterator = iteratorFn.call(propValue);
		          var step;
		          if (iteratorFn !== propValue.entries) {
		            while (!(step = iterator.next()).done) {
		              if (!isNode(step.value)) {
		                return false;
		              }
		            }
		          } else {
		            // Iterator will provide entry [k,v] tuples rather than values.
		            while (!(step = iterator.next()).done) {
		              var entry = step.value;
		              if (entry) {
		                if (!isNode(entry[1])) {
		                  return false;
		                }
		              }
		            }
		          }
		        } else {
		          return false;
		        }
		
		        return true;
		      default:
		        return false;
		    }
		  }
		
		  function isSymbol(propType, propValue) {
		    // Native Symbol.
		    if (propType === 'symbol') {
		      return true;
		    }
		
		    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
		    if (propValue['@@toStringTag'] === 'Symbol') {
		      return true;
		    }
		
		    // Fallback for non-spec compliant Symbols which are polyfilled.
		    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
		      return true;
		    }
		
		    return false;
		  }
		
		  // Equivalent of `typeof` but with special handling for array and regexp.
		  function getPropType(propValue) {
		    var propType = typeof propValue;
		    if (Array.isArray(propValue)) {
		      return 'array';
		    }
		    if (propValue instanceof RegExp) {
		      // Old webkits (at least until Android 4.0) return 'function' rather than
		      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
		      // passes PropTypes.object.
		      return 'object';
		    }
		    if (isSymbol(propType, propValue)) {
		      return 'symbol';
		    }
		    return propType;
		  }
		
		  // This handles more types than `getPropType`. Only used for error messages.
		  // See `createPrimitiveTypeChecker`.
		  function getPreciseType(propValue) {
		    var propType = getPropType(propValue);
		    if (propType === 'object') {
		      if (propValue instanceof Date) {
		        return 'date';
		      } else if (propValue instanceof RegExp) {
		        return 'regexp';
		      }
		    }
		    return propType;
		  }
		
		  // Returns class name of the object, if any.
		  function getClassName(propValue) {
		    if (!propValue.constructor || !propValue.constructor.name) {
		      return ANONYMOUS;
		    }
		    return propValue.constructor.name;
		  }
		
		  ReactPropTypes.checkPropTypes = checkPropTypes;
		  ReactPropTypes.PropTypes = ReactPropTypes;
		
		  return ReactPropTypes;
		};
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
		
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * 
		 */
		
		function makeEmptyFunction(arg) {
		  return function () {
		    return arg;
		  };
		}
		
		/**
		 * This function accepts and discards inputs; it has no side effects. This is
		 * primarily useful idiomatically for overridable function endpoints which
		 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
		 */
		var emptyFunction = function emptyFunction() {};
		
		emptyFunction.thatReturns = makeEmptyFunction;
		emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
		emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
		emptyFunction.thatReturnsNull = makeEmptyFunction(null);
		emptyFunction.thatReturnsThis = function () {
		  return this;
		};
		emptyFunction.thatReturnsArgument = function (arg) {
		  return arg;
		};
		
		module.exports = emptyFunction;
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */
		
		'use strict';
		
		/**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */
		
		var validateFormat = function validateFormat(format) {};
		
		if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		  validateFormat = function validateFormat(format) {
		    if (format === undefined) {
		      throw new Error('invariant requires an error message argument');
		    }
		  };
		}
		
		function invariant(condition, format, a, b, c, d, e, f) {
		  validateFormat(format);
		
		  if (!condition) {
		    var error;
		    if (format === undefined) {
		      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
		    } else {
		      var args = [a, b, c, d, e, f];
		      var argIndex = 0;
		      error = new Error(format.replace(/%s/g, function () {
		        return args[argIndex++];
		      }));
		      error.name = 'Invariant Violation';
		    }
		
		    error.framesToPop = 1; // we don't care about invariant's own frame
		    throw error;
		  }
		}
		
		module.exports = invariant;
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(5);
		
		/**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */
		
		var warning = emptyFunction;
		
		if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		  (function () {
		    var printWarning = function printWarning(format) {
		      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        args[_key - 1] = arguments[_key];
		      }
		
		      var argIndex = 0;
		      var message = 'Warning: ' + format.replace(/%s/g, function () {
		        return args[argIndex++];
		      });
		      if (typeof console !== 'undefined') {
		        console.error(message);
		      }
		      try {
		        // --- Welcome to debugging React ---
		        // This error was thrown as a convenience so that you can use this stack
		        // to find the callsite that caused this warning to fire.
		        throw new Error(message);
		      } catch (x) {}
		    };
		
		    warning = function warning(condition, format) {
		      if (format === undefined) {
		        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
		      }
		
		      if (format.indexOf('Failed Composite propType: ') === 0) {
		        return; // Ignore CompositeComponent proptype check.
		      }
		
		      if (!condition) {
		        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		          args[_key2 - 2] = arguments[_key2];
		        }
		
		        printWarning.apply(undefined, [format].concat(args));
		      }
		    };
		  })();
		}
		
		module.exports = warning;
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
		
		module.exports = ReactPropTypesSecret;
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		  var invariant = __webpack_require__(6);
		  var warning = __webpack_require__(7);
		  var ReactPropTypesSecret = __webpack_require__(8);
		  var loggedTypeFailures = {};
		}
		
		/**
		 * Assert that the values match with the type specs.
		 * Error messages are memorized and will only be shown once.
		 *
		 * @param {object} typeSpecs Map of name to a ReactPropType
		 * @param {object} values Runtime values that need to be type-checked
		 * @param {string} location e.g. "prop", "context", "child context"
		 * @param {string} componentName Name of the component for error messages.
		 * @param {?Function} getStack Returns the component stack.
		 * @private
		 */
		function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
		  if (({"DRAGGABLE_DEBUG":undefined}).NODE_ENV !== 'production') {
		    for (var typeSpecName in typeSpecs) {
		      if (typeSpecs.hasOwnProperty(typeSpecName)) {
		        var error;
		        // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.
		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
		          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
		        } catch (ex) {
		          error = ex;
		        }
		        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
		        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error.message] = true;
		
		          var stack = getStack ? getStack() : '';
		
		          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
		        }
		      }
		    }
		  }
		}
		
		module.exports = checkPropTypes;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(5);
		var invariant = __webpack_require__(6);
		
		module.exports = function() {
		  // Important!
		  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
		  function shim() {
		    invariant(
		      false,
		      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
		      'Use PropTypes.checkPropTypes() to call them. ' +
		      'Read more at http://fb.me/use-check-prop-types'
		    );
		  };
		  shim.isRequired = shim;
		  function getShim() {
		    return shim;
		  };
		  var ReactPropTypes = {
		    array: shim,
		    bool: shim,
		    func: shim,
		    number: shim,
		    object: shim,
		    string: shim,
		    symbol: shim,
		
		    any: shim,
		    arrayOf: getShim,
		    element: shim,
		    instanceOf: getShim,
		    node: shim,
		    objectOf: getShim,
		    oneOf: getShim,
		    oneOfType: getShim,
		    shape: getShim
		  };
		
		  ReactPropTypes.checkPropTypes = emptyFunction;
		  ReactPropTypes.PropTypes = ReactPropTypes;
		
		  return ReactPropTypes;
		};
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_11__;
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		  Copyright (c) 2016 Jed Watson.
		  Licensed under the MIT License (MIT), see
		  http://jedwatson.github.io/classnames
		*/
		/* global define */
		
		(function () {
			'use strict';
		
			var hasOwn = {}.hasOwnProperty;
		
			function classNames () {
				var classes = [];
		
				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!arg) continue;
		
					var argType = typeof arg;
		
					if (argType === 'string' || argType === 'number') {
						classes.push(arg);
					} else if (Array.isArray(arg)) {
						classes.push(classNames.apply(null, arg));
					} else if (argType === 'object') {
						for (var key in arg) {
							if (hasOwn.call(arg, key) && arg[key]) {
								classes.push(key);
							}
						}
					}
				}
		
				return classes.join(' ');
			}
		
			if (typeof module !== 'undefined' && module.exports) {
				module.exports = classNames;
			} else if (true) {
				// register as 'classnames', consistent with npm package name
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
					return classNames;
				}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			} else {
				window.classNames = classNames;
			}
		}());
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
		
		exports.matchesSelector = matchesSelector;
		exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
		exports.addEvent = addEvent;
		exports.removeEvent = removeEvent;
		exports.outerHeight = outerHeight;
		exports.outerWidth = outerWidth;
		exports.innerHeight = innerHeight;
		exports.innerWidth = innerWidth;
		exports.offsetXYFromParent = offsetXYFromParent;
		exports.createCSSTransform = createCSSTransform;
		exports.createSVGTransform = createSVGTransform;
		exports.getTouch = getTouch;
		exports.getTouchIdentifier = getTouchIdentifier;
		exports.addUserSelectStyles = addUserSelectStyles;
		exports.removeUserSelectStyles = removeUserSelectStyles;
		exports.styleHacks = styleHacks;
		
		var _shims = __webpack_require__(14);
		
		var _getPrefix = __webpack_require__(15);
		
		var _getPrefix2 = _interopRequireDefault(_getPrefix);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		
		/*:: import type {ControlPosition} from './types';*/
		
		
		var matchesSelectorFunc = '';
		function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
		  if (!matchesSelectorFunc) {
		    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
		      // $FlowIgnore: Doesn't think elements are indexable
		      return (0, _shims.isFunction)(el[method]);
		    });
		  }
		
		  // $FlowIgnore: Doesn't think elements are indexable
		  return el[matchesSelectorFunc].call(el, selector);
		}
		
		// Works up the tree to the draggable itself attempting to match selector.
		function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/ {
		  var node = el;
		  do {
		    if (matchesSelector(node, selector)) return true;
		    if (node === baseNode) return false;
		    node = node.parentNode;
		  } while (node);
		
		  return false;
		}
		
		function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
		  if (!el) {
		    return;
		  }
		  if (el.attachEvent) {
		    el.attachEvent('on' + event, handler);
		  } else if (el.addEventListener) {
		    el.addEventListener(event, handler, true);
		  } else {
		    // $FlowIgnore: Doesn't think elements are indexable
		    el['on' + event] = handler;
		  }
		}
		
		function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
		  if (!el) {
		    return;
		  }
		  if (el.detachEvent) {
		    el.detachEvent('on' + event, handler);
		  } else if (el.removeEventListener) {
		    el.removeEventListener(event, handler, true);
		  } else {
		    // $FlowIgnore: Doesn't think elements are indexable
		    el['on' + event] = null;
		  }
		}
		
		function outerHeight(node /*: HTMLElement*/) /*: number*/ {
		  // This is deliberately excluding margin for our calculations, since we are using
		  // offsetTop which is including margin. See getBoundPosition
		  var height = node.clientHeight;
		  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		  height += (0, _shims.int)(computedStyle.borderTopWidth);
		  height += (0, _shims.int)(computedStyle.borderBottomWidth);
		  return height;
		}
		
		function outerWidth(node /*: HTMLElement*/) /*: number*/ {
		  // This is deliberately excluding margin for our calculations, since we are using
		  // offsetLeft which is including margin. See getBoundPosition
		  var width = node.clientWidth;
		  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		  width += (0, _shims.int)(computedStyle.borderLeftWidth);
		  width += (0, _shims.int)(computedStyle.borderRightWidth);
		  return width;
		}
		function innerHeight(node /*: HTMLElement*/) /*: number*/ {
		  var height = node.clientHeight;
		  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		  height -= (0, _shims.int)(computedStyle.paddingTop);
		  height -= (0, _shims.int)(computedStyle.paddingBottom);
		  return height;
		}
		
		function innerWidth(node /*: HTMLElement*/) /*: number*/ {
		  var width = node.clientWidth;
		  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		  width -= (0, _shims.int)(computedStyle.paddingLeft);
		  width -= (0, _shims.int)(computedStyle.paddingRight);
		  return width;
		}
		
		// Get from offsetParent
		function offsetXYFromParent(evt /*: {clientX: number, clientY: number}*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/ {
		  var isBody = offsetParent === offsetParent.ownerDocument.body;
		  var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();
		
		  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
		  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;
		
		  return { x: x, y: y };
		}
		
		function createCSSTransform(_ref) /*: Object*/ {
		  var x = _ref.x,
		      y = _ref.y;
		
		  // Replace unitless items with px
		  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix2.default), 'translate(' + x + 'px,' + y + 'px)');
		}
		
		function createSVGTransform(_ref3) /*: string*/ {
		  var x = _ref3.x,
		      y = _ref3.y;
		
		  return 'translate(' + x + ',' + y + ')';
		}
		
		function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/ {
		  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
		    return identifier === t.identifier;
		  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
		    return identifier === t.identifier;
		  });
		}
		
		function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/ {
		  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
		  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
		}
		
		// User-select Hacks:
		//
		// Useful for preventing blue highlights all over everything when dragging.
		var userSelectPrefix = (0, _getPrefix.getPrefix)('user-select');
		var userSelect = (0, _getPrefix.browserPrefixToStyle)('user-select', userSelectPrefix);
		var userSelectStyle = ';' + userSelect + ': none;';
		var userSelectReplaceRegExp = new RegExp(';?' + userSelect + ': none;'); // leading ; not present on IE
		
		// Note we're passing `document` b/c we could be iframed
		function addUserSelectStyles(body /*: HTMLElement*/) {
		  var style = body.getAttribute('style') || '';
		  if (userSelectReplaceRegExp.test(style)) return; // don't add twice
		  body.setAttribute('style', style + userSelectStyle);
		}
		
		function removeUserSelectStyles(body /*: HTMLElement*/) {
		  var style = body.getAttribute('style') || '';
		  body.setAttribute('style', style.replace(userSelectReplaceRegExp, ''));
		}
		
		function styleHacks() /*: Object*/ {
		  var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		
		  // Workaround IE pointer events; see #51
		  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
		  return _extends({
		    touchAction: 'none'
		  }, childStyle);
		}
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.findInArray = findInArray;
		exports.isFunction = isFunction;
		exports.isNum = isNum;
		exports.int = int;
		exports.dontSetMe = dontSetMe;
		
		// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
		function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/ {
		  for (var i = 0, length = array.length; i < length; i++) {
		    if (callback.apply(callback, [array[i], i, array])) return array[i];
		  }
		}
		
		function isFunction(func /*: any*/) /*: boolean*/ {
		  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
		}
		
		function isNum(num /*: any*/) /*: boolean*/ {
		  return typeof num === 'number' && !isNaN(num);
		}
		
		function int(a /*: string*/) /*: number*/ {
		  return parseInt(a, 10);
		}
		
		function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
		  if (props[propName]) {
		    return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
		  }
		}
	
	/***/ },
	/* 15 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.getPrefix = getPrefix;
		exports.browserPrefixToKey = browserPrefixToKey;
		exports.browserPrefixToStyle = browserPrefixToStyle;
		var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
		function getPrefix() /*: string*/ {
		  var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
		
		  // Checking specifically for 'window.document' is for pseudo-browser server-side
		  // environments that define 'window' as the global context.
		  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
		  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
		
		  var style = window.document.documentElement.style;
		
		  if (prop in style) return '';
		
		  for (var i = 0; i < prefixes.length; i++) {
		    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
		  }
		
		  return '';
		}
		
		function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/ {
		  return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
		}
		
		function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/ {
		  return prefix ? '-' + prefix.toLowerCase() + '-' + prop : prop;
		}
		
		function kebabToTitleCase(str /*: string*/) /*: string*/ {
		  var out = '';
		  var shouldCapitalize = true;
		  for (var i = 0; i < str.length; i++) {
		    if (shouldCapitalize) {
		      out += str[i].toUpperCase();
		      shouldCapitalize = false;
		    } else if (str[i] === '-') {
		      shouldCapitalize = true;
		    } else {
		      out += str[i];
		    }
		  }
		  return out;
		}
		
		// Default export is the prefix itself, like 'Moz', 'Webkit', etc
		// Note that you may have to re-test for certain things; for instance, Chrome 50
		// can handle unprefixed `transform`, but not unprefixed `user-select`
		exports.default = getPrefix();
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.getBoundPosition = getBoundPosition;
		exports.snapToGrid = snapToGrid;
		exports.canDragX = canDragX;
		exports.canDragY = canDragY;
		exports.getControlPosition = getControlPosition;
		exports.createCoreData = createCoreData;
		exports.createDraggableData = createDraggableData;
		
		var _shims = __webpack_require__(14);
		
		var _reactDom = __webpack_require__(11);
		
		var _reactDom2 = _interopRequireDefault(_reactDom);
		
		var _domFns = __webpack_require__(13);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/*:: import type Draggable from '../Draggable';*/
		/*:: import type {Bounds, ControlPosition, DraggableData} from './types';*/
		/*:: import type DraggableCore from '../DraggableCore';*/
		function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/ {
		  // If no bounds, short-circuit and move on
		  if (!draggable.props.bounds) return [x, y];
		
		  // Clone new bounds
		  var bounds = draggable.props.bounds;
		
		  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
		  var node = _reactDom2.default.findDOMNode(draggable);
		
		  if (typeof bounds === 'string') {
		    var ownerDocument = node.ownerDocument;
		
		    var ownerWindow = ownerDocument.defaultView;
		    var boundNode = void 0;
		    if (bounds === 'parent') {
		      boundNode = node.parentNode;
		    } else {
		      boundNode = ownerDocument.querySelector(bounds);
		      if (!boundNode) throw new Error('Bounds selector "' + bounds + '" could not find an element.');
		    }
		    var nodeStyle = ownerWindow.getComputedStyle(node);
		    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
		    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
		    bounds = {
		      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
		      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
		      right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
		      bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
		    };
		  }
		
		  // Keep x and y below right and bottom limits...
		  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
		  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);
		
		  // But above left and top limits.
		  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
		  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
		
		  return [x, y];
		}
		
		function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/ {
		  var x = Math.round(pendingX / grid[0]) * grid[0];
		  var y = Math.round(pendingY / grid[1]) * grid[1];
		  return [x, y];
		}
		
		function canDragX(draggable /*: Draggable*/) /*: boolean*/ {
		  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
		}
		
		function canDragY(draggable /*: Draggable*/) /*: boolean*/ {
		  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
		}
		
		// Get {x, y} positions from event.
		function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/ {
		  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
		  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
		  var node = _reactDom2.default.findDOMNode(draggableCore);
		  // User can provide an offsetParent if desired.
		  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
		  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent);
		}
		
		// Create an data object exposed by <DraggableCore>'s events
		function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
		  var state = draggable.state;
		  var isStart = !(0, _shims.isNum)(state.lastX);
		
		  if (isStart) {
		    // If this is our first move, use the x and y as last coords.
		    return {
		      node: _reactDom2.default.findDOMNode(draggable),
		      deltaX: 0, deltaY: 0,
		      lastX: x, lastY: y,
		      x: x, y: y
		    };
		  } else {
		    // Otherwise calculate proper values.
		    return {
		      node: _reactDom2.default.findDOMNode(draggable),
		      deltaX: x - state.lastX, deltaY: y - state.lastY,
		      lastX: state.lastX, lastY: state.lastY,
		      x: x, y: y
		    };
		  }
		}
		
		// Create an data exposed by <Draggable>'s events
		function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/ {
		  return {
		    node: coreData.node,
		    x: draggable.state.x + coreData.deltaX,
		    y: draggable.state.y + coreData.deltaY,
		    deltaX: coreData.deltaX,
		    deltaY: coreData.deltaY,
		    lastX: draggable.state.x,
		    lastY: draggable.state.y
		  };
		}
		
		// A lot faster than stringify/parse
		function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/ {
		  return {
		    left: bounds.left,
		    top: bounds.top,
		    right: bounds.right,
		    bottom: bounds.bottom
		  };
		}
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _react = __webpack_require__(2);
		
		var _react2 = _interopRequireDefault(_react);
		
		var _propTypes = __webpack_require__(3);
		
		var _propTypes2 = _interopRequireDefault(_propTypes);
		
		var _reactDom = __webpack_require__(11);
		
		var _reactDom2 = _interopRequireDefault(_reactDom);
		
		var _domFns = __webpack_require__(13);
		
		var _positionFns = __webpack_require__(16);
		
		var _shims = __webpack_require__(14);
		
		var _log = __webpack_require__(19);
		
		var _log2 = _interopRequireDefault(_log);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
		// Simple abstraction for dragging events names.
		/*:: import type {EventHandler} from './utils/types';*/
		var eventsFor = {
		  touch: {
		    start: 'touchstart',
		    move: 'touchmove',
		    stop: 'touchend'
		  },
		  mouse: {
		    start: 'mousedown',
		    move: 'mousemove',
		    stop: 'mouseup'
		  }
		};
		
		// Default to mouse events.
		var dragEventFor = eventsFor.mouse;
		
		//
		// Define <DraggableCore>.
		//
		// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
		// work well with libraries that require more control over the element.
		//
		
		/*:: type CoreState = {
		  dragging: boolean,
		  lastX: number,
		  lastY: number,
		  touchIdentifier: ?number
		};*/
		
		var DraggableCore = function (_React$Component) {
		  _inherits(DraggableCore, _React$Component);
		
		  function DraggableCore() {
		    var _ref;
		
		    var _temp, _this, _ret;
		
		    _classCallCheck(this, DraggableCore);
		
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }
		
		    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
		      dragging: false,
		      // Used while dragging to determine deltas.
		      lastX: NaN, lastY: NaN,
		      touchIdentifier: null
		    }, _this.handleDragStart = function (e) {
		      // Make it possible to attach event handlers on top of this one.
		      _this.props.onMouseDown(e);
		
		      // Only accept left-clicks.
		      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;
		
		      // Get nodes. Be sure to grab relative document (could be iframed)
		      var domNode = _reactDom2.default.findDOMNode(_this);
		      var ownerDocument = domNode.ownerDocument;
		
		      // Short circuit if handle or cancel prop was provided and selector doesn't match.
		
		      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, domNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, domNode)) {
		        return;
		      }
		
		      // Set touch identifier in component state if this is a touch event. This allows us to
		      // distinguish between individual touches on multitouch screens by identifying which
		      // touchpoint was set to this element.
		      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
		      _this.setState({ touchIdentifier: touchIdentifier });
		
		      // Get the current drag point from the event. This is used as the offset.
		      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _this);
		      if (position == null) return; // not possible but satisfies flow
		      var x = position.x,
		          y = position.y;
		
		      // Create an event object with all the data parents need to make a decision here.
		
		      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);
		
		      (0, _log2.default)('DraggableCore: handleDragStart: %j', coreEvent);
		
		      // Call event handler. If it returns explicit false, cancel.
		      (0, _log2.default)('calling', _this.props.onStart);
		      var shouldUpdate = _this.props.onStart(e, coreEvent);
		      if (shouldUpdate === false) return;
		
		      // Add a style to the body to disable user-select. This prevents text from
		      // being selected all over the page.
		      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument.body);
		
		      // Initiate dragging. Set the current x and y as offsets
		      // so we know how much we've moved during the drag. This allows us
		      // to drag elements around even if they have been moved, without issue.
		      _this.setState({
		        dragging: true,
		
		        lastX: x,
		        lastY: y
		      });
		
		      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
		      // this element. We use different events depending on whether or not we have detected that this
		      // is a touch-capable device.
		      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
		      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
		    }, _this.handleDrag = function (e) {
		
		      // Prevent scrolling on mobile devices, like ipad/iphone.
		      if (e.type === 'touchmove') e.preventDefault();
		
		      // Get the current drag point from the event. This is used as the offset.
		      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
		      if (position == null) return;
		      var x = position.x,
		          y = position.y;
		
		      // Snap to grid if prop has been provided
		
		      if (Array.isArray(_this.props.grid)) {
		        var deltaX = x - _this.state.lastX,
		            deltaY = y - _this.state.lastY;
		
		        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
		
		        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
		
		        deltaX = _snapToGrid2[0];
		        deltaY = _snapToGrid2[1];
		
		        if (!deltaX && !deltaY) return; // skip useless drag
		        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
		      }
		
		      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);
		
		      (0, _log2.default)('DraggableCore: handleDrag: %j', coreEvent);
		
		      // Call event handler. If it returns explicit false, trigger end.
		      var shouldUpdate = _this.props.onDrag(e, coreEvent);
		      if (shouldUpdate === false) {
		        try {
		          // $FlowIgnore
		          _this.handleDragStop(new MouseEvent('mouseup'));
		        } catch (err) {
		          // Old browsers
		          var event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
		          // I see why this insanity was deprecated
		          // $FlowIgnore
		          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		          _this.handleDragStop(event);
		        }
		        return;
		      }
		
		      _this.setState({
		        lastX: x,
		        lastY: y
		      });
		    }, _this.handleDragStop = function (e) {
		      if (!_this.state.dragging) return;
		
		      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
		      if (position == null) return;
		      var x = position.x,
		          y = position.y;
		
		      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);
		
		      var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this),
		          ownerDocument = _ReactDOM$findDOMNode.ownerDocument;
		
		      // Remove user-select hack
		
		
		      if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument.body);
		
		      (0, _log2.default)('DraggableCore: handleDragStop: %j', coreEvent);
		
		      // Reset the el.
		      _this.setState({
		        dragging: false,
		        lastX: NaN,
		        lastY: NaN
		      });
		
		      // Call event handler
		      _this.props.onStop(e, coreEvent);
		
		      // Remove event handlers
		      (0, _log2.default)('DraggableCore: Removing handlers');
		      (0, _domFns.removeEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
		      (0, _domFns.removeEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
		    }, _this.onMouseDown = function (e) {
		      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse
		
		      return _this.handleDragStart(e);
		    }, _this.onMouseUp = function (e) {
		      dragEventFor = eventsFor.mouse;
		
		      return _this.handleDragStop(e);
		    }, _this.onTouchStart = function (e) {
		      // We're on a touch device now, so change the event handlers
		      dragEventFor = eventsFor.touch;
		
		      return _this.handleDragStart(e);
		    }, _this.onTouchEnd = function (e) {
		      // We're on a touch device now, so change the event handlers
		      dragEventFor = eventsFor.touch;
		
		      return _this.handleDragStop(e);
		    }, _temp), _possibleConstructorReturn(_this, _ret);
		  }
		
		  _createClass(DraggableCore, [{
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
		      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
		      var _ReactDOM$findDOMNode2 = _reactDom2.default.findDOMNode(this),
		          ownerDocument = _ReactDOM$findDOMNode2.ownerDocument;
		
		      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
		      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
		      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
		      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
		      if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument.body);
		    }
		
		    // Same as onMouseDown (start drag), but now consider this a touch device.
		
		  }, {
		    key: 'render',
		    value: function render() /*: React.Element<any>*/ {
		      // Reuse the child provided
		      // This makes it flexible to use whatever element is wanted (div, ul, etc)
		      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
		        style: (0, _domFns.styleHacks)(this.props.children.props.style),
		
		        // Note: mouseMove handler is attached to document so it will still function
		        // when the user drags quickly and leaves the bounds of the element.
		        onMouseDown: this.onMouseDown,
		        onTouchStart: this.onTouchStart,
		        onMouseUp: this.onMouseUp,
		        onTouchEnd: this.onTouchEnd
		      });
		    }
		  }]);
		
		  return DraggableCore;
		}(_react2.default.Component);
		
		DraggableCore.displayName = 'DraggableCore';
		DraggableCore.propTypes = {
		  /**
		   * `allowAnyClick` allows dragging using any mouse button.
		   * By default, we only accept the left button.
		   *
		   * Defaults to `false`.
		   */
		  allowAnyClick: _propTypes2.default.bool,
		
		  /**
		   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
		   * with the exception of `onMouseDown`, will not fire.
		   */
		  disabled: _propTypes2.default.bool,
		
		  /**
		   * By default, we add 'user-select:none' attributes to the document body
		   * to prevent ugly text selection during drag. If this is causing problems
		   * for your app, set this to `false`.
		   */
		  enableUserSelectHack: _propTypes2.default.bool,
		
		  /**
		   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
		   * instead of using the parent node.
		   */
		  offsetParent: function offsetParent(props, propName) {
		    if (process.browser && props[propName] && props[propName].nodeType !== 1) {
		      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
		    }
		  },
		
		  /**
		   * `grid` specifies the x and y that dragging should snap to.
		   */
		  grid: _propTypes2.default.arrayOf(_propTypes2.default.number),
		
		  /**
		   * `handle` specifies a selector to be used as the handle that initiates drag.
		   *
		   * Example:
		   *
		   * ```jsx
		   *   let App = React.createClass({
		   *       render: function () {
		   *         return (
		   *            <Draggable handle=".handle">
		   *              <div>
		   *                  <div className="handle">Click me to drag</div>
		   *                  <div>This is some other content</div>
		   *              </div>
		   *           </Draggable>
		   *         );
		   *       }
		   *   });
		   * ```
		   */
		  handle: _propTypes2.default.string,
		
		  /**
		   * `cancel` specifies a selector to be used to prevent drag initialization.
		   *
		   * Example:
		   *
		   * ```jsx
		   *   let App = React.createClass({
		   *       render: function () {
		   *           return(
		   *               <Draggable cancel=".cancel">
		   *                   <div>
		   *                     <div className="cancel">You can't drag from here</div>
		   *                     <div>Dragging here works fine</div>
		   *                   </div>
		   *               </Draggable>
		   *           );
		   *       }
		   *   });
		   * ```
		   */
		  cancel: _propTypes2.default.string,
		
		  /**
		   * Called when dragging starts.
		   * If this function returns the boolean false, dragging will be canceled.
		   */
		  onStart: _propTypes2.default.func,
		
		  /**
		   * Called while dragging.
		   * If this function returns the boolean false, dragging will be canceled.
		   */
		  onDrag: _propTypes2.default.func,
		
		  /**
		   * Called when dragging stops.
		   * If this function returns the boolean false, the drag will remain active.
		   */
		  onStop: _propTypes2.default.func,
		
		  /**
		   * A workaround option which can be passed if onMouseDown needs to be accessed,
		   * since it'll always be blocked (as there is internal use of onMouseDown)
		   */
		  onMouseDown: _propTypes2.default.func,
		
		  /**
		   * These properties should be defined on the child, not here.
		   */
		  className: _shims.dontSetMe,
		  style: _shims.dontSetMe,
		  transform: _shims.dontSetMe
		};
		DraggableCore.defaultProps = {
		  allowAnyClick: false, // by default only accept left click
		  cancel: null,
		  disabled: false,
		  enableUserSelectHack: true,
		  offsetParent: null,
		  handle: null,
		  grid: null,
		  transform: null,
		  onStart: function onStart() {},
		  onDrag: function onDrag() {},
		  onStop: function onStop() {},
		  onMouseDown: function onMouseDown() {}
		};
		exports.default = DraggableCore;
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))
	
	/***/ },
	/* 18 */
	/***/ function(module, exports) {
	
		// shim for using process in browser
		var process = module.exports = {};
		
		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.
		
		var cachedSetTimeout;
		var cachedClearTimeout;
		
		function defaultSetTimout() {
		    throw new Error('setTimeout has not been defined');
		}
		function defaultClearTimeout () {
		    throw new Error('clearTimeout has not been defined');
		}
		(function () {
		    try {
		        if (typeof setTimeout === 'function') {
		            cachedSetTimeout = setTimeout;
		        } else {
		            cachedSetTimeout = defaultSetTimout;
		        }
		    } catch (e) {
		        cachedSetTimeout = defaultSetTimout;
		    }
		    try {
		        if (typeof clearTimeout === 'function') {
		            cachedClearTimeout = clearTimeout;
		        } else {
		            cachedClearTimeout = defaultClearTimeout;
		        }
		    } catch (e) {
		        cachedClearTimeout = defaultClearTimeout;
		    }
		} ())
		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        //normal enviroments in sane situations
		        return setTimeout(fun, 0);
		    }
		    // if setTimeout wasn't available but was latter defined
		    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		        cachedSetTimeout = setTimeout;
		        return setTimeout(fun, 0);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedSetTimeout(fun, 0);
		    } catch(e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
		            return cachedSetTimeout.call(null, fun, 0);
		        } catch(e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
		            return cachedSetTimeout.call(this, fun, 0);
		        }
		    }
		
		
		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        //normal enviroments in sane situations
		        return clearTimeout(marker);
		    }
		    // if clearTimeout wasn't available but was latter defined
		    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		        cachedClearTimeout = clearTimeout;
		        return clearTimeout(marker);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedClearTimeout(marker);
		    } catch (e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
		            return cachedClearTimeout.call(null, marker);
		        } catch (e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
		            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
		            return cachedClearTimeout.call(this, marker);
		        }
		    }
		
		
		
		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
		
		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
		
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;
		
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}
		
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		};
		
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
		
		function noop() {}
		
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
		
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
		
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };
	
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = log;
		
		/*eslint no-console:0*/
		function log() {
		  var _console;
		
		  if ((undefined)) (_console = console).log.apply(_console, arguments);
		}
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=react-draggable.js.map

/***/ })

});
//# sourceMappingURL=container.js.map