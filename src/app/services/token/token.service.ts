import {Injectable} from '@angular/core';
import {NbTokenService} from '@nebular/auth';

@Injectable()
export class TokenService {

  private token;

  constructor(private nbTokenService:NbTokenService){

  }

  public getToken(){
    this.nbTokenService.get().subscribe(token => this.token = token);
    return this.token;
  }
}
