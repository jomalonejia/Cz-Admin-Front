import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as constants from 'app/constants';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {

  }

  public listOrders(pageNum:number,pageSize:number): Observable<any>{
    const params = new HttpParams().set('pageNum',pageNum.toString()).set('pageSize', pageSize.toString());
    return this.http.get(`${constants.ORDER_LIST_URL}`,{params:params});
  }
}

