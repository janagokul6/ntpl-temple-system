import { put, takeEvery } from 'redux-saga/effects'
import {
  ROLES,
  SET_ROLES,
  USERS,
  SET_USERS,
  CATEGORIES,
  SET_CATEGORIES,
  PRODUCTS,
  SET_PRODUCTS,
  SET_FAQs,
  FAQs,
  SET_WEBSITE_DETAILS,
  WEBSITE_DETAILS,
} from './constants'
import globalVariable from 'src/globalVariable'

function* rolesList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/roles/getAll`
    console.log(url)
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    console.log(data.data)
    yield put({ type: SET_ROLES, data })
  } catch (error) {
    // console.log(error.message)
  }
}
function* usersList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/user/getAll`
    console.log(url)
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    console.log(data.data)
    yield put({ type: SET_USERS, data })
  } catch (error) {
    // console.log(error.message)
  }
}
function* categoriesList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/categories/getAll`
    console.log(url)
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    console.log(data.data)
    yield put({ type: SET_CATEGORIES, data })
  } catch (error) {
    // console.log(error.message)
  }
}
function* productsList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/products/getAll`
    console.log(url)
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    console.log(data.data)
    yield put({ type: SET_PRODUCTS, data })
  } catch (error) {
    // console.log(error.message)
  }
}
function* faqList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/faq/getall`
    console.log(url)
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    console.log(data.data)
    yield put({ type: SET_FAQs, data })
  } catch (error) {
    // console.log(error.message)
  }
}

function* websiteDetailsList() {
  try {
    const url = `${process.env.REACT_APP_BACKEND_1}/admin/website-details/getall`
    let data = yield fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
    data = yield data.json()
    yield put({ type: SET_WEBSITE_DETAILS, data })
  } catch (error) {
    // console.log(error.message)
  }
}

function* SagaData() {
  yield takeEvery(ROLES, rolesList)
  yield takeEvery(USERS, usersList)
  yield takeEvery(CATEGORIES, categoriesList)
  yield takeEvery(PRODUCTS, productsList)
  yield takeEvery(FAQs, faqList)
  yield takeEvery(WEBSITE_DETAILS, websiteDetailsList)
}

export default SagaData
