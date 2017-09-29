import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../reducers/auth'
import * as auth from '../../actions/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router,
              private store: Store<fromAuth.State>){

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if(evt instanceof HttpRequest){
        console.log(evt);
      }
      if (evt instanceof HttpResponse) {
        console.log(evt);
        if(evt.status === 401){
          this.router.navigateByUrl('/');
        }else if(evt.status === 202){
          console.log(evt);
          this.store.dispatch(new auth.LoginSuccess(evt.body));
        }else{
          console.log('other')
        }
      }
    });

  }
}

