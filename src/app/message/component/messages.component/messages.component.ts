import {Component, Input} from "@angular/core";
import {Message} from "../../../component/models";

@Component({
  selector:'message-messages',
  templateUrl:'./messages.component.html',
  styleUrls:['./messages.component.scss']
})

export class MessagesComponent{
  @Input() messages:Message[] = [];
  @Input() username:string;
}
