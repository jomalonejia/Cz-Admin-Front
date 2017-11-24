import {NgModule} from '@angular/core';
import {DataTableModule} from 'angular2-datatable';
import {QuillEditorModule} from 'ngx-quill-editor';
import {TreeModule} from 'angular-tree-component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'ngx-color-picker';
import {DataFilterPipe,ItemParamPipe} from './pipes';
import {ComponentsModule} from 'app/components/components.module';
import {ItemRoutingModule, routedComponents, routedEntryComponents} from './item-routing.module';
import {ItemService} from './services';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {ItemEffects} from './effects'


@NgModule({
  imports: [
    ComponentsModule,
    NgbDropdownModule,
    ItemRoutingModule,
    DataTableModule,
    QuillEditorModule,
    TreeModule,
    ColorPickerModule,
    StoreModule.forFeature('item', reducers),
    EffectsModule.forFeature([ItemEffects]),
  ],
  declarations: [
    DataFilterPipe,
    ItemParamPipe,
    ...routedComponents,
    ...routedEntryComponents
  ],
  providers: [
    ItemService,
  ],
  entryComponents: [
    ...routedEntryComponents
  ]
})
export class ItemModule {
}
