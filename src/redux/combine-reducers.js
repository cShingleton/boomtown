import { combineReducers } from 'redux';
import { ItemRenderer } from './modules/items';

export default combineReducers({
    items: ItemRenderer
});
