import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {Http, HttpModule, RequestOptions} from "@angular/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";*/
import {AuthHttp} from './services/http'

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from "./components/components.module";
import {CoreModule} from "./core/core.module";
import * as constants from 'app/constants';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from 'app/services';


import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {DBModule} from '@ngrx/db';
import { reducers, metaReducers } from './reducers';
import { schema } from './components/db';
import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomRouterStateSerializer } from './components/utils';


/*export function authHttpServiceFactory(http: Http, options: RequestOptions) {

  return new AuthHttp(new AuthConfig({
    tokenName: constants.TOKEN_NAME,
    headerName: constants.TOKEN_HEADER,
    noTokenScheme: true,
    noJwtError: false,
    tokenGetter: (() => sessionStorage.getItem('token')),
  }), http, options);
}*/

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ComponentsModule.forRoot(),
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    /*StoreRouterConnectingModule,*/
    EffectsModule.forRoot([]),
    DBModule.provideDB(schema),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthHttp,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    /*{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },*/
    /*{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
