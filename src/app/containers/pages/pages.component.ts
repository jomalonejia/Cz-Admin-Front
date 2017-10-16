import {Component, ViewContainerRef} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {ToastsManager} from 'ng2-toastr';
import {CustomToasterService} from 'app/services/toaster';

@Component({
  selector: 'cz-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private toasterService:CustomToasterService ){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(){
    this.toasterService.$toaster
      .subscribe(v => {
        this.toastr.success("success","success");
        // [BUG] dashboard to list would not show ,fix it later
      });
  }
}
