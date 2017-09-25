import {Component, Input} from "@angular/core";

@Component({
  selector:'cz-card',
  templateUrl:'./czCard.html'
})

export class CzCard{
  @Input() title:string;
  @Input() czCardClass:string;
  @Input() cardType:string;
}
