import { Action } from '@ngrx/store';
import { Authenticate } from '../models/auth'

export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: object) {}
}


export type Actions = LoginSuccess;
