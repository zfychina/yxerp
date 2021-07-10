import axios from "axios";

export function request(config) {
  const instance =axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config=>{
    // 如果有一个接口需要认证才可以访问，就在这里统一设置

    return config;
  }, err => {
    console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(res=>{


    // 如果数据有data,则返返加在res.data， 否则返回res
    return res.data ? res.data : res

  }, err => {
    // 如果有需要授权才可以访问的接口，统一去login授权

    //如果有错误，这里会去处理，显示错误信息

    console.log(err);
  })

  // 数据处理后，将实例返回出去
  return instance(config);
}