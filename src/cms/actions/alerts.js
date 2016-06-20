import { CREATE_ALERT, DELETE_ALERT } from '../constants';

export function createAlert(message, kind) {
  return {
    type: CREATE_ALERT,
    payload: {
      hasAlert: true,
      message,
      kind
    }
  }
}

export function deleteAlert() {
  return {
    type: DELETE_ALERT,
    payload: { hasAlert: false }
  }
}