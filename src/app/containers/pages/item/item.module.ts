import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { QuillEditorModule } from 'ngx-quill-editor';

import {DataFilterPipe} from './data-filter.pipe';
import { ComponentsModule } from 'app/components/components.module';
import { TablesRoutingModule, routedComponents,routedEntryComponents} from './item-routing.module';
import { SmartTableService } from 'app/core/data/smart-table.service';
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
  ],
  declarations: [
    DataFilterPipe,
    ...routedComponents,
    ...routedEntryComponents
  ],
  providers: [
    SmartTableService,
    ItemService,
  ],
  entryComponents:[
    ...routedEntryComponents
  ]
})
export class ItemModule { }
