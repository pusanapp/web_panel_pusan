import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl} from "../../../utils/globalUrl";

const actionType = {
  LOAD_ALL_TRANSACTION: 'LOAD_ALL_TRANSACTION',
  ALL_TRANSACTION_LOADED: 'ALL_TRANSACTION_LOADED',
  LOAD_NEW_ORDER: 'LOAD_NEW_ORDER',
  NEW_ORDER_LOADED: 'NEW_ORDER_LOADED',
  LOAD_DONE_TRANSACTION: 'LOAD_DONE_TRANSACTION',
  DONE_TRANSACTION_LOADED: 'DONE_TRANSACTION_LOADED',
  LOAD_ON_PROCESS_TRANSACTION: 'LOAD_ON_PROCESS_TRANSACTION',
  ON_PROCESS_TRANSACTION_LOADED: 'ON_PROCESS_TRANSACTION_LOADED',
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
  ORDER_CONFIRMATION_SUCCESS: 'ORDER_CONFIRMATION_SUCCESS',
  INPUT_RESI: 'INPUT_RESI',
  INPUT_RESI_SUCCESS: 'INPUT_RESI_SUCCESS',
  FINISH_TRANSACTION: 'FINISH_TRANSACTION',
  FINISH_TRANSACTION_SUCCESS: 'FINISH_TRANSACTION_SUCCESS'

}

const initialState = {
  transactions: [],
  new_orders: [],
  done_transactions: [],
  on_process_transactions: [],
  status: false,
  loading: false
}

export const transactionReducer = (state = initialState, {type,payload}) =>{
  switch (type){
    case actionType.LOAD_ALL_TRANSACTION: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.ALL_TRANSACTION_LOADED: {
      return {
        ...state,
        loading: false,
        transactions: payload
      }
    }
    case actionType.LOAD_DONE_TRANSACTION: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.DONE_TRANSACTION_LOADED: {
      return {
        ...state,
        loading: false,
        done_transactions: payload
      }
    }
    case actionType.LOAD_NEW_ORDER: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.NEW_ORDER_LOADED: {
      return {
        ...state,
        loading: false,
        new_orders: payload
      }
    }
    case actionType.LOAD_ON_PROCESS_TRANSACTION: {
      return {
        ...state,
        loading: true
      }
    }
    case actionType.ON_PROCESS_TRANSACTION_LOADED: {
      return {
        ...state,
        loading: false,
        on_process_transactions: payload
      }
    }
    default:
      return {
        ...state
      }
  }
}

export const transactionDispatch = {
  loadAllTransaction: () =>({type: actionType.LOAD_ALL_TRANSACTION}),
  allTransactionLoaded: (data) =>({type: actionType.ALL_TRANSACTION_LOADED, payload: data}),
  loadNewOrder: () =>({type: actionType.LOAD_NEW_ORDER}),
  newOrderLoaded: (data) =>({type: actionType.NEW_ORDER_LOADED, payload: data}),
  loadDoneTransaction: () =>({type: actionType.LOAD_DONE_TRANSACTION}),
  doneTransactionLoaded: (data) =>({type: actionType.DONE_TRANSACTION_LOADED, payload: data}),
  loadOnProcessTransaction: () =>({type: actionType.LOAD_ON_PROCESS_TRANSACTION}),
  onProcessTransactionLoaded: (data) =>({type: actionType.ON_PROCESS_TRANSACTION_LOADED, payload: data}),

}

export function* transactionSaga (){
  yield takeLatest(actionType.LOAD_ALL_TRANSACTION, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/all/`)
      console.log(response)
      yield put(transactionDispatch.allTransactionLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.LOAD_NEW_ORDER, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/new/all`)
      console.log(response)
      yield put(transactionDispatch.newOrderLoaded(response.data))

    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.LOAD_DONE_TRANSACTION, function* (action) {
    try{
      const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/done/all`)
      console.log(response)
      yield put(transactionDispatch.doneTransactionLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.LOAD_ON_PROCESS_TRANSACTION, function* (action) {
    try{
      const {data: response} = yield axios.get(`h${globalUrl.transactionService}/api/v1/transaction/on-process/all`)
      console.log(response)
      yield put(transactionDispatch.onProcessTransactionLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })
}

