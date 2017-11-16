import * as message from '../actions/message';
import {Message} from '../models/message';

export interface State {
  activeUser: string;
  messages: Message[];
}

const initialState: State = {
  activeUser: '',
  messages: []
};

export function reducer(state: State = initialState, action: message.messageActions): State {
  switch (action.type) {
    case message.TOGGLE_MESSAGE_USER_SUCCESS:
      return Object.assign({}, state, {
        activeUser: action.payload['activeUser'],
        messages: action.payload['messages']
      });
    case message.TOGGLE_MESSAGE_USER_FAILED:
      return state;
    case message.READ_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        activeUser: action.payload['activeUser'],
        messages: action.payload['messages']
      });
    case message.CLEAR_MESSAGE:
      return initialState;
    case message.SEND_MESSAGE:
      return Object.assign({}, state, {messages: [...state.messages, ...action.payload]});
    default:
      return state;
  }
}

export const getActiveUser = (state: State) => state.activeUser;
export const getMessages = (state: State) => state.messages;
