import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMessage from './message';
import * as fromRoot from 'app/reducers';
import * as fromAuth from 'app/reducers/auth';

export interface MessageRootState {
  message: fromMessage.State;
}

export interface State extends fromRoot.State {
  message: MessageRootState;
}

export const reducers = {
  message: fromMessage.reducer,
};


export const getMessageRootState = createFeatureSelector<MessageRootState>('message');

export const getMessageState = createSelector(
  getMessageRootState,
  (state: MessageRootState) => state.message
);

export const getMessageActiveUser = createSelector(
  getMessageState,
  fromMessage.getActiveUser
);

export const getMessages = createSelector(
  getMessageState,
  fromMessage.getMessages
)

