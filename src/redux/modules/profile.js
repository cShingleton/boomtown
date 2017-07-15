const RENDER_USER_PROFILE_DATA = 'RENDER_USER_PROFILE_DATA';

const initialState = {
    loading: true,
    profileData: {}
};


export function renderUserProfileData(profileData) {
    return {
        type: RENDER_USER_PROFILE_DATA,
        payload: profileData
    };
}

export function ProfileRenderer(state = initialState, action) {
    switch (action.type) {
    case RENDER_USER_PROFILE_DATA:
        const profileRenderState = {
            loading: false,
            profileData: action.payload
        };
        return profileRenderState;
    default:
        return state;
    }
}

// Thunk actions
export function fetchAndRenderProfile(url) {
    return function (dispatch) {
        fetch(`http://localhost:3001/users/${url}`)
                .then(response => response.json())
                .then(json => {
                    const user = json;
                    dispatch(renderUserProfileData(user));
                });

                // add my notfound page and update state to undefined
                   // only use it fetch a user
                   // in the profilecontainer dispatch two async creators
                //    1. for grabbing items,
                //    2. for grabbing userinfo
                //    3. filter out items don't belong
                //    4. dispatch and info will be aviable in the StorageEvent
                //    5. filter the data in the store using a helper MSInputMethodContext
    };
}
