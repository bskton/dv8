import { Profile } from './profile.model';
import { FETCH_FROM_BACKEND, ProfileActions } from './profile.actions';

export interface State {
  profile: Profile;
}

const initialState: State = {
  profile: null,
};

export function profileReducer(state = initialState, action: ProfileActions) {
  switch (action.type) {
    case FETCH_FROM_BACKEND:
      return {
        ...state,
        profile: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getProfile = (state: State) => state.profile;
