import { NgModule } from '@angular/core';
import {DataTableModule} from 'angular2-datatable';
import {ComponentsModule} from 'app/components/components.module';
import {OrderComponent} from './order.component';
import {OrderService} from './services'
import {OrderEditComponent} from './components';
import {OrderStatusPipe} from './pipes';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from './effects';
import {reducers} from './reducers';


@NgModule({
  imports: [
    ComponentsModule,
    DataTableModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([OrderEffects]),
  ],
  declarations: [
    OrderComponent,
    OrderEditComponent,
    OrderStatusPipe
  ],
  entryComponents: [
    OrderEditComponent
  ],
  providers: [
    OrderService,
  ],
})
export class OrderModule {
}
