import {Action} from "@ngrx/store";
import {Message} from "../models/message";

export const TOGGLE_MESSAGE_USER = '[Message] Toggle Message User';
export const TOGGLE_MESSAGE_USER_SUCCESS = '[Message] Toggle Message User Success';
export const TOGGLE_MESSAGE_USER_FAILED = '[Message] Toggle Message User Failed';
export const READ_MESSAGE = '[Message] Read Message';
export const READ_MESSAGE_SUCCESS = '[Message] Read Message Success';
export const CLEAR_MESSAGE = '[Message] CLear Message';
export const SEND_MESSAGE = '[Message] Send Message';

export class ToggleMessageUserAction implements Action {
  readonly type: string = TOGGLE_MESSAGE_USER;

  constructor(public payload: object) {
  }
}

export class ToggleMessageUserSuccessAction implements Action {
  readonly type: string = TOGGLE_MESSAGE_USER_SUCCESS;

  constructor(public payload?: object) {
  }
}

export class ToggleMessageUserFailedAction implements Action {
  readonly type: string = TOGGLE_MESSAGE_USER_FAILED;

  constructor(public payload?: object) {
  }
}

export class ReadMessage implements Action{
  readonly type: string = READ_MESSAGE;
  constructor(public payload:object){

  }
}
export class ReadMessageSuccess implements Action{
  readonly type: string = READ_MESSAGE_SUCCESS;
  constructor(public payload:object){

  }
}

export class ClearMessage implements Action {
  readonly type: string = CLEAR_MESSAGE;
  constructor(public payload?) {

  }
}

export class SendMessage implements Action{
  readonly type: string = SEND_MESSAGE;
  constructor(public payload:Message) {

}
}

export type messageActions = ToggleMessageUserAction|
                             ToggleMessageUserSuccessAction|
                             ToggleMessageUserFailedAction|
                             ReadMessage|
                             ReadMessageSuccess|
                             ClearMessage|
                             SendMessage;
