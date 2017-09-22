import {NgModule}   from '@angular/core';
import {CommonModule} from "@angular/common";
import {MomentModule} from 'angular2-moment';

import {ComponentsModule} from '../component/components.module';

import {routing} from "./message.routing";
import {MessageService} from './services';
import {MessageComponent} from "./message.component";
import {MessagesComponent} from "./component";
import {CardComponent} from "./component";
import {ListComponent} from "./component";
import {TextComponent} from "./component";



@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ComponentsModule,
    routing
  ],
  declarations: [
    MessageComponent,
    CardComponent,
    ListComponent,
    MessagesComponent,
    TextComponent,
  ],
  providers: [
    MessageService
  ]
})

export class MessageModule {

}
