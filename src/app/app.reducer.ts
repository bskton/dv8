import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromStory from './stories/story.reducer';
import * as fromUI from './ui.reducer';

export interface State {
  auth: fromAuth.State;
  story: fromStory.State;
  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  story: fromStory.storyReducer,
  ui: fromUI.uiReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getStoryState = createFeatureSelector<fromStory.State>('story');
export const getStories = createSelector(getStoryState, fromStory.getStories);

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);
