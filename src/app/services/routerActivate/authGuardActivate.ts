import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthHttp} from 'app/services/http';
import * as constants from 'app/constants';

@Injectable()
export class AuthGuardActivate implements CanActivate{


  canAuthAccess:boolean = false;

  constructor(private http:AuthHttp){
    this.http.get(constants.REFRESH_TOKEN_URL)
      .subscribe(response => {
        console.log(response);
      });
  }

  canActivate(){
    return true;
  }
}

