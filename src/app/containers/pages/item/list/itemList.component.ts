import {Component, ViewChild} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ItemEditComponent,
           ItemEditContentComponent,
           ItemEditImageComponent } from './component';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'itemList',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.scss'],
})

export class ItemListComponent {



  categories$:Observable<Object>;
  data;
  filterQuery = "";
  rowsOnPage = 5;
  sortBy = "email";
  sortOrder = "asc";
  name: string;



  openAddModal(){
    const activeModal = this.modalService.open(ItemEditComponent, { size: 'lg'});

  }


  openEditModal() {
    const activeModal = this.modalService.open(ItemEditComponent, { size: 'lg'});

    activeModal.componentInstance.title = this.data[0].title;
    activeModal.componentInstance.price = this.data[0].price;
    activeModal.componentInstance.describe = this.data[0].describe;
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

  changePage(page){
    console.log(page);
  }

  constructor(private modalService:NgbModal,private http:HttpClient) {

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

  ngOnInit(){
    this.categories$ = this.http.get('api/item/listCategories');
  }

}

