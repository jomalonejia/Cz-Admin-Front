import {Action} from '@ngrx/store';
import {Page} from 'app/models';


export const LIST_ORDERS_SUCCESS = '[Order] List Orders Success';
export const UPDATE_ORDER = '[Order] Update Orders';
export const UPDATE_ORDER_SUCCESS = '[Order] Update Orders Success';

export class ListOrdersSuccessAction implements Action {
  readonly type: string = LIST_ORDERS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateOrdersAction implements Action {
  readonly type: string = UPDATE_ORDER;

  constructor(public payload: {orderId: string, trackInformation: string}) {
  }
}

export class UpdateOrdersSuccessAction implements Action {
  readonly type: string = UPDATE_ORDER_SUCCESS;

  constructor(public payload: any) {
  }
}


export type orderActions = ListOrdersSuccessAction | UpdateOrdersAction | UpdateOrdersSuccessAction;
