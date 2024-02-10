import {compose, createStore} from 'redux';
import reducer from '../common/reducers';
import DevTools from './components/DevTools';

/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(reducer, compose(DevTools.instrument()));

export default store;
