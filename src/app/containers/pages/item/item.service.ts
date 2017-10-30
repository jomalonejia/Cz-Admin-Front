import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as constants from 'app/constants';
import {HttpClient} from '@angular/common/http';

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

  public listItems(pageNum: number): Observable<any> {
    return this.http.get(constants.ITEM_LIST_URL + pageNum);
  }

  public listItemsByCategory(categoryId:number,pageNum: number): Observable<any> {
    return this.http.get(constants.ITEM_LIST_URL + categoryId + '/' + pageNum);
  }

  public selectImages(itemId:string):Observable<any> {
    return this.http.get(constants.ITEM_IMAGES_SELECT_URL+itemId);
  }

  public addContent(content): Observable<any> {
    return this.http.post(constants.ITEM_ADD_CONTENT_URL, content);
  }

  public listParams(): Observable<any>{
    return this.http.get(constants.PARAM_LIST_URL);
  }

  public listParamsById(itemId:string): Observable<any>{
    return this.http.get(constants.PARAM_LIST_URL+itemId);
  }
}

