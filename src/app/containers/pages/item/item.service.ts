
import {Injectable} from "@angular/core";
import {AuthHttp} from "app/services/http";
import {Observable} from "rxjs/Observable";
import * as constants from 'app/constants';

@Injectable()
export class ItemService{
  constructor(private http:AuthHttp){

  }

  public addContent(obj):Observable<any>{
      return this.http.post(constants.ITEM_ADD_CONTENT_URL,obj);
  }

}

