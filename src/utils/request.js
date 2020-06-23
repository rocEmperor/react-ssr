import axios from "axios";

let Request = axios.create({
    baseURL: 'http://127.0.0.1:9998/',
    method: 'post',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

// 拦截 request 请求 添加Accept请求头
Request.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json';
    return config
})

// 通用响应拦截器
const responseInterceptor = async response => {
    const { status, data } = response
    if (status >= 200 && status < 300) {
        return Promise.resolve(data)
    } else {
        message.error(data && data.data || '网络错误')
        return Promise.reject(response)
    }
}

// 拦截 respose 进行状态判断
Request.interceptors.response.use(responseInterceptor)

export default Request;