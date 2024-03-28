import { SET_FAQs } from '../constants'

const allFaqs = []
export const faqsReducer = (state = allFaqs, action) => {
  switch (action.type) {
    case SET_FAQs:
      return action.data.data
    default:
      return state
  }
}
