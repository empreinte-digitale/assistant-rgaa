webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(519);
	module.exports = __webpack_require__(658);


/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.watchApply = watchApply;
	exports.watchRevert = watchRevert;
	exports.watchApplyAll = watchApplyAll;
	exports.watchRevertAll = watchRevertAll;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _helpers = __webpack_require__(67);
	
	var _helpers2 = __webpack_require__(302);
	
	var helpersApi = _interopRequireWildcard(_helpers2);
	
	var _tests = __webpack_require__(129);
	
	var _helpers3 = __webpack_require__(128);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *
	 */
	function* applySaga(_ref) {
	  var _ref$payload = _ref.payload;
	  let id = _ref$payload.id,
	      helpers = _ref$payload.helpers;
	
	  yield (0, _effects.call)(helpersApi.applyHelpers, id, helpers);
	}
	
	/**
	 *
	 */
	function* revertSaga(_ref2) {
	  var _ref2$payload = _ref2.payload;
	  let id = _ref2$payload.id,
	      helpers = _ref2$payload.helpers;
	
	  yield (0, _effects.call)(helpersApi.revertHelpers, id, helpers);
	}
	
	/**
	 *
	 */
	function* applyAllSaga() {
	  const enabledTests = yield (0, _effects.select)(_tests.getEnabled);
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = enabledTests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      const test = _step.value;
	
	      const helpers = yield (0, _effects.select)(_helpers3.getHelpersByTest, test.id);
	      yield (0, _effects.put)((0, _helpers.applyHelpers)(test.id, helpers));
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}
	
	/**
	 *
	 */
	function* revertAllSaga() {
	  const enabledTests = yield (0, _effects.select)(_tests.getEnabled);
	
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = enabledTests[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      const test = _step2.value;
	
	      const helpers = yield (0, _effects.select)(_helpers3.getHelpersByTest, test.id);
	      yield (0, _effects.put)((0, _helpers.revertHelpers)(test.id, helpers));
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}
	
	/**
	 *
	 */
	function* watchApply() {
	  yield* (0, _reduxSaga.takeEvery)(_helpers.APPLY, applySaga);
	}
	
	/**
	 *
	 */
	function* watchRevert() {
	  yield* (0, _reduxSaga.takeEvery)(_helpers.REVERT, revertSaga);
	}
	
	/**
	 *
	 */
	function* watchApplyAll() {
	  yield* (0, _reduxSaga.takeEvery)(_helpers.APPLY_ALL, applyAllSaga);
	}
	
	/**
	 *
	 */
	function* watchRevertAll() {
	  yield* (0, _reduxSaga.takeEvery)(_helpers.REVERT_ALL, revertAllSaga);
	}

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getInitialState = __webpack_require__(130);
	
	var _getInitialState2 = _interopRequireDefault(_getInitialState);
	
	var _helpers = __webpack_require__(67);
	
	var _panel = __webpack_require__(71);
	
	var _createStore = __webpack_require__(126);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _reducers = __webpack_require__(51);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _sagas = __webpack_require__(520);
	
	var _sagas2 = _interopRequireDefault(_sagas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	(0, _getInitialState2.default)().then(state => {
		const store = (0, _createStore2.default)('helpers', _reducers2.default, _sagas2.default, state);
		if ((0, _panel.isOpen)(state)) {
			store.dispatch((0, _helpers.applyAllHelpers)());
		}
		return store;
	});

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = sagas;
	
	var _helpers = __webpack_require__(479);
	
	var helpers = _interopRequireWildcard(_helpers);
	
	var _panel = __webpack_require__(295);
	
	var panel = _interopRequireWildcard(_panel);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *
	 */
	function* sagas() {
		yield [helpers.watchApply(), helpers.watchRevert(), helpers.watchApplyAll(), helpers.watchRevertAll(), panel.watchClose(), panel.watchOpen()];
	}

/***/ }),

/***/ 658:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=helpers.js.map