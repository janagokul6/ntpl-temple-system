/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import { roleReducer } from './allRedudcers/roleReducer'
import { userReducer } from './allRedudcers/userReducer'
import { categoriesReducer } from './allRedudcers/categoriesReducer'
import { productsReducer } from './allRedudcers/productsReducer'
import { faqsReducer } from './allRedudcers/faqsReducers'
import { websiteDetailsReducer } from './allRedudcers/websiteDetailsReducer'

export default combineReducers({
  roleReducer,
  userReducer,
  categoriesReducer,
  productsReducer,
  faqsReducer,
  websiteDetailsReducer
})
