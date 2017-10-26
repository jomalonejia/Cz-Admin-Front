import {Component, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {ItemService} from '../../item.service';
import {Observable} from 'rxjs/Observable';
import {CustomToasterService} from 'app/services';


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
              <input type="text" [formControl]="name" class="form-control" placeholder="name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-8">
              <input type="number" [formControl]="price" class="form-control" placeholder="price">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category</label>
            <div class="col-sm-4 input-group">
              <select class="form-control" (change)="listChildCategories($event.target.value)">
                <option></option>
                <option *ngFor="let category of parentCategories" [value]="category.id">
                  {{category.name}}
                </option>
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <select class="form-control" [formControl]="categoryId">
                <option></option>
                <option *ngFor="let category of childCategories" [value]="category.id">
                  {{category.name}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Params</label>
            <div class="col-sm-4 input-group">
              <select class="form-control" [formControl]="paramId" (change)="listParamValues($event.target.value)">
                <option></option>
                <option *ngFor="let param of params" [value]="param.id">
                  {{param.paramDescribe}}
                </option>
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <div class="param-values" *ngIf="paramId.value != 1;else color_content">
                <div *ngFor="let childParam of childParams">
                  <nb-checkbox (change)="onChange(childParam.id, $event.target.checked)">
                    {{childParam.paramValue}}
                  </nb-checkbox>
                </div>
              </div>
              <ng-template #color_content>
                <input class="color-picker"
                       (colorPickerChange)="changeColor($event);color=$event"
                       [(colorPicker)]="color"
                       [style.background]="color"/>
              </ng-template>
            </div>
          </div>
          <div class="form-group row" *ngIf="paramId.value == 1">
            <label class="col-sm-3 col-form-label">Colors</label>
            <div class="col-sm-8 input-group color-container">
              <span class="color-span" *ngFor="let color of colors;let index = index" [style.backgroundColor]="color">
                <i class="ion-close-round" (click)="removeColor(index)"></i>
              </span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-8">
              <textarea rows="5" [formControl]="describe" class="form-control" placeholder="describe"></textarea>
            </div>
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" (click)="add(form.value)">Add</button>
      </div>
    </div>
  `,
  styles: [`
    .param-values {
      display: flex;
      flex-wrap: wrap;
    }

    .color-picker {
      border: none;
      cursor: pointer;
      border-radius: 50%;
    }

    .color-container {
      display: flex;
      flex-wrap: wrap;
    }

    .color-span {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: .5rem;
      margin: 20px;
      
    }

    .ion-close-round {
      position: absolute;
      font-size: 20px;
      cursor: pointer;
      right: 15%;
      top: 10%;
    }
    .ion-close-round:hover{
      font-size: 30px;
    }
  `],
})
export class ItemAddComponent {

  public form: FormGroup;
  public name: AbstractControl;
  public price: AbstractControl;
  public categoryId: AbstractControl;
  public paramId: AbstractControl;
  //public paramValues;
  public describe: AbstractControl;

  parentCategories;
  childCategories;

  params;
  childParams;

  color: string = '#127bdc';
  colors: string[] = [];

  constructor(private itemService: ItemService,
              private categoryService: CategoryService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private toasterService: CustomToasterService) {


    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'price': ['', Validators.compose([Validators.required])],
      'categoryId': ['', Validators.compose([Validators.required])],
      'paramId': ['', Validators.compose([Validators.required])],
      'paramValues': fb.array([]),
      'describe': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.name = this.form.controls['name'];
    this.price = this.form.controls['price'];
    this.categoryId = this.form.controls['categoryId'];
    this.paramId = this.form.controls['paramId'];
    //this.paramValues = this.form.controls['paramValues']
    this.describe = this.form.controls['describe'];
  }

  ngOnInit() {
    this.categoryService.listParentCategories()
      .subscribe(parentCategories => {
        this.parentCategories = parentCategories;
      });
    this.itemService.listParams()
      .subscribe(params => {
        this.params = params;
        console.log(this.params);
      });
  }


  add(obj) {
    console.log(obj);
    /* this.itemService.add(obj)
     .catch(err => {
     this.toasterService.toasterTip({message:'success',type:''});
     return Observable.throw(err);
     })
     .subscribe(v => {
     this.toasterService.toasterTip({message:'success',type:''});
     setTimeout(this.closeModal(),2000);
     window.location.reload();
     });*/
  }

  listChildCategories(categoryId) {
    this.categoryService.listChildCategories(categoryId)
      .subscribe(childCategories => this.childCategories = childCategories);
  }

  listParamValues(paramId) {
    let find = this.params.find(param => param.id == paramId);
    this.childParams = find.paramValues;
    const paramValuesFormArray = <FormArray>this.form.controls.paramValues;
    paramValuesFormArray.controls = [];
  }

  onChange(data: string, isChecked: boolean) {
    const paramValuesFormArray = <FormArray>this.form.controls.paramValues;

    if (isChecked) {
      paramValuesFormArray.push(new FormControl(data));
    } else {
      let index = paramValuesFormArray.controls.findIndex(x => x.value == data);
      paramValuesFormArray.removeAt(index);
    }
  }

  changeColor(color) {
    console.log(color);
    this.colors.push(color);
  }

  removeColor(index){
    this.colors.splice(index,1);
  }

  closeModal() {
    this.activeModal.close();
  }
}
