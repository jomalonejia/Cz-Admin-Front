import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ItemComponent} from './item.component';
import
{
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent,
  ItemAddComponent
} from './components';

const routes: Routes = [{
  path: '',
  component: ItemComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {
}

export const routedComponents = [
  ItemComponent,
];

export const routedEntryComponents = [
  ItemEditComponent,
  ItemEditContentComponent,
  ItemEditImageComponent,
  ItemAddComponent
];


