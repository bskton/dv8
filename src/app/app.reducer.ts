import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromUI from './ui.reducer';

export interface State {
  auth: fromAuth.State;
  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUI.uiReducer
};

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
