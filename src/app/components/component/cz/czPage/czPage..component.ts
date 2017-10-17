import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'cz-page',
  styleUrls:['./czPage.scss'],
  templateUrl:'./czPage.html'
})

export class CzPage{
  private _pagesCount:number;


  @Input() set pagesCount(value: number) {
    this._pagesCount = value;
    for(let i =1;i<value+1;i++){
      this.pages.push(i);
    }
  }

  get pagesCount(): number {
    return this._pagesCount;
  }

  @Output() changePage = new EventEmitter<any>();


  protected page: number = 1;
  protected pages:number[] = [];

  constructor(){

  }

  /*ngOnChanges(changes: SimpleChanges) {
    const counts = changes.pagesCount.currentValue;
    for(let i =1;i<counts+1;i++){
      this.pages.push(i);
    }
  }*/

  shouldShow(){
    return this.pages.length > 1;
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
    return this.pagesCount;
  }

}
