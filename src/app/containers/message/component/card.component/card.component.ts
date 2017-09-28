import {Component, Input} from "@angular/core";

@Component({
  selector:'message-card',
  templateUrl:'./card.component.html',
  styleUrls:['./card.component.scss']
})

export class CardComponent{
  @Input() username:string;
  @Input() fullname:string;
  @Input() profile:String;
}
