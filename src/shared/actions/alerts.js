import { 
  CREATE_ALERT, 
  DELETE_ALERT 
} from 'shared/constants/actions';

export function createAlert(response, kind) {
  return {
    type: CREATE_ALERT,
    payload: {
      hasAlert: true,
      message: response.errorMessage,
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