import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'cz-page',
  styleUrls:['./czPage.scss'],
  templateUrl:'./czPage.html'
})

export class CzPage{
  @Input() count:number;
  @Output() changePage = new EventEmitter<any>();

  protected pages: Array<any>;
  protected page: number = 1;
  protected perPage: number;

  constructor(){

  }

  ngOnInit(){
    this.pages = [1,2,3,4,5];
  }

  shouldShow(){
    return this.count > 5;
  }

  getPage(){
    return this.page;
  }

  getPages(){
    return this.pages;
  }

  paginate(page){
    this.page = page;
    this.changePage.emit(page);
    return false;
  }

  getLast(){
    return this.pages[this.pages.length-1];
  }

}
