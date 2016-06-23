import { expect } from '../../helpers/utility';
import projectReducer from '../../../../src/cms/reducers/projects';
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  SAVE_PROJECT
} from '../../../../src/cms/constants';

describe('Project Reducer', () => {

  it('handles action with unknown type', () => {
    expect(projectReducer([], { projects: [], project: null, error: null })).to.eql([]);
  });

  it('handles action of type FETCH_PROJECTS_SUCCESS', () => {
    const action = { type: FETCH_PROJECTS.SUCCESS, payload: { projects: {} } };
    const expectedResponse = { projects: {} };
    expect(projectReducer([], action)).to.eql(expectedResponse);
  });


  // it('handles action of type FETCH_PROJECT_SUCCESS', () => {
  //   const action = { type: FETCH_PROJECT.SUCCESS, payload: { project: { id: 1 } } };
  //   const expectedResponse = { project: { id: 1 } };
  //   expect(projectReducer([], action)).to.eql(expectedResponse);
  // });
  //
  // it('handles action of type CREATE_PROJECT_SUCCESS', () => {
  //   const action = { type: CREATE_PROJECT.SUCCESS };
  //   const expectedResponse = { message: 'Successfully Saved', loading: false };
  //   expect(projectReducer([], action)).to.eql(expectedResponse);
  // });

  
  // it('handles action of type TOGGLE_PROJECT_SUCCESS', () => {
  //   const action = { type: TOGGLE_PROJECT.SUCCESS };
  //   const expectedResponse = { message: 'Successfully Change Published Status' };
  //   expect(projectReducer([], action)).to.eql(expectedResponse);
  // });


  it('handles action of type FETCH_PROJECTS_FAILURE', () => {
    const action = { type: FETCH_PROJECTS.FAILURE, payload: 'error' };
    const expectedResponse = { error: 'error' };
    expect(projectReducer([], action)).to.eql(expectedResponse);
  });

});