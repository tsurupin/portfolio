import { expect, sinon } from '../utility';
import {
  fetchProjects
} from '../../../../src/cms/actions/projects';
import {
  ROOT_URL, 
  PROJECT_PATH, 
  TEST_DOMAIN, 
  FETCH_PROJECTS, 
  FETCH_PROJECT, 
  FETCH_NEW_PROJECT,
  SAVE_PROJECT, 
  DELETE_PROJECT, 
  TOGGLE_PROJECT
} from '../../../../src/cms/constants';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import browserHistory  from 'react-router/lib/browserHistory'
import thunk from 'redux-thunk'
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);


describe('project actions', () => {
  const headerConfig = { reqheaders: { 'authorization': localStorage.getItem('accessToken') }};
  const projectURL = `${ROOT_URL}${PROJECT_PATH}`;
  
  beforeEach(() => {
    // TODO: figure out how to test browserHistory
    sinon.stub(browserHistory,'push');
  });

  afterEach(() => {
    nock.cleanAll();
    browserHistory.push.restore();
  });

  describe('fetch_projects', () => {

    it('creates FETCH_PROJECTS_SUCCESS when fetching projects has been done', () => {
      const params = {
        projects: [
          {
            id: 1,
            title: 'title',
            description: 'description',
            name: 'name',
            imageURL: 'http://sample.com/image.jpg',
            sourceURL: 'http://github.com',
            sampleURL: 'http://sample.com',
            projectTags: ['hoge1', 'hoge2'],
            accepted: true
          }
        ]
      };
      
      
      nock(TEST_DOMAIN, headerConfig )
        .get(`${projectURL}`)
        .reply(200, params);
      
      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_PROJECTS.SUCCESS,
        payload: params
      }];

      return store.dispatch(fetchProjects())
        .then(() => {
          console.log(store.getActions());
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('creates FETCH_PROJECTS_FAILURE when fetching projects has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}`)
        .reply(400, 'error');

      const store = mockStore({});
      const expectedResponse = [{
        payload: { error: 'error' }, type: FETCH_PROJECTS.FAILURE
      }];

      return store.dispatch(fetchProjects())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  // describe('fetchproject', () => {
  //
  //   it('create FETCH_project_SUCCESS when fetching project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .get(`${ROOT_URL}${project_PATH}/1/edit`)
  //       .reply(200, { 
  //         project: { title: 'hoge', description: 'description', id: 1 },
  //         items: [{ }],
  //         tags: [], 
  //         tagSuggestions:[] 
  //       });
  //
  //     const store = mockStore({});
  //     const expectedResponse = [
  //       {
  //         payload: {
  //           items: [{}],
  //           project: { 
  //             description: "description",
  //             id: 1,
  //             title: "hoge" 
  //           },
  //           tags: {
  //             tagSuggestions: [],
  //             tags: []
  //           }
  //         },
  //         type: FETCH_project.SUCCESS
  //       }, 
  //       {
  //         payload: { items: [{}] },
  //         type: FETCH_ITEMS
  //       },
  //       {
  //         payload: {
  //           tagSuggestions: [],
  //           tags: []
  //         },
  //         type: FETCH_TAGS 
  //       }
  //     ];
  //
  //     return store.dispatch(fetchproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create FETCH_project_FAILURE when fetching project has been failed', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .get(`${ROOT_URL}${project_PATH}/1/edit`)
  //       .reply(400);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: FETCH_project.FAILURE,
  //       payload: ''
  //     }];
  //
  //     return store.dispatch(fetchproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  // });
  //
  // describe('fetchNewproject', () => {
  //
  //   it('create FETCH_NEW_project_SUCCESS when fetching new project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .get(`${ROOT_URL}${project_PATH}/new`)
  //       .reply(200, { tags: [], tagSuggestions:[] } );
  //
  //     const store = mockStore({});
  //     const expectedResponse = [
  //       {
  //         payload: {
  //           tags: {
  //             tagSuggestions: []
  //           }
  //         },
  //         type: FETCH_NEW_project.SUCCESS
  //       },
  //       {
  //         payload: {
  //           tagSuggestions: [],
  //           tags: undefined
  //         },
  //         type: FETCH_TAGS
  //       }
  //     ];
  //
  //     return store.dispatch(fetchNewproject())
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create FETCH_NEW_project_FAILURE when fetching new project has been failed', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .get(`${ROOT_URL}${project_PATH}/new`)
  //       .reply(400);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: FETCH_NEW_project.FAILURE,
  //       payload: ''
  //     }];
  //
  //     return store.dispatch(fetchNewproject())
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  // });
  //
  // describe('createproject', () => {
  //   let props;
  //   beforeEach(() => {
  //     props = {
  //       project: {
  //         title: 'hoge', description: 'description',
  //         itemsAttributes: [{ targetType: 'ItemHeading', editing: false }]
  //       }
  //     };
  //   });
  //
  //   it('create CREATE_project_SUCCESS when creating project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .project(`${ROOT_URL}${project_PATH}`, { project: trimproject(props.project) })
  //       .reply(201);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [
  //       { type: CREATE_project.REQUEST },
  //       { type: CREATE_project.SUCCESS }
  //     ];
  //
  //     return store.dispatch(createproject(props))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create CREATE_project_SUCCESS when updating project has been done', () => {
  //     props.project.id = 1;
  //     nock(TEST_DOMAIN, headerConfig)
  //       .patch(`${ROOT_URL}${project_PATH}/1`, { project: trimproject(props.project) })
  //       .reply(200);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [
  //       { type: CREATE_project.REQUEST },
  //       { type: CREATE_project.SUCCESS }
  //     ];
  //    
  //     return store.dispatch(createproject(props))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create CREATE_project_FAILURE when creating project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .project(`${ROOT_URL}${project_PATH}`, { project: trimproject(props.project) })
  //       .reply(400, 'error');
  //
  //     const store = mockStore({});
  //     const expectedResponse = [
  //       { type: CREATE_project.REQUEST },
  //       { 
  //         type: CREATE_project.FAILURE, 
  //         payload: 'error' 
  //       }
  //     ];
  //
  //     return store.dispatch(createproject(props)) 
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  // });
  //
  // // describe('updateproject', () => {
  // //
  // //   it('create UPDATE_project_SUCCESS when updating project has been done', () => {
  // //     nock(TEST_DOMAIN)
  // //       .patch(`${ROOT_URL}${project_PATH}/1`, { id: 1, title: 'hoge' })
  // //       .reply(200);
  // //
  // //     const store = mockStore({});
  // //     const expectedResponse = [{
  // //       type: UPDATE_project.SUCCESS
  // //     }];
  // //
  // //     return store.dispatch(updateproject({ id: 1, title: 'hoge' }))
  // //       .then(() => {
  // //         expect(store.getActions()).to.eql(expectedResponse)
  // //       })
  // //   });
  // //
  // //   it('create UPDATE_project_FAILURE when creating project has been done', () => {
  // //     nock(TEST_DOMAIN)
  // //       .patch(`${ROOT_URL}${project_PATH}/1`, { id: 1, title: 'hoge' })
  // //       .reply(400);
  // //
  // //     const store = mockStore({});
  // //     const expectedResponse = [{
  // //       type: UPDATE_project.FAILURE,
  // //       payload: ''
  // //     }];
  // //
  // //     return store.dispatch(updateproject({ id: 1, title: 'hoge' }))
  // //       .then(() => {
  // //         expect(store.getActions()).to.eql(expectedResponse)
  // //       })
  // //   });
  // //
  // // });
  //
  // describe('deleteproject', () => {
  //   it('create DELETE_project_SUCCESS when deleting project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .delete(`${ROOT_URL}${project_PATH}/1`)
  //       .reply(204);
  //
  //    
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: DELETE_project.SUCCESS
  //     }];
  //
  //     return store.dispatch(deleteproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create DELETE_project_FAILURE when deleting project has been failed', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .delete(`${ROOT_URL}${project_PATH}/1`)
  //       .reply(400);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: DELETE_project.FAILURE,
  //       payload: ''
  //     }];
  //
  //     return store.dispatch(deleteproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  // });
  //
  // describe('toggleprojects', () => {
  //
  //   it('create TOGGLE_project_SUCCESS when toggling project has been done', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .patch(`${ROOT_URL}${project_PATH}/1/acceptance`)
  //       .reply(200);
  //
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: TOGGLE_project.SUCCESS
  //     }];
  //
  //     return store.dispatch(toggleproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create TOGGLE_project_FAILURE when toggling project has been failed', () => {
  //     nock(TEST_DOMAIN, headerConfig)
  //       .patch(`${ROOT_URL}${project_PATH}/1/acceptance`)
  //       .reply(400);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: TOGGLE_project.FAILURE,
  //       payload: ''
  //     }];
  //
  //     return store.dispatch(toggleproject(1))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   })
  //
  // });
});