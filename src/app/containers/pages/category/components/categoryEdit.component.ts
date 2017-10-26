import {Component, ViewContainerRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'cz-category-edit',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>Item Edit</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form #f="ngForm" id="form" (ngSubmit)="update(f)">
          <input type="number" name="itemId" [(ngModel)]="item.id" hidden>
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
              <input type="text" value="aluba"  name="name" class="form-control" id="inputName" placeholder="Name" >
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number"  name="price" class="form-control" id="inputPrice" placeholder="Price" >
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category</label>
            <div class="col-sm-4 input-group">
              <select class="form-control" >
                <option></option>
                <option>1</option>
               <!-- <option *ngFor="let category of parentCategories"
                        [value]="category.id"
                        [selected]="category.id == parentCategoryId">
                  {{category.name}}
                </option>-->
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <select class="form-control" name="categoryId" >
                <option></option>
                <option>1</option>
                <!--<option *ngFor="let category of childCategories"
                        [value]="category.id"
                        [selected]="category.id == categoryId">
                  {{category.name}}
                </option>-->
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5"  name="describe" placeholder="Text Area" class="form-control" ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" form="form" type="submit">Update</button>
      </div>
    </div>
  `,
})
export class CategoryEditComponent {

  item:any;

  constructor(private activeModal: NgbActiveModal) {

  }

  ngOnInit(){

  }

  update(event){
    console.log(event);
  }


  closeModal() {
    this.activeModal.close();
  }
}
