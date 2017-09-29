import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as constants from 'app/constants';
import * as fromRoot from 'app/reducers';
import * as fromAuth from 'app/reducers/auth';

@Injectable()
export class AuthHttp extends Http {

  token : string;

  constructor (backend: XHRBackend,
               options: RequestOptions,
               private router:Router,
               private store: Store<fromAuth.State>) {
    super(backend, options);
    this.store.select(fromRoot.getAuthToken)
      .subscribe(token => this.token = token);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if(!this.token || this.token == null){
      this.router.navigateByUrl('/auth/login');
      return;
    }
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set(constants.TOKEN_HEADER, `${constants.TOKEN_PRIFIX}${this.token}`);
    } else {
      // we have to add the token to the url object
      url.headers.set(constants.TOKEN_HEADER, `${constants.TOKEN_PRIFIX}${this.token}`);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  /*get(url: string, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the get...');
    return super.get(url, options)
      .catch((err: any): any => {
        if (err.status === 400 || err.status === 422) {
          return Observable.throw(err);
        } else {
          return Observable.empty();
        }
      })
      // .retryWhen(error => error.delay(500))
      // .timeout(2000, new Error('delay exceeded'))
      .finally(() => {
        console.log('After the get...');
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the post...');
    return super.post(url, body, options)
      .catch((err: any): any => {
        if (err.status === 400 || err.status === 422) {
          //FIRE NOTIFICATION IN THIS POINT FOR EXAMPLE.
          return Observable.throw(err);
        } else {
          return Observable.empty();
        }
      })
      .finally(() => {
        console.log('After the post...');
      });
  }*/


  private catchAuthError (self: AuthHttp) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
