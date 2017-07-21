import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import client from '../config/apolloclient';
import Reducers from './combine-reducers';
import { history } from '../index';

// CAPTURE USER INFORMATION AND UPDATE FILTERING FUNCTIONALITY HERE

const reduxRouter = routerMiddleware(history);

export default createStore(
   Reducers,
   composeWithDevTools(
    applyMiddleware(
        logger,
        thunk,
        reduxRouter,
        client.middleware()
    )
   )
);
