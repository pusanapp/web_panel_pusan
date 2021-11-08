import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import * as tes from './tesRedux'
import * as product from '../views/product/redux/productRedux'
import * as user from '../views/pages/login/loginRedux'
import {changeState} from "../store";
import * as master from '../views/master/redux/masterRedux'
import * as transaction from '../views/transaction/redux/transactionRedux'
import * as discount from '../views/product/redux/discountRedux'
import * as banner from '../views/banner/redux/bannerRedux'
import * as combo from '../views/product/redux/comboRedux'
// import * as tes from './tes/testRedux'


export const rootReducer = combineReducers({
  tes: tes.testReducer,
  sidebar: changeState,
  product: product.productReducer,
  user: user.loginReducer,
  master: master.masterReducer,
  transaction: transaction.transactionReducer,
  discount: discount.discountReducer,
  banner: banner.bannerReducer,
  combo: combo.comboReducer
})

export function* rootSaga() {
  yield all([
    tes.tesSaga(),
    product.productSaga(),
    user.userSaga(),
    master.masterSaga(),
    transaction.transactionSaga(),
    discount.discountSaga(),
    banner.bannerSaga(),
    combo.comboSaga()
  ])
}
