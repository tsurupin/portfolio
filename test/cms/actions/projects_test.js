import { expect, sinon } from '../utility';
import {
  fetchProjects,
  fetchProject,
  fetchNewProject,
  toggleProject,
  saveProject
} from '../../../../src/cms/actions/projects';
import {
  ROOT_URL, 
  PROJECT_PATH, 
  TEST_DOMAIN, 
  FETCH_PROJECTS, 
  FETCH_PROJECT, 
  FETCH_NEW_PROJECT,
  SAVE_PROJECT,  
  TOGGLE_PROJECT,
  FETCH_TAGS,
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

  describe('toggleProjects', () => {

    it('create TOGGLE_PROJECT_SUCCESS when toggling project has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${PROJECT_PATH}/1/acceptance`)
        .reply(200);


      const store = mockStore({});
      const expectedResponse = [undefined];

      return store.dispatch(toggleProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create TOGGLE_PROJECT_FAILURE when toggling project has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${PROJECT_PATH}/1/acceptance`)
        .reply(400, 'error');

      const store = mockStore({});
      const expectedResponse = [{
        type: TOGGLE_PROJECT.FAILURE,
        payload: 'error'
      }];

      return store.dispatch(toggleProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });


  describe('fetchProject', () => {

    it('create FETCH_PROJECT_SUCCESS when fetching post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${PROJECT_PATH}/1/edit`)
        .reply(200, {
          project: { 
            title: 'hoge', 
            description: 'description', 
            id: 1 ,
            sourceUrl: 'url',
            sampleUrl:'url',
            image: 'image'
          },
          tags: [],
          tagSuggestions:['name']
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            project: {
              description: "description",
              id: 1,
              title: "hoge",
              sourceUrl: 'url',
              sampleUrl: 'url',
              image: 'image'
            },
            tags: {
              tagSuggestions: ['name'],
              tags: []
            }
          },
          type: FETCH_PROJECT.SUCCESS
        },
        {
          payload: {
            tagSuggestions: ['name'],
            tags: []
          },
          type: FETCH_TAGS
        }
      ];

      return store.dispatch(fetchProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create FETCH_PROJECT_FAILURE when fetching post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${PROJECT_PATH}/1/edit`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_PROJECT.FAILURE,
        payload: ''
      }];

      return store.dispatch(fetchProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('fetchNewProject', () => {

    it('create FETCH_NEW_PROJECT_SUCCESS when fetching new post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${PROJECT_PATH}/new`)
        .reply(200, { tags: [], tagSuggestions:[] } );

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            tags: {
              tagSuggestions: [],
              tags: []
            }
          },
          type: FETCH_NEW_PROJECT.SUCCESS
        },
        {
          payload: {
            tagSuggestions: [],
            tags: []
          },
          type: FETCH_TAGS
        }
      ];

      return store.dispatch(fetchNewProject())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create FETCH_NEW_PROJECT_FAILURE when fetching new post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${PROJECT_PATH}/new`)
        .reply(400, 'error');

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_NEW_PROJECT.FAILURE,
        payload: 'error'
      }];

      return store.dispatch(fetchNewProject())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('saveProject', () => {
    let props;
    beforeEach(() => {
      props = {
        project: {
          title: 'hoge', description: 'description',
          tagsAttributes: [{ id: 1, text: 'hoge' }]
        }
      };
    });

    it('create SAVE_PROJECT_SUCCESS when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${ROOT_URL}${PROJECT_PATH}`, { project: props })
        .reply(201);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_PROJECT.REQUEST },
        { type: SAVE_PROJECT.SUCCESS }
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create SAVE_PROJECT_SUCCESS when updating post has been done', () => {
      props.post.id = 1;
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${PROJECT_PATH}/1`, { project: props })
        .reply(200);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_PROJECT.REQUEST },
        { type: SAVE_PROJECT.SUCCESS }
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create SAVE_PROJECT_FAILURE when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${ROOT_URL}${PROJECT_PATH}`, { project: params })
        .reply(400, 'error');

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_PROJECT.REQUEST },
        {
          type: SAVE_PROJECT.FAILURE,
          payload: 'error'
        }
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

  });


});