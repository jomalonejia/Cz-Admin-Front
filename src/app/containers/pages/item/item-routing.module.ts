import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ItemComponent} from './item.component';
import {SmartTableComponent} from './smart-table/smart-table.component';
import {ItemListComponent} from './list/itemList.component';
import
{
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent,
  ItemAddComponent
} from './list/components';

const routes: Routes = [{
  path: '',
  component: ItemComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'list',
      component: ItemListComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {
}

export const routedComponents = [
  ItemComponent,
  SmartTableComponent,
  ItemListComponent,
];

export const routedEntryComponents = [
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent,
  ItemAddComponent
];


