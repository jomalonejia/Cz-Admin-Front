import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromOrder from './order';
import * as fromRoot from 'app/reducers';

export interface OrderRootState {
  order: fromOrder.State;
}

export interface State extends fromRoot.State {
  orderRoot: OrderRootState;
}

export const reducers = {
  order: fromOrder.reducer,
};


export const getOrderRootState = createFeatureSelector<OrderRootState>('order');

export const getOrdersState = createSelector(
  getOrderRootState,
  (state: OrderRootState) => state.order
);

export const getOrders = createSelector(
  getOrdersState,
  fromOrder.getOrders
)

