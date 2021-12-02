import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl} from "../../../utils/globalUrl";

const actionTypes = {
  RESET_DISCOUNT_STATE: 'RESET_DISCOUNT_STATE',
  LOAD_ALL_DISCOUNT: 'LOAD_ALL_DISCOUNT',
  ALL_DISCOUNT_LOADED: 'ALL_DISCOUNT_LOADED',
  UPDATE_DISCOUNT: 'UPDATE_DISCOUNT',
  DISCOUNT_UPDATED: 'DISCOUNT_UPDATED',
  DELETE_DISCOUNT: 'DELETE_DISCOUNT',
  ADD_NEW_DISCOUNT: 'ADD_NEW_DISCOUNT',
  NEW_DISCOUNT_ADDED: 'NEW_DISCOUNT_ADDED',
  ADD_NEW_DISCOUNT_PRODUCT: 'ADD_NEW_DISCOUNT_PRODUCT',
  NEW_DISCOUNT_PRODUCT_ADDED: 'NEW_DISCOUNT_PRODUCT_ADDED',
  REMOVE_DISCOUNT_PRODUCT: 'REMOVE_DISCOUNT_PRODUCT',
  DISCOUNT_PRODUCT_REMOVED: 'DISCOUNT_PRODUCT_REMOVED',
  RESET_DISCOUNT_STATUS: 'RESET_DISCOUNT_STATUS',

  SHOW_ADD_DISCOUNT_TOGGLE: 'SHOW_ADD_DISCOUNT_TOGGLE',
  SHOW_EDIT_DISCOUNT_TOGGLE: 'SHOW_EDIT_DISCOUNT_TOGGLE'
}
const initialState = {
  discounts: [],
  message: '',
  loading: false,
  status: false,
  error: '',
  addFormVisibility: false,
  editFormVisibility: false,
}

export const discountReducer = (state = initialState, {type, payload}) =>{
  switch (type){
    case actionTypes.RESET_DISCOUNT_STATUS: {
      return {
        ...state,
        status: false
      }
    }
    case actionTypes.SHOW_ADD_DISCOUNT_TOGGLE: {
      return {
        ...state,
        addFormVisibility: payload
      }
    }
    case actionTypes.SHOW_EDIT_DISCOUNT_TOGGLE: {
      return {
        ...state,
        editFormVisibility: payload
      }
    }
    case actionTypes.LOAD_ALL_DISCOUNT: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.ALL_DISCOUNT_LOADED: {
      return {
        ...state,
        loading: false,
        discounts: payload,
      }
    }
    case actionTypes.ADD_NEW_DISCOUNT: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.NEW_DISCOUNT_ADDED: {
      // console.log('Status, ',payload)
      return {
        ...state,
        loading: false,
        status: payload,
        addFormVisibility: false
      }
    }
    case actionTypes.UPDATE_DISCOUNT: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.DISCOUNT_UPDATED: {
      return {
        ...state,
        loading: false,
        status: payload,
        editFormVisibility: false
      }
    }
    case actionTypes.RESET_DISCOUNT_STATE: {
      return {
        ...state,
        ...initialState
      }
    }
    default:
      return {
        ...state
      }

  }
}

export const discountDispatch = {
  resetDiscountState: () => ({type: actionTypes.RESET_DISCOUNT_STATE}),
  loadAllDiscount: () =>({type: actionTypes.LOAD_ALL_DISCOUNT}),
  allDiscountLoaded: (data)=> ({type: actionTypes.ALL_DISCOUNT_LOADED, payload: data}),
  addNewDiscount: (data) => ({type: actionTypes.ADD_NEW_DISCOUNT, payload: data}),
  newDiscountAdded: (data) => ({type: actionTypes.NEW_DISCOUNT_ADDED, payload: data}),
  updateDiscount: (data) => ({type: actionTypes.UPDATE_DISCOUNT, payload: data}),
  discountUpdated: (data) => ({type: actionTypes.DISCOUNT_UPDATED, payload: data}),
  deleteDiscount: (data) => ({type:actionTypes.DELETE_DISCOUNT, payload:data}),
  addDiscountProduct: (data) => ({type: actionTypes.ADD_NEW_DISCOUNT_PRODUCT, payload: data}),
  discountProductAdded: (data) => ({type:actionTypes.NEW_DISCOUNT_PRODUCT_ADDED, payload: data}),
  removeDiscountProduct: (data) => ({type: actionTypes.REMOVE_DISCOUNT_PRODUCT, payload: data}),
  discountProductRemoved: (data) => ({type: actionTypes.DISCOUNT_PRODUCT_REMOVED, payload: data}),

  resetDiscountStatus: () => ({type: actionTypes.RESET_DISCOUNT_STATUS}),
  showAddDiscountToggle: (data) => ({type: actionTypes.SHOW_ADD_DISCOUNT_TOGGLE, payload: data}),
  showEditDiscountToggle: (data) => ({type: actionTypes.SHOW_EDIT_DISCOUNT_TOGGLE, payload: data}),
}

export function* discountSaga (){
  yield takeLatest(actionTypes.LOAD_ALL_DISCOUNT, function* (){
    try {
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/master/discount/all`)
      console.log(response)
      yield put(discountDispatch.allDiscountLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.ADD_NEW_DISCOUNT, function* (action) {
    const data = action.payload
    try {
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/master/discount/new`, data)
      console.log(response)
      yield put(discountDispatch.newDiscountAdded(response.status))
      yield put(discountDispatch.loadAllDiscount())
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.DELETE_DISCOUNT, function* (action){
    const id = action.payload;
    try {
      const {data: response} = yield axios.delete(`${globalUrl.productService}/api/v1/master/discount/delete/${id}`)
      console.log(response)
      yield put(discountDispatch.loadAllDiscount())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionTypes.UPDATE_DISCOUNT, function* (action){
    const data = action.payload;
    try {
      yield put(discountDispatch.discountUpdated())
    }catch (e) {

    }
  })
  yield takeLatest(actionTypes.REMOVE_DISCOUNT_PRODUCT, function* (action) {
    const data = action.payload;
    try {
      yield put(discountDispatch.discountProductRemoved())

    }catch (e) {

    }
  })

  yield takeLatest(actionTypes.ADD_NEW_DISCOUNT_PRODUCT, function* (action) {
    try {
      yield put(discountDispatch.discountProductAdded())
    }catch (e) {

    }
  })

}


