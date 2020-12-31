import axios from 'axios';
import qs from 'qs';
import api from './api'
import store from '@/store'
import router from '../router'
axios.defaults.baseURL=process.env.NODE_ENV=='development'?'/api':''
// axios.defaults.timeout = 2500;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
    // if(config.method === 'post'){
    //     if(config.url == '/api/order'){
    //         console.log(config)
    //         config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    //         config.transformRequest = [function (data, headers) {
    //             return JSON.stringify(data);
    //         }];
    //     }else{
    //         config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //         config.transformRequest = [function (data, headers) {
    //             return qs.stringify(data);
    //         }];
    //     }
    // }
    return config;
}, (err) => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log(response)
        if(response.status == 200){
            switch (response.data.code) {
                case 0:
                    Promise.resolve(response)
                break;
                case 402:
                    // 返回 402 清除token信息并跳转到登录页面
                        store.commit("del_token");
                        router.replace({
                            path: 'login',
                            query: {redirect: router.currentRoute.fullPath}
                        })
                    
                break;
                default:
                    Promise.resolve(response)
                break;
            }
        }else{
            
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 402:
                    // 返回 402 清除token信息并跳转到登录页面
                    store.commit("del_token");
                    // router.replace({
                    //     path: 'login',
                    //     query: {redirect: router.currentRoute.fullPath}
                    // })
            }
        }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
})

function getToken(){
    return new Promise((resolve, reject) => {
        let userData = localStorage.getItem('userInfo');
        userData = JSON.parse(userData);
        if (userData) {
            resolve(userData.token);
        } else {
            resolve();
        }
    })
}

class Http{
    //post-请求封装
    async requestPost(data, uri){
        let timestamp = Date.parse(new Date()) / 1000;
        data.timestamp = timestamp;
        let token = await getToken() || '';
        let headers = {
            token: token,
            Accept:"application/json"//给后台判断是否是ajax请求
        };
        // console.log('headers',headers)
        return new Promise((resolve, reject) => {
            axios.post(uri, data, {
                headers: {
                    ...headers
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    };
    //GET-请求封装
    async requestGet(data, uri){
        let timestamp = Date.parse(new Date()) / 1000;
        data.timestamp = timestamp;
        let token = await getToken() || '';
        let headers = {
            token: token,
            Accept:"application/json"
        };
        return new Promise((resolve, reject) => {
            axios.get(uri, {
                params: data,
                headers: {
                    ...headers
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }
    //PATCH-请求封装
    async requestPatch(data, uri){
        let timestamp = Date.parse(new Date()) / 1000;
        data.timestamp = timestamp;
        let token = await getToken() || '';
        let headers = {
            token: token,
            Accept:"application/json"
        };
        return new Promise((resolve, reject) => {
            axios.patch(uri, data, {
                headers: {
                    ...headers
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

}
let http = new Http();
export default http;