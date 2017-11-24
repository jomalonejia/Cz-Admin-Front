import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {CustomToasterService} from 'app/services';
import {ItemService} from '../services';
import {Param} from '../models/param';

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
          <input type="number" name="id" [(ngModel)]="itemId" hidden>
          <div class="form-group row">
            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
              <input type="text" name="name" class="form-control" id="inputName" placeholder="Name" [(ngModel)]="name">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number" name="price" class="form-control" id="inputPrice" placeholder="Price" [(ngModel)]="price">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputDiscount" class="col-sm-3 col-form-label">Discount</label>
            <div class="col-sm-9">
              <select class="form-control" name="discount" id="inputDiscount" [(ngModel)]="discount">
                <option value="1" [selected]="discount==1">100%</option>
                <option value="0.1" [selected]="discount==0.1">10%</option>
                <option value="0.2" [selected]="discount==0.2">20%</option>
                <option value="0.3" [selected]="discount==0.3">30%</option>
                <option value="0.4" [selected]="discount==0.4">40%</option>
                <option value="0.5" [selected]="discount==0.5">50%</option>
                <option value="0.6" [selected]="discount==0.6">60%</option>
                <option value="0.7" [selected]="discount==0.7" >70%</option>
                <option value="0.8" [selected]="discount==0.8">80%</option>
                <option value="0.9" [selected]="discount==0.9">90%</option>
              </select>
              <!--<input type="number" name="discount" class="form-control" id="inputDiscount" placeholder="Discount" [(ngModel)]="discount">-->
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Category</label>
            <div class="col-sm-4 input-group">
              <select class="form-control" (change)="listChildCategories($event.target.value)">
                <option></option>
                <option *ngFor="let category of parentCategories"
                        [value]="category.id"
                        [selected]="category.id == parentCategoryId">
                  {{category.name}}
                </option>
              </select>
            </div>
            <div class="col-sm-4 input-group">
              <select class="form-control" name="categoryId" [(ngModel)]="categoryId">
                <option></option>
                <option *ngFor="let category of childCategories"
                        [value]="category.id"
                        [selected]="category.id == categoryId">
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
                    [value]="itemSelectedParamValue.includes(childParam.paramValue)"
                    (change)="changeParam(childParam.paramValue,$event.target.checked)">
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
            <label *ngIf="itemParams.length > 0" class="col-sm-3 col-form-label">Item Params</label>
            <div class="col-sm-8 input-group param-container">
              <div *ngFor="let itemParam of itemParams">
                <div class="param-detail-line" *ngIf="itemParam.id != 1; else color_container">
                  <b *ngIf="itemParam.paramDetails.length > 0 ">{{itemParam.paramDescribe}}</b>
                  <div class="param-detail-block">
                    <div class="param-detail" *ngFor="let paramDetail of itemParam.paramDetails">
                      {{paramDetail.paramValue}}
                      <input class="param-number"
                             type="number"
                             min="0"
                             [value]="paramDetail.inventory"
                             (change)="changeNumber(itemParam.id,paramDetail.paramValue,$event.target.value)">
                      <i class="ion-calculator param-icon"></i>
                    </div>
                  </div>
                </div>
                <ng-template #color_container>
                  <div class="param-detail-line">
                    <b *ngIf="itemParam.paramDetails.length > 0 ">{{itemParam.paramDescribe}}</b>
                    <div class="param-detail-block">
                      <div class="color-div" *ngFor="let paramDetail of itemParam.paramDetails;let index = index"
                           [style.backgroundColor]="paramDetail.paramValue">
                        <i class="ion-close-round" (click)="removeColor(itemParam.id,index)"></i>
                        <i class="ion-calculator color-icon"></i>
                        <input class="param-number color-number"
                               type="number"
                               min="0"
                               [value]="paramDetail.inventory"
                               (change)="changeNumber(itemParam.id,paramDetail.paramValue,$event.target.value)">
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3">Description</label>
            <div class="col-sm-9">
              <textarea rows="5" name="describe" placeholder="Text Area" class="form-control" [(ngModel)]="describe"></textarea>
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
      flex-direction: column;
      margin-left: 15px;
    }

    .param-detail {
      margin-left: 20px;
    }

    .color-div {
      position: relative;
      width: 68px;
      height: 35px;
      border-radius: .5rem;
      margin-left: 20px;
      margin-bottom: 15px;
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

    .param-number {
      background: transparent;
      border: 0;
      border-bottom: 1px dashed #83a4c5;
      width: 75px;
      color: #fff;
      text-align: right;
      margin-left: 20px;
      float: right;
    }

    .color-number {
      position: absolute;
      left: 110%;
      height: 35px;
    }

    .param-icon {
      float: right;
      position: relative;
      left: 30px;
      top: 2px;
    }

    .color-icon {
      position: absolute;
      left: 140%;
      font-size: 20px;
      top: 10px;
    }

  `],
})
export class ItemEditComponent {

  itemId: string;
  name: string;
  price: number;
  discount: number;
  describe: string;
  categoryId: number;
  parentCategoryId: number;

  paramId: number;
  paramDescribe: string;
  childParams;

  parentCategories;
  childCategories;

  params;
  itemParams: Param[] = [];
  itemSelectedParamValue = [];

  color: string = '#FAAF3A';


  constructor(private itemService: ItemService,
              private activeModal: NgbActiveModal,
              private categoryService: CategoryService,
              private toasterService: CustomToasterService) {

  }

  ngOnInit() {
    this.categoryService.listParentCategories()
      .subscribe(parentCategories => {
        this.parentCategories = parentCategories;
      });
    this.listChildCategories(this.parentCategoryId);
    this.itemService.listParams()
      .subscribe(params => {
        this.params = params;
      });
    this.itemService.listParamsById(this.itemId)
      .subscribe(itemParams => {
        this.itemParams = itemParams;
      });

  }

  listChildCategories(categoryId) {
    this.categoryService.listChildCategories(categoryId)
      .subscribe(childCategories => {
        this.childCategories = childCategories;
      });
  }

  listParamValues(paramId) {
    this.paramId = paramId;
    const find = this.params.find(param => param.id == paramId);
    this.paramDescribe = find.paramDescribe;
    this.childParams = find.paramDetails;
    const selectedFind = this.itemParams.find(param => param.id == paramId);
    if (selectedFind) {
      this.itemSelectedParamValue = selectedFind.paramDetails.map(paramDetail => paramDetail.paramValue);
    }
  }

  update(form: NgForm) {
    let item = form.value;
    item.params = this.itemParams;
    this.itemService.update(item)
      .catch(err => {
        this.toasterService.toasterTip({message: 'Update Error!', type: 'error'});
        return Observable.empty();
      })
      .subscribe(res => {
        if (res) {
          this.toasterService.toasterTip({message: 'Update Success!', type: 'success'});
          setTimeout(this.closeModal(), 2000);
        }
      });
  }

  changeParam(paramValue: string, isChecked: boolean) {

    const foundItemParam = this.itemParams.find(ele => ele.id == this.paramId);
    if (foundItemParam) {
      if (isChecked) {
        foundItemParam.paramDetails.push({paramValue: paramValue, inventory: 0});
      } else {
        foundItemParam.paramDetails.splice(foundItemParam.paramDetails.findIndex(paramDetail => paramDetail.paramValue == paramValue), 1);
        if (foundItemParam.paramDetails.length <= 0) {
          this.itemParams.splice(this.itemParams.findIndex(param => param.id == this.paramId));
        }
      }
    } else {
      this.itemParams.push({
        id: this.paramId,
        paramDescribe: this.paramDescribe,
        paramDetails: [{paramValue: paramValue, inventory: 0}]
      });
    }

    /* if (isChecked) {
     let foundItemParam = this.itemParams.find(ele => ele.id == this.paramId);
     if (foundItemParam) {
     foundItemParam.paramDetails.push({paramValue: paramValue, inventory: 0});
     } else {
     this.itemParams.push({
     id: this.paramId,
     paramDescribe: this.paramDescribe,
     paramDetails: [{paramValue: paramValue, inventory: 0}]
     });
     }
     } else {
     const foundItemParam = this.itemParams.find(ele => ele.id == this.paramId).paramDetails;
     foundItemParam.splice(foundItemParam.findIndex(paramDetail => paramDetail.paramValue == paramValue), 1);
     if (foundItemParam.length <= 0) {
     this.itemParams.splice(this.itemParams.findIndex(param => param.id == this.paramId));
     }
     }*/
  }

  changeColor(color, paramId) {
    let foundItemParam = this.itemParams.find(ele => ele.id == paramId);
    if (foundItemParam) {
      foundItemParam.paramDetails.push({paramValue: color, inventory: 0});
    } else {
      this.itemParams.push({id: +paramId, paramDescribe: this.paramDescribe, paramDetails: [{paramValue: color, inventory: 0}]});
    }
  }

  removeColor(paramId, index) {
    const foundItamColorParam = this.itemParams.find(ele => ele.id == paramId).paramDetails;
    foundItamColorParam.splice(index, 1);
    if (foundItamColorParam.length <= 0) {
      this.itemParams.splice(this.itemParams.findIndex(param => param.id == paramId));
    }
  }

  changeNumber(paramId: number, paramValue: string, number: number) {
    this.itemParams.find(itemParam => itemParam.id == paramId).paramDetails.find(paramDetail => paramDetail.paramValue == paramValue)
      .inventory = number;
  }

  closeModal() {
    this.activeModal.close();
  }
}
