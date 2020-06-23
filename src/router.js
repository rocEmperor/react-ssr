import React from 'react';
import { BrowserRouter as Router, Route, StaticRouter, Switch } from "react-router-dom";
import Home from './pages/home/index';
import About from './pages/about/index';
import NoFound from './pages/404/index';

function parseRoute (target) {
    let data = [];
    target && target.forEach((item, index) => {
        if (item.children && item.children.length) {
            item.children.forEach((child) => {
                data.push({
                    path: `${item.path}${child.path}`,
                    component: child.component
                });
            })
        } else {
            data.push({ path: item.path, component: item.component });
        }
    })
    return data;
}

const routeList = [
    {
        path: '/ssr',
        children: [
            { path: '/home', component: Home },
            { path: '/about', component: About }
        ]
    }
]

const parseRouteList = parseRoute(routeList) || [];

// 浏览器端的路由配置
class RouterApp extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {parseRouteList.map((item, index) => {
                        return <Route path={item.path} component={item.component} key={index}/>
                    })}
                    <Route path="*" component={NoFound}/>
                </Switch>
            </Router>
        )
    }
}

global.routeMap = {};
parseRouteList.forEach((item) => {
    global.routeMap[item.path] = item.component;
})
// node端的路由配置
class RouterAppService extends React.Component {
    render() {
        let { req } = this.props;
        return (
            // 注意，要添加location属性，不然渲染到页面的#react_app标签内是空内容，虽然效果已经是服务端渲染
            <StaticRouter location={req.path}>
                <Switch>
                    {parseRouteList.map((item, index) => {
                        return <Route path={item.path} component={item.component} key={index}/>
                    })}
                    <Route path="*" component={NoFound}/>
                </Switch>
            </StaticRouter>
        )
    }
}

export { RouterApp, RouterAppService }