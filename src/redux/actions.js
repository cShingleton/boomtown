export const RENDER_DATA_AS_ITEMS = 'RENDER_DATA_AS_ITEMS';

export function renderDataAsItems(itemsWithOwners) {
    return {
        type: RENDER_DATA_AS_ITEMS,
        payload: itemsWithOwners
    };
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
                   dispatch(renderDataAsItems(itemsWithOwners));
               });
    };
}
