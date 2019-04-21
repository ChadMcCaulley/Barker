import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";
import {setCurrentUser} from "../actions/auth";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => {
        dispatch(remove(message_id)); // remove message from messages and currentUser messages
      })
      .catch(err => dispatch(addError(err.message)));
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = (text, isReply) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, {text})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)))
}