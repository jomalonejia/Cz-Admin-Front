import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders
}
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../reducers/auth'
import * as fromRoot from 'app/reducers';
import * as auth from '../../actions/auth';
import * as constants from 'app/constants';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token:string;

  constructor(private router:Router,
              private store: Store<fromAuth.State>){
    this.store.select(fromRoot.getAuthToken)
      .subscribe(token => this.token = token);
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler
  ): Observable<HttpEvent<any>> {

    req = req.clone({
      setHeaders: {
        'cz-admin-token':  `${constants.TOKEN_PRIFIX}${this.token}`
      }
    });

    return next.handle(req)
      .catch(err => {
        if(err.status === 401){
          this.router.navigateByUrl('auth/login');
        }
        return of(err);
      })
      .do(evt => {
        if (evt instanceof HttpResponse) {
          if(evt.status === 202){
            this.store.dispatch(new auth.LoginSuccessAction(evt.body));
          }else if(evt.status === 200){
            console.log(evt);
          }
          else{
            console.log('other')
          }
        }
      });

  }
}

