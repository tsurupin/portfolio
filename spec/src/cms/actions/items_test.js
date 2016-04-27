import { expect } from '../utility';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  moveItem,
  fetchTweet
} from '../../../../src/cms/actions/items';

import {
  FETCH_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM,
  MOVE_ITEM_TOP, FETCH_TWEET, TEST_DOMAIN, TWITTER_PATH, ROOT_URL,
} from '../../../../src/cms/constants';

import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('item actions', () => {
  describe('fetchItems', () => {
    it('creates FETCH_ITEMS and items', () => {
      const action = fetchItems([{ type: 'ItemHeading' }]);
      const expectedResponse = {
        type: FETCH_ITEMS,
        payload: {
          items: [{ type: 'ItemHeading' }]
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('createItem', () => {
    it('creates CREATE_ITEM and item', () => {
      const action = createItem('ItemHeading');
      const expectedResponse = {
        type: CREATE_ITEM,
        payload: {
          item: {
            type: 'ItemHeading',
            editing: true,
            isNew: true
          }
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('updateItem', () => {
    it('creates UPDATE_ITEM, item and sortRank', () => {
      const action = updateItem(1, { type: 'ItemHeading' });
      const expectedResponse = {
        type: UPDATE_ITEM,
        payload: {
          sortRank: 1,
          item: {
            type: 'ItemHeading'
          }
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('deleteItem', () => {
    it('creates DELETE_ITEM and sortRank', () => {
      const action = deleteItem(1);
      const expectedResponse = {
        type: DELETE_ITEM,
        payload: {
          sortRank: 1
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('moveItem', () => {
    it('creates MOVE_ITEM_TOP and sortRank', () => {
      const action = moveItem(1, MOVE_ITEM_TOP);
      const expectedResponse = {
        type: MOVE_ITEM_TOP,
        payload: {
          sortRank: 1
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });
  
  describe('fetchTweet', () => {
    it('creates FETCH_TWEET_SUCCESS when fetching tweet has been done', () => {
      nock(TEST_DOMAIN)
        .get(`${ROOT_URL}${TWITTER_PATH}?url=http://twitter&sort_rank=0`)
        .reply(200, { 
          data: { 
            sortRank: 0,
            responseParams: {
              sourceURL: 'http://twitter',
              authorImageURL: 'http://pbs.twimg.com/profile_images/658353847597838336/gudlMh3p_normal.jpg',
              authorName: 'steve blank',
              authorScreenName: 'sgblank',
              description: 'Great professors are people who wish to remain students for the rest of their lives.', 
            }
          } 
        });

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_TWEET.SUCCESS,
        payload: {
          data: {
            sortRank: 0,
            responseParams: {
              sourceURL: 'http://twitter',
              authorImageURL: 'http://pbs.twimg.com/profile_images/658353847597838336/gudlMh3p_normal.jpg',
              authorName: 'steve blank',
              authorScreenName: 'sgblank',
              description: 'Great professors are people who wish to remain students for the rest of their lives.',
            }
          }
        }

      }];

      return store.dispatch(fetchTweet('http://twitter', 0))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  // TODO: figure out how to make throw matcher work as expected.
  // describe('fetchTweet', () => {
  //   it('raises error when fetching tweet has been failed', () => {
  //     nock(TEST_DOMAIN)
  //       .get(`${ROOT_URL}${TWITTER_PATH}?url=http://twitter&sort_rank=0`)
  //       .reply(400, {});
  //
  //     const store = mockStore({});
  //
  //     return store.dispatch(fetchTweet('http://twitter', 0))
  //       .then(
  //           () => { 
  //           expect(store.getActions()).to.throw('URL is not valid')
  //         }
  //       )
  //   });
  // });


});
