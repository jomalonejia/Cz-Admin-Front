import {Component} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';

import {CategoryService} from './category.service';
import {CategoryAddComponent} from './components';

@Component({
  selector: 'cz-category',
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
})
export class CategoryComponent {

  settings = {
    actions: {
      add: false,
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 5
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false
      },
      parentid: {
        title: 'Parent Category',
        type: 'string',
      },
      name: {
        title: 'Category Name',
        type: 'string',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  openAddModal() {
    const activeModal = this.modalService.open(CategoryAddComponent, {size: 'sm'});
  }

  constructor(private modalService: NgbModal,
              private http: HttpClient,
              private categoryService: CategoryService) {
    this.http.get('api/category/listCategoriesDesc')
      .catch(err => Observable.empty())
      .subscribe((v: any[]) => {
        this.source.load(v);
      });
  }

  openCreateModal() {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.categoryService.deleteCategory(event.data.categoryId)
        .catch(err => {
          event.confirm.reject();
          return Observable.empty();
        })
        .subscribe(v => {
          event.confirm.resolve();
        });

    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log(event.newData);
  }

  onEditConfirm(event): void {
    this.categoryService.editCategory(event.newData)
      .catch(err => {
        event.confirm.reject();
        return Observable.empty();
      })
      .subscribe(res => {
        if (res == 'success') {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
  }
}
