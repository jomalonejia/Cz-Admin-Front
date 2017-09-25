import {Component, ViewChild} from "@angular/core";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import {ItemEditComponent} from "./component/itemEdit.component";

@Component({
  selector: 'itemList',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.scss'],
})

export class ItemListComponent {

  data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  name: string;

  openDialog(): void {
    let dialogRef = this.dialog.open(ItemEditComponent, {
      width: '250px',
      data: { item : this.data[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

  constructor(public dialog: MdDialog) {
      this.data = [
        {
          title:'iphone8',
          price:999,
          describe1:'只要998，买不了吃亏！',
          image:'http://otlht2gvo.bkt.clouddn.com/front/test1.jpg',
          minusImages:[
            'http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc',
            'http://otlht2gvo.bkt.clouddn.com/FhJjx2HL0l0OCLo6bb-MGKYc-UhG',
            'http://otlht2gvo.bkt.clouddn.com/Fiv9XUxhQWeX2MdtrjPqRR30MhyD',
            'http://otlht2gvo.bkt.clouddn.com/FmcEZZUaGhj9DKm9j_drFYh7BmNc',
            '',
            ''
          ]
        },
        {
          title:'小米not6',
          price:998,
          describe1:'只要998，买不了吃亏！',
          image:'http://otlht2gvo.bkt.clouddn.com/Nick.png',
          minusImages:[
            'http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc',
            'http://otlht2gvo.bkt.clouddn.com/FhJjx2HL0l0OCLo6bb-MGKYc-UhG',
            'http://otlht2gvo.bkt.clouddn.com/Fiv9XUxhQWeX2MdtrjPqRR30MhyD',
            'http://otlht2gvo.bkt.clouddn.com/FmcEZZUaGhj9DKm9j_drFYh7BmNc',
            '',
            ''
          ]
        },
    ]
  }

}

