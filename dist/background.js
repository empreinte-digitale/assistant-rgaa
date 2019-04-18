webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(457);


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.onUpdate = exports.closeTab = exports.captureVisibleTab = exports.fetchCurrentTab = exports.insertCSS = exports.executeScript = exports.createTab = exports.sendMessageToTab = exports.CONTENT_STYLES = exports.CONTENT_SCRIPTS = undefined;
	
	var _extension = __webpack_require__(182);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	/**
	 *
	 */
	const CONTENT_SCRIPTS = exports.CONTENT_SCRIPTS = ['dist/common.js', 'dist/container.js', 'dist/helpers.js'];
	
	/**
	 *
	 */
	const CONTENT_STYLES = exports.CONTENT_STYLES = ['dist/container.css', 'dist/helpers.css'];
	
	/**
	 *
	 */
	const sendMessageToTab = exports.sendMessageToTab = (0, _extension.api)('tabs.sendMessage');
	const createTab = exports.createTab = (0, _extension.api)('tabs.create');
	const executeScript = exports.executeScript = (0, _extension.api)('tabs.executeScript');
	const insertCSS = exports.insertCSS = (0, _extension.api)('tabs.insertCSS');
	
	/**
	 *
	 */
	const fetchCurrentTabApi = (0, _extension.api)('tabs.query');
	const captureVisibleTabApi = (0, _extension.api)('tabs.captureVisibleTab');
	
	/**
	 *
	 */
	const fetchCurrentTab = exports.fetchCurrentTab = (() => {
		var _ref = _asyncToGenerator(function* () {
			const query = {
				active: true,
				currentWindow: true
			};
	
			const tabs = yield fetchCurrentTabApi(query);
	
			if (!tabs.length) {
				throw new Error('No tab found');
			}
	
			return tabs[0];
		});
	
		return function fetchCurrentTab() {
			return _ref.apply(this, arguments);
		};
	})();
	
	/**
	 *
	 */
	const captureVisibleTab = exports.captureVisibleTab = (() => {
		var _ref2 = _asyncToGenerator(function* () {
			let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
				format: 'png'
			};
	
			const source = yield captureVisibleTabApi(null, options);
			const image = new Image();
			image.src = source;
	
			return image;
		});
	
		return function captureVisibleTab() {
			return _ref2.apply(this, arguments);
		};
	})();
	
	/**
	 *
	 */
	const closeTab = exports.closeTab = id => chrome.tabs.remove(id);
	
	/**
	 *
	 */
	const onUpdate = exports.onUpdate = callback => chrome.tabs.onUpdated.addListener(callback);

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getWindowObject = exports.getWindowTabId = exports.getWindow = exports.closeWindow = exports.openWindow = undefined;
	
	var _find2 = __webpack_require__(381);
	
	var _find3 = _interopRequireDefault(_find2);
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _extension = __webpack_require__(182);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	/**
	 *
	 */
	const openWindow = exports.openWindow = (0, _extension.api)('windows.create');
	const closeWindow = exports.closeWindow = (0, _extension.api)('windows.remove');
	
	/**
	 *
	 */
	const getWindowApi = (0, _extension.api)('windows.get');
	
	/**
	 *
	 */
	const getWindow = exports.getWindow = function getWindow(id) {
	  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { populate: true };
	  return getWindowApi(id, options);
	};
	
	/**
	 * get the window first tab's id by making a new getWindow request if necessary
	 *
	 * this is necessary because depending on context, a window object might not
	 * have a tabs property (ie, the result of a windows.create in firefox < 52)
	 */
	const getWindowTabId = exports.getWindowTabId = (() => {
	  var _ref = _asyncToGenerator(function* (windowObject) {
	    const id = (0, _get3.default)(windowObject, 'tabs[0].id');
	
	    if (id) {
	      return id;
	    }
	
	    const window = getWindow(windowObject.id, { populate: true });
	    return (0, _get3.default)(window, 'tabs[0].id');
	  });
	
	  return function getWindowTabId(_x2) {
	    return _ref.apply(this, arguments);
	  };
	})();
	
	/**
	 *
	 */
	const getWindowObject = exports.getWindowObject = (url, options) => {
	  const views = chrome.extension.getViews(options);
	  return (0, _find3.default)(views, windowObject => windowObject.location.href === url);
	};

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 *
	 */
	const OPTIONS_FILE = exports.OPTIONS_FILE = 'pages/options.html';
	
	/**
	 *
	 */
	const open = exports.open = () => new Promise((resolve, reject) => {
		// eslint-disable-line no-new
		chrome.runtime.openOptionsPage(() => {
			if (!chrome.runtime.lastError) {
				resolve();
			} else {
				reject(chrome.runtime.lastError);
			}
		});
	});

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = createStore;
	
	var _redux = __webpack_require__(94);
	
	var _reduxSaga = __webpack_require__(44);
	
	var _reduxSaga2 = _interopRequireDefault(_reduxSaga);
	
	var _shareState = __webpack_require__(468);
	
	var _shareState2 = _interopRequireDefault(_shareState);
	
	var _sync = __webpack_require__(185);
	
	var _reducers = __webpack_require__(51);
	
	var _sagas = __webpack_require__(458);
	
	var _sagas2 = _interopRequireDefault(_sagas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function createStore(name, sharedStore, sendMessage) {
		const sagaMiddleware = (0, _reduxSaga2.default)();
		const store = (0, _redux.createStore)((0, _redux.combineReducers)(_reducers.appReducers), (0, _redux.compose)((0, _redux.applyMiddleware)((0, _sync.createGatherMiddleware)(name), sagaMiddleware, (0, _sync.createBroadcastMiddleware)(name, sendMessage)), (0, _shareState2.default)(sharedStore)));
	
		sagaMiddleware.run(_sagas2.default);
		return store;
	}

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * get source code of given page
	 */
	const getSource = exports.getSource = url => fetch(url).then(content => content.text());

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = createAppInstance;
	
	var _tabs = __webpack_require__(123);
	
	var _createStore = __webpack_require__(288);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _panel = __webpack_require__(71);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *	Creates an app instance, i.e. a container for data associated
	 *	with a particular tab.
	 */
	function createAppInstance(tabId, sharedStore) {
		let popupId = false;
	
		//
		const isPopup = () => !!popupId;
	
		//
		const setPopup = id => {
			popupId = id;
		};
	
		//
		const removePopup = () => {
			popupId = null;
			return tabId;
		};
	
		// Sends a message to the instance's tabs.
		const sendMessage = message => {
			const responses = [(0, _tabs.sendMessageToTab)(tabId, message)];
	
			if (popupId) {
				responses.push((0, _tabs.sendMessageToTab)(popupId, message));
			}
	
			return Promise.all(responses);
		};
	
		const store = (0, _createStore2.default)(`background-${tabId}`, sharedStore, sendMessage);
	
		const isOpen = () => (0, _panel.isOpen)(store.getState());
	
		return {
			isPopup,
			setPopup,
			removePopup,
			sendMessage,
			isOpen,
			store,
			dispatch: store.dispatch
		};
	}

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _method2 = __webpack_require__(870);
	
	var _method3 = _interopRequireDefault(_method2);
	
	var _forEach2 = __webpack_require__(243);
	
	var _forEach3 = _interopRequireDefault(_forEach2);
	
	var _unset2 = __webpack_require__(886);
	
	var _unset3 = _interopRequireDefault(_unset2);
	
	var _get2 = __webpack_require__(21);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _has2 = __webpack_require__(862);
	
	var _has3 = _interopRequireDefault(_has2);
	
	exports.default = createInstancePool;
	
	var _redux = __webpack_require__(94);
	
	var _reducers = __webpack_require__(51);
	
	var _createAppInstance = __webpack_require__(454);
	
	var _createAppInstance2 = _interopRequireDefault(_createAppInstance);
	
	var _createOptionsInstance = __webpack_require__(456);
	
	var _createOptionsInstance2 = _interopRequireDefault(_createOptionsInstance);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function createInstancePool() {
		const sharedStore = (0, _redux.createStore)((0, _redux.combineReducers)(_reducers.sharedReducers));
		const instances = {};
		let optionsInstance;
	
		//
		const create = id => {
			const instance = (0, _createAppInstance2.default)(id, sharedStore);
			instances[id] = instance;
			return instance;
		};
	
		// deregisters the popup id and returns the original tab id.
		const switchToTab = popupId => {
			const instance = instances[popupId];
			const tabId = instance.removePopup();
			instances[tabId] = instance;
			delete instances[popupId];
			return tabId;
		};
	
		// Registers the popup id on which the instance runs.
		const switchToPopup = (tabId, popupId) => {
			const instance = instances[tabId];
			instance.setPopup(popupId);
			instances[popupId] = instance;
		};
	
		// Registers the popup id on which the instance runs.
		const getOptionsInstance = () => {
			if (!optionsInstance) {
				optionsInstance = (0, _createOptionsInstance2.default)(sharedStore);
			}
	
			return optionsInstance;
		};
	
		//
		const dispatch = action => (0, _forEach3.default)(instances, (0, _method3.default)('dispatch', action));
	
		return {
			create,
			switchToPopup,
			switchToTab,
			getOptionsInstance,
			dispatch,
			hasInstance: _has3.default.bind(null, instances),
			getInstance: _get3.default.bind(null, instances),
			removeInstance: _unset3.default.bind(null, instances)
		};
	}

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = createOptionsInstance;
	
	var _runtime = __webpack_require__(18);
	
	var _createStore = __webpack_require__(288);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	function createOptionsInstance(sharedStore) {
		const store = (0, _createStore2.default)('background-options', sharedStore, _runtime.sendMessage);
	
		return {
			sendMessage: _runtime.sendMessage,
			store,
			dispatch: store.dispatch
		};
	}

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _endsWith2 = __webpack_require__(845);
	
	var _endsWith3 = _interopRequireDefault(_endsWith2);
	
	var _runtime = __webpack_require__(22);
	
	var _container = __webpack_require__(131);
	
	var _windows = __webpack_require__(178);
	
	var _options = __webpack_require__(287);
	
	var _tabs = __webpack_require__(123);
	
	var _runtime2 = __webpack_require__(18);
	
	var _image = __webpack_require__(460);
	
	var _validateLocalPage = __webpack_require__(465);
	
	var _viewSource = __webpack_require__(466);
	
	var _reference = __webpack_require__(125);
	
	var _panel = __webpack_require__(70);
	
	var _reference2 = __webpack_require__(69);
	
	var _panel2 = __webpack_require__(68);
	
	var _createInstancePool = __webpack_require__(455);
	
	var _createInstancePool2 = _interopRequireDefault(_createInstancePool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *	A map of open instances, indexed by tab id.
	 */
	const instances = (0, _createInstancePool2.default)();
	
	/**
	 *	Injects content styles and javascripts one after the other.
	 */
	const injectContentScripts = tabId => [..._tabs.CONTENT_STYLES, ..._tabs.CONTENT_SCRIPTS].reduce((promise, file) => promise.then(() => (0, _endsWith3.default)(file, '.css') ? (0, _tabs.insertCSS)(tabId, { file }) : (0, _tabs.executeScript)(tabId, { file })), Promise.resolve());
	
	/**
	 *
	 */
	const openPanel = (_ref) => {
		let id = _ref.id;
	
		const instance = instances.getInstance(id);
		// this is done to trigger open panel sagas to add helpers
		// it is necessary for this use case: open panel > enable a test > close panel >
		// reload the page > open the panel.
		// it is not necessary for this use case: open panel > enable a test > reload the page
		// this 2nd case is handled in the helpers/index.js file
		instance.dispatch((0, _panel2.open)());
		// this is sent so that the container content script acts accordingly
		return instance.sendMessage({
			type: _runtime.OPEN_PANEL
		});
	};
	
	/**
	 *
	 */
	const closePanel = (_ref2) => {
		let id = _ref2.id;
	
		const instance = instances.getInstance(id);
		// this is done to trigger close panel sagas to remove helpers
		instance.dispatch((0, _panel2.close)());
		// this is sent so that the container content script acts accordingly
		return instance.sendMessage({
			type: _runtime.CLOSE_PANEL
		});
	};
	
	/**
	 *
	 */
	const togglePanel = tab => {
		const instance = instances.getInstance(tab.id);
		return instance.isOpen() ? closePanel(tab) : openPanel(tab);
	};
	
	/**
	 *
	 */
	const createPanel = (_ref3) => {
		let id = _ref3.id,
		    url = _ref3.url,
		    title = _ref3.title;
	
		const instance = instances.getInstance(id);
		openPanel({ id }).then(() => (0, _reference.getReferenceOption)()).then(function () {
			let version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reference.DEFAULT_VERSION;
	
			instance.dispatch((0, _reference2.setReferenceVersion)(version));
			instance.dispatch((0, _panel2.setPageInfo)({
				url,
				title
			}));
		});
	};
	
	/**
	 *
	 */
	const handleUnknownInstanceMessage = message => {
		switch (message.type) {
			default:
				return _runtime.INVALID_RESPONSE;
		}
	};
	
	/**
	 *
	 */
	const handleKnownInstanceMessage = (message, tabId, instance) => {
		switch (message.type) {
			// sends the store's state to the instance.
			case _runtime.REQUEST_INITIAL_STATE:
				return instance.store.getState();
	
			// if the instance runs in a tab, opens a popup and
			// indexes the instance on the new tab id,
			case _runtime.OPEN_POPUP:
				if (!instance.isPopup()) {
					(0, _windows.openWindow)({
						url: chrome.runtime.getURL(_container.IFRAME_FILE),
						type: 'popup'
					}).then(popup => (0, _windows.getWindowTabId)(popup)).then(popupTabId => {
						instances.switchToPopup(tabId, popupTabId);
					});
				}
				break;
	
			// if the instance runs in a popup, desindexes it and
			// closes it.
			case _runtime.CLOSE_POPUP:
				if (instance.isPopup()) {
					instances.switchToTab(tabId);
					(0, _tabs.closeTab)(tabId);
				}
				break;
	
			// sends the store's state to the instance.
			case _runtime.GET_PIXEL:
				return (0, _tabs.captureVisibleTab)().then(image => (0, _image.getPixelAt)(image, message.x, message.y));
	
			// sends current tab's info to the instance.
			case _runtime.GET_CURRENT_TAB:
				return (0, _tabs.fetchCurrentTab)();
	
			case _runtime.VALIDATE_PAGE:
				return (0, _validateLocalPage.validateLocalPage)(message.url);
	
			case _runtime.VIEW_PAGE_SOURCE:
				return (0, _viewSource.viewSource)(message.url);
	
			// create a tab with the given url, next to the current tab
			case _runtime.CREATE_TAB:
				return (0, _tabs.fetchCurrentTab)().then(currentTab => (0, _tabs.createTab)({
					url: message.url,
					index: currentTab.index + 1
				}));
	
			case _runtime.CLOSE_PANEL:
				return closePanel({ id: tabId });
	
			// broadcasts message
			default:
				return instance.sendMessage(message);
		}
	};
	
	/**
	 *	Asks the content script to toggle the extension's container
	 *	when one clicks the extension icon in the browser UI.
	 */
	chrome.browserAction.onClicked.addListener(() => (0, _tabs.fetchCurrentTab)().then(tab => {
		if (instances.hasInstance(tab.id)) {
			togglePanel(tab);
		}
	
		if (!instances.hasInstance(tab.id)) {
			const instance = instances.create(tab.id);
			// send an empty message, just to check if we have a response
			// if we have a response, it means there already is a content script loaded
			// and we don't need to load them again
			// if there is no response, we'll trigger an error, it means there is no
			// content script and we need to load them
			instance.sendMessage('').then(() => createPanel(tab)).catch(() => {
				injectContentScripts(tab.id).then(() => {
					createPanel(tab);
				});
			});
		}
	}));
	
	/**
	 *	Dispatches every message to the content scripts, allowing
	 *	content scripts to talk to each other.
	 */
	chrome.runtime.onMessage.addListener((0, _runtime2.createMessageHandler)((message, sender) => {
		const isOptionsPage = sender.url && sender.url.endsWith(_options.OPTIONS_FILE);
		const tabId = sender.tab && sender.tab.id;
		const instance = !isOptionsPage ? instances.getInstance(tabId) : instances.getOptionsInstance();
	
		return instance ? handleKnownInstanceMessage(message, tabId, instance) : handleUnknownInstanceMessage(message);
	}));
	
	/**
	 *	Removes associated data when a tab is closed.
	 */
	chrome.tabs.onRemoved.addListener(id => {
		const instance = instances.getInstance(id);
		// let our instances pool know that we just closed a popup
		if (instance && instance.isPopup()) {
			const tabId = instances.switchToTab(id);
			closePanel({ id: tabId });
			// put back the default position in case we want to open the app again
			// on the current tab
			return instance.dispatch((0, _panel2.setPosition)(_panel.Position.right));
		}
		return instances.removeInstance(id);
	});
	
	/**
	 * reinject content scripts on page reload
	 */
	const onPageReload = (tabId, instance) => injectContentScripts(tabId).then(() => instance.isOpen() ? openPanel({ id: tabId }) : closePanel({ id: tabId }));
	
	chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
		if (changeInfo.status === 'complete' && instances.hasInstance(tabId)) {
			// send an empty message, just to check if we have a response
			// if we have a response, it means there already is a content script loaded
			// and we don't need to load them again
			// if there is no response, we'll trigger an error, it means there is no
			// content script and we need to load them
			//
			// this check can seem unnecessary, but it is required because
			// chrome.tabs.onUpdated triggers more than on actual page reloads, especially on Chrome
			const instance = instances.getInstance(tabId);
			instance.sendMessage('').then(response => {
				// firefox sometimes has a ['undefined'] response? this is weird
				// a response when scripst are actually loaded here is [{'message': 'ok'}]
				if (response && response.length === 1 && response[0] === undefined) {
					onPageReload(tabId, instance);
				}
			}).catch(() => onPageReload(tabId, instance));
		}
	});

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = sagas;
	
	var _reference = __webpack_require__(482);
	
	var reference = _interopRequireWildcard(_reference);
	
	var _options = __webpack_require__(481);
	
	var options = _interopRequireWildcard(_options);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *	Exports all sagas of the application.
	 */
	function* sagas() {
		yield [options.watchOpen(), reference.watchSetReferenceVersion()];
	}

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/*
	 * retrieve the helpers mapping full json object from a given reference version
	 */
	const getHelpers = exports.getHelpers = version => fetch(chrome.extension.getURL(`data/helpers/${version}.json`)).then(response => response.json()).catch(() => ({}));

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getPixelAt = undefined;
	
	var _color = __webpack_require__(136);
	
	var _color2 = _interopRequireDefault(_color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *
	 */
	const getPixelAt = exports.getPixelAt = (image, x, y) => new Promise(resolve => {
		const resolveWithPixel = () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
	
			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);
	
			const pixel = context.getImageData(x, y, 1, 1);
			const hex = (0, _color2.default)(pixel.data).hex().toString();
	
			resolve(hex);
		};
	
		if (image.naturalWidth) {
			resolve(resolveWithPixel());
		} else {
			image.onload = resolveWithPixel;
		}
	});

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 *	Retrieve instructions mapping for the given version.
	 */
	const fetchInstructions = exports.fetchInstructions = version => fetch(chrome.extension.getURL(`data/instructions/${version}.json`)).then(response => response.json()).catch(() => ({}));

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.validateLocalPage = undefined;
	
	var _source = __webpack_require__(292);
	
	var _tabs = __webpack_require__(123);
	
	var _windows = __webpack_require__(178);
	
	/**
	 *
	 */
	const validateLocalPage = exports.validateLocalPage = url => {
		let source;
		return (0, _source.getSource)(url).then(sourceString => {
			source = sourceString;
		}).then(() => (0, _tabs.fetchCurrentTab)()).then(currentTab => (0, _tabs.createTab)({
			url: chrome.runtime.getURL('pages/validateLocalPage.html'),
			index: currentTab.index + 1
		})).then(tab => {
			// @see http://stackoverflow.com/q/18045348
			// I'm sure there is some better way to do this but well…
			// couldn't figure it out with the time I have right now
			(0, _tabs.onUpdate)((tabId, _ref) => {
				let status = _ref.status;
	
				if (status !== 'complete' || tabId !== tab.id) {
					return;
				}
				const tabWindow = (0, _windows.getWindowObject)(tab.url, { type: 'tab', windowId: tab.windowId });
				if (!tabWindow || !tabWindow.validateSource) {
					return;
				}
				tabWindow.validateSource(source);
			});
		});
	};

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.viewSource = undefined;
	
	var _source = __webpack_require__(292);
	
	var _tabs = __webpack_require__(123);
	
	var _windows = __webpack_require__(178);
	
	/**
	 *
	 */
	const viewSource = exports.viewSource = url => {
		let source;
		return (0, _source.getSource)(url).then(sourceString => {
			source = sourceString.trim();
		}).then(() => (0, _tabs.fetchCurrentTab)()).then(currentTab => (0, _tabs.createTab)({
			url: chrome.runtime.getURL('pages/viewSource.html'),
			index: currentTab.index + 1
		})).then(tab => {
			// @see http://stackoverflow.com/q/18045348
			// I'm sure there is some better way to do this but well…
			// couldn't figure it out with the time I have right now
			(0, _tabs.onUpdate)((tabId, _ref) => {
				let status = _ref.status;
	
				if (status !== 'complete' || tabId !== tab.id) {
					return;
				}
				const tabWindow = (0, _windows.getWindowObject)(tab.url, { type: 'tab', windowId: tab.windowId });
				if (!tabWindow || !tabWindow.viewSource) {
					return;
				}
				tabWindow.viewSource(source);
			});
		});
	};

/***/ }),

/***/ 468:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = shareState;
	/**
	 *	Wraps a store creator so the created store also dispatches
	 *	actions to another store and merges their state.
	 */
	function shareState(sharedStore) {
		return createStore => (reducer, preloadedState, enhancer) => {
			const store = createStore(reducer, preloadedState, enhancer);
	
			const getState = () => _extends({}, sharedStore.getState(), store.getState());
	
			const dispatch = action => {
				sharedStore.dispatch(action);
				store.dispatch(action);
			};
	
			const subscribe = listener => {
				sharedStore.subscribe(listener);
				store.subscribe(listener);
			};
	
			return _extends({}, store, {
				getState,
				dispatch,
				subscribe
			});
		};
	}

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.watchOpen = watchOpen;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _options = __webpack_require__(287);
	
	var _options2 = __webpack_require__(290);
	
	/**
	 *
	 */
	function* openWorker() {
	  yield (0, _effects.call)(_options.open);
	}
	
	/**
	 *
	 */
	function* watchOpen() {
	  yield* (0, _reduxSaga.takeEvery)(_options2.OPEN, openWorker);
	}

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.watchSetReferenceVersion = watchSetReferenceVersion;
	
	var _reduxSaga = __webpack_require__(44);
	
	var _effects = __webpack_require__(66);
	
	var _options = __webpack_require__(291);
	
	var _reference = __webpack_require__(125);
	
	var _helpers = __webpack_require__(459);
	
	var _instructions = __webpack_require__(462);
	
	var _reference2 = __webpack_require__(69);
	
	var _helpers2 = __webpack_require__(67);
	
	var _instructions2 = __webpack_require__(289);
	
	var _checklist = __webpack_require__(124);
	
	/**
	 *
	 */
	function* setReferenceVersionWorker(_ref) {
		let version = _ref.payload.version;
	
		var _ref2 = yield [(0, _effects.call)(_reference.getReference, version), (0, _effects.call)(_helpers.getHelpers, version), (0, _effects.call)(_instructions.fetchInstructions, version)],
		    _ref3 = _slicedToArray(_ref2, 3);
	
		const reference = _ref3[0],
		      helpers = _ref3[1],
		      instructions = _ref3[2];
	
	
		const flattened = (0, _reference.flattenReference)(reference);
	
		yield (0, _effects.put)((0, _checklist.reset)());
		yield (0, _effects.put)((0, _reference2.setData)(flattened));
		yield (0, _effects.put)((0, _helpers2.setHelpers)(helpers));
		yield (0, _effects.put)((0, _instructions2.set)(instructions));
	
		yield (0, _effects.call)(_options.setOption, 'reference', version);
	}
	
	/**
	 *
	 */
	function* watchSetReferenceVersion() {
		yield* (0, _reduxSaga.takeEvery)(_reference2.SET_REFERENCE_VERSION, setReferenceVersionWorker);
	}

/***/ }),

/***/ 737:
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}
	
	module.exports = baseHas;


/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(147),
	    castPath = __webpack_require__(107),
	    last = __webpack_require__(249),
	    parent = __webpack_require__(375),
	    toKey = __webpack_require__(47);
	
	/**
	 * The base implementation of `_.invoke` without support for individual
	 * method arguments.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the method to invoke.
	 * @param {Array} args The arguments to invoke the method with.
	 * @returns {*} Returns the result of the invoked method.
	 */
	function baseInvoke(object, path, args) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  var func = object == null ? object : object[toKey(last(path))];
	  return func == null ? undefined : apply(func, object, args);
	}
	
	module.exports = baseInvoke;


/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

	var baseClamp = __webpack_require__(344),
	    baseToString = __webpack_require__(106),
	    toInteger = __webpack_require__(61),
	    toString = __webpack_require__(39);
	
	/**
	 * Checks if `string` ends with the given target string.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {string} [target] The string to search for.
	 * @param {number} [position=string.length] The position to search up to.
	 * @returns {boolean} Returns `true` if `string` ends with `target`,
	 *  else `false`.
	 * @example
	 *
	 * _.endsWith('abc', 'c');
	 * // => true
	 *
	 * _.endsWith('abc', 'b');
	 * // => false
	 *
	 * _.endsWith('abc', 'b', 2);
	 * // => true
	 */
	function endsWith(string, target, position) {
	  string = toString(string);
	  target = baseToString(target);
	
	  var length = string.length;
	  position = position === undefined
	    ? length
	    : baseClamp(toInteger(position), 0, length);
	
	  var end = position;
	  position -= target.length;
	  return position >= 0 && string.slice(position, end) == target;
	}
	
	module.exports = endsWith;


/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(737),
	    hasPath = __webpack_require__(367);
	
	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}
	
	module.exports = has;


/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

	var baseInvoke = __webpack_require__(739),
	    baseRest = __webpack_require__(57);
	
	/**
	 * Creates a function that invokes the method at `path` of a given object.
	 * Any additional arguments are provided to the invoked method.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Util
	 * @param {Array|string} path The path of the method to invoke.
	 * @param {...*} [args] The arguments to invoke the method with.
	 * @returns {Function} Returns the new invoker function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': _.constant(2) } },
	 *   { 'a': { 'b': _.constant(1) } }
	 * ];
	 *
	 * _.map(objects, _.method('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(objects, _.method(['a', 'b']));
	 * // => [2, 1]
	 */
	var method = baseRest(function(path, args) {
	  return function(object) {
	    return baseInvoke(object, path, args);
	  };
	});
	
	module.exports = method;


/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

	var baseUnset = __webpack_require__(354);
	
	/**
	 * Removes the property at `path` of `object`.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
	 * _.unset(object, 'a[0].b.c');
	 * // => true
	 *
	 * console.log(object);
	 * // => { 'a': [{ 'b': {} }] };
	 *
	 * _.unset(object, ['a', '0', 'b', 'c']);
	 * // => true
	 *
	 * console.log(object);
	 * // => { 'a': [{ 'b': {} }] };
	 */
	function unset(object, path) {
	  return object == null ? true : baseUnset(object, path);
	}
	
	module.exports = unset;


/***/ })

});
//# sourceMappingURL=background.js.map