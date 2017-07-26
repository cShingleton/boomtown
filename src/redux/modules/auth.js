const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';
const SHOW_SIGN_UP_MODAL = 'SHOW_SIGN_UP_MODAL';

const initialState = {
    userProfile: false,
    showLoginEror: false,
    showJoinModal: false
};

// state determines what user sees : so we set show error to true and false to hide and display it
export function showLoginError(showError) {
    return {
        type: SHOW_LOGIN_ERROR,
        payload: showError
    };
}

export function showSignUpModal(showModal) {
    return {
        type: SHOW_SIGN_UP_MODAL,
        payload: showModal
    };
}

export function updateAuthState(userProfile) {
    return {
        type: UPDATE_AUTH_STATE,
        payload: userProfile
    };
}

export function AuthRenderer(state = initialState, action) {
    switch (action.type) {
    case SHOW_LOGIN_ERROR:
        return { ...state, showLoginEror: action.payload };
    case SHOW_SIGN_UP_MODAL:
        return { ...state, showJoinModal: action.payload };
    case UPDATE_AUTH_STATE:
        return { ...state, userProfile: action.payload };
    default:
        return state;
    }
}

