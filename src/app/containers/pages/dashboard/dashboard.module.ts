import { NgModule } from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {ToasterModule} from 'angular2-toaster';


@NgModule({
  imports: [
    ToasterModule
  ],
  declarations: [
    DashboardComponent,

  ],
})
export class DashboardModule {
}
