import { NgModule } from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap'
import {ComponentsModule} from 'app/components/components.module';


@NgModule({
  imports: [
    NgbDropdownModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,

  ],
})
export class DashboardModule {
}
