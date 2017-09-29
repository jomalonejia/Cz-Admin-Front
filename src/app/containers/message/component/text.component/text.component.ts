import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector:'message-text',
  templateUrl:'./text.component.html',
  styleUrls:['./text.component.scss']
})

export class TextComponent{
  @Input() activateUser:string = '';
  @Output() sendMessage = new EventEmitter<string>();
  @ViewChild('messageArea') messageArea;

  send(message){
    this.sendMessage.next(message);
    this.messageArea.nativeElement.value = '';
  }

  ngOnInit(){
    console.log(this.activateUser);
  }
}
