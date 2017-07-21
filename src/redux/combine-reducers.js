import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { ItemRenderer } from './modules/items';
// import { ProfileRenderer } from './modules/profile';
import client from '../config/apolloclient';

export default combineReducers({
    items: ItemRenderer,
    // profile: ProfileRenderer,
    router: routerReducer,
    apollo: client.reducer()
});
