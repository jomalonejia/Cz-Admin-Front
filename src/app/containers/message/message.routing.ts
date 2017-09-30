import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {MessageComponent} from "./message.component";
import {AuthGuardActivate} from 'app/services';

export const routes : Routes = [
  {
    path:'',
    /*canActivate:[AuthGuardActivate],*/
    component:MessageComponent
  }
]

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
