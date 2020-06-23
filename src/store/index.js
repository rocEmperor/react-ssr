import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import fs from 'fs';

let keys = [];

if (process.title == 'browser') { // 浏览器环境
    const context = require.context('./', true, /\.js$/);
    keys = context.keys().filter(item => item !== './index.js');
} else { // 兼容node层
    // 获取路径下的所有文件名
    function getRoute(path) {
        let obj = {};
        let resDir = fs.readdirSync(path);
        for (let i in resDir) {
            let road = path + '/' + resDir[i];
            let res = fs.statSync(road);
            if (res.isDirectory()) {
                obj[resDir[i]] = getRoute(road);
            }else{
                obj[resDir[i]] = true;
            }
        }
        return obj;
    }
    let modules = getRoute(__dirname).modules;
    for (let k in modules) {
        keys.push(`./modules/${k}`)
    }
}

// 获取所有的saga
let rootSaga = keys.map((item) => {
    let defaultData = require(`./${item.replace('./', '')}`).default;
    if (defaultData) {
        if (defaultData.saga && (typeof defaultData.saga == 'function')) {
            return defaultData.saga();
        }
    }
})

// 获取所有的reducer
let reducerObj = {};
keys.forEach((item) => {
    let defaultData = require(`${item}`).default;
    if (defaultData) {
        let nameSpace = defaultData.nameSpace;
        let reducer = defaultData.reducer;
        // if (!nameSpace || !reducer) {
        //   throw new Error('model文件内必须定义nameSpace 或者 reducer, now is undefined');
        // }
        reducerObj[nameSpace] = reducer || function () {};
    }
})

const rootReducer = combineReducers(reducerObj);

export default {
    rootSaga: function* () {
        yield all(rootSaga);
    },
    rootReducer: rootReducer
}
