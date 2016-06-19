import { FETCH_PROJECTS } from '../constants';

const INITIAL_STATE = { 
  projects: [],
  error: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
   
    case FETCH_PROJECTS.SUCCESS:
      return { projects: action.payload.projects };
    
    case FETCH_PROJECTS.FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}