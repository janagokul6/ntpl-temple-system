import { SET_CATEGORIES } from '../constants'

const allCategories = []
export const categoriesReducer = (state = allCategories, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.data.data
    default:
      return state
  }
}
