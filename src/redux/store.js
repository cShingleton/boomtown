import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Reducers from './combine-reducers';


export default createStore(
   Reducers,
    applyMiddleware(
        logger,
        thunk
    )
);
