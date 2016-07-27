import { expect, sinon } from '../../helpers/utility';
import { fetchAuthor, updateAuthor } from 'cms/actions/authors';
import {
  CMS_ROOT_URL,
  AUTHOR_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import {
  FETCH_AUTHOR,
  FETCH_SOCIAL_ACCOUNTS,
  UPDATE_AUTHOR,
  CREATE_ERROR,
} from 'shared/constants/actions';
import { trimAuthor } from 'cms/utilities';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import browserHistory from 'react-router/lib/browserHistory';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const authorUrl = `${CMS_ROOT_URL}${AUTHOR_PATH}`;
describe('cms author actions', () => {
  beforeEach(() => {
    // TODO: figure out how to test browserHistory
    sinon.stub(browserHistory, 'push');
  });

  afterEach(() => {
    nock.cleanAll();
    browserHistory.push.restore();
  });

  describe('fetchAuthor', () => {
    it('creates FETCH_AUTHOR_SUCCESS when fetchAuthor has been done', () => {
      const responseParams = {
        id: 1,
        email: 'sample@gmail.com',
        name: 'hoge',
        image: 'image',
        description: 'description',
        introduction: 'introduction',
        socialAccounts: [
          {
            accountType: 'twitter',
            url: 'http://twitter.com',
          },
        ],
      };

      nock(TEST_DOMAIN)
        .get(`${authorUrl}/edit`)
        .reply(200, responseParams);

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_AUTHOR.SUCCESS,
          payload: { author: {
            id: 1,
            email: 'sample@gmail.com',
            name: 'hoge',
            image: 'image',
            description: 'description',
            introduction: 'introduction',
          } },
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

      return store.dispatch(fetchAuthor()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created FETCH_AUTHOR_FAILURE when fetchAuthor has failed', () => {
      nock(TEST_DOMAIN)
        .get(`${authorUrl}/edit`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchAuthor()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });

  describe('updateAuthor', () => {
    let props;
    beforeEach(() => {
      props = {
        author: {
          id: 1,
          name: 'hoge',
          image: 'image',
          description: 'description',
          introduction: 'introduction',
          socialAccountsAttributes: [{
            authorId: 1,
            accountType: 'twitter',
            url: 'http://twitter.com',
          }],
        },
      };
    });


    it('creates UPDATE_AUTHOR_SUCCESS when updateAuthor has been done', () => {
      nock(TEST_DOMAIN)
        .patch(`${authorUrl}`, { author: trimAuthor(props.author) })
        .reply(200);

      const store = mockStore({});

      const expectedResponse = [{
        type: UPDATE_AUTHOR.SUCCESS,
      }];

      return store.dispatch(updateAuthor(props)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created UPDATE_AUTHOR_FAILURE when updateAuthor has failed', () => {
      nock(TEST_DOMAIN)
        .patch(`${authorUrl}`, { author: trimAuthor(props.author) })
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        type: UPDATE_AUTHOR.FAILURE,
        payload: {
          errorMessage: 'errorMessage',
        },
      }];

      return store.dispatch(updateAuthor(props)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });
});
