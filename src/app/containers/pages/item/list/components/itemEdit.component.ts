import {Component, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from 'app/containers/pages/category/category.service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';
import {CustomToasterService} from 'app/services';
import {ItemService} from '../../item.service';
import {Param} from '../../param.model';

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
              <input type="text" value="aluba" name="name" class="form-control" id="inputName" placeholder="Name" [(ngModel)]="name">
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPrice" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
              <input type="number" name="price" class="form-control" id="inputPrice" placeholder="Price" [(ngModel)]="price">
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
                    [value]="itemSelectedParamValue.indexOf(childParam.id) != -1"
                    (change)="changeParam(childParam.id,
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
export class ItemEditComponent {

  itemId: string;
  name: string;
  price: number;
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
        console.log(this.itemParams);
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
    this.childParams = find.paramValues;
    const selectedFind = this.itemParams.find(param => param.id == paramId);
    if (selectedFind) {
      this.itemSelectedParamValue = selectedFind.paramValues.map(itemParam => itemParam.id);
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

  changeParam(childParamId: number,
              paramValue: string,
              isChecked: boolean) {
    if (isChecked) {
      let findItemParam = this.itemParams.find(ele => ele.id == this.paramId);
      if (findItemParam) {
        findItemParam.paramValues.push({id: childParamId, paramValue: paramValue});
      } else {
        this.itemParams.push({
          id: this.paramId,
          paramDescribe: this.paramDescribe,
          paramValues: [{id: childParamId, paramValue: paramValue}]
        });
      }
    } else {
      const findItemParam = this.itemParams.find(ele => ele.id == this.paramId).paramValues;
      const index = findItemParam.indexOf({id: childParamId, paramValue: paramValue});
      findItemParam.splice(index, 1);
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

  closeModal() {
    this.activeModal.close();
  }
}
