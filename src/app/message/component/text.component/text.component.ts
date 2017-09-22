import {Component, EventEmitter, Output, ViewChild} from "@angular/core";

@Component({
  selector:'message-text',
  templateUrl:'./text.component.html',
  styleUrls:['./text.component.scss']
})

export class TextComponent{
  @Output() sendMessage = new EventEmitter<string>();
  @ViewChild('messageArea') messageArea;

  send(message){
    this.sendMessage.next(message);
    this.messageArea.nativeElement.value = '';
  }
}
