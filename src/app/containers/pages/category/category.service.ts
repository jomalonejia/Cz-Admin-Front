import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from 'app/containers/pages/category/category.model';
import {Observable} from 'rxjs/Observable';
import * as constants from 'app/constants';

@Injectable()
export class CategoryService{
  constructor(private http:HttpClient){}

  public editCategory(category:Category):Observable<object>{
    return this.http.post(constants.CATEGORY_EDIT,category);
  }

  public addCategory(category:Category):Observable<object>{
    return this.http.post(constants.CATEGORY_ADD,category);
  }

  public deleteCategory(id:number):Observable<object>{
    return this.http.delete(constants.CATEGORY_DELETE+id,{});
  }

  public listTreeCategories(){
    return this.http.get(constants.CATEGORY_LIST_TREE_CATEGORIES);
  }

  public listParentCategories(){
    return this.http.get(constants.CATEGORY_LIST_PARENT_CATEGORIES);
  }

  public listChildCategories(parentId:number){
    return this.http.get(constants.CATEGORY_LIST_CHILD_CATEGORIES+parentId);
  }

}
