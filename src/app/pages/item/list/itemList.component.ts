import {Component, ViewChild} from "@angular/core";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ItemEditComponent} from "./component/itemEdit.component";
import {ModalComponent} from './component/modal.component';
import {ItemEditContentComponent, ItemEditImageComponent} from './component';

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



  openEditModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg'});

    activeModal.componentInstance.item = this.data[0];
  }

  openImageModal(){
    const activeModal = this.modalService.open(ItemEditImageComponent, { size: 'lg'});
    activeModal.componentInstance.image = this.data[0].image;
    activeModal.componentInstance.minusImages = this.data[0].minusImages;
  }

  openContentModal(){
    const activeModal = this.modalService.open(ItemEditContentComponent, { size: 'lg'});
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

  constructor(public dialog: MdDialog,private modalService:NgbModal) {
      this.data = [
        {
          title:'iphone8',
          price:999,
          describe:'只要998，买不了吃亏！',
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
          describe:'只要998，买不了吃亏！',
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

