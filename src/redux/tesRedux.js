import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeLatest, call, put } from "redux-saga/effects";

const initialState = {
    tes: ''
}
export const tesAction = {
    tes: () => ({type: 'TES'})
}
export const testReducer = persistReducer({
        storage,
        key: "pusan",
        whitelist: [
            "user","tes"
        ],
    },(state = initialState, action) => {
        switch (action.type){
            case 'TES': {
                return {
                    ...state,
                    tes: 'Haiiii'
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

export function* tesSaga (){
    yield takeLatest('TES', function* (action) {
        console.log('CALL TES SAGA')
    })
}
