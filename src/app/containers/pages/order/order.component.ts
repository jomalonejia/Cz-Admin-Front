import {Component, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderService} from './services';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderEditComponent} from './components';

@Component({
  selector: 'cz-order',
  styleUrls: ['./order.component.scss'],
  templateUrl: './order.component.html',
})
export class OrderComponent {

  orders;
  filterQuery = '';
  sortBy = 'id';
  sortOrder = 'asc';
  rowsOnPage = 5;
  pagesCount: number = 5;
  pageNum: number = 1;
  pageSize: number = 5;

  constructor(private http:HttpClient,
              private modalService: NgbModal,
              private orderService:OrderService){
    this.listOrders(1);
  }

  listOrders(pageNum: number) {
    this.orderService.listOrders(pageNum,this.pageSize)
      .catch(err => Observable.empty())
      .subscribe(pageInfo => {
        console.log(pageInfo)
        this.orders = pageInfo.list;
        this.pagesCount = pageInfo.pages;
        this.pageNum = pageInfo.pageNum;
      });
  }

  changePage(page) {
    this.listOrders(page);
  }

  openEditModal(index) {
    const activeModal = this.modalService.open(OrderEditComponent, {size: 'lg', backdrop: 'static',});
    activeModal.componentInstance.image = this.orders[index].image;
    activeModal.componentInstance.itemName = this.orders[index].itemName;
    activeModal.componentInstance.status = this.orders[index].status;
    activeModal.componentInstance.totalPrice = this.orders[index].totalPrice;
    activeModal.componentInstance.createTime = this.orders[index].createTime;
  }
}
