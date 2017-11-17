import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromItem from './item';
import * as fromRoot from 'app/reducers';

export interface ItemRootState {
  item: fromItem.State;
}

export interface State extends fromRoot.State {
  item: ItemRootState;
}

export const reducers = {
  item: fromItem.reducer,
};


export const getItemRootState = createFeatureSelector<ItemRootState>('item');

export const getItemState = createSelector(
  getItemRootState,
  (state: ItemRootState) => state.item
);

export const getImages = createSelector(
  getItemState,
  fromItem.getImages
)

