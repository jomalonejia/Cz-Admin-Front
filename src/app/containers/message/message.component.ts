import {Component} from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket'
import {Subscription} from "rxjs/Subscription";
import {Message} from "./models/message";
import {Store} from "@ngrx/store";
import {UUID} from 'angular2-uuid';

import * as fromAuth from 'app/reducers/auth';
import * as fromRoot from 'app/reducers';
import * as fromRootMessage from './reducers';
import * as fromMessage from './reducers/message';
import * as messageActions from './actions/message';
import {Observable} from "rxjs/Observable";
import {MessageService} from "./services/message.service";
import {MessageUser} from "./models/message.user";


@Component({
  selector: 'message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent {

  ws: $WebSocket;
  sub: Subscription;
  messages$:Observable<Message[]>;
  message: Message;
  friends: MessageUser[] = [];
  username: string;
  fullname: string;
  profile:string;
  activateUser:string;
  activateUser$:Observable<string>;
  userId:number;

  constructor(private authStore:Store<fromAuth.State>,
              private messageStore:Store<fromMessage.State>,
              private messageService: MessageService) {

    this.authStore.select(fromRoot.getAuthState)
      .subscribe(state => {
        this.username = state.username;
        this.profile = state.profile;
        this.userId = +state.userId;
        this.fullname = state.fullname;
      });
    this.activateUser$ = this.messageStore.select(fromRootMessage.getMessageActiveUser);
    this.activateUser$
      .subscribe(activateUser => {console.log(activateUser);this.activateUser = activateUser});


    this.messages$ = this.messageStore.select(fromRootMessage.getMessages);
  }

  ngOnInit(){
    this.messageService.listRelatedUsers(this.userId)
      .map(res => res.json())
      .subscribe(v => {
        v.map(user => {
          let friend = new MessageUser();
          Object.assign(friend, user);
          this.friends.push(friend);
        })
      });

    this.messageStore.select(fromRootMessage.getMessageState)
      .subscribe(v => {
        console.log(v);
      });
    //this.toggleUsername(this.activateUser);
  }

  ngAfterViewInit() {
    this.initWebSocket();
  }

  ngOnDestroy() {
    this.destroyWebSocket();
  }

  initWebSocket(): void {
    this.ws = new $WebSocket('ws://localhost:3000/test');
    this.sub = this.ws.getDataStream()
      .map(res => JSON.parse(res.data))
      .subscribe(
        message => {
          let sentMessage = new Message();
          Object.assign(sentMessage, message);
          console.log(sentMessage);
          //this.messages.push(sentMessage);
        },
        err => {
          console.error(err);
        }
      );
  }

  destroyWebSocket(): void {
    if (this.sub) {
      try {
        this.sub.unsubscribe();
      } catch (err) {
      }
    }
    if (this.ws) {
      try {
        this.ws.close(true);
      } catch (err) {
      }
    }
  }

  createMessage(message: string): Message {
    return new Message({
      messageId: UUID.UUID(),
      threadId: this.messageService.getMessageThreadId(this.username, this.activateUser),
      username: this.username,
      text: message,
      profile:this.profile,
      sentTime: new Date,
      sentTo: this.activateUser,
      isFailed: false
    });
  }

  send(messageStr) {
    console.log(messageStr);
    let newMessage = this.createMessage(messageStr);
    console.log(newMessage);
    this.ws.send(newMessage).subscribe({
      error: () => {
        let errorMessage = Object.assign(newMessage, {'isFailed': true});
        this.messageStore.dispatch(new messageActions.SendMessageAction(errorMessage));
      },
      complete: () => {
        this.messageStore.dispatch(new messageActions.SendMessageAction(newMessage));
      }
    });
  }


}
