const RENDER_DATA_AS_ITEMS = 'RENDER_DATA_AS_ITEMS';
const FILTER_ITEMS_BY_TAG = 'FILTER_ITEMS_BY_TAG';

const initialState = {
    loading: true,
    itemsData: [],
    specificUserItems: [],
    itemFilters: []
};


export function renderDataAsItems(allItems, specificUserItems) {
    return {
        type: RENDER_DATA_AS_ITEMS,
        payload: { allItems, specificUserItems }
    };
}

export function updateItemsFilter(filters) {
    return {
        type: FILTER_ITEMS_BY_TAG,
        payload: filters
    };
}

export function ItemRenderer(state = initialState, action) {
    switch (action.type) {
    case RENDER_DATA_AS_ITEMS:
        return { ...state, specificUserItems: action.payload.specificUserItems, itemsData: action.payload.allItems };
    case FILTER_ITEMS_BY_TAG:
        return { ...state, itemFilters: action.payload };
    default:
        return state;
    }
}

// Thunk actions
export function fetchAndRenderItems(userId) {
    return function renderDispatch(dispatch) {
        Promise.all(['http://localhost:3001/items', 'http://localhost:3001/users'].map(url => (
                   fetch(url).then(response => response.json())
               ))).then(json => {
                   const [items, users] = json;
                   const allItems = items.map(item => {
                       const itemOwner = users.filter(user => user.id === item.itemOwner);
                       const itemBorrower = users.filter(user => user.id === item.borrower);
                       item.itemOwner = itemOwner[0];
                       item.itemBorrower = itemBorrower[0];
                       return item;
                   });
                   let specificUserItems = [];
                   if (userId) { // TODO: turn this into a reduce
                       specificUserItems = allItems.filter(item => item.itemOwner.id === userId);
                   }
                   dispatch(renderDataAsItems(allItems, specificUserItems));
               });
    };
}
