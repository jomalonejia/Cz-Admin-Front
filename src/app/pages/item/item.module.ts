import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { QuillEditorModule } from 'ngx-quill-editor';
import {
  MdDialogModule,
  MdInputModule,
  MdButtonModule,
  MdExpansionModule,
  MdChipsModule,
  MdCardModule
}
  from '@angular/material';

import {DataFilterPipe} from './data-filter.pipe';
import { ComponentsModule } from '../../component/components.module';
import { TablesRoutingModule, routedComponents,routedEntryComponents} from './item-routing.module';
import { SmartTableService } from '../../core/data/smart-table.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    TablesRoutingModule,
    DataTableModule,
    Ng2SmartTableModule,
    QuillEditorModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
    MdExpansionModule,
    MdChipsModule,
    MdCardModule
  ],
  declarations: [
    DataFilterPipe,
    ...routedComponents,
    ...routedEntryComponents
  ],
  providers: [
    SmartTableService,
  ],
  entryComponents:[
    ...routedEntryComponents
  ]
})
export class ItemModule { }
