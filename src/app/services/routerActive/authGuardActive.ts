import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
/*import * as reducers　from '../../reducers';*/

@Injectable()
export class AuthGuardActive implements CanActivate{


  constructor(/*private store:Store<reducers.State>*/){

  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let canactive$ = this.store.select(reducers.getLoggedIn);
    return canactive$;
  }*/

  canActivate(){
    return true;
  }
}

