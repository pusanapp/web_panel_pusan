import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";

const actionType = {
  LOAD_PRODUCT_TYPE: 'LOAD_PRODUCT_TYPE',
  PRODUCT_TYPE_LOADED: 'PRODUCT_TYPE_LOADED',
  SAVE_PRODUCT_TYPE: 'SAVE_PRODUCT_TYPE',
  PRODUCT_TYPE_SAVED: 'PRODUCT_TYPE_SAVED',
  RESET_MASTER_STATE: 'RESET_MASTER_STATE',
  DELETE_PRODUCT_TYPE: 'DELETE_PRODUCT_TYPE',
  LOAD_PRODUCT_CATEGORY: 'LOAD_PRODUCT_CATEGORY',
  PRODUCT_CATEGORY_LOADED: 'PRODUCT_CATEGORY_LOADED',
  LOAD_PRODUCT_BRAND: 'LOAD_PRODUCT_BRAND',
  PRODUCT_BRAND_LOADED: 'PRODUCT_BRAND_LOADED'
}

const initialState = {
  types: [],
  categories: [],
  brands: [],
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
    case actionType.LOAD_PRODUCT_CATEGORY: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_CATEGORY_LOADED: {
      return {
        ...state,
        loading: false,
        categories: payload
      }
    }
    case actionType.LOAD_PRODUCT_BRAND: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_BRAND_LOADED: {
      return {
        ...state,
        loading: false,
        brands: payload
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
  deleteProductType: (id) =>({type: actionType.DELETE_PRODUCT_TYPE, payload: id}),
  loadProductCategory: () => ({type: actionType.LOAD_PRODUCT_CATEGORY}),
  productCategoryLoaded: (data) => ({type: actionType.PRODUCT_CATEGORY_LOADED, payload: data}),
  loadProductBrand: () => ({type: actionType.LOAD_PRODUCT_BRAND}),
  productBrandLoaded: (data) => ({type: actionType.PRODUCT_BRAND_LOADED, payload: data})
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

  yield takeLatest(actionType.LOAD_PRODUCT_CATEGORY, function* (action) {
    try{
      const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/category/all`)
      console.log(response)
      yield put(masterDispatch.productCategoryLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }


  })

  yield takeLatest(actionType.LOAD_PRODUCT_BRAND, function* (action) {
    try{
      const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/brand/all`)
      console.log(response)
      yield put(masterDispatch.productBrandLoaded(response.data))
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
