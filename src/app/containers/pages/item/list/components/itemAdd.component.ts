import {Component, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {ItemService} from '../../item.service';
import {Observable} from 'rxjs/Observable';
import {CustomToasterService} from 'app/services';
import {Param} from 'app/containers/pages/item/param.model';


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
                <div *ngFor="let childParam of childParams;let index = index">
                  <nb-checkbox
                    (change)="changeParam(childParam.id,
                                        childParam.paramValue,
                                         $event.target.checked,
                                         index)">
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
              <div *ngFor="let itemParam of itemParams">
                <div class="param-detail-line" *ngIf="itemParam.id != 1; else color_container">
                  <b *ngIf="itemParam.paramValues.length > 0 ">{{itemParam.paramDescribe}}</b>
                  <div class="param-detail-block">
                     <span class="param-detail" *ngFor="let paramValue of itemParam.paramValues">
                        {{paramValue.paramValue}}
                    </span>
                  </div>
                </div>
                <ng-template #color_container>
                  <div class="param-detail-line">
                    <b *ngIf="itemParam.paramValues.length > 0 ">{{itemParam.paramDescribe}}</b>
                    <div class="param-detail-block">
                      <span class="color-span" *ngFor="let paramValue of itemParam.paramValues;let index = index"
                            [style.backgroundColor]="paramValue.paramValue">
                        <i class="ion-close-round" (click)="removeColor(itemParam.id,index)"></i>
                      </span>
                    </div>
                  </div>
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
      display: inline-flex;
      margin-bottom: 20px;
    }

    .param-detail-block {
      display: flex;
      flex-wrap: wrap;
      margin-left: 15px;
    }

    .param-detail {
      margin-left: 20px;
    }

    .color-span {
      position: relative;
      width: 68px;
      height: 35px;
      border-radius: .5rem;
      margin-left: 20px;
    }

    .ion-close-round {
      position: absolute;
      font-size: 15px;
      cursor: pointer;
      right: 1%;
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
  childParams;

  parentCategories;
  childCategories;

  params;


  //itemParam:Map<number,string[]> = new Map<number,string[]>();

  itemParams: Param[] = [];
  color: string = '#FAAF3A';

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
      });
  }


  add(item) {
    item.params = this.itemParams;
    this.itemService.add(item)
      .catch(err => {
        this.toasterService.toasterTip({message: 'success', type: ''});
        return Observable.throw(err);
      })
      .subscribe(v => {
        this.toasterService.toasterTip({message: 'success', type: ''});
        setTimeout(this.closeModal(), 2000);
        window.location.reload();
      });
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

  changeParam(childParamId: number,
           paramValue: string,
           isChecked: boolean,
           index: number) {
    if (isChecked) {
      let findItemParam = this.itemParams.find(ele => ele.id == this.paramId);
      if (findItemParam) {
        findItemParam.paramValues.push({id: childParamId, paramValue: paramValue});
      } else {
        this.itemParams.push({id: this.paramId, paramDescribe: this.paramDescribe, paramValues: [{id: childParamId, paramValue: paramValue}]});
      }
    } else {
      this.itemParams.find(ele => ele.id == this.paramId).paramValues.splice(index, 1);
    }
  }

  changeColor(color, paramId) {
    let findItemParam = this.itemParams.find(ele => ele.id == paramId);
    if (findItemParam) {
      findItemParam.paramValues.push({id: null, paramValue: color});
    } else {
      this.itemParams.push({id: +paramId, paramDescribe: this.paramDescribe, paramValues: [{id: null, paramValue: color}]});
    }
  }

  removeColor(paramId, index) {
    this.itemParams.find(ele => ele.id == paramId).paramValues.splice(index, 1);
  }

  paramKeys(): number[] {
    return Object.keys(this.itemParams).map(Number);
  }

  closeModal() {
    this.activeModal.close();
  }
}
