import {Component} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemEditContentComponent} from './itemEditContent.component';
import {ItemEditImageComponent} from './itemEditImage.component';

@Component({
  selector: 'cz-item-add',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>Item Edit</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group row">
            <label for="inputTitle" class="col-sm-3 col-form-label">Title</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="inputTitle" placeholder="Title">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number" class="form-control" id="inputPrice" placeholder="Price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5" placeholder="Text Area" class="form-control"></textarea>
            </div>
          </div>
         
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" (click)="update()">Update</button>
      </div>
    </div>
  `,
})
export class ItemAddComponent {

  title:string;
  price:number;
  describe:string;

  constructor(private activeModal: NgbActiveModal) {
  }


  update(){

  }

  closeModal() {
    this.activeModal.close();
  }
}
