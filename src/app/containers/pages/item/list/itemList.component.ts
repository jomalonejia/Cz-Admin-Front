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
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'itemList',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.scss'],
})

export class ItemListComponent {

  pageInfo$: Observable<any>;
  categories$: Observable<object>;
  items;
  filterQuery = '';
  rowsOnPage = 5;
  sortBy = 'email';
  sortOrder = 'asc';
  name: string;
  pagesCount: number;
  pageNum: number = 1;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private categoryService: CategoryService,
              private modalService: NgbModal,
              private toasterService: CustomToasterService) {

    this.listItems(this.pageNum);
  }

  ngAfterViewInit() {
    this.categories$ = this.categoryService.listTreeCategories();

  }

  openAddModal() {
    const activeModal = this.modalService.open(ItemAddComponent, {size: 'lg', backdrop: 'static',});
  }


  openEditModal(index) {
    const activeModal = this.modalService.open(ItemEditComponent, {size: 'lg', backdrop: 'static',});

    activeModal.componentInstance.itemId = this.items[index].id;
    activeModal.componentInstance.name = this.items[index].name;
    activeModal.componentInstance.price = this.items[index].price;
    activeModal.componentInstance.categoryId = this.items[index].category.id;
    activeModal.componentInstance.parentCategoryId = this.items[index].category.parentId;
    activeModal.componentInstance.describe = this.items[index].describe;
  }

  openImageModal(index, itemId) {
    const activeModal = this.modalService.open(ItemEditImageComponent, {size: 'lg'});
    activeModal.componentInstance.image = this.items[index].image;
    ;
    activeModal.componentInstance.itemId = itemId;
    activeModal.result.then(() => {
        this.listItems(this.pageNum);
      },
      () => {
        this.listItems(this.pageNum);
      });
  }

  openContentModal() {
    const activeModal = this.modalService.open(ItemEditContentComponent, {size: 'lg'});
  }

  listItems(pageNum: number) {
    this.itemService.listItems(pageNum)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.items = pageInfo.list;
        this.pagesCount = pageInfo.pages;
        this.pageNum = pageInfo.pageNum;
      });
  }

  delete(itemId) {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(itemId);
      this.itemService.delete(itemId)
        .catch(err => Observable.throw(err))
        .subscribe(v => {
          window.location.reload();
        });
    }
    else {
      return;
    }
  }

  toggleCategory(categoryId: number) {
    this.itemService.listItemsByCategory(categoryId, this.pageNum)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.items = pageInfo.list;
        this.pagesCount = pageInfo.pages;
        this.pageNum = pageInfo.pageNum;
      });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  };

  changePage(page) {
    this.itemService.listItems(page);
  }

  showSuccess() {
    this.toasterService.toasterTip({message: 'success', type: ''});
  }

}

