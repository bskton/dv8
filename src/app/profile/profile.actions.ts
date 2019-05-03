import { Action } from '@ngrx/store';
import { Profile } from './profile.model';

export const FETCH_FROM_BACKEND = '[Profile] Fetch from backend';

export class FetchFromBackend implements Action {
  readonly type = FETCH_FROM_BACKEND;

  constructor(public payload: Profile) {}
}

export type ProfileActions = FetchFromBackend;
