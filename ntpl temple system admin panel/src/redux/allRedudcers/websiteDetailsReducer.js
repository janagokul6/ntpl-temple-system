import { SET_WEBSITE_DETAILS } from '../constants'

const allWebsiteDetails = []
export const websiteDetailsReducer = (state = allWebsiteDetails, action) => {
  switch (action.type) {
    case SET_WEBSITE_DETAILS:
      return action.data.data
    default:
      return state
  }
}
