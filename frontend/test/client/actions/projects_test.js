import { expect } from '../../helpers/utility';
import { fetchProjects } from 'client/actions/projects';
import { FETCH_PROJECTS, CREATE_ERROR } from 'shared/constants/actions';
import {
  CLIENT_ROOT_URL,
  PROJECT_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const projectUrl = `${CLIENT_ROOT_URL}${PROJECT_PATH}`;

describe('client project actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetch_projects', () => {
    it('creates FETCH_PROJECTS_SUCCESS when fetching projects has been done', () => {
      const params = {
        projects: [
          {
            id: 1,
            title: 'title',
            description: 'description',
            image: 'http://sample.com/image.jpg',
            sourceUrl: 'http://github.com',
            caption: 'caption',
            tags: [{ id: 1, name: 'hoge1' }],
            accepted: true,
          },
        ],
      };


      nock(TEST_DOMAIN)
        .get(`${projectUrl}`)
        .reply(200, params);

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_PROJECTS.REQUEST,
        },
        {
          type: FETCH_PROJECTS.SUCCESS,
          payload: params,
        },
      ];

      return store.dispatch(fetchProjects())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('creates FETCH_PROJECTS_FAILURE when fetching projects has been failed', () => {
      nock(TEST_DOMAIN)
        .get(`${projectUrl}`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_PROJECTS.REQUEST,
        },
        {
          type: FETCH_PROJECTS.FAILURE,
        },
        {
          payload: {
            hasAlert: true,
            message: 'errorMessage',
          },
          type: CREATE_ERROR,
        },
      ];

      return store.dispatch(fetchProjects())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });
});
