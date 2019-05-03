import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromProfile from './profile/profile.reducer';
import * as fromStory from './stories/story.reducer';
import * as fromUI from './ui.reducer';

export interface State {
  auth: fromAuth.State;
  profile: fromProfile.State;
  story: fromStory.State;
  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer,
  story: fromStory.storyReducer,
  ui: fromUI.uiReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getProfileState = createFeatureSelector<fromProfile.State>('profile');
export const getProfile = createSelector(getProfileState, fromProfile.getProfile);

export const getStoryState = createFeatureSelector<fromStory.State>('story');
export const getStories = createSelector(getStoryState, fromStory.getStories);

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);
