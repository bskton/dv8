import { Story } from './story.model';
import { FETCH_FROM_BACKEND, StoryActions } from './story.actions';

export interface State {
  stories: Story[];
}

const initialState: State = {
  stories: []
};

export function storyReducer(state = initialState, action: StoryActions) {
  switch (action.type) {
    case FETCH_FROM_BACKEND:
      return {
        ...state,
        stories: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getStories = (state: State) => state.stories;
