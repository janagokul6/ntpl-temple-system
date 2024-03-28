import { SET_ROLES } from '../constants'

const roles = []
export const roleReducer = (state = roles, action) => {
  switch (action.type) {
    case SET_ROLES:
      sessionStorage.setItem('AllRolesList', JSON.stringify(action.data.data))
      return action.data.data
    default:
      return state
  }
}
