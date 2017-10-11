import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { QuillEditorModule } from 'ngx-quill-editor';
import { TreeModule } from 'angular-tree-component';

import {DataFilterPipe} from './data-filter.pipe';
import { ComponentsModule } from 'app/components/components.module';
import { TablesRoutingModule, routedComponents,routedEntryComponents} from './item-routing.module';
import {ItemService} from './item.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    TablesRoutingModule,
    DataTableModule,
    Ng2SmartTableModule,
    QuillEditorModule,
    TreeModule
  ],
  declarations: [
    DataFilterPipe,
    ...routedComponents,
    ...routedEntryComponents
  ],
  providers: [
    ItemService,
  ],
  entryComponents:[
    ...routedEntryComponents
  ]
})
export class ItemModule { }
