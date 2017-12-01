import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from 'app/containers/pages/item/services';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomToasterService} from 'app/services/toaster';
import {ItemAddComponent,
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent} from './components';
import {Store} from '@ngrx/store';
import * as fromRootItem from './reducers';
import * as fromItem from './reducers/item';
import * as itemActions from './actions';
import {Page} from 'app/models';

@Component({
  selector: 'page-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  categories$: Observable<object>;
  items;
  pageInfo$:Observable<any>;
  filterQuery = '';
  rowsOnPage = 5;
  sortBy = 'email';
  sortOrder = 'asc';
  name: string;
  pageNum: number = 1;
  pageSize: number = 5;

  constructor(private itemService: ItemService,
              private store: Store<fromItem.State>,
              private categoryService: CategoryService,
              private modalService: NgbModal,
              private toasterService: CustomToasterService) {


    this.pageInfo$ = this.store.select(fromRootItem.getItemsInfo);
    this.pageInfo$.subscribe(pageInfo => this.items = pageInfo.list);

  }

  ngOnInit(){
    this.store.dispatch(new itemActions.ListItemsAction(new Page(1,this.pageSize)))
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
    activeModal.componentInstance.discount = this.items[index].discount;
    activeModal.componentInstance.categoryId = this.items[index].category.id;
    activeModal.componentInstance.parentCategoryId = this.items[index].category.parentId;
    activeModal.componentInstance.describe = this.items[index].describe;
  }

  openImageModal(index, itemId) {
    const activeModal = this.modalService.open(ItemEditImageComponent, {size: 'lg'});
    activeModal.componentInstance.image = this.items[index].image;
    activeModal.componentInstance.itemId = itemId;
    activeModal.result.then(() => {
        this.changePage(this.pageNum);
      },
      () => {
        this.changePage(this.pageNum);
      });
  }

  openContentModal(index) {
    const activeModal = this.modalService.open(ItemEditContentComponent, {size: 'lg'});
    activeModal.componentInstance.itemId = this.items[index].id;
    activeModal.componentInstance.content = this.items[index].content;
  }

  delete(itemId) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.itemService.delete(itemId)
        .catch(err => {
          this.toasterService.toasterTip({message: 'Delete Failed!', type: 'error'});
          return Observable.throw(err)
        })
        .subscribe(v => {
          this.toasterService.toasterTip({message: 'Delete Success!', type: 'success'});
          setTimeout(window.location.reload(),1000)

        });
    }
    else {
      return;
    }
  }

  toggleCategory(categoryId: number) {
    this.itemService.listItemsByCategory(categoryId, this.pageNum,this.pageSize)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.items = pageInfo.list;
      });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  };

  changePage(page) {
    this.store.dispatch(new itemActions.ListItemsAction(new Page(page,this.pageSize)))
  }

  showSuccess() {
    this.toasterService.toasterTip({message: 'success', type: ''});
  }
}
