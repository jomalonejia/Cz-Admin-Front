import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import {OrderService} from '../services';

import * as actions from '../actions';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/switchMap';
import {Page} from 'app/models';




@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private orderService: OrderService) {

  }


  @Effect()
  getItemImages$: Observable<Action> = this.actions$
    .ofType(actions.UPDATE_ORDER)
    .map((action:actions.UpdateOrdersAction) => action.payload)
    .throttleTime(500)
    .switchMap(order => {
      return this.orderService.updateOrderStatus(order.orderId,order.trackInformation)
        .map(res => {
          return new actions.UpdateOrdersSuccessAction(res);
        })
    });
}
