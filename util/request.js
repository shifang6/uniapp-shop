//封装axios请求
import Vue from 'vue'
import axios from 'axios'
import store from '../store/store'

console.log('token----------------------------->', store)

// create an axios instance
const service = axios.create({
    baseURL: 'https://www.uinav.com',
    withCredentials: true, //允许跨域携带cookie
    // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
    timeout: 6000, // request timeout
    async: true,
    crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
    config => {
        if (store.state.m_cate.token) {
            // 给请求头添加user-token
            config.headers["Authorization"] = uni.getStorageSync("token");
        }
        // console.log('请求拦截成功')
        //针对媒体类型数据进行特殊处理
        if (config.method === 'formdata') {
            config.method = 'POST';
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        // console.log('请求拦截器config------------------',config)
        return config;
    },
    error => {
        // console.log('请求拦截器错误-------------', error); // for debug
        uni.showToast({
            title: error,
            duration: 1500,
            icon: 'none',
        })
        return Promise.reject(error);
    }
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
    // console.log('响应拦截器res---------------', res)
    //res.data.status== 200
    if (res.data.meta.status == 200) {
        return res.data
    } else {
        uni.showToast({
            title: res.errMsg,
            duration: 1500,
            icon: 'none',
        })
        return Promise.reject(res.errMsg);
    }
}, error => {
    // console.log('响应拦截器错误--------------', error)
    if (error.response.status) {
        switch (error.response.status) {
            case 401:
                break;
            default:
                break;
        }
    }
    uni.showToast({
        title: error,
        duration: 1500,
        icon: 'none',
    })
    return Promise.reject(error)
})


// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        // console.log('axios自定义适配器-------------',config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        //当baseURL为undefined时，不让小程序端前缀加上baseURL
        const baseURL = config.baseURL ? config.baseURL : '';
        // console.log('config.baseURL--------------',config.baseURL),
        // console.log('buildURL(config.url, config.params, config.paramsSerializer)',buildURL(config.url, config.params, config.paramsSerializer))
        uni.request({
            method: config.method.toUpperCase(),
            url: baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                // console.log("执行完成：", response)
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response)
            }
        })
    })
}
export default service
