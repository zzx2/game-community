import axios from 'axios'
import router from '../router'
import store from '../store/index'
import {Toast} from 'vant'


// 提示：一秒后关闭
const tip=msg=>{
     Toast({
         message:msg,
         duration:1000,
         forbidClick:true,
         mask:true
     });
}


// 跳转登录页
// const toLogin=()=>{
//     router.replace({
//         path:'login',
//         query:{
//             redirect:router.currentRoute.fullPath
//         }
//     });
// }

// 请求失败后错误的统一处理
const errorHandle=(status,other)=>{
    // 状态码判断
    switch(status){
        // 401:未登录状态，跳转登录页
        case 401:
            tip("未登录")
            localStorage.removeItem('token');
            break;
        // 403 token过期
        // 清楚token并跳转登录页
        case 403:
           tip('登录过期，请重新登录');
           localStorage.removeItem('token');
           setTimeout(()=>{
               toLogin();
           },1000)
           break;
        //404请求资源不存在
        case 404:
           tip('请求的资源不存在');
           break;
        default:
           console.log(other)
    }
}

// 创建axios实例
var  instance = axios.create({timeout:1000*12});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'applcation/x-www-form-urlencoded';

// 请求拦截器
// 每次请求前，如果存在token则在请求头中携带token
instance.interceptors.request.use(
    config=>{
        const token =store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res=>res.status===200? Promise.resolve(res): Promise.reject(res),
    // 请求失败
    error=>{
        const {response}=error;
        if(response){
            errorHandle(response.status,response.data.message);
            return Promise.reject(response);
        }
        // else{
        //     store.commit('changeNetwork',false);
        // }
    }
)

export default instance;