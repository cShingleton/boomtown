import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { ItemRenderer } from './modules/items';
import { AuthRenderer } from './modules/auth';
// import { ProfileRenderer } from './modules/profile';
import client from '../config/apolloclient';

export default combineReducers({
    items: ItemRenderer,
    auth: AuthRenderer,
    // profile: ProfileRenderer,
    router: routerReducer,
    apollo: client.reducer()
});
