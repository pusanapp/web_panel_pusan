import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {act} from "react-dom/test-utils";
import {globalUrl} from "../../../utils/globalUrl";

const action = {
  RESET_PRODUCT_STATE: 'RESET_PRODUCT_STATE',
  PRODUCT_ERROR: 'PRODUCT_ERROR',

  LOAD_ALL_PRODUCT: 'LOAD_ALL_PRODUCT',
  ALL_PRODUCT_LOADED: 'ALL_PRODUCT_LOADED',
  LOAD_HAFARA_PRODUCT: 'LOAD_HAFARA_PRODUCT',
  HAFARA_PRODUCT_LOADED: 'HAFARA_PRODUCT_LOADED',

  SAVE_NEW_PRODUCT: 'SAVE_NEW_PRODUCT',
  NEW_PRODUCT_SAVED: 'NEW_PRODUCT_SAVED' ,

  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  PRODUCT_UPDATED: 'PRODUCT_UPDATED' ,
  DELETE_PRODUCT: 'DELETE_PRODUCT',

  LOAD_PRODUCT_BY_ID: 'LOAD_PRODUCT_BY_ID',
  PRODUCT_BY_ID_LOADED: 'PRODUCT_BY_ID_LOADED'
}

const initialState = {
  products: [],
  hafara: [],
  loading: false,
  status: false,
  error: '',
  product: {}
}

export const productReducer = (state=initialState, {type, payload}) =>{
  switch (type){
    case action.RESET_PRODUCT_STATE: {
      return {
        ...state,
        ...initialState
      }
    }
    case action.PRODUCT_ERROR: {
      return {
        ...state,
        error: payload
      }
    }
    case action.LOAD_ALL_PRODUCT: {
      return {
        ...state,
        loading: true,
      }
    }
    case action.ALL_PRODUCT_LOADED: {
      return {
        ...state,
        loading: false,
        products: payload
      }
    }
    case action.LOAD_HAFARA_PRODUCT: {
      return {
        ...state,
        loading: true,
      }
    }
    case action.HAFARA_PRODUCT_LOADED: {
      return {
        ...state,
        loading: false,
        hafara: payload
      }
    }
    case action.SAVE_NEW_PRODUCT: {
      return {
        ...state,
        loading: true
      }
    }
    case action.NEW_PRODUCT_SAVED: {
      return {
        ...state,
        loading: false,
        status: payload
      }
    }
    case action.UPDATE_PRODUCT: {
      return {
        ...state,
        loading: true
      }
    }
    case action.PRODUCT_UPDATED: {
      return {
        ...state,
        loading: false,
        status: payload
      }
    }
    case action.LOAD_PRODUCT_BY_ID: {
      return {
        ...state,
        loading: true,
      }
    }
    case action.PRODUCT_BY_ID_LOADED: {
      return {
        ...state,
        loading: false,
        product: payload
      }
    }
    default:
      return {...state}
  }
}

export const productDispatch = {
  loadAllProduct: () => ({type: action.LOAD_ALL_PRODUCT}),
  allProductLoaded: (data) => ({type: action.ALL_PRODUCT_LOADED, payload: data}),
  loadHafaraProduct : () => ({type: action.LOAD_HAFARA_PRODUCT}),
  hafaraProductLoaded : (data) => ({type: action.HAFARA_PRODUCT_LOADED, payload: data}),
  resetProductState: () => ({type: action.RESET_PRODUCT_STATE}),
  saveNewProduct: (data) =>({type: action.SAVE_NEW_PRODUCT, payload: data}),
  newProductSaved: (data) =>({type: action.NEW_PRODUCT_SAVED, payload: data}),
  updateProduct:(data)=>({type: action.UPDATE_PRODUCT, payload:data}),
  productUpdated: (data) => ({type: action.PRODUCT_UPDATED, payload: data}),
  deleteProduct: (data) => ({type: action.DELETE_PRODUCT, payload: data}),
  productError: (data) => ({type: action.PRODUCT_ERROR, payload: data}),
  loadProductById: (data) => ({type: action.LOAD_PRODUCT_BY_ID, payload: data}),
  productByIdLoaded: (data) => ({type: action.PRODUCT_BY_ID_LOADED, payload: data})
}

export function* productSaga (){
  yield takeLatest(action.LOAD_ALL_PRODUCT, function* (action) {
    try {
      const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all`)
      console.log(response)
      // console.log(response2)
      yield put(productDispatch.allProductLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }


  })
  yield takeLatest(action.LOAD_HAFARA_PRODUCT, function* (action) {
    try {
      const {data: response2} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all/hafara`)
      // console.log(response)
      console.log(response2)
      yield put(productDispatch.hafaraProductLoaded(response2.data))
    }catch (e) {
      console.log(e.response)
    }
    // const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all`)


  })
  yield takeLatest(action.SAVE_NEW_PRODUCT, function* (action) {
    const data = action.payload;
    const images = data.images;
    const product = data.product;
    try {
      const {data: responseImage} = yield axios.post(`https://pusanair-dev.xyz/assets-service/image/upload`,images)
      console.log(responseImage)
      product.images = responseImage.data
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/pusan/product/add`, product)
      console.log(response)
      if(response.status){
        yield put(productDispatch.newProductSaved(response.status))
      }else {
        yield put(productDispatch.productError(response.message))
      }
      yield put(productDispatch.resetProductState())
    }catch (err){
      console.log(err.response)
      yield put(productDispatch.productError(err.message))
    }
  })
  yield takeLatest(action.UPDATE_PRODUCT, function* (action) {
    const data = action.payload;
    try {

    }catch (err){
      console.log(err.response)
      yield put(productDispatch.productError(err.message))
    }
  })
  yield takeLatest(action.DELETE_PRODUCT, function* (action) {
    const id = action.payload;
    try {
      const {data: response} = yield axios.delete(`${globalUrl.productService}/api/v1/pusan/product/delete/${id}`)
      console.log(response)
      yield put(productDispatch.loadAllProduct())
    }catch (err){
      console.log(err.response)
      yield put(productDispatch.productError(err.message))
    }
  })

  yield takeLatest(action.LOAD_PRODUCT_BY_ID, function* ({payload}) {
    try {
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/pusan/product/find/${payload}`)
      console.log(response)
      yield put(productDispatch.productByIdLoaded(response.data))
    }catch (err){
      console.log(err.response)
      yield put(productDispatch.productError(err.message))
    }
  })
}
