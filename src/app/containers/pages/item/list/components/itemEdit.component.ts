import {Component, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ItemService} from '../../item.service';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';

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
        <form #f="ngForm" id="form" (ngSubmit)="update(f)">
          <input type="number" name="itemId" [(ngModel)]="itemId" hidden>
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
              <input type="text" value="aluba"  name="name" class="form-control" id="inputName" placeholder="Name" [(ngModel)]="name">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number"  name="price" class="form-control" id="inputPrice" placeholder="Price" [(ngModel)]="price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category</label>
            <div class="col-sm-4 input-group">
              <select class="form-control" (change)="listChildCategories($event.target.value)">
                <option></option>
                <option *ngFor="let category of parentCategories" 
                        [value]="category.categoryId" 
                        [selected]="category.categoryId == parentCategoryId">
                  {{category.categoryName}}
                </option>
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <select class="form-control" name="categoryId" [(ngModel)]="categoryId">
                <option></option>
                <option *ngFor="let category of childCategories" 
                        [value]="category.categoryId"
                        [selected]="category.categoryId == categoryId">
                  {{category.categoryName}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5"  name="describe" placeholder="Text Area" class="form-control" [(ngModel)]="describe"></textarea>
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
export class ItemEditComponent {

  itemId:string;
  name:string;
  price:number;
  describe:string;
  categoryId:number;
  parentCategoryId:number;

  parentCategories;
  childCategories;


  constructor(private itemService:ItemService,
              private activeModal: NgbActiveModal,
              private categoryService:CategoryService,
              private fb: FormBuilder,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(){
    this.categoryService.listParentCategories()
      .subscribe(parentCategories => {
        this.parentCategories = parentCategories;
      });
    this.listChildCategories(this.parentCategoryId);
  }

  listChildCategories(categoryId){
    this.categoryService.listChildCategories(categoryId)
      .subscribe(childCategories => {
        this.childCategories = childCategories;
        console.log(this.childCategories);
        console.log(this.categoryId);
      });
  }

  update(form:NgForm){
    console.log(form.value);
    this.itemService.update(form.value)
      .catch(err => {
        this.toastr.error('Update Failed', 'Oops!');
        return Observable.empty();
      })
      .subscribe(v => {
        this.toastr.success('Update Success!', 'Success!');
        setTimeout(this.closeModal(),2000);
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
