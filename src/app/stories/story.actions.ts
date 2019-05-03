import { Action } from '@ngrx/store';

import { Story } from './story.model';

export const FETCH_FROM_BACKEND = '[Story] Fetch from backend';

export class FetchFromBackend implements Action {
  readonly type = FETCH_FROM_BACKEND;

  constructor(public payload: Story[]) {}
}

export type StoryActions = FetchFromBackend;
