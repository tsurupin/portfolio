import { expect, sinon } from '../../helpers/utility';
import {
  signUp,
  signIn,
  signOut,
} from 'cms/actions/auths';
import {
  CMS_ROOT_URL,
  AUTHOR_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import { AUTH, SIGN_OUT } from 'shared/constants/actions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import browserHistory from 'react-router/lib/browserHistory';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const authUrl = `${CMS_ROOT_URL}${AUTHOR_PATH}`;
describe('cms auth actions', () => {
  beforeEach(() => {
    // TODO: figure out how to test browserHistory
    sinon.stub(browserHistory, 'push');
  });

  afterEach(() => {
    nock.cleanAll();
    browserHistory.push.restore();
  });

  describe('signUp', () => {
    const params = {
      name: 'hoge',
      email: 'sample@gmail.com',
      password: 'hoge',
      passwordConfirmation: 'hoge',
    };


    it('creates AUTH_SUCCESS when signUp has been done', () => {
      nock(TEST_DOMAIN)
        .post(`${authUrl}/sign-up`, params)
        .reply(201, { accessToken: 'hoge' });

      const store = mockStore({});

      const expectedResponse = [{
        type: AUTH.SUCCESS,
      }];

      return store.dispatch(signUp(params)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created AUTH_FAILURE when signUp has failed', () => {
      nock(TEST_DOMAIN)
        .post(`${authUrl}/sign-up`, params)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        type: AUTH.FAILURE,
        payload: {
          errorMessage: 'errorMessage',
        },
      }];

      return store.dispatch(signUp(params)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });

  describe('signIn', () => {
    const params = {
      email: 'sample@gmail.com',
      password: 'hoge',
    };


    it('creates AUTH_SUCCESS when signIn has been done', () => {
      nock(TEST_DOMAIN)
        .post(`${authUrl}/sign-in`, params)
        .reply(201, { accessToken: 'hoge' });

      const store = mockStore({});

      const expectedResponse = [{
        type: AUTH.SUCCESS,
      }];

      return store.dispatch(signIn(params)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created AUTH_FAILURE when signIn has failed', () => {
      nock(TEST_DOMAIN)
        .post(`${authUrl}/sign-in`, params)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        type: AUTH.FAILURE,
        payload: {
          errorMessage: 'errorMessage',
        },
      }];

      return store.dispatch(signIn(params)).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });

  describe('signOut', () => {
    it('creates SIGN_OUT_SUCCESS when signOut has been done', () => {
      nock(TEST_DOMAIN)
        .delete(`${authUrl}/sign-out`)
        .reply(200);

      const store = mockStore({});

      const expectedResponse = [{
        type: SIGN_OUT.SUCCESS,
      }];

      return store.dispatch(signOut()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });

    it('created SIGN_OUT_FAILURE when signOut has failed', () => {
      nock(TEST_DOMAIN)
        .delete(`${authUrl}/sign-out`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});

      const expectedResponse = [{
        type: SIGN_OUT.FAILURE,
        payload: {
          errorMessage: 'errorMessage',
        },
      }];

      return store.dispatch(signOut()).then(() => {
        expect(store.getActions()).to.eql(expectedResponse);
      });
    });
  });
});
