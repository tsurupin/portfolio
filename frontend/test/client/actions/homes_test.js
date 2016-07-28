import { expect } from '../../helpers/utility';
import { fetchHome } from 'client/actions/homes';
import {
  CLIENT_ROOT_URL,
  HOME_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import { FETCH_HOME, CREATE_ERROR } from 'shared/constants/actions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const homeUrl = `${CLIENT_ROOT_URL}${HOME_PATH}`;

describe('client home actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchHome', () => {
    it('creates FETCH_HOME_SUCCESS when fetchHome has been done', () => {
      const responseParams = {
        introduction: 'introduction',
        image: 'image url',
        latestPosts: [{
          id: 1,
          title: 'hoge',
          leadSentence: 'lead sentence',
        }],
        latestProject: {
          id: 1,
          image: 'image url',
        },
      };

      nock(TEST_DOMAIN)
        .get(`${homeUrl}`)
        .reply(200, responseParams);

      const store = mockStore({});

      const expectedResponse = [{
        type: FETCH_HOME.SUCCESS,
        payload: responseParams,
      }];

      return store.dispatch(fetchHome()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created FETCH_HOME_FAILURE when fetchHome has failed', () => {
      nock(TEST_DOMAIN)
        .get(`${homeUrl}`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];
      store.dispatch(fetchHome()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });
});
