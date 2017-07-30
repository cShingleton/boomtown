// redux form should create the reducer automatically
const STEP_FORWARD = 'STEP_FORWARD';
const STEP_BACKWARD = 'STEP_BACKWARD';
const TITLE_KEY_PRESS = 'TITLE_KEY_PRESS';
const DESCRIPTION_KEY_PRESS = 'DESCRIPTION_KEY_PRESS';
const SELECT_ITEM_TAGS = 'SELECT_ITEM_TAGS';

const initialState = {
    step: {
        finished: false,
        stepIndex: 0
        // loading
    },
    form: {
        imageurl: '',
        title: '',
        description: '',
        tags: []
    }
};

// ACTION CONSTANTS
export function stepForward(stepIndex) {
    return {
        type: STEP_FORWARD,
        payload: stepIndex
    };
}

export function stepBackward(stepIndex) {
    return {
        type: STEP_BACKWARD,
        payload: stepIndex
    };
}

export function captureTitleInput(title) {
    return {
        type: TITLE_KEY_PRESS,
        payload: title
    };
}

export function captureDescriptionInput(description) {
    return {
        type: DESCRIPTION_KEY_PRESS,
        payload: description
    };
}

export function selectItemTags(tags) {
    return {
        type: SELECT_ITEM_TAGS,
        payload: tags
    };
}


// REDUCERS

function StepReducer(state, action) {
    switch (action.type) {
    case STEP_FORWARD:
        return {
            ...state,
            stepIndex: action.payload + 1
        };
    case STEP_BACKWARD:
        return {
            ...state,
            stepIndex: action.payload - 1
        };
    default:
        return state;
    }
}

export function FormReducer(state = initialState, action) {
    switch (action.type) {
    case TITLE_KEY_PRESS:
        return {
            ...state,
            title: action.payload
        };
    case DESCRIPTION_KEY_PRESS:
        return {
            ...state,
            description: action.payload
        };
    case SELECT_ITEM_TAGS:
        return {
            ...state,
            tags: action.payload
        };
    default:
        return state;
    }
}

export function ShareFormReducer(state = initialState, action) {
    switch (action.type) {
    case STEP_FORWARD:
    case STEP_BACKWARD:
        return {
            ...state,
            step: StepReducer(state.step, action)
        };
    case TITLE_KEY_PRESS:
    case DESCRIPTION_KEY_PRESS:
    case SELECT_ITEM_TAGS:
        return {
            ...state,
            form: FormReducer(state.form, action)
        };
    default:
        return state;
    }
}
