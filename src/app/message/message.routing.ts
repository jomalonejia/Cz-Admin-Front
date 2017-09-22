import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuardActive} from "../component/service";
import {MessageComponent} from "./message.component";

export const routes : Routes = [
  {
    path:'',
    canActivate:[AuthGuardActive],
    component:MessageComponent
  }
]

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
