import { NgModule } from '@angular/core';
import {DataTableModule} from 'angular2-datatable';
import {ComponentsModule} from 'app/components/components.module';
import {OrderComponent} from './order.component';
import {OrderService} from './services'
import {OrderEditComponent} from './components';
import {OrderStatusPipe} from './pipes';


@NgModule({
  imports: [
    ComponentsModule,
    DataTableModule
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
