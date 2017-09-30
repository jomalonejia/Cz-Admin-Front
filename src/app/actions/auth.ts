import { Action } from '@ngrx/store';
import { Authenticate } from '../models/auth'

export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const REFRESH_SUCCESS = '[Auth] REFRESH_SUCCESS';
export const REFRESH_FAILED = '[Auth] REFRESH_FAILED';

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: object) {}
}

export class RefreshSuccessAction implements Action {
  readonly type = REFRESH_SUCCESS;
  constructor(public payload: object) {}
}

export class RefreshFailedAction implements Action {
  readonly type = REFRESH_FAILED;
  constructor(public payload?: object) {}
}


export type Actions = LoginSuccessAction|RefreshSuccessAction|RefreshFailedAction;
