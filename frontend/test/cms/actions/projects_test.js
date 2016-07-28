import { expect, sinon } from '../../helpers/utility';
import {
  fetchProjects,
  fetchProject,
  fetchNewProject,
  toggleProject,
  saveProject,
} from 'cms/actions/projects';
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_NEW_PROJECT,
  SAVE_PROJECT,
  TOGGLE_PROJECT,
  FETCH_TAGS_FORM,
  CREATE_ERROR,
} from 'shared/constants/actions';
import {
  CMS_ROOT_URL,
  PROJECT_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import { trimProject } from 'cms/utilities';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import browserHistory from 'react-router/lib/browserHistory';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const headerConfig = { headers: { 'authorization': localStorage.getItem('accessToken') } };
const projectURL = `${CMS_ROOT_URL}${PROJECT_PATH}`;

describe('cms project actions', () => {
  beforeEach(() => {
    // TODO: figure out how to test browserHistory
    sinon.stub(browserHistory, 'push');
  });

  afterEach(() => {
    nock.cleanAll();
    browserHistory.push.restore();
  });

  describe('fetchProjects', () => {
    it('creates FETCH_PROJECTS_SUCCESS when fetching projects has been done', () => {
      const params = {
        projects: [
          {
            id: 1,
            title: 'title',
            description: 'description',
            image: 'http://sample.com/image.jpg',
            sourceUrl: 'http://github.com',
            projectTags: [{ id: 1, name: 'hoge1' }],
            accepted: true,
          },
        ],
      };


      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}`)
        .reply(200, params);

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_PROJECTS.SUCCESS,
        payload: params,
      }];

      return store.dispatch(fetchProjects())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('creates FETCH_PROJECTS_FAILURE when fetching projects has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchProjects())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('fetchProject', () => {
    it('create FETCH_PROJECT_SUCCESS when fetching post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}/1/edit`)
        .reply(200, {
          title: 'hoge',
          description: 'description',
          id: 1,
          sourceUrl: 'url',
          image: 'image',
          caption: 'caption',
          accepted: true,
          tags: [],
          tagSuggestions: [],
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            project: {
              description: 'description',
              id: 1,
              title: 'hoge',
              sourceUrl: 'url',
              image: 'image',
              caption: 'caption',
              accepted: true,
            },
            tags: {
              tags: [],
              tagSuggestions: [],
            },
          },
          type: FETCH_PROJECT.SUCCESS,
        },
        {
          payload: {
            tags: [],
            tagSuggestions: [],
          },
          type: FETCH_TAGS_FORM,
        },
      ];

      return store.dispatch(fetchProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create FETCH_PROJECT_FAILURE when fetching post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}/1/edit`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchProject(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('fetchNewProject', () => {
    it('create FETCH_NEW_PROJECT_SUCCESS when fetching new post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}/new`)
        .reply(200, { tags: [], tagSuggestions: [] });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            tags: {
              tagSuggestions: [],
              tags: [],
            },
          },
          type: FETCH_NEW_PROJECT.SUCCESS,
        },
        {
          payload: {
            tagSuggestions: [],
            tags: [],
          },
          type: FETCH_TAGS_FORM,
        },
      ];

      return store.dispatch(fetchNewProject())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create FETCH_NEW_PROJECT_FAILURE when fetching new post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${projectURL}/new`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchNewProject())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('saveProject', () => {
    let props;
    beforeEach(() => {
      props = {
        project: {
          title: 'hoge',
          description: 'description',
          tagsAttributes: [{ id: 1, text: 'hoge' }],
        },
      };
    });

    it('create SAVE_PROJECT_SUCCESS when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${projectURL}`, { project: trimProject(props.project) })
        .reply(201);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_PROJECT.SUCCESS },
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create SAVE_PROJECT_SUCCESS when updating post has been done', () => {
      props.project.id = 1;
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${projectURL}/1`, { project: trimProject(props.project) })
        .reply(200);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_PROJECT.SUCCESS },
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create SAVE_PROJECT_FAILURE when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${projectURL}`, { project: trimProject(props.project) })
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [
        {
          type: SAVE_PROJECT.FAILURE,
          payload: {
            errorMessage: 'errorMessage',
          },
        },
      ];

      return store.dispatch(saveProject(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('toggleProjects', () => {
    it('create TOGGLE_PROJECT_SUCCESS when toggling project has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${projectURL}/1/acceptance`)
        .reply(200, { accepted: true });


      const store = mockStore({});
      const expectedResponse = [{
        type: TOGGLE_PROJECT.SUCCESS,
        payload: {
          sortRank: 1,
          accepted: true,
        },
      }];

      return store.dispatch(toggleProject(1, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create TOGGLE_PROJECT_FAILURE when toggling project has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${projectURL}/1/acceptance`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(toggleProject(1, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });
});
