import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ItemRenderer } from './modules/items';
import { ProfileRenderer } from './modules/profile';

export default combineReducers({
    items: ItemRenderer,
    profile: ProfileRenderer,
    router: routerReducer
});
