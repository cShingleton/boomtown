import {
    RENDER_DATA_AS_ITEMS
} from './actions';

const initialState = {
    loading: true,
    itemsData: []
};

export function ItemRenderer(state = initialState, action) {
    switch (action.type) {
    case RENDER_DATA_AS_ITEMS:
        const itemRenderState = {
            loading: false,
            itemsData: action.payload
        };
        return itemRenderState;
    default:
        return state;
    }
}
