const RENDER_DATA_AS_ITEMS = 'RENDER_DATA_AS_ITEMS';
const FILTER_ITEMS_BY_TAG = 'FILTER_ITEMS_BY_TAG';
const REMOVE_FILTER_BY_TAG = 'REMOVE_FILTER_BY_TAG';

const initialState = {
    loading: true,
    itemsData: [],
    specificUserItems: [],
    filterValues: [],
    appliedTags: []
};


export function renderDataAsItems(allItems, specificUserItems) {
    return {
        type: RENDER_DATA_AS_ITEMS,
        payload: { allItems, specificUserItems }
    };
}

export function renderFilteredItems(filterValues, appliedTags, itemsData) {
    return {
        type: FILTER_ITEMS_BY_TAG,
        payload: { filterValues, appliedTags, itemsData }
    };
}

export function removeFilteredItems(filterValues, appliedTags, itemsData) {
    return {
        type: REMOVE_FILTER_BY_TAG,
        payload: { filterValues, appliedTags, itemsData }
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
            itemsData: action.payload.itemsData,
            filterValues: action.payload.filterValues,
            appliedTags: action.payload.appliedTags
        };
        return filteredItemState;
    case REMOVE_FILTER_BY_TAG:
        const unfilteredItemState = {
            loading: false,
            itemsData: action.payload.itemsData,
            filterValues: action.payload.filterValues,
            appliedTags: action.payload.appliedTags
        };
        return unfilteredItemState;
    default:
        return state;
    }
}

export function unfilterItems(itemTag, appliedTags, filterValues, itemsData) {
    return function (dispatch) {
        appliedTags.shift(itemTag);
        console.log(appliedTags);
        filterValues.filter(item => {
            const tags = item.tags;
            return tags.map(tag => {
                if (tag === itemTag) {
                    filterValues.shift(item);
                }
            });
        });
        console.log(filterValues);
        console.log(appliedTags);
        dispatch(removeFilteredItems(filterValues, appliedTags, itemsData));
    }
};


export function filterItems(itemTag, appliedTags = [], filterValues = [], itemsData) {
    return function (dispatch) {
        appliedTags.push(itemTag);
        if (filterValues.length > 0) {
            const itemsToAdd = [];
            itemsData.filter(item => {
                const tags = item.tags;
                return tags.map(tag => {
                    if (tag === itemTag) {
                        itemsToAdd.push(item);
                    }
                });
            });
            filterValues = filterValues.concat(itemsToAdd);
        } else {
            itemsData.filter(item => {
                const tags = item.tags;
                return tags.map(tag => {
                    if (tag === itemTag) {
                        filterValues.push(item);
                    }
                });
            });
        }
        dispatch(renderFilteredItems(filterValues, appliedTags, itemsData));
    };
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
