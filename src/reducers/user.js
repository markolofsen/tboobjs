import * as constants from '../constants'
import {cookie} from '../utils/functions'
const initialState = {
  data: null,
  isLoading: false
}

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...initialState, isLoading: true }
    case constants.USER_LOGGED_IN:
      cookie('set', ['token',payload.token])
      cookie('set', ['email',payload.email])
      return { data: payload, isLoading: false }
    case constants.USER_LOGGED_OUT:
      cookie('delete', 'token')
      return initialState
    default:
      return state
  }
}
