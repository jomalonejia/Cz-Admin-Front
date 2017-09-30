import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import {MessageService} from "../services";

import * as actions from '../actions';
import * as constants from 'app/constants';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/switchMap';
import {of} from "rxjs/observable/of";




@Injectable()
export class MessageEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private messageService: MessageService) {

  }

  @Effect()
  toggleMessageUer$ = this.actions$
    .ofType(actions.TOGGLE_MESSAGE_USER)
    .map((action:actions.ToggleMessageUserAction) => action.payload)
    .throttleTime(500)
    .switchMap(obj => {
      let threadId = this.messageService.getMessageThreadId(obj['username'],obj['oppositeName']);
      if(threadId != null){
        return this.messageService.listMessgesById(threadId)
          .map((res:object) => {
            return new actions.ToggleMessageUserSuccessAction({activeUser:obj['oppositeName'],messages:res['messages']?res['messages']:null});
          })
          .catch(err => {return of(new actions.ToggleMessageUserFailedAction())});
      }else{
        return this.messageService.listMessages(obj['username'], obj['oppositeName'])
          .map(res => {
            let response = res[0];
            this.messageService.setMessageThreadId(obj['username'],obj['oppositeName'],res['_id']);
            return new actions.ToggleMessageUserSuccessAction({activeUser:obj['oppositeName'],messages:response.messages?response.message:null});
          })
          .catch(err => {console.log(err);return of(new actions.ToggleMessageUserFailedAction())});
      }
    });




  @Effect()
  readMessage$: Observable<Action> = this.actions$
    .ofType(actions.READ_MESSAGE)
    .map((action:actions.ReadMessageAction) => action.payload)
    .throttleTime(500)
    .switchMap(obj => {
      return this.messageService.readMessage(constants.KOA_READMESSAGE_URL, obj['threadId'])
        .map(res => {
          return new actions.ReadMessageSuccessAction({activeUser: obj['activeUser'], messages: res});
        })
    });
}
