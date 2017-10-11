import {Component} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemEditContentComponent} from './itemEditContent.component';
import {ItemEditImageComponent} from './itemEditImage.component';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cz-item-add',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>Item Add</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form [formGroup]="form">
          <div class="form-group row">
            <label for="inputTitle" class="col-sm-3 col-form-label">Title</label>
            <div class="col-sm-9">
              <input type="text" [formControl]="title" class="form-control" id="inputTitle" placeholder="title">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number" [formControl]="price" class="form-control" id="inputPrice" placeholder="price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5" [formControl]="describe"  class="form-control" placeholder="describe"></textarea>
            </div>
          </div>
         
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" (click)="add(form.value)">Update</button>
      </div>
    </div>
  `,
})
export class ItemAddComponent {

  public form: FormGroup;
  public title: AbstractControl;
  public price: AbstractControl;
  public describe: AbstractControl;

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder) {
    this.form = fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'price': ['', Validators.compose([Validators.required])],
      'describe': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.title = this.form.controls['title'];
    this.price = this.form.controls['price'];
    this.describe = this.form.controls['describe'];
  }


  add(obj){
    console.log(obj);
  }

  closeModal() {
    this.activeModal.close();
  }
}
