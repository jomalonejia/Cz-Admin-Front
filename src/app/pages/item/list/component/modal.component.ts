import {Component} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Modal2Component} from './modal2.component';
import {Modal3Component} from './modal3.component';
import {ItemEditContentComponent} from './itemEditContent.component';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>{{ modalHeader }}</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group row">
            <label for="inputTitle" class="col-sm-3 col-form-label">Title</label>
            <div class="col-sm-9">
              <input type="text" [value]="item.title" class="form-control" id="inputTitle" placeholder="Title">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number" [value]="item.price" class="form-control" id="inputPrice" placeholder="Price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5" [value]="item.describe" placeholder="Text Area" class="form-control"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-sm-3 col-sm-9">
              <button type="button" class="btn btn-primary" (click)="openImageModal()">image</button>
            </div>
            <div class="offset-sm-3 col-sm-9">
              <button type="button" class="btn btn-primary" (click)="openContentModal()">content</button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Save changes</button>
      </div>
    </div>
  `,
})
export class ModalComponent {

  item: object;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  openImageModal() {
    const activeModal = this.modalService.open(Modal2Component, {size: 'lg', container: 'nb-layout'});
  }

  openContentModal() {
    const activeModal = this.modalService.open(ItemEditContentComponent, {size: 'lg', container: 'nb-layout'});
  }

  closeModal() {
    this.activeModal.close();
  }
}
