import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { ShareFormReducer } from './modules/share';
import { ItemReducer } from './modules/items';
import { AuthReducer } from './modules/auth';
import { FormReducer } from './modules/forms';
// import { ProfileRenderer } from './modules/profile';
import client from '../config/apolloclient';

export default combineReducers({
    items: ItemReducer,
    auth: AuthReducer,
    form: FormReducer,
    share: ShareFormReducer,
    // profile: ProfileRenderer,
    router: routerReducer,
    apollo: client.reducer()
});
