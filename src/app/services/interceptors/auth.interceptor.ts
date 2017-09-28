import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router){

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        if(evt.status === 401){
          this.router.navigateByUrl('/');
        }else{
          console.log(evt);
        }
      }
    });

  }
}

