import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMessage from './message';
import * as fromRoot from 'app/reducers';
import * as fromAuth from 'app/reducers/auth';

export interface MessageState {
  message: fromMessage.State;
}

export interface State extends fromRoot.State {
  message: MessageState;
}

export const reducers = {
  message: fromMessage.reducer,
};


export const getMessageState = createFeatureSelector<fromMessage.State>('message');

export const getMessageActiveUser = createSelector(
  getMessageState,
  fromMessage.getActiveUser
);

export const getMessages = createSelector(
  getMessageState,
  fromMessage.getMessages
)

