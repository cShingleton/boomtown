const RENDER_DATA_AS_ITEMS = 'RENDER_DATA_AS_ITEMS';
// add filter item functionality here 

const initialState = {
    loading: true,
    itemsData: [],
    // filterValue: [] 
};


export function renderDataAsItems({ itemsWithOwners }) {
    return {
        type: RENDER_DATA_AS_ITEMS,
        payload: itemsWithOwners
    };
}

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


// Thunk actions
export function fetchAndRenderItems() {
    return function (dispatch) {
        Promise.all(['http://localhost:3001/items', 'http://localhost:3001/users'].map(url => (
                   fetch(url).then(response => response.json())
               ))).then(json => {
                   const [items, users] = json;
                   const itemsWithOwners = items.map(item => {
                       const itemOwner = users.filter(user => user.id === item.itemOwner);
                       item.itemOwner = itemOwner[0];
                       return item;
                   });
                   const itemBorrowers = items.map(item => {
                       const itemBorrower = users.filter(user => user.id === item.borrower);
                       item.itemBorrower = itemBorrower[0];
                       return item;
                   });
                   dispatch(renderDataAsItems({ itemsWithOwners, itemBorrowers }));
               });
    };
}