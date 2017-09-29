import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MessageUser} from "../../models/message.user";
import {Observable} from "rxjs/Observable";
import {Store} from '@ngrx/store';
import * as fromMessage from '../../reducers';
import * as messageActions from '../../actions';

@Component({
  selector:'message-list',
  templateUrl:'./list.component.html',
  styleUrls:['./list.component.scss']
})

export class ListComponent{
  @Input() friends:MessageUser[];
  @Input() username:string;
  @Output() toggleUsername:EventEmitter<string> = new EventEmitter();

  activeUser$:Observable<string>;

  constructor(private store:Store<fromMessage.State>){
    this.activeUser$ = store.select(fromMessage.getMessageActiveUser);
    this.activeUser$.subscribe(v => console.log(v));
  }

  toggleUser(oppositeName:string){
    if(this.username === oppositeName) return;
    this.store.dispatch(new messageActions.ToggleMessageUserAction({username:this.username,oppositeName:oppositeName}));
  }
}
