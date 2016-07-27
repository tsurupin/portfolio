import { expect } from '../../helpers/utility';
import projectReducer from 'shared/reducers/projects';
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_NEW_PROJECT,
  SAVE_PROJECT,
  TOGGLE_PROJECT,
} from 'shared/constants/actions';

const INITIAL_STATE = {
  projects: [],
  project: {},
  errorMessage: '',
};

describe('Project Reducer', () => {
  it('handles action with unknown type', () => {
    expect(projectReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type FETCH_PROJECTS_SUCCESS', () => {
    const action = {
      type: FETCH_PROJECTS.SUCCESS,
      payload: { projects: [{
        id: 1,
        title: 'title1',
        accepted: true,
        image: 'http://image.png',
        sourceUrl: 'http://google.com',
        description: 'description',
        caption: 'caption',
        tags: [{ id: 1, name: 'name' }],
      }] },
    };
    const expectedResponse = {
      loading: false,
      projects: [{
        id: 1,
        title: 'title1',
        accepted: true,
        image: 'http://image.png',
        sourceUrl: 'http://google.com',
        description: 'description',
        caption: 'caption',
        tags: [{ id: 1, name: 'name' }],
      }],
    };
    expect(projectReducer({}, action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_PROJECT_SUCCESS', () => {
    const action = {
      type: FETCH_PROJECT.SUCCESS,
      payload: { project: {
        id: 1,
        title: 'title1',
        accepted: true,
        image: 'http://image.png',
        sourceUrl: 'http://google.com',
        description: 'description',
        caption: 'caption',
        tags: [{ id: 1, name: 'name' }],
        tagSuggestions: ['name1', 'name2'],
      } },
    };
    const expectedResponse = {
      project: {
        id: 1,
        title: 'title1',
        accepted: true,
        image: 'http://image.png',
        sourceUrl: 'http://google.com',
        description: 'description',
        caption: 'caption',
        tags: [{ id: 1, name: 'name' }],
        tagSuggestions: ['name1', 'name2'],
      },
      errorMessage: '',
    };
    expect(projectReducer({}, action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_NEW_PROJECT_SUCCESS', () => {
    const action = {
      type: FETCH_NEW_PROJECT.SUCCESS,
    };
    const state = {
      project: {
        id: 1,
        title: 'title1',
        accepted: true,
        image: 'http://image.png',
        sourceUrl: 'http://google.com',
        description: 'description',
        caption: 'caption',
        tags: [{ id: 1, name: 'name' }],
        tagSuggestions: ['name1', 'name2'],
      },
      errorMessage: 'errorMessage',
    };
    const expectedResponse = {
      project: {},
      errorMessage: '',
    };
    expect(projectReducer(state, action)).to.eql(expectedResponse);
  });


  it('handles action of type TOGGLE_PROJECT_SUCCESS', () => {
    const action = {
      type: TOGGLE_PROJECT.SUCCESS,
      payload: {
        sortRank: 1,
        accepted: true,
      },
    };

    const state = {
      projects: [
        {
          id: 1,
          title: 'title1',
          accepted: true,
          image: 'http://image.png',
          sourceUrl: 'http://google.com',
          description: 'description',
          caption: 'caption',
          tags: [{ id: 1, name: 'name' }],
        },
        {
          id: 2,
          title: 'title2',
          accepted: false,
          image: 'http://image.png',
          sourceUrl: 'http://google.com',
          description: 'description',
          caption: 'caption',
          tags: [{ id: 2, name: 'name' }],
        },
      ],
    };
    const expectedResponse = {
      projects: [
        {
          id: 1,
          title: 'title1',
          accepted: true,
          image: 'http://image.png',
          sourceUrl: 'http://google.com',
          description: 'description',
          caption: 'caption',
          tags: [{ id: 1, name: 'name' }],
        },
        {
          id: 2,
          title: 'title2',
          accepted: true,
          image: 'http://image.png',
          sourceUrl: 'http://google.com',
          description: 'description',
          caption: 'caption',
          tags: [{ id: 2, name: 'name' }],
        },
      ],
    };
    expect(projectReducer(state, action)).to.eql(expectedResponse);
  });


  it('handles action of type SAVE_PROJECT_FAILURE', () => {
    const action = {
      type: SAVE_PROJECT.FAILURE,
      payload: { errorMessage: 'errorMessage' } };
    const expectedResponse = { errorMessage: 'errorMessage' };
    expect(projectReducer({}, action)).to.eql(expectedResponse);
  });
});
