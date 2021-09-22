import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";

const action = {
  LOAD_ALL_PRODUCT: 'LOAD_ALL_PRODUCT',
  ALL_PRODUCT_LOADED: 'ALL_PRODUCT_LOADED'
}

const initialState = {
  products: [],
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
    default:
      return {...state}
  }
}

export const productDispatch = {
  loadAllProduct: () => ({type: action.LOAD_ALL_PRODUCT}),
  allProductLoaded: (data) => ({type: action.ALL_PRODUCT_LOADED, payload: data})
}

export function* productSaga (){
  yield takeLatest(action.LOAD_ALL_PRODUCT, function* (action) {
    const {data: response} = yield axios.get(`https://pusanair-dev.xyz/product-service/api/v1/pusan/product/all`)
    console.log(response)
    yield put(productDispatch.allProductLoaded(response.data))

  })
}
