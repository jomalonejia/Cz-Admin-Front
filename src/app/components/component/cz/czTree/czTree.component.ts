import {Component, Input} from '@angular/core';

@Component({
  selector:'cz-tree',
  styleUrls:['./czTree.scss'],
  templateUrl:'./czTree.html'
})

export class CzTree{

  @Input() data;

  toggle(x){
    this.data[x]['open'] =  !this.data[x]['open'];
  }
}

