import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as constants from 'app/constants';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from 'app/models';
import {ItemContent} from 'app/containers/pages/item/models/itemContent';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) {

  }

  public add(item): Observable<any> {
    return this.http.post(constants.ITEM_ADD_URL, item);
  }

  public delete(itemId): Observable<any> {
    return this.http.delete(constants.ITEM_DELETE_URL + itemId);
  }


  public update(item): Observable<any> {
    return this.http.post(constants.ITEM_UPDATE_URL, item);
  }

  public listItems(page:Page): Observable<any> {
    const params = new HttpParams().set('pageNum',page.pageNum.toString()).set('pageSize', page.pageSize.toString());
    return this.http.get(`${constants.ITEM_LIST_URL}`,{params:params});
  }

  public listItemsByCategory(categoryId:number,pageNum: number,pageSize: number): Observable<any> {
    const params = new HttpParams().set('pageNum',pageNum.toString()).set('pageSize', pageSize.toString());
    return this.http.get(`${constants.ITEM_LIST_URL}/${categoryId}`,{params:params});
  }

  public selectImages(itemId:string):Observable<any> {
    return this.http.get(`${constants.ITEM_IMAGES_SELECT_URL}/${itemId}`);
  }

  public updateContent(itemContent:ItemContent): Observable<any> {
    return this.http.post(constants.ITEM_UPDATE_CONTENT_URL, itemContent);
  }

  public listParams(): Observable<any>{
    return this.http.get(constants.PARAM_LIST_URL);
  }

  public listParamsById(itemId:string): Observable<any>{
    return this.http.get(`${constants.PARAM_LIST_URL}/${itemId}`);
  }
}

