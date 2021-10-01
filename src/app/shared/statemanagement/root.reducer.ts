import { createReducer } from '@ngrx/store';

export const appKey = 'ngrx-jest-base-key';

export interface AppState {
  loggedUser: boolean
}

export const initialState: AppState = {
  loggedUser: false
};

export const reducer = createReducer(initialState);
