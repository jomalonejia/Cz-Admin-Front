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
              <select class="form-control" (change)="listParamValues($event.target.value)">
                <option></option>
                <option *ngFor="let param of params" [value]="param.id">
                  {{param.paramDescribe}}
                </option>
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <div class="param-values" *ngIf="paramId != 1;else color_content">
                <div *ngFor="let childParam of childParams">
                  <nb-checkbox
                    (change)="onChange(childParam.id,
                                        childParam.paramId,
                                        childParam.paramValue,
                                         $event.target.checked)">
                    {{childParam.paramValue}}
                  </nb-checkbox>
                </div>
              </div>
              <ng-template #color_content>
                <input class="color-picker"
                       (colorPickerChange)="changeColor($event,paramId);color=$event"
                       [(colorPicker)]="color"
                       [style.background]="color"/>
              </ng-template>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Item Params</label>
            <div class="col-sm-8 input-group param-container">
              <!--<span class="color-span" *ngFor="let color of colors;let index = index" [style.backgroundColor]="color">
                <i class="ion-close-round" (click)="removeColor(index)"></i>
              </span>-->
              <div *ngFor="let key of paramKeys()">
                <div class="param-detail-line" *ngIf="key != 1;else color_container">
                  <b>{{itemParam[key].paramDescribe}}:</b>
                  <span class="param-detail" *ngFor="let param of itemParam[key].childParams">
                     {{param.name}}
                   </span>
                </div>
                <ng-template #color_container>
                  <b>{{itemParam[key].paramDescribe}}:</b>
                  <span class="color-span" *ngFor="let color of itemParam[key].childParams;let index = index" [style.backgroundColor]="color">
                    {{color}}
                    <i class="ion-close-round" (click)="removeColor(index)"></i>
                  </span>
                </ng-template>
              </div>
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

    .param-container {
      display: flex;
      flex-direction: column;
    }

    .param-detail-line {
      display: flex;
      flex-wrap: wrap;
      margin-top: 13px;
    }

    .param-detail {
      margin-left: 15px;
    }

    .color-span {
      position: relative;
      width: 50px;
      border-radius: .5rem;
      margin: 20px;

    }

    .ion-close-round {
      position: absolute;
      font-size: 15px;
      cursor: pointer;
      margin-left: 2%;
    }

    .ion-close-round:hover {
      font-size: 22px;
    }
  `],
})
export class ItemAddComponent {

  public form: FormGroup;
  public name: AbstractControl;
  public price: AbstractControl;
  public categoryId: AbstractControl;
  public describe: AbstractControl;

  paramId: number;
  paramDescribe: string;

  parentCategories;
  childCategories;

  params;
  childParams;

  //itemParam:Map<number,string[]> = new Map<number,string[]>();

  itemParam: any = {};
  color: string = '#127bdc';

  constructor(private itemService: ItemService,
              private categoryService: CategoryService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private toasterService: CustomToasterService) {


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

  ngOnInit() {
    this.categoryService.listParentCategories()
      .subscribe(parentCategories => {
        this.parentCategories = parentCategories;
      });
    this.itemService.listParams()
      .subscribe(params => {
        this.params = params;
        console.log(params);
      });
  }


  add(obj) {
    obj.params = this.itemParam;
    console.log(obj);
     /*this.itemService.add(obj)
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
    this.paramId = paramId;
    let find = this.params.find(param => param.id == paramId);
    this.paramDescribe = find.paramDescribe;
    this.childParams = find.paramValues;
    /*const paramValuesFormArray = <FormArray>this.form.controls.paramValues;
     paramValuesFormArray.controls = [];*/
  }

  onChange(childParamId: string, paramId: number, paramValue: string, isChecked: boolean) {
    if (isChecked) {
      if (this.itemParam[paramId]) {
        this.itemParam[paramId].childParams.push({id: childParamId, name: paramValue});
      } else {
        this.itemParam[paramId] = {paramDescribe: this.paramDescribe, childParams: [{id: childParamId, name: paramValue}]};
      }
    } else {
      let index = this.itemParam[paramId].childParam.indexOf({id: childParamId, name: paramValue});
      this.itemParam[paramId].childParams.splice(index, 1);
    }
  }

  changeColor(color, paramId) {
    if (this.itemParam[paramId]) {
      this.itemParam[paramId].childParams.push(color);
    } else {
      this.itemParam[paramId] = {paramDescribe: this.paramDescribe, childParams: [color]};
    }
  }

  removeColor(index) {
    this.itemParam.childParams.splice(index, 1);
  }

  paramKeys(): number[] {
    return Object.keys(this.itemParam).map(Number);
  }

  closeModal() {
    this.activeModal.close();
  }
}
