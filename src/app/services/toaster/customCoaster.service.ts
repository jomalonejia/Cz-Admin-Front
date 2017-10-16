import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Toaster} from 'app/models';

@Injectable()
export class CustomToasterService {
  public $toaster = new Subject<Object>();

  public toasterTip(toaster:Toaster){
    this.$toaster.next(toaster)
  }
}
