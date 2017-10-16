
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as constants from 'app/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ItemService{
  constructor(private http:HttpClient){

  }

  public listItems(pageNum:number):Observable<any>{
    return this.http.get(constants.ITEM_LIST_URL+pageNum);
  }


  public add(item):Observable<any>{
    return this.http.post(constants.ITEM_ADD_URL,item);
  }

  public addContent(content):Observable<any>{
      return this.http.post(constants.ITEM_ADD_CONTENT_URL,content);
  }

  public update(item):Observable<any>{
        return this.http.post(constants.ITEM_UPDATE_URL,item);
    }


}

