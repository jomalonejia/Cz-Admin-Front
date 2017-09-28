import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {Store} from '@ngrx/store';
import * as fromAuth from '../../reducers/auth'
import * as auth from '../../actions/auth';



@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {

        console.log(evt.headers);
        console.log('---> status:', evt);
        sessionStorage.setItem('token',evt.body['token']);
        console.log('---> filter:', req.params.get('filter'));
        this.store.dispatch(new auth.LoginSuccess(evt.body));

      }
    });

  }
}
