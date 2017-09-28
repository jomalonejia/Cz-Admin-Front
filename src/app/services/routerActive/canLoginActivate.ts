import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
/*import * as reducers　from '../../reducers';*/

@Injectable()
export class CanLoginActivate implements CanActivate{


  constructor(/*private store:Store<reducers.State>*/){

  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let canLoginactive$ = this.store.select(reducers.getLoggedIn).map(isLoggedIn => !isLoggedIn);
    return canLoginactive$;
  }*/

  canActivate(){
    return true;
  }
}

