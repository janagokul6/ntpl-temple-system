import { SET_USERS } from '../constants'

const users = []
export const userReducer = (state = users, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.data.data
    default:
      return state
  }
}
