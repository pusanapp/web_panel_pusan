import {persistStore,persistReducer} from "redux-persist";
import {put, takeLatest} from "redux-saga/effects";
import storage from "redux-persist/lib/storage";

const actionType = {
  LOGIN : 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  ERROR: 'ERROR',
  LOGOUT: 'LOGOUT'
}

const initialState = {
  user: undefined,
  loginLoading: false,
  error: undefined
}
export const loginDispatch = {
  loginUser: (data) => ({type: actionType.LOGIN, payload:data}),
  loginSuccess: (data) =>({type: actionType.LOGIN_SUCCESS, payload: data}),
  error: (data) => ({type: actionType.ERROR, payload: data}),
  logout: () => ({type: actionType.LOGOUT})
}
export const loginReducer = persistReducer({
    storage,
    key: "pusan",
    whitelist: [
      "user",
    ],
  },(state = initialState, {type, payload}) => {
    switch (type){
      case actionType.LOGIN: {
        return {
          ...state,
          loginLoading: true
        }
      }
      case actionType.LOGIN_SUCCESS: {
        return {
          ...state,
          loginLoading: false,
          user: payload
        }
      }
      case actionType.LOGOUT:{
        return {
          ...state,
          user: undefined
        }
      }
      case actionType.ERROR: {
        return {
          ...state,
          error: payload
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

export function* userSaga (){
  yield takeLatest(actionType.LOGIN, function* (action) {
    const data = action.payload;
    if (data.username ==='admin' && data.password === 'admin'){
      console.log('berhasil')
      yield put(loginDispatch.loginSuccess(data))
    }else {
      console.log('gagal')
      yield put(loginDispatch.error('Login Gagal'))
    }
  })
}
