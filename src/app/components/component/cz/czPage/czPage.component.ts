import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'cz-page',
  styleUrls: ['./czPage.scss'],
  templateUrl: './czPage.html'
})

export class CzPage {

  protected pages: number[] = [];
 /* private paginationLength: number = 10;
  private quotient: number = 0;
  private currentQuotient: number = 0;*/
  private _pageInfo: any;

  @Input() set pageInfo(value: any) {
    this._pageInfo = value;
    /*console.log(this._pageInfo)
    this.quotient = Math.floor(this._pageInfo.pages / this.paginationLength);
    this.currentQuotient = Math.floor(this._pageInfo.pageNum / this.paginationLength);
    let length = 0;
    console.log(this.quotient);
    console.log(this.currentQuotient);
    if (this.currentQuotient < this.quotient) {
      length = 10;
    } else if (this.quotient == Math.floor(this._pageInfo.pageNum / this.paginationLength)) {
      length = this._pageInfo.pages;
    }
    this.pages = Array(length).fill('').map((_, idx) => idx + (this.paginationLength * this.currentQuotient + 1));*/
    /*this.cardinal = this._pageInfo.pageNum <= this.paginationLength ? 0 : this._pageInfo.pageNum / this.paginationLength;
     const length =
     this.cardinal == this._pageInfo.pages / this.paginationLength
     ? this._pageInfo - this.cardinal * this.paginationLength
     :this._pageInfo.pages - this.cardinal * this.paginationLength;
     this.pages = Array.from({length: length}, (v, k) => this.paginationLength * this.cardinal + k + 1)*/
  }

  get pageInfo(): any {
    return this._pageInfo;
  }

  @Output() changePage = new EventEmitter<any>();


  constructor() {

  }

  ngOnInit() {
  }

  paginate(page) {
    this.changePage.emit(page);
    return false;
  }
}
