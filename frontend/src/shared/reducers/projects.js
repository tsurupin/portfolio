import {
  FETCH_PROJECTS, 
  FETCH_PROJECT,
  FETCH_NEW_PROJECT,
  SAVE_PROJECT,
  TOGGLE_PROJECT
} from 'shared/constants/actions';

const INITIAL_STATE = { 
  projects: [],
  loading: false,
  project: {},
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROJECTS.REQUEST:
      return { ...state, loading: true };

    case FETCH_PROJECTS.SUCCESS:
      return { ...state, projects: action.payload.projects, loading: false };
    
    case FETCH_PROJECT.SUCCESS:
      return { ...state, project: action.payload.project, errorMessage: '' };
    
    case FETCH_NEW_PROJECT.SUCCESS:
    case SAVE_PROJECT.SUCCESS:
      return { ...state, project: {}, errorMessage: '' };

    case TOGGLE_PROJECT.SUCCESS:
      const project = { ...state.projects[action.payload.sortRank], accepted: action.payload.accepted };
      const projects = [...state.projects.slice(0, action.payload.sortRank), project, ...state.projects.slice(action.payload.sortRank + 1)];
      return { ...state, projects };

    case FETCH_PROJECTS.FAILURE:
      return { ...state, loading: false };

    case SAVE_PROJECT.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    
    default:
      return state;
  }
}
