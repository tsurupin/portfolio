import { expect } from '../../helpers/utility';
import { fetchAbout } from 'client/actions/abouts';
import {
  CLIENT_ROOT_URL,
  ABOUT_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import {
  FETCH_ABOUT,
  CREATE_ERROR,
  FETCH_SOCIAL_ACCOUNTS,
} from 'shared/constants/actions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const aboutUrl = `${CLIENT_ROOT_URL}${ABOUT_PATH}`;
describe('client about actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchAbout', () => {
    it('creates FETCH_ABOUT_SUCCESS when fetchAbout has been done', () => {
      const responseParams = {
        email: 'sample@gmail.com',
        name: 'hoge',
        image: 'image',
        description: 'description',
        socialAccounts: [
          {
            accountType: 'twitter',
            url: 'http://twitter.com',
          },
        ],
      };

      nock(TEST_DOMAIN)
        .get(`${aboutUrl}`)
        .reply(200, responseParams);

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_ABOUT.SUCCESS,
          payload: {
            email: 'sample@gmail.com',
            name: 'hoge',
            image: 'image',
            description: 'description',
          },
        },
        {
          type: FETCH_SOCIAL_ACCOUNTS,
          payload: {
            socialAccounts: [
              {
                accountType: 'twitter',
                url: 'http://twitter.com',
              },
            ],
          },
        },
      ];

      return store.dispatch(fetchAbout()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created FETCH_ABOUT_FAILURE when fetchAbout has failed', () => {
      nock(TEST_DOMAIN)
        .get(`${aboutUrl}`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchAbout()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });
});
