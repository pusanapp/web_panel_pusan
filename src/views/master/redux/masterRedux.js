import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl} from "../../../utils/globalUrl";

const actionType = {
  RESET_MASTER_STATE: 'RESET_MASTER_STATE',


  LOAD_PRODUCT_TYPE: 'LOAD_PRODUCT_TYPE',
  PRODUCT_TYPE_LOADED: 'PRODUCT_TYPE_LOADED',
  SAVE_PRODUCT_TYPE: 'SAVE_PRODUCT_TYPE',
  PRODUCT_TYPE_SAVED: 'PRODUCT_TYPE_SAVED',
  DELETE_PRODUCT_TYPE: 'DELETE_PRODUCT_TYPE',
  UPDATE_PRODUCT_TYPE: 'UPDATE_PRODUCT_TYPE',
  PRODUCT_TYPE_UPDATED: 'PRODUCT_TYPE_UPDATED',

  LOAD_PRODUCT_CATEGORY: 'LOAD_PRODUCT_CATEGORY',
  PRODUCT_CATEGORY_LOADED: 'PRODUCT_CATEGORY_LOADED',
  SAVE_PRODUCT_CATEGORY: 'SAVE_PRODUCT_CATEGORY',
  PRODUCT_CATEGORY_SAVED: 'PRODUCT_CATEGORY_SAVED',
  UPDATE_PRODUCT_CATEGORY: 'UPDATE_PRODUCT_CATEGORY',
  PRODUCT_CATEGORY_UPDATED: 'PRODUCT_CATEGORY_UPDATED' ,
  DELETE_PRODUCT_CATEGORY: 'DELETE_PRODUCT_CATEGORY' ,

  LOAD_PRODUCT_BRAND: 'LOAD_PRODUCT_BRAND',
  PRODUCT_BRAND_LOADED: 'PRODUCT_BRAND_LOADED',
  SAVE_PRODUCT_BRAND: 'SAVE_PRODUCT_BRAND',
  PRODUCT_BRAND_SAVED: 'PRODUCT_BRAND_SAVED',
  UPDATE_PRODUCT_BRAND: 'UPDATE_PRODUCT_BRAND',
  PRODUCT_BRAND_UPDATED: 'PRODUCT_BRAND_UPDATED' ,
  DELETE_PRODUCT_BRAND: 'DELETE_PRODUCT_BRAND' ,
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
    case actionType.RESET_MASTER_STATE: {
      return {
        ...state,
        ...initialState
      }
    }

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
    case actionType.UPDATE_PRODUCT_TYPE: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_TYPE_UPDATED: {
      return {
        ...state,
        loading: false
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
    case actionType.SAVE_PRODUCT_CATEGORY: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_CATEGORY_SAVED: {
      return {
        ...state,
        loading: false,
        status: payload
      }
    }
    case actionType.UPDATE_PRODUCT_CATEGORY: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_CATEGORY_UPDATED: {
      return {
        ...state,
        loading: false
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
    case actionType.SAVE_PRODUCT_BRAND: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_BRAND_SAVED: {
      return {
        ...state,
        loading: false,
        status: payload
      }
    }
    case actionType.UPDATE_PRODUCT_BRAND: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.PRODUCT_BRAND_UPDATED: {
      return {
        ...state,
        loading: false
      }
    }
    default:
      return {
        ...state
      }
  }
}

export const masterDispatch = {
  resetMasterState: () =>({type: actionType.RESET_MASTER_STATE}),


  loadProductType: () =>({type: actionType.LOAD_PRODUCT_TYPE}),
  productTypeLoaded: (data) =>({type: actionType.PRODUCT_TYPE_LOADED, payload: data}),
  saveProductType: (data) => ({type: actionType.SAVE_PRODUCT_TYPE, payload: data}),
  productTypeSaved: (data) => ({type: actionType.PRODUCT_TYPE_SAVED, payload: data}),
  deleteProductType: (id) =>({type: actionType.DELETE_PRODUCT_TYPE, payload: id}),
  updateProductType: (data) => ({type: actionType.UPDATE_PRODUCT_TYPE, payload: data}),
  productTypeUpdated: (data) => ({type: actionType.PRODUCT_TYPE_UPDATED, payload: data}),

  loadProductCategory: () => ({type: actionType.LOAD_PRODUCT_CATEGORY}),
  productCategoryLoaded: (data) => ({type: actionType.PRODUCT_CATEGORY_LOADED, payload: data}),
  saveProductCategory: (data) => ({type: actionType.SAVE_PRODUCT_CATEGORY, payload: data}),
  productCategorySaved: (data) => ({type: actionType.PRODUCT_CATEGORY_SAVED, payload: data}),
  deleteProductCategory: (id) =>({type: actionType.DELETE_PRODUCT_CATEGORY, payload: id}),
  updateProductCategory: (data) => ({type: actionType.UPDATE_PRODUCT_CATEGORY, payload: data}),
  productCategoryUpdated: (data) => ({type: actionType.PRODUCT_CATEGORY_UPDATED, payload: data}),

  loadProductBrand: () => ({type: actionType.LOAD_PRODUCT_BRAND}),
  productBrandLoaded: (data) => ({type: actionType.PRODUCT_BRAND_LOADED, payload: data}),
  saveProductBrand: (data) => ({type: actionType.SAVE_PRODUCT_BRAND, payload: data}),
  productBrandSaved: (data) => ({type: actionType.PRODUCT_BRAND_SAVED, payload: data}),
  deleteProductBrand: (id) =>({type: actionType.DELETE_PRODUCT_BRAND, payload: id}),
  updateProductBrand: (data) => ({type: actionType.UPDATE_PRODUCT_BRAND, payload: data}),
  productBrandUpdated: (data) => ({type: actionType.PRODUCT_BRAND_UPDATED, payload: data}),
}

export function* masterSaga (){
  yield takeLatest(actionType.LOAD_PRODUCT_TYPE, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/pusan/product/type/all`)
      console.log(response)
      yield put(masterDispatch.productTypeLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }


  })
  yield takeLatest(actionType.SAVE_PRODUCT_TYPE, function* (action) {
    try {
      const data = action.payload
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/pusan/product/type/add`,data)
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
      const {data: response} = yield axios.delete(`${globalUrl.productService}/api/v1/pusan/product/type/delete/${id}`)
      console.log(response)
      yield put(masterDispatch.loadProductType())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.UPDATE_PRODUCT_TYPE, function* (action) {
    const data = action.payload.data;
    try{
      const {data: response} = yield axios.put(`${globalUrl.productService}/api/v1/pusan/product/type/update/${data.id}`, data)
      console.log(response)
      yield put(masterDispatch.productTypeUpdated())
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionType.LOAD_PRODUCT_CATEGORY, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/pusan/product/category/all`)
      console.log(response)
      yield put(masterDispatch.productCategoryLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.SAVE_PRODUCT_CATEGORY, function* (action) {
    try {
      const data = action.payload
      const category = data.category
      const icon = data.icon
      const {data: response1} = yield axios.post(`https://pusanair-dev.xyz/assets-service/icon/upload`, icon)
      console.log(response1)
      category.icon_url = response1.data[0]
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/pusan/product/category/add`, category)
      console.log(response)
      yield put(masterDispatch.productCategorySaved(response.status))
      yield put(masterDispatch.resetMasterState())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.DELETE_PRODUCT_CATEGORY, function* (action) {
    const id = action.payload;
    console.log(id)
    try {
      const {data: response} = yield axios.delete(`${globalUrl.productService}/api/v1/pusan/product/category/delete/${id}`)
      console.log(response)
      yield put(masterDispatch.loadProductCategory())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.UPDATE_PRODUCT_CATEGORY, function* (action) {
    const data = action.payload.data;
    try{
      const {data: response} = yield axios.put(`${globalUrl.productService}/api/v1/pusan/product/category/update/${data.id}`, data)
      console.log(response)
      yield put(masterDispatch.productCategoryUpdated())
    }catch (e) {
      console.log(e.response)
    }
  })


  yield takeLatest(actionType.LOAD_PRODUCT_BRAND, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/pusan/product/brand/all`)
      console.log(response)
      yield put(masterDispatch.productBrandLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }


  })
  yield takeLatest(actionType.SAVE_PRODUCT_BRAND, function* (action) {
    try {
      const data = action.payload
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/pusan/product/brand/add`,data)
      console.log(response)
      yield put(masterDispatch.productBrandSaved(response.status))
      yield put(masterDispatch.resetMasterState())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.DELETE_PRODUCT_BRAND, function* (action) {
    const id = action.payload;
    console.log(id)
    try {
      const {data: response} = yield axios.delete(`${globalUrl.productService}/api/v1/pusan/product/brand/delete/${id}`)
      console.log(response)
      yield put(masterDispatch.loadProductBrand())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.UPDATE_PRODUCT_BRAND, function* (action) {
    const data = action.payload.data;
    try{
      const {data: response} = yield axios.put(`${globalUrl.productService}/api/v1/pusan/product/brand/update/${data.id}`,data)
      console.log(response)
      yield put(masterDispatch.productBrandUpdated())
    }catch (e) {
      console.log(e.response)
    }
  })
}
