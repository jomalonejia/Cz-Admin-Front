import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomToasterService} from 'app/services';
import {OrderService} from '../services';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRootOrder from '../reducers';
import * as fromOrder from '../reducers/order';
import * as orderActions from '../actions';

@Component({
  selector: 'cz-item-edit',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>Item Edit</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="col-md-12">
          <nb-card size="large">
            <nb-tabset>
              <nb-tab tabTitle="Status">
                <div class="tab col-md-6">
                  <div class="order-status">
                    <div>
                      Current Status:&nbsp;<span>{{order.status}}</span>
                    </div>
                    <br>
                    <div *ngFor="let orderTrack of order.orderTracks">
                      {{orderTrack.trackTime}}&nbsp;:&nbsp;{{orderTrack.trackInformation}}
                    </div>
                    <br><br>
                    <span>...</span>
                  </div>
                </div>
                <div class="tab col-md-6">
                  <div>
                    <textarea #trackInfo rows="4" class="form-control" placeholder="Fill track information"></textarea>
                  </div>
                  <div class="status-change">
                    <button class="btn btn-hero-warning btn-demo" (click)="changeOrderStatus(trackInfo.value)">Nest Status</button>
                  </div>
                </div>
              </nb-tab>
              <nb-tab tabTitle="Detail">
                <div class="tab col-md-6">
                  <div class="order-image">
                    <img class="camera" [src]="order.image"/>
                  </div>
                </div>
                <div class="tab col-md-6">
                  <div class="order-status">
                    <ul>
                      <li class="order-param">
                        <span class="order-param-title">Name</span>
                        <p class="order-param-value">{{order.itemName }}</p>
                      </li>
                      <li class="order-param">
                        <span class="order-param-title">Total Price</span>
                        <p class="order-param-value">{{order.totalPrice }}</p>
                      </li>
                      <li class="order-param">
                        <span class="order-param-title">Order Date</span>
                        <p class="order-param-value">{{order.createTime }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </nb-tab>
            </nb-tabset>
          </nb-card>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <!--<button class="btn btn-md btn-primary" form="form" type="submit">Update</button>-->
      </div>
    </div>
  `,
  styleUrls: [`./orderEdit.scss`],
})
export class OrderEditComponent {

  order: any;


  constructor(private store: Store<fromOrder.State>,
              private activeModal: NgbActiveModal,
              private toasterService: CustomToasterService) {

  }

  changeOrderStatus(trackInfo: string) {
    if (trackInfo) {
      this.store.dispatch(new orderActions.UpdateOrdersAction({orderId: this.order.id, trackInformation: trackInfo}));
    } else {
      this.toasterService.toasterTip({message: 'Please fill next track information!', type: 'warning'});
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
