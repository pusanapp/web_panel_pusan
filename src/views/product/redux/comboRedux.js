import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl, productService} from "../../../utils/globalUrl";

const actionTypes = {
  RESET_COMBO_STATE: 'RESET_COMBO_STATE',
  LOAD_ALL_COMBO: 'LOAD_ALL_COMBO',
  ALL_COMBO_LOADED: 'ALL_COMBO_LOADED',
  UPDATE_COMBO: 'UPDATE_COMBO',
  COMBO_UPDATED: 'COMBO_UPDATED',
  DELETE_COMBO: 'DELETE_COMBO',
  ADD_NEW_COMBO: 'ADD_NEW_COMBO',
  NEW_COMBO_ADDED: 'NEW_COMBO_ADDED',
  ADD_NEW_COMBO_PRODUCT: 'ADD_NEW_COMBO_PRODUCT',
  NEW_COMBO_PRODUCT_ADDED: 'NEW_COMBO_PRODUCT_ADDED',
  REMOVE_COMBO_PRODUCT: 'REMOVE_COMBO_PRODUCT',
  COMBO_PRODUCT_REMOVED: 'COMBO_PRODUCT_REMOVED',
  RESET_COMBO_STATUS: 'RESET_COMBO_STATUS',

  SHOW_ADD_COMBO_TOGGLE: 'SHOW_ADD_COMBO_TOGGLE',
  SHOW_EDIT_COMBO_TOGGLE: 'SHOW_EDIT_COMBO_TOGGLE'
}
const initialState = {
  combos: [],
  message: '',
  loading: false,
  status: false,
  error: '',
  addFormVisibility: false,
  editFormVisibility: false,
}

export const comboReducer = (state = initialState, {type, payload}) =>{
  switch (type){
    case actionTypes.RESET_COMBO_STATUS: {
      return {
        ...state,
        status: false
      }
    }
    case actionTypes.SHOW_ADD_COMBO_TOGGLE: {
      return {
        ...state,
        addFormVisibility: payload
      }
    }
    case actionTypes.SHOW_EDIT_COMBO_TOGGLE: {
      return {
        ...state,
        editFormVisibility: payload
      }
    }
    case actionTypes.LOAD_ALL_COMBO: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.ALL_COMBO_LOADED: {
      return {
        ...state,
        loading: false,
        combos: payload,
      }
    }
    case actionTypes.ADD_NEW_COMBO: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.NEW_COMBO_ADDED: {
      // console.log('Status, ',payload)
      return {
        ...state,
        loading: false,
        status: payload,
        addFormVisibility: false
      }
    }
    case actionTypes.UPDATE_COMBO: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.COMBO_UPDATED: {
      return {
        ...state,
        loading: false,
        status: payload,
        editFormVisibility: false
      }
    }
    case actionTypes.RESET_COMBO_STATE: {
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

export const comboDispatch = {
  resetComboState: () => ({type: actionTypes.RESET_COMBO_STATE}),
  loadAllCombo: () =>({type: actionTypes.LOAD_ALL_COMBO}),
  allComboLoaded: (data)=> ({type: actionTypes.ALL_COMBO_LOADED, payload: data}),
  addNewCombo: (data) => ({type: actionTypes.ADD_NEW_COMBO, payload: data}),
  newComboAdded: (data) => ({type: actionTypes.NEW_COMBO_ADDED, payload: data}),
  updateCombo: (data) => ({type: actionTypes.UPDATE_COMBO, payload: data}),
  comboUpdated: (data) => ({type: actionTypes.COMBO_UPDATED, payload: data}),
  deleteCombo: (data) => ({type:actionTypes.DELETE_COMBO, payload:data}),
  addComboProduct: (data) => ({type: actionTypes.ADD_NEW_COMBO_PRODUCT, payload: data}),
  comboProductAdded: (data) => ({type:actionTypes.NEW_COMBO_PRODUCT_ADDED, payload: data}),
  removeComboProduct: (data) => ({type: actionTypes.REMOVE_COMBO_PRODUCT, payload: data}),
  comboProductRemoved: (data) => ({type: actionTypes.COMBO_PRODUCT_REMOVED, payload: data}),

  resetComboStatus: () => ({type: actionTypes.RESET_COMBO_STATUS}),
  showAddComboToggle: (data) => ({type: actionTypes.SHOW_ADD_COMBO_TOGGLE, payload: data}),
  showEditComboToggle: (data) => ({type: actionTypes.SHOW_EDIT_COMBO_TOGGLE, payload: data}),
}

export function* comboSaga() {
  yield takeLatest(actionTypes.LOAD_ALL_COMBO, function* () {
    try {
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/master/combo/all`)
      console.log(response)
      yield put(comboDispatch.allComboLoaded(response.data))
    }catch (e) {

    }
  })

  yield takeLatest(actionTypes.ADD_NEW_COMBO, function* (action) {
    const data = action.payload;
    try {
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/master/combo/new`, data)
      console.log(response)
      yield put(comboDispatch.newComboAdded(response.status))
      yield put(comboDispatch.loadAllCombo())
    }catch (e) {

    }
  })

  yield takeLatest(actionTypes.DELETE_COMBO, function* (action) {
    const id = action.payload;
    try {
      const {data: response} = yield axios.delete(`${productService}/api/v1/master/combo/delete/${id}`)
      console.log(response)
      yield put(comboDispatch.loadAllCombo())
    }catch (e) {

    }
  })
}
