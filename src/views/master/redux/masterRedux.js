import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";

const actionType = {
  LOAD_PRODUCT_TYPE: 'LOAD_PRODUCT_TYPE',
  PRODUCT_TYPE_LOADED: 'PRODUCT_TYPE_LOADED',
  SAVE_PRODUCT_TYPE: 'SAVE_PRODUCT_TYPE',
  PRODUCT_TYPE_SAVED: 'PRODUCT_TYPE_SAVED',
  RESET_MASTER_STATE: 'RESET_MASTER_STATE',
  DELETE_PRODUCT_TYPE: 'DELETE_PRODUCT_TYPE'
}

const initialState = {
  types: [],
  loading: false,
  status: false
}
export const masterReducer = (state = initialState, {type, payload})=>{
  switch (type){
    case actionType.LOAD_PRODUCT_TYPE: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_TYPE_LOADED: {
      return {
        ...state,
        loading: false,
        types: payload
      }
    }
    case actionType.SAVE_PRODUCT_TYPE: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_TYPE_SAVED: {
      return {
        ...state,
        loading: false,
        status: payload
      }
    }
    case actionType.RESET_MASTER_STATE: {
      return {
        ...state,
        loading: false,
        types: [],
        status: false
      }
    }
    default:
      return {
        ...state
      }
  }
}

export const masterDispatch = {
  loadProductType: () =>({type: actionType.LOAD_PRODUCT_TYPE}),
  productTypeLoaded: (data) =>({type: actionType.PRODUCT_TYPE_LOADED, payload: data}),
  saveProductType: (data) => ({type: actionType.SAVE_PRODUCT_TYPE, payload: data}),
  productTypeSaved: (data) => ({type: actionType.PRODUCT_TYPE_SAVED, payload: data}),
  resetMasterState: () =>({type: actionType.RESET_MASTER_STATE}),
  deleteProductType: (id) =>({type: actionType.DELETE_PRODUCT_TYPE, payload: id})
}

export function* masterSaga (){
  yield takeLatest(actionType.LOAD_PRODUCT_TYPE, function* (action) {
    try{
      const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/type/all`)
      console.log(response)
      yield put(masterDispatch.productTypeLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }


  })

  yield takeLatest(actionType.SAVE_PRODUCT_TYPE, function* (action) {
    try {
      const data = action.payload
      const {data: response} = yield axios.post(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/type/add`,data)
      console.log(response)
      yield put(masterDispatch.productTypeSaved(response.status))
      yield put(masterDispatch.resetMasterState())
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionType.DELETE_PRODUCT_TYPE, function* (action) {
    const id = action.payload;
    console.log(id)
    try {
      const {data: response} = yield axios.delete(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/type/delete/${id}`)
      console.log(response)
      yield put(masterDispatch.loadProductType())
    }catch (e) {
      console.log(e.response)
    }
  })
}
