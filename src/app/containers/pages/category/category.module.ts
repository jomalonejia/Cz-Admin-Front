import { NgModule } from '@angular/core';

import {CategoryComponent} from './category.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ComponentsModule} from 'app/components/components.module';
import {CategoryService} from './category.service';
import {CategoryAddComponent} from './components';


@NgModule({
  imports: [
    Ng2SmartTableModule,
    ComponentsModule,
  ],
  declarations: [
    CategoryComponent,
    CategoryAddComponent
  ],
  entryComponents:[
    CategoryAddComponent
  ],
  providers:[
    CategoryService
  ]
})
export class CategoryModule { }
