// 处理css
const cssHook = require('css-modules-require-hook');
const lessParser = require('postcss-less').parse;
cssHook({
    extensions: [ '.less' ],
    processorOpts: { parser: lessParser },
    generateScopedName: '[name]__[local]___[hash:base64:5]'
})

// 处理图片资源引入
require('asset-require-hook')({
    extensions: [ 'jpg', 'png' ]
})

const express = require('express');
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const { RouterAppService } = require('./src/router.js');
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import storeConfig from './src/store/index';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    storeConfig.rootReducer,
    applyMiddleware(sagaMiddleware, logger)
)

// 启动saga
sagaMiddleware.run(storeConfig.rootSaga);

const app = express();

// 配置handlebar模板
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'dist'));

// 静态文件
app.use(express.static('dist')); // express 
app.use('/ssr', express.static('dist'))

app.post('/api/test', function (req, res) {
    res.send({
        name: '我是接口返回的数据'
    })
})

app.get('/*', async function (req, res) {
    try {
        let hit = global.routeMap[req.path];
        let initData = {};
        if (hit && hit.getInitialState) {
            let promiseArray = await hit.getInitialState() || [];
            // 请求数据
            Promise.all(promiseArray).then((values) => {
                values && values.forEach(function (item) {
                    for (let k in item) {
                        if (initData.hasOwnProperty(k)) {
                            initData[k] = { ...initData[k], ...item[k] }
                        } else {
                            initData[k] = item[k]
                        }
                    }
                })
                const store = createStore(
                    storeConfig.rootReducer,
                    initData,
                    applyMiddleware(sagaMiddleware, logger)
                )
                res.render('index.hbs', {
                    _html: renderToString(
                            <Provider store={store}>
                                <RouterAppService req={req}/>
                            </Provider>
                        ),
                    _initData: JSON.stringify(initData),
                    ssr_model: true
                });
            })
        } else {
            res.render('index.hbs', {
                _html: renderToString(
                        <Provider store={store}>
                            <RouterAppService req={req}/>
                        </Provider>
                    ),
                _initData: JSON.stringify(initData),
                ssr_model: true
            });
        }
    } catch (err) {
        // 当try内的服务端渲染逻辑抛错时候，直接降级为SPA单页面渲染
        fs.readFile('./dist/index.html', (err, data) => {
            if (err) { return console.error(err) }
    
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.send(data)
        })
    }
})
// app.get('/*', function (req, res) {
//     fs.readFile('./dist/index.html', (err, data) => {
//         if (err) { return console.error(err) }

//         res.setHeader('Content-Type', 'text/html;charset=utf-8');
//         res.end(data)
//     })
// })

app.listen(9998, () => {
    console.log('server start at 127.0.0.1:9998')
})