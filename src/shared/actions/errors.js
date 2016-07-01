import {
  CREATE_ERROR,
  DELETE_ERROR,
  SIGN_OUT,
} from 'shared/constants/actions';

export function createError(error) {
  if (error.status && error.status === 401) {
    return {
      type: SIGN_OUT.SUCCESS,
    };
  }
  const message = error.data ? error.data.errorMessage : error;

  return {
    type: CREATE_ERROR,
    payload: {
      hasAlert: true,
      message,
    },
  };
}

export function deleteError() {
  return {
    type: DELETE_ERROR,
    payload: { hasAlert: false },
  };
}
