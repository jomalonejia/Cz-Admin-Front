import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent,
  ItemAddComponent
} from './components';
import {Observable} from 'rxjs/Observable';
import {ItemService} from '../item.service';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {CustomToasterService} from 'app/services/toaster';


@Component({
  selector: 'itemList',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.scss'],
})

export class ItemListComponent {


  categories$: Observable<Object>;
  items;
  filterQuery = '';
  rowsOnPage = 5;
  sortBy = 'email';
  sortOrder = 'asc';O
  name: string;
  pagesCount: number;

  constructor(private itemService: ItemService,
              private categoryService: CategoryService,
              private modalService: NgbModal,
              private http: HttpClient,
              private toasterService: CustomToasterService) {
    this.itemService.listItems(1)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.items = pageInfo.list;
        this.pagesCount = pageInfo.pages;
      });
  }

  openAddModal() {
    const activeModal = this.modalService.open(ItemAddComponent, {size: 'lg'});
  }


  openEditModal(index) {
    const activeModal = this.modalService.open(ItemEditComponent, {size: 'lg'});

    activeModal.componentInstance.itemId = this.items[index].itemId;
    activeModal.componentInstance.name = this.items[index].name;
    activeModal.componentInstance.price = this.items[index].price;
    activeModal.componentInstance.categoryId = this.items[index].category.categoryId;
    activeModal.componentInstance.parentCategoryId = this.items[index].category.parentCategoryId;
    activeModal.componentInstance.describe = this.items[index].describe;
  }

  openImageModal() {
    const activeModal = this.modalService.open(ItemEditImageComponent, {size: 'lg'});
    activeModal.componentInstance.image = this.items[0].image;
    activeModal.componentInstance.minusImages = this.items[0].minusImages;
  }

  openContentModal() {
    const activeModal = this.modalService.open(ItemEditContentComponent, {size: 'lg'});
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  };

  changePage(page) {
    this.itemService.listItems(page)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.items = pageInfo.list;
        this.pagesCount = pageInfo.pages;
      });
  }

  showSuccess() {
    this.toasterService.toasterTip({message: 'success', type: ''});
  }

}

