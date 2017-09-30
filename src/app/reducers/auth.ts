import * as auth from '../actions/auth';

export interface State {
  userId: string;
  username: string;
  fullname:string;
  profile: string;
  token: string;

}

const initialState: State = {
  userId: null,
  username: null,
  fullname:null,
  profile: null,
  token: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
          return Object.assign({},state,action.payload);
          //return initialState;
    case auth.REFRESH_SUCCESS:
      return Object.assign({},state,action.payload);
      //return state;
    case auth.REFRESH_FAILED:
      return state;
    default:
      return state;
  }
}

export const getToken = (state:State) => state.token;
export const getProfile = (state:State) => state.profile;
export const getUsername = (state:State) => state.username;
export const getUserId = (state:State) => state.userId;
