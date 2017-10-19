import { NgModule } from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [
    NgbDropdownModule
  ],
  declarations: [
    DashboardComponent,

  ],
})
export class DashboardModule {
}
