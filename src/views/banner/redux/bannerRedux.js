import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl, productService} from "../../../utils/globalUrl";

const actionTypes = {
  RESET_STATE: 'RESET_STATE',
  LOAD_ALL_BANNER: 'LOAD_ALL_BANNER',
  ALL_BANNER_LOADED: 'ALL_BANNER_LOADED',
  SAVE_NEW_BANNER: 'SAVE_NEW_BANNER',
  NEW_BANNER_SAVED: 'NEW_BANNER_SAVED',
  DELETE_BANNER: 'DELETE_BANNER',
  UPDATE_BANNER: 'UPDATE_BANNER',
  BANNER_UPDATED: 'BANNER_UPDATED',
  SHOW_ADD_BANNER_TOGGLE: 'SHOW_ADD_BANNER_TOGGLE',
  SHOW_EDIT_BANNER_TOGGLE: 'SHOW_EDIT_BANNER_TOGGLE',

  RESET_BANNER_STATUS: 'RESET_BANNER_STATUS',
}

const initialState = {
  banners: [],
  loading: false,
  success: false,
  message: '',
  error: false,
  addBannerVisibility: false,
  editBannerVisibility: false,
}

export const bannerReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.RESET_BANNER_STATUS: {
      return {
        ...state,
        status: false
      }
    }
    case actionTypes.SHOW_ADD_BANNER_TOGGLE: {
      return {
        ...state,
        addBannerVisibility: payload
      }
    }
    case actionTypes.SHOW_EDIT_BANNER_TOGGLE: {
      return {
        ...state,
        editBannerVisibility: payload
      }
    }
    case actionTypes.LOAD_ALL_BANNER: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.ALL_BANNER_LOADED: {
      return {
        ...state,
        loading: false,
        banners: payload
      }
    }
    case actionTypes.SAVE_NEW_BANNER: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.NEW_BANNER_SAVED: {
      return {
        ...state,
        loading: false,
        status: payload,
        addBannerVisibility: false,
      }
    }
    case actionTypes.UPDATE_BANNER: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.BANNER_UPDATED: {
      return {
        ...state,
        loading: false,
        status: payload,
        editBannerVisibility: false
      }
    }
    case actionTypes.RESET_STATE: {
      return {
        ...state,
        success: false
      }
    }
    default :
      return state
  }
}

export const bannerDispatch = {
  loadAllBanner: () => ({type: actionTypes.LOAD_ALL_BANNER}),
  allBannerLoaded: (data) => ({type: actionTypes.ALL_BANNER_LOADED, payload: data}),
  saveNewBanner: (data) => ({type: actionTypes.SAVE_NEW_BANNER, payload: data}),
  newBannerSaved: (data) => ({type: actionTypes.NEW_BANNER_SAVED, payload: data}),
  updateBanner: (data) => ({type: actionTypes.UPDATE_BANNER, payload: data}),
  bannerUpdated: (data) => ({type: actionTypes.BANNER_UPDATED, payload: data}),
  deleteBanner: (data) => ({type: actionTypes.DELETE_BANNER, payload: data}),
  showAddBannerToggle: (data) => ({type: actionTypes.SHOW_ADD_BANNER_TOGGLE, payload: data}),
  showEditBannerToggle: (data) => ({type: actionTypes.SHOW_EDIT_BANNER_TOGGLE, payload: data}),

  resetBannerStatus: () => ({type: actionTypes.RESET_BANNER_STATUS})
}

export function* bannerSaga() {
  yield takeLatest(actionTypes.LOAD_ALL_BANNER, function* () {
    try {
      const {data: response} = yield axios.get(`${globalUrl.productService}/api/v1/banner/all`)
      yield put(bannerDispatch.allBannerLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.SAVE_NEW_BANNER, function* (action){
    const data = action.payload;
    const image = data.image;
    const banner = data.banner;
    try {
      const {data: responseUpload} = yield axios.post(`https://pusanair-dev.xyz/assets-service/banner/upload`, image)
      console.log(responseUpload)
      banner.image_url = responseUpload.data[0]
      const {data: response} = yield axios.post(`${globalUrl.productService}/api/v1/banner/create`, banner)
      console.log(response)
      yield put(bannerDispatch.newBannerSaved(response.status))
      yield put(bannerDispatch.loadAllBanner())

    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.DELETE_BANNER, function* (action) {
    const id= action.payload;
    try{
      const {data: response} = yield axios.delete(`${productService}/api/v1/banner/delete/${id}`)
      console.log(response)
      yield put(bannerDispatch.loadAllBanner())
    }catch (e) {

    }
  })

  yield takeLatest(actionTypes.UPDATE_BANNER, function* (action) {
    const data = action.payload;
    try {
      yield put(bannerDispatch.bannerUpdated())
    }catch (e) {

    }
  })
}
