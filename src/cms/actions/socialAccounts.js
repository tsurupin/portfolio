import {
  CREATE_SOCIAL_ACCOUNT,
  UPDATE_SOCIAL_ACCOUNT,
  DELETE_SOCIAL_ACCOUNT
} from '../constants';

export function createSocialAccount(socialAccount = {}) {
  return {
    type: CREATE_SOCIAL_ACCOUNT,
    payload: { socialAccount }
  }
}

export function updateSocialAccount(sortRank, socialAccount) {
  return {
    type: UPDATE_SOCIAL_ACCOUNT,
    payload: {
      sortRank,
      socialAccount
    }
  }
}

export function deleteSocialAccount(sortRank) {
  return {
    type: DELETE_SOCIAL_ACCOUNT,
    payload: { sortRank }
  }
}
