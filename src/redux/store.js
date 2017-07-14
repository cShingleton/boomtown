import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ItemRenderer } from './reducer';


export default createStore(
    combineReducers({
        items: ItemRenderer
    }),
    applyMiddleware(
        logger,
        thunk
    )
);
