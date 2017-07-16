const RENDER_DATA_AS_ITEMS = 'RENDER_DATA_AS_ITEMS';
const FILTER_ITEMS_BY_TAG = 'FILTER_ITEMS_BY_TAG';

const initialState = {
    loading: true,
    itemsData: [],
    specificUserItems: [],
    filterValues: []
};


export function renderDataAsItems(allItems, specificUserItems) {
    return {
        type: RENDER_DATA_AS_ITEMS,
        payload: { allItems, specificUserItems }
    };
}

export function ItemRenderer(state = initialState, action) {
    switch (action.type) {
    case RENDER_DATA_AS_ITEMS:
        const itemRenderState = {
            loading: false,
            itemsData: action.payload.allItems,
            specificUserItems: action.payload.specificUserItems
        };
        return itemRenderState;
    case FILTER_ITEMS_BY_TAG:
        const filteredItemState = {
            loading: false,
            itemsData: action.payload
        };
        return filteredItemState;
    default:
        return state;
    }
}


// Thunk actions
export function fetchAndRenderItems(userId) {
    return function (dispatch) {
        Promise.all(['http://localhost:3001/items', 'http://localhost:3001/users'].map(url => (
                   fetch(url).then(response => response.json())
               ))).then(json => {
                   const [items, users] = json;
                   const itemsWithOwners = items.map(item => {
                       const itemOwner = users.filter(user => user.id === item.itemOwner);
                       item.itemOwner = itemOwner[0];
                       const itemBorrower = users.filter(user => user.id === item.borrower);
                       item.itemBorrower = itemBorrower[0];
                       return item;
                   });
                   let specificUserItems = [];
                   if (userId) { // TODO: turn this into a reduce
                       specificUserItems = itemsWithOwners.filter(item => item.itemOwner.id === userId);
                   }
                   dispatch(renderDataAsItems(itemsWithOwners, specificUserItems));
               });
    };
}
