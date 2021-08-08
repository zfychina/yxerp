import axios from "axios";
import {Toast} from 'vant';
import router from '../router/index'

export function request(config) {
  const instance =axios.create({
    baseURL: 'http://api.zfychina.cn:8000',
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config=>{
    // 如果有一个接口需要认证才可以访问，就在这里统一设置
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    // 直接放行
    return config;
  }, err => {
    console.log(err.response.data);
  })

  // 响应拦截
  instance.interceptors.response.use(res=>{


    // 如果数据有data,则返返加在res.data， 否则返回res
    return res.data ? res.data : res

  }, err => {
    // 如果有需要授权才可以访问的接口，统一去login授权
    if(err.response.status == '401') {
      Toast.fail('请先登录')
      router.push({path:'/login'})
    }

    // 注册用户不成功，返回的错误信息
    if(err.response.status == '400' | err.response.data.length > 0) {
      const data = err.response.data
      if ('mobile' in data){
        Toast.fail(data['mobile'][0])
      }
      if ('username' in data){
        Toast.fail(data['username'][0])
      }
      if ('non_field_errors' in data){
        Toast.fail(data['non_field_errors'][0])
      }
    }


    //如果有错误，这里会去处理，显示错误信息
    // console.log(err.response.data.errors);
    // Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
  })

  // 数据处理后，将实例返回出去
  return instance(config);
}