import {request} from "./request";

//获取客户信息
export function customerslist() {
  return request({
    url: '/customers/',
    method: 'get',
    params: {

    }
  })
}