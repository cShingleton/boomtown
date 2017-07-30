const EMAIL_KEY_PRESS = 'EMAIL_KEY_PRESS';
const PASSWORD_KEY_PRESS = 'PASSWORD_KEY_PRESS';

const initialState = {
    password: '',
    email: ''
};

export function captureEmailInput(email) {
    return {
        type: EMAIL_KEY_PRESS,
        payload: email
    };
}

export function capturePasswordInput(password) {
    return {
        type: PASSWORD_KEY_PRESS,
        payload: password
    };
}

export function FormReducer(state = initialState, action) {
    switch (action.type) {
    case PASSWORD_KEY_PRESS:
        return { ...state, password: action.payload };
    case EMAIL_KEY_PRESS:
        return { ...state, email: action.payload };
    default:
        return state;
    }
}
