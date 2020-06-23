import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { RouterApp } from './router';
import storeConfig from './store/index';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    storeConfig.rootReducer,
    window._initData || {},
    applyMiddleware(sagaMiddleware, logger)
)

// 启动saga
sagaMiddleware.run(storeConfig.rootSaga);

// store引入redux-saga中间件，用法上，我们进行了简单的封装，调用方式类似于dva，具体demo见src/store/modules/home

render(
    <Provider store={store}>
        <RouterApp />
    </Provider>, 
    document.getElementById('react_app')
)