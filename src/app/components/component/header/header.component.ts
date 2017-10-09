import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import {Store} from '@ngrx/store';
import * as fromAuth from 'app/reducers/auth';
import * as fromRoot from 'app/reducers'

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: object;

  userMenu = [{ title: 'Profile',link: '/auth/login'}, { title: 'Log out',link: '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private store: Store<fromAuth.State>) {
  }

  test(event){
    console.log(event);
  }

  ngOnInit() {
    this.store.select(fromRoot.getAuthState)
      .subscribe(v => {
        this.user = Object.assign({},{token:v.token,profile:v.profile});
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  toggleMessage(){
    //window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    window.open('/#/message','_blank');
    //window.open('/#/message','_blank',"toolbar=false, location=false, directories=no, status=no, menubar=false, scrollbars=false, resizable=no, copyhistory=yes, width=850, height=650")
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
  }
}
