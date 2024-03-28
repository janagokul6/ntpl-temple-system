import { CATEGORIES, FAQs, PRODUCTS, ROLES, USERS, WEBSITE_DETAILS } from './constants'

export function getRolesList() {
  return {
    type: ROLES,
  }
}
export function getUsersList() {
  return {
    type: USERS,
  }
}
export function getCategoriesList() {
  return {
    type: CATEGORIES,
  }
}
export function getProductsList() {
  return {
    type: PRODUCTS,
  }
}
export function getFAQsList() {
  return {
    type: FAQs,
  }
}

export function getWebsiteDetailsList() {
  return {
    type: WEBSITE_DETAILS,
  }
}
