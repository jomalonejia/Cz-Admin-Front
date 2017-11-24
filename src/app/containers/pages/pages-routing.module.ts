import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard';
import {OrderComponent} from './order';
import {CategoryComponent} from './category';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'category',
      component: CategoryComponent
    },
    {
      path: 'item',
      loadChildren: './item/item.module#ItemModule'
    },
    {
      path: 'order',
      component: OrderComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
