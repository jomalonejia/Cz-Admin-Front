import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {Http, HttpModule, RequestOptions} from "@angular/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from "./component/components.module";
import {CoreModule} from "./core/core.module";
import * as constants from './component/constants';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: constants.TOKEN_NAME,
    headerName: constants.TOKEN_HEADER,
    noTokenScheme: true,
    noJwtError: false,
    tokenGetter: (() => JSON.parse(localStorage.getItem('login'))['token']),
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ComponentsModule.forRoot(),
    CoreModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
