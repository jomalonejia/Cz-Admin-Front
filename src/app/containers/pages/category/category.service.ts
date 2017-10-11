import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from 'app/containers/pages/category/category.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService{
  constructor(private http:HttpClient){}

  public editCategory(category:Category):Observable<object>{
    return this.http.post('api/category/edit',category);
  }

  public addCategory(category:Category):Observable<object>{
    return this.http.post('api/category/add',category);
  }

  public listParentCategories(){
    return this.http.get('api/category/listParentCategories');
  }
}
