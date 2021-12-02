import {persistStore, persistReducer} from "redux-persist";
import {put, takeLatest} from "redux-saga/effects";
import storage from "redux-persist/lib/storage";
import axios from "axios";
import {userService, userServiceLocal} from "../../../utils/globalUrl";


const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  ERROR: 'ERROR',
  LOGOUT: 'LOGOUT',

  LOAD_ALL_PANEL_USERS: 'LOAD_ALL_PANEL_USERS',
  ALL_PANEL_USERS_LOADED: 'ALL_PANEL_USERS_LOADED',
  LOAD_ALL_APPS_USERS: 'LOAD_ALL_APPS_USERS',
  ALL_APPS_USERS_LOADED: 'ALL_APPS_USERS_LOADED',
  UPDATE_PANEL_USER: 'UPDATE_PANEL_USER',
  PANEL_USER_UPDATED: 'PANEL_USER_UPDATED',
  UPDATE_APPS_USER: 'UPDATE_APPS_USER',
  APPS_USER_UPDATED: 'APPS_USER_UPDATED',
  ADD_PANEL_USER: 'ADD_PANEL_USER',
  PANEL_USER_ADDED: 'PANEL_USER_ADDED',
  DELETE_PANEL_USER: 'DELETE_PANEL_USER',
  PANEL_USER_DELETED: 'PANEL_USER_DELETED',
  DELETE_APPS_USER: 'DELETE_APPS_USER',
  APPS_USER_DELETED: 'APPS_USER_DELETED'
}

const initialState = {
  user: undefined,
  loginLoading: false,
  error: undefined,
  loading: false,
  appUsers: [],
  panelUsers: []
}
export const userDispatch = {
  loginUser: (data) => ({type: actionTypes.LOGIN, payload: data}),
  loginSuccess: (data) => ({type: actionTypes.LOGIN_SUCCESS, payload: data}),
  error: (data) => ({type: actionTypes.ERROR, payload: data}),
  logout: () => ({type: actionTypes.LOGOUT}),
  loadAllPanelUsers: () => ({type: actionTypes.LOAD_ALL_PANEL_USERS}),
  allPanelUsersLoaded: (data) => ({type: actionTypes.ALL_PANEL_USERS_LOADED, payload: data}),
  loadAllAppsUsers: () => ({type: actionTypes.LOAD_ALL_APPS_USERS}),
  allAppsUsersLoaded: (data) => ({type: actionTypes.ALL_APPS_USERS_LOADED, payload: data}),
  addPanelUser: (data) => ({type: actionTypes.ADD_PANEL_USER, payload: data})
}
export const loginReducer = persistReducer({
    storage,
    key: "pusan",
    whitelist: [
      "user",
    ],
  }, (state = initialState, {type, payload}) => {
    switch (type) {
      case actionTypes.LOGIN: {
        return {
          ...state,
          loginLoading: true
        }
      }
      case actionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          loginLoading: false,
          user: payload
        }
      }
      case actionTypes.LOGOUT: {
        return {
          ...state,
          user: undefined
        }
      }
      case actionTypes.ERROR: {
        return {
          ...state,
          error: payload
        }
      }

      case actionTypes.ADD_PANEL_USER: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.PANEL_USER_ADDED: {
        return {
          ...state,
          loading: false,
          status: payload
        }
      }
      case actionTypes.LOAD_ALL_PANEL_USERS: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.ALL_PANEL_USERS_LOADED: {
        return {
          ...state,
          loading: false,
          panelUsers: payload
        }
      }
      case actionTypes.LOAD_ALL_APPS_USERS: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.ALL_APPS_USERS_LOADED: {
        return {
          ...state,
          loading: false,
          appUsers: payload
        }
      }
      default: {
        return {
          ...state,
        }
      }

    }
  }
)

export function* userSaga() {
  yield takeLatest(actionTypes.LOGIN, function* (action) {
    console.log('login', data)
    const data = action.payload;
    try {
      const {data: response} = yield axios.post(`${userService}/api/v1/panel-user/login`, data)
      console.log(response)
      yield put(userDispatch.loginSuccess(response.data))

    } catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.LOAD_ALL_PANEL_USERS, function* () {
    try {
      const {data: response} = yield axios.get(`${userService}/api/v1/panel-user/all`)
      console.log(response)
      yield put(userDispatch.allPanelUsersLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.LOAD_ALL_APPS_USERS, function* (){
    try {
      const {data: response} = yield axios.get(`${userService}/api/v1/user/all`)
      console.log(response)
      yield put(userDispatch.allAppsUsersLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })

  yield takeLatest(actionTypes.ADD_PANEL_USER, function* ({payload}) {
    try {
      const {data: response} = yield axios.post(`${userService}/api/v1/panel-user/add`, payload)
      console.log(response)
      yield put(userDispatch.loadAllPanelUsers())
    }catch (e) {
      console.log(e.response)
    }

  })
}
