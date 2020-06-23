import { all, takeEvery, put, select } from 'redux-saga/effects';

const initState = {
    name: 'about'
};
const nameSpace = 'aboutModel';

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
            // yield takeEvery(`${nameSpace}/textSaga`, this.effect.textSaga),
        ])
    },
    effect: {
        
    }
}