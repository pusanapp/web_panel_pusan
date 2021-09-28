import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";

const action = {
  LOAD_ALL_PRODUCT: 'LOAD_ALL_PRODUCT',
  ALL_PRODUCT_LOADED: 'ALL_PRODUCT_LOADED',
  LOAD_HAFARA_PRODUCT: 'LOAD_HAFARA_PRODUCT',
  HAFARA_PRODUCT_LOADED: 'HAFARA_PRODUCT_LOADED'
}

const initialState = {
  products: [],
  hafara: [],
  loading: true
}

export const productReducer = (state=initialState, {type, payload}) =>{
  switch (type){
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
    default:
      return {...state}
  }
}

export const productDispatch = {
  loadAllProduct: () => ({type: action.LOAD_ALL_PRODUCT}),
  allProductLoaded: (data) => ({type: action.ALL_PRODUCT_LOADED, payload: data}),
  loadHafaraProduct : () => ({type: action.LOAD_HAFARA_PRODUCT}),
  hafaraProductLoaded : (data) => ({type: action.HAFARA_PRODUCT_LOADED, payload: data})
}

export function* productSaga (){
  yield takeLatest(action.LOAD_ALL_PRODUCT, function* (action) {
    const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all`)
        console.log(response)
    // console.log(response2)
    yield put(productDispatch.allProductLoaded(response.data))

  })
  yield takeLatest(action.LOAD_HAFARA_PRODUCT, function* (action) {
    // const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all`)
    const {data: response2} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all/hafara`)
    // console.log(response)
    console.log(response2)
    yield put(productDispatch.hafaraProductLoaded(response2.data))

  })
}
