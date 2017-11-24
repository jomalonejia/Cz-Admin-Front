import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ComponentsModule} from 'app/components/components.module';

import {DashboardModule} from './dashboard/dashboard.module';
import {CategoryModule} from './category/category.module';
import {OrderModule} from './order/order.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ComponentsModule,
    DashboardModule,
    OrderModule,
    CategoryModule.forRoot()
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
