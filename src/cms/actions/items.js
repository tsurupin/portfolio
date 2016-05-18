import axios from 'axios';
import {
  FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, 
  UPDATE_ITEM, FETCH_TWEET, ROOT_URL, TWITTER_PATH
} from '../constants';


export function fetchItems(items) {
  return {
    type: FETCH_ITEMS,
    payload: { items }
  }
}

export function createItem(targetType) {
  return {
    type: CREATE_ITEM,
    payload: {
      item: {
        targetType,
        editing: true,
        isNew: true
      }
    }
  }
}

export function updateItem(sortRank, item) {
  return {
    type: UPDATE_ITEM,
    payload: {
      sortRank,
      item
    }
  }
}

export function deleteItem(sortRank) {
  return {
    type: DELETE_ITEM,
    payload: { sortRank }
  }
}

export function moveItem(sortRank, type) {
  return {
    type,
    payload: { sortRank }
  }
}

export function fetchTweet(url, sortRank) {
  const request = axios.get(`${ROOT_URL}${TWITTER_PATH}?url=${url}`);
  return dispatch => {
    return request
      .then(response => {
        console.log(response)
        dispatch(fetchTweetSuccess({attributes: response.data.attributes, sortRank }))
      })
      .catch(() => { throw 'URL is not valid' } )
  }
}

function fetchTweetSuccess(response) {
  return {
    type: FETCH_TWEET.SUCCESS,
    payload: response
  }
}

