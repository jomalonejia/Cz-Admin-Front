import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from 'app/containers/pages/category/category.service';

@Component({
  selector: 'cz-item-add',
  template: `
    <div>
      <nb-card>
        <nb-card-header>Add Category</nb-card-header>
        <nb-card-body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Category name</label>
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="category name">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Pertain category</label>
              <select class="form-control">
                <option>Minsk</option>
                <option>Gomel</option>
                <option>Brest</option>
                <option>Grodno</option>
                <option>Mogilev</option>
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


  constructor(private activeModal: NgbActiveModal,
              private categoryService:CategoryService) {


  }

  ngOnInit(){
      this.categoryService.listParentCategories()
        .subscribe(v => console.log(v));
  }


  closeModal() {
    this.activeModal.close();
  }
}

