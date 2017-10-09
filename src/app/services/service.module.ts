import {ModuleWithProviders, NgModule} from '@angular/core';

import {AuthHttp} from './http';
import {AuthGuardActivate} from './routerActivate';
import {TokenService} from './token';

const SERVICES = [
  AuthHttp,
  AuthGuardActivate,
  TokenService
]



@NgModule({

})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [...SERVICES],
    };
  }
}
