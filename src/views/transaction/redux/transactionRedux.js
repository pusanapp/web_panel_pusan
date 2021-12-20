import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {globalUrl} from "../../../utils/globalUrl";
import {func} from "prop-types";

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
  FINISH_TRANSACTION_SUCCESS: 'FINISH_TRANSACTION_SUCCESS',
  RESET_FINISH_STATE: 'RESET_FINISH_STATE',
  TRACK_DELIVERY: 'TRACK_DELIVERY',
  TRACK_DELIVERY_DONE: 'TRACK_DELIVERY_DONE',
  RESET_TRACKING_STATE: 'RESET_TRACKING_STATE',
  CHECK_HAS_FINISH: 'CHECK_HAS_FINISH',
  CHECK_HAS_FINISH_DONE: 'CHECK_HAS_FINISH_DONE'
}

const initialState = {
  transactions: [],
  tracking_status: false,
  tracking_data: undefined,
  tracking_loading: false,
  finish_status: false,
  has_done: true,
  has_done_loading: false,
  new_orders: [],
  done_transactions: [],
  on_process_transactions: [],
  status: false,
  loading: false
}

export const transactionReducer = (state = initialState, {type,payload}) =>{
  switch (type){
    case actionType.TRACK_DELIVERY: {
      return {
        ...state,
        tracking_loading: true,
      }
    }
    case actionType.TRACK_DELIVERY_DONE: {
      return {
        ...state,
        tracking_loading: false,
        tracking_data: payload.data,
        tracking_status: payload.status
      }
    }
    case actionType.RESET_TRACKING_STATE: {
      return{
        ...state,
        tracking_status: false,
        tracking_data: undefined,
        tracking_loading: false,
        has_done: true,
      }
    }
    case actionType.FINISH_TRANSACTION_SUCCESS: {
      return {
        ...state,
        finish_status: payload
      }
    }
    case actionType.RESET_FINISH_STATE: {
      return {
        ...state,
        finish_status: false
      }
    }
    case actionType.CHECK_HAS_FINISH: {
      return {
        ...state,
        has_done_loading: true
      }
    }
    case actionType.CHECK_HAS_FINISH_DONE: {
      return {
        ...state,
        has_done: payload,
        has_done_loading: false
      }
    }
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
    case actionType.ORDER_CONFIRMATION: {
      return {
        ...state,
      }
    }
    case actionType.ORDER_CONFIRMATION_SUCCESS:{
      return {
        ...state
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
  orderConfirmation: (data) =>({type: actionType.ORDER_CONFIRMATION, payload: data}),
  orderConfirmationSuccess: (data) => ({type: actionType.ORDER_CONFIRMATION_SUCCESS}),
  inputResi: (data) =>({type: actionType.INPUT_RESI, payload: data}),
  inputResiSuccess: (data) =>({type: actionType.INPUT_RESI_SUCCESS}),
  trackDelivery: (data) => ({type: actionType.TRACK_DELIVERY, payload: data}),
  trackDeliveryDone: (data) => ({type: actionType.TRACK_DELIVERY_DONE, payload: data}),
  resetTrackingState: () => ({type: actionType.RESET_TRACKING_STATE}),
  finishTransaction: (data) => ({type: actionType.FINISH_TRANSACTION, payload: data}),
  finishTransactionSuccess: (data) => ({type: actionType.FINISH_TRANSACTION_SUCCESS, payload: data}),
  resetFinishState: () => ({type: actionType.RESET_FINISH_STATE}),
  checkHasFinish: (data) => ({type: actionType.CHECK_HAS_FINISH, payload: data}),
  checkHasFinishDone: (data) => ({type: actionType.CHECK_HAS_FINISH_DONE, payload: data})
}

export function* transactionSaga (){
  yield takeLatest(actionType.TRACK_DELIVERY, function* ({payload}) {
    console.log('payload, ',payload)
    console.log(`${globalUrl.transactionService}/api/v1/waybill/track/${payload.service}/${payload.waybill}`)
    const {data: response} = yield axios.get(`https://pusanair-dev.xyz/transaction-service/api/v1/waybill/track/${payload.service}/${payload.waybill}`)
    console.log(response)
    yield put(transactionDispatch.trackDeliveryDone(response))

  })
  yield takeLatest(actionType.FINISH_TRANSACTION, function* ({payload}) {
    const data =
    {
      status: "complete",
      user: "pusan"
    }
    const {data: response} = yield axios.post(`${globalUrl.transactionService}/api/v1/transaction/done/confirmation/transaction/${payload}`, data)
    console.log(response)
    yield put(transactionDispatch.finishTransactionSuccess(response.status))
  })
  yield takeLatest(actionType.CHECK_HAS_FINISH,function* ({payload}){
    const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/has-done/confirmation/${payload}/pusan`)
    console.log(response)
    yield put(transactionDispatch.checkHasFinishDone(response.status))
  })
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
      const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/paid/all`)
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
      const {data: response} = yield axios.get(`${globalUrl.transactionService}/api/v1/transaction/on-process/all`)
      console.log(response)
      yield put(transactionDispatch.onProcessTransactionLoaded(response.data))
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.ORDER_CONFIRMATION, function* (action) {
    const id = action.payload;
    try{
      const {data: response} = yield axios.post(`${globalUrl.transactionService}/api/v1/transaction/confirm/order/${id}`)
      console.log(response)
      yield put(transactionDispatch.orderConfirmationSuccess(response.message))
      yield put(transactionDispatch.loadNewOrder())
    }catch (e) {
      console.log(e.response)
    }
  })
  yield takeLatest(actionType.INPUT_RESI, function* (action) {
    const id = action.payload.id;
    const data = action.payload.data;
    try{
      const {data: response} = yield axios.post(`${globalUrl.transactionService}/api/v1/transaction/input-resi/order/${id}`, data)
      console.log(response)
      yield put(transactionDispatch.inputResiSuccess(response.message))
      yield put(transactionDispatch.loadOnProcessTransaction())
    }catch (e) {
      console.log(e.response)
    }
  })
}

