webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(525);
	module.exports = __webpack_require__(659);


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = App;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ReferenceFormContainer = __webpack_require__(523);
	
	var _ReferenceFormContainer2 = _interopRequireDefault(_ReferenceFormContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function App() {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_ReferenceFormContainer2.default, null)
		);
	}

/***/ }),

/***/ 522:
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function ReferenceForm(_ref) {
		let version = _ref.version,
		    value = _ref.value,
		    setValue = _ref.setValue,
		    options = _ref.options,
		    showSuccessMessage = _ref.showSuccessMessage,
		    onChange = _ref.onChange,
		    onSubmit = _ref.onSubmit;
	
		const onSelectChange = event => {
			setValue(event.target.value);
			onChange(event.target.value);
		};
	
		const onFormSubmit = event => {
			event.preventDefault();
			onSubmit(value);
		};
	
		return _react2.default.createElement(
			'form',
			{ onSubmit: onFormSubmit, className: 'Options-references' },
			_react2.default.createElement(
				'div',
				{ className: 'Options-field' },
				_react2.default.createElement(
					'label',
					{ htmlFor: 'Options-referencesSelect' },
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Options.references.label' })
				),
				_react2.default.createElement(
					'select',
					{
						name: 'references',
						id: 'Options-referencesSelect',
						value: value,
						onChange: onSelectChange
					},
					options.map(ref => _react2.default.createElement(
						'option',
						{
							key: `ref-${ref.value}`,
							value: ref.value
						},
						ref.name
					))
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'Options-submit' },
				_react2.default.createElement(
					'button',
					null,
					_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Options.references.submit' })
				)
			),
			(0, _renderIf2.default)(showSuccessMessage)(() => _react2.default.createElement(
				'p',
				{ className: 'Options-success' },
				_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Options.references.successMessage' })
			))
		);
	}
	
	ReferenceForm.propTypes = {
		value: _react.PropTypes.string.isRequired,
		options: _react.PropTypes.array.isRequired,
		onChange: _react.PropTypes.func.isRequired,
		onSubmit: _react.PropTypes.func.isRequired,
		setValue: _react.PropTypes.func.isRequired,
		showSuccessMessage: _react.PropTypes.bool.isRequired
	};
	
	exports.default = (0, _reactIntl.injectIntl)(ReferenceForm);

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _recompose = __webpack_require__(43);
	
	var _reactRedux = __webpack_require__(12);
	
	var _reference = __webpack_require__(69);
	
	var _imports = __webpack_require__(95);
	
	var _reference2 = __webpack_require__(125);
	
	var _reference3 = __webpack_require__(30);
	
	var _ReferenceForm = __webpack_require__(522);
	
	var _ReferenceForm2 = _interopRequireDefault(_ReferenceForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const mapStateToProps = state => ({
		version: (0, _reference3.getVersion)(state)
	});
	
	/**
	 *
	 */
	const props = {
		options: (0, _reference2.getReferencesList)().map((_ref) => {
			let version = _ref.version,
			    name = _ref.name;
			return {
				value: version,
				name
			};
		})
	};
	
	/**
	 *
	 */
	const mapDispatchToProps = (dispatch, _ref2) => {
		let toggleSuccessMessage = _ref2.toggleSuccessMessage;
		return {
			onChange() {
				toggleSuccessMessage(false);
			},
	
			onSubmit(version) {
				dispatch((0, _imports.reset)());
				dispatch((0, _reference.setReferenceVersion)(version));
				toggleSuccessMessage(true);
			}
		};
	};
	
	exports.default = (0, _recompose.compose)((0, _recompose.withState)('showSuccessMessage', 'toggleSuccessMessage', false), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _recompose.withProps)(props), (0, _recompose.withState)('value', 'setValue', (_ref3) => {
		let version = _ref3.version;
		return version || _reference2.DEFAULT_VERSION;
	}))(_ReferenceForm2.default);

/***/ }),

/***/ 524:
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	exports.default = () => (0, _getInitialState2.default)().then(state => (0, _createStore2.default)('options', _reducers2.default, undefined, state));

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(62);
	
	var _reactRedux = __webpack_require__(12);
	
	var _reactIntl = __webpack_require__(10);
	
	var _fr = __webpack_require__(269);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(184);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	var _getStore = __webpack_require__(524);
	
	var _getStore2 = _interopRequireDefault(_getStore);
	
	var _App = __webpack_require__(521);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _reactIntl.addLocaleData)(_fr2.default);
	
	(0, _getStore2.default)().then(store => _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactIntl.IntlProvider,
			{ locale: 'fr', messages: _fr4.default },
			_react2.default.createElement(_App2.default, null)
		)
	)).then(app => (0, _reactDom.render)(app, document.getElementById('options'))).catch(() => {});

/***/ }),

/***/ 659:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=options.js.map