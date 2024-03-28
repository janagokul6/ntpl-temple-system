import { SET_PRODUCTS } from '../constants'

const allProducts = []
export const productsReducer = (state = allProducts, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.data.data
    default:
      return state
  }
}
