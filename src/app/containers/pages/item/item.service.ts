
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as constants from 'app/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ItemService{
  constructor(private http:HttpClient){

  }

  public listItems():Observable<any>{
    return this.http.get(constants.ITEM_LIST_URL);
  }


  public add(obj):Observable<any>{
    return this.http.post(constants.ITEM_ADD_URL,obj);
  }

  public addContent(obj):Observable<any>{
      return this.http.post(constants.ITEM_ADD_CONTENT_URL,obj);
  }


}

