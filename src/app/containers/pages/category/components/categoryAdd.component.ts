import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from 'app/containers/pages/category/category.service';

@Component({
  selector: 'cz-item-add',
  template: `
    <div>
      <nb-card>
        <nb-card-header>Add Category</nb-card-header>
        <nb-card-body>
          <form #form="ngForm" (ngSubmit)="add(form.value)">
            <div class="form-group" >
              <label for="categoryName">Category name</label>
              <input type="text" 
                     name="name" 
                     class="form-control" 
                     id="categoryName" 
                     placeholder="category name" 
                     ngModel>
            </div>
            <div class="form-group">
              <label for="pertainCategory">Pertain category</label>
              <select class="form-control" 
                      id="pertainCategory" 
                      name="parentId" 
                      ngModel>
                <option></option>
                <option *ngFor="let category of parentCategories" [value]="category.id">
                  {{category.name}}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-danger">Submit</button>
          </form>
        </nb-card-body>
      </nb-card>
    </div>
  `,
})
export class CategoryAddComponent {


  parentCategories;


  add(obj){
    this.categoryService.addCategory(obj)
      .subscribe(v => {
        this.activeModal.close();
        window.location.reload();
      });
  }

  closeModal() {
    this.activeModal.close();
  }

  constructor(private activeModal: NgbActiveModal,
              private categoryService:CategoryService) {
  }

  ngOnInit(){
      this.categoryService.listParentCategories()
        .subscribe(parentCategories => {
          this.parentCategories = parentCategories;
        });
  }

}

