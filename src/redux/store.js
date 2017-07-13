import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

export default createStore(
    applyMiddleware(
        logger
    )
);
