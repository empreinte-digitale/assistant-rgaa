import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './reducers';
import {gatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';
import chromeStorage from '../common/api/storage';
import {sendToContent} from './api/tabs';



/**
 *	Creates middlewares.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	applyMiddleware(
		gatherMiddleware,
		sagaMiddleware,
		createBroadcastMiddleware(sendToContent)
	)
);

/**
 *	Runs all sagas of the application.
 */
sagaMiddleware.run(sagas);



/**
 * persist store in chrome storage
 */
export const persistor = persistStore(store, {
	storage: chromeStorage
});



export default store;
