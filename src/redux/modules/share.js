// redux form should create the reducer automatically
const STEP_FORWARD = 'STEP_FORWARD';
const STEP_BACKWARD = 'STEP_BACKWARD';

const initialState = {
    form: {
        finished: false,
        stepIndex: 0
        // loading
    },
    image: {
        url: ''
    }
};

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
            stepIndex: action.payload - 1 };
    default: 
        return state;
    }
}

export function ShareFormReducer(state = initialState, action) {
    switch (action.type) {
    case STEP_FORWARD:
        return {
            ...state,
            form: StepReducer(state.form, action)
        };
    case STEP_BACKWARD:
        return {
            ...state,
            form: StepReducer(state.form, action)
        };
    default:
        return state;
    }
}

//   handleNext = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex < 2) {
//       this.setState({stepIndex: stepIndex + 1});
//     }
//   };
