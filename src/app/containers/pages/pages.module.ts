import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {ComponentsModule} from "app/components/components.module";

import {DashboardModule} from './dashboard/dashboard.module'
import {CategoryModule} from 'app/containers/pages/category/category.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ComponentsModule,
    DashboardModule,
    CategoryModule
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
