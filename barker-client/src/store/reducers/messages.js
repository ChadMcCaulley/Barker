import {LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";

const message = (state=[], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGE:
            return state.filter(message => message._id !== action.id);  //return all messages that are not the given message (filter is pure)
        default:
            return state;
    }
};

export default message;