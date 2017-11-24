import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomToasterService} from 'app/services';
import {OrderService} from '../services';

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
              <nb-tab tabTitle="Tab1">
                <div class="tab col-md-6">
                  <div class="order-image">
                    <img class="camera" [src]="image"/>
                  </div>
                </div>
                <div class="tab col-md-6">
                  <div class="order-status">
                    <ul>
                      <li class="order-param">
                        <span class="order-param-title">Name</span>
                        <p class="order-param-value">{{itemName}}</p>
                      </li>
                      <li class="order-param">
                        <span class="order-param-title">Total Price</span>
                        <p class="order-param-value">{{totalPrice}}</p>
                      </li>
                      <li class="order-param">
                        <span class="order-param-title">Order Date</span>
                        <p class="order-param-value">{{createTime}}</p>
                      </li>
                    </ul>
                   <!-- <button class="btn btn-hero-warning btn-demo">click</button>-->
                  </div>
                </div>
              </nb-tab>
              <nb-tab tabTitle="Tab2">
                <div class="font-row font-secondary">
                  <div class="header">
                    <div class="name bold">Exo</div>

                    <div class="variants">
                      <span class="font-w-bold">Bold</span>
                      <span class="font-w-regular">Regular</span>
                      <span class="font-w-light">Light</span>
                    </div>
                  </div>
                  <p>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                    there live the blind texts.
                    Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                  </p>
                </div>
              </nb-tab>
              <nb-tab tabTitle="Tab3">
                <div class="font-row font-secondary">
                  <div class="header">
                    <div class="name bold">Exo</div>

                    <div class="variants">
                      <span class="font-w-bold">Bold</span>
                      <span class="font-w-regular">Regular</span>
                      <span class="font-w-light">Light</span>
                    </div>
                  </div>
                  <p>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                    there live the blind texts.
                    Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                  </p>
                </div>
              </nb-tab>
            </nb-tabset>
          </nb-card>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" form="form" type="submit">Update</button>
      </div>
    </div>
  `,
  styleUrls: [`./orderEdit.scss`],
})
export class OrderEditComponent {

  image: string;
  itemName: string;
  status: string;
  totalPrice: number;
  createTime:string;


  constructor(private orderService: OrderService,
              private activeModal: NgbActiveModal,
              private toasterService: CustomToasterService) {

  }

  update(form) {
    console.log(form);
  }

  closeModal() {
    this.activeModal.close();
  }
}
