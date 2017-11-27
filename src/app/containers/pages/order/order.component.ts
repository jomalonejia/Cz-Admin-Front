import {Component, ViewContainerRef} from '@angular/core';
import {OrderService} from './services';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderEditComponent} from './components';
import {Store} from '@ngrx/store';
import * as fromRootOrder from './reducers';
import * as fromOrder from './reducers/order';
import * as orderActions from './actions';
import * as constants from 'app/constants/http.constants';
import {Page} from 'app/models';

@Component({
  selector: 'cz-order',
  styleUrls: ['./order.component.scss'],
  templateUrl: './order.component.html',
})
export class OrderComponent {

  orders$: Observable<any[]>;
  filterQuery = '';
  sortBy = 'id';
  sortOrder = 'asc';
  rowsOnPage = 5;
  pagesCount: number = 5;
  pageNum: number = 1;
  pageSize: number = 5;

  constructor(private store: Store<fromOrder.State>,
              private modalService: NgbModal,
              private orderService: OrderService) {
    this.listOrders(this.pageNum);
  }

  ngOnInit() {
    this.orders$ = this.store.select(fromRootOrder.getOrders);
  }

  listOrders(pageNum: number) {
    this.orderService.listOrders(pageNum, this.pageSize)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        this.store.dispatch(new orderActions.ListOrdersSuccessAction(pageInfo.list));
        this.pagesCount = pageInfo.pages;
        this.pageNum = pageInfo.pageNum;
      });
  }

  changePage(page) {
    this.listOrders(page);
  }

  openEditModal(orderId) {
    const activeModal = this.modalService.open(OrderEditComponent, {size: 'lg', backdrop: 'static',});
    this.orders$.subscribe(orders => {
      const order = orders.find(order => order.id = orderId);
      activeModal.componentInstance.order = order;
    });
  }
}
