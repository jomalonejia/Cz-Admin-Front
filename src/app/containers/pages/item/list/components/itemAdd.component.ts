import {Component} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemEditContentComponent} from './itemEditContent.component';
import {ItemEditImageComponent} from './itemEditImage.component';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {ItemService} from '../../item.service';

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
            <label class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-8">
              <input type="text" [formControl]="name" class="form-control"  placeholder="name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-8">
              <input type="number" [formControl]="price" class="form-control"  placeholder="price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category</label>
              <div class="col-sm-4 input-group">
                <select class="form-control" (change)="listChildCategories($event)">
                  <option></option>
                  <option *ngFor="let category of parentCategories" [value]="category.id">
                    {{category.categoryName}}
                  </option>
                </select>
              </div>
              <div class="col-sm-4 input-group">
                <select class="form-control" [formControl]="categoryId">
                  <option></option>
                  <option *ngFor="let category of childCategories" [value]="category.id">
                    {{category.categoryName}}
                  </option>
                </select>
              </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-8">
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
  public name: AbstractControl;
  public price: AbstractControl;
  public categoryId: AbstractControl;
  public describe: AbstractControl;

  parentCategories;
  childCategories;

  constructor(private itemService:ItemService,
              private categoryService:CategoryService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'price': ['', Validators.compose([Validators.required])],
      'categoryId': ['', Validators.compose([Validators.required])],
      'describe': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.name = this.form.controls['name'];
    this.price = this.form.controls['price'];
    this.categoryId = this.form.controls['categoryId'];
    this.describe = this.form.controls['describe'];
  }

  ngOnInit(){
    this.categoryService.listParentCategories()
      .subscribe(parentCategories => {
        this.parentCategories = parentCategories;
      });
  }


  add(obj){
    console.log(obj);
    this.itemService.add(obj)
      .subscribe(v => console.log(v));
  }

  listChildCategories(event){
    console.log(event.target.value);
    this.categoryService.listChildCategories(event.target.value)
      .subscribe(childCategories => this.childCategories = childCategories);
  }

  closeModal() {
    this.activeModal.close();
  }
}