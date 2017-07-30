import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import client from '../config/apolloclient';
import Reducers from './combine-reducers';
import { history } from '../index';

const reduxRouter = routerMiddleware(history);

const middleware = [
    thunk,
    reduxRouter,
    client.middleware()
];

if (process.env.NODE_ENV === 'development') {
    middleware.unshift(logger);
}

export default createStore(
   Reducers,
   composeWithDevTools(
    applyMiddleware(...middleware)
   )
);
