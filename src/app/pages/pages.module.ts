import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {ComponentsModule} from "../component/components.module";

import {DashboardModule} from './dashboard/dashboard.module'



@NgModule({
  imports: [
    PagesRoutingModule,
    ComponentsModule,
    DashboardModule
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
