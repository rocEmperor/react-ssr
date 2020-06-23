import { all, takeEvery, put, call } from 'redux-saga/effects';

const initState = {
    name: 'home',
    age: ''
};
const nameSpace = 'homeModel';

export default {
    nameSpace: nameSpace,
    reducer: function (state = initState, action) {
        switch (action.type) {
        case `${nameSpace}/save`:
            return {...state, ...action.payload}
        default:
            return state
        }
    },
    saga: function* () {
        yield all([
            yield takeEvery(`${nameSpace}/textSaga`, this.effect.textSaga)
        ])
    },
    effect: {
        textSaga: function* ( { payload } ){
            let data = yield call(function () {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('我是saga在作怪，哈哈')
                    }, 1000)
                })
            })
            try {
                yield put({
                    type: `${nameSpace}/save`,
                    payload: {
                        name: data
                    }
                })
            } catch (error){}
        },
    }
}