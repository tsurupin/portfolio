import {
  FETCH_POSTS, FETCH_POST, FETCH_NEW_POST, CREATE_POST, DELETE_POST, TOGGLE_POST
} from '../constants';

import { 
  FETCH_PROJECTS, 
  FETCH_PROJECT, 
  SAVE_PROJECT, 
  DELETE_PROJECT, 
  TOGGLE_PROJECT 
} from '../constants';

const INITIAL_STATE = { 
  projects: [],
  project: null, 
  error: null 
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROJECTS.SUCCESS:
      return { ...state, projects: action.payload.projects };
    case FETCH_PROJECT.SUCCESS:
      return { ...state, project: action.payload.project };
    case SAVE_PROJECT.SUCCESS:
    case DELETE_PROJECT.SUCCESS:
    case TOGGLE_PROJECT.SUCCESS:
      return state
    case FETCH_PROJECTS.FAILURE:
    case FETCH_PROJECT.FAILURE:
    case SAVE_PROJECT.FAILURE:
    case DELETE_PROJECT.FAILURE:
    case TOGGLE_PROJECT.FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;

    
  }

}
