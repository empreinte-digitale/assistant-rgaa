import {REDUX_ACTION} from '../actions/runtime';

const DefaultRegister = chrome.runtime.onMessage.addListener.bind(
	chrome.runtime.onMessage
);
const DefaultSend = chrome.runtime.sendMessage.bind(chrome.runtime);

/**
 *	Gathers actions from other stores and passes it down to
 *	the next middlewares.
 *	This should be the first middleware in the chain.
 */
export const createGatherMiddleware =
	(name, register = DefaultRegister) =>
	() =>
	(next) => {
		register(({type, sender, action}) => {
			if (action && type === REDUX_ACTION && sender !== name) {
				next({
					...action,
					gathered: true
				});
			}
		});

		return (action) => next(action);
	};

/**
 *	Broadcasts actions to the other stores.
 *	This should be the last middleware in the chain.
 */
export const createBroadcastMiddleware =
	(name, send = DefaultSend) =>
	() =>
	(next) =>
	(action) => {
		if (!action.gathered) {
			send({
				type: REDUX_ACTION,
				sender: name,
				action
			});
		}

		next(action);
	};
