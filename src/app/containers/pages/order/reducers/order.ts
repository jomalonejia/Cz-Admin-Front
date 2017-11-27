import * as order from '../actions';

export interface State {
  orders: any[];
}

const initialState: State = {
  orders: []
};

export function reducer(state: State = initialState, action: order.orderActions): State {
  switch (action.type) {
    case order.LIST_ORDERS_SUCCESS:
      return Object.assign({},state,{orders:action.payload});
    case order.UPDATE_ORDER_SUCCESS:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}

export const getOrders = (state: State) => state.orders;
