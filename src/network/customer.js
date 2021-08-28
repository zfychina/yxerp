import {request} from "./request";

//获取订单信息
export function customerslist() {
  return request({
    url: '/customers/',
    method: 'get',
    params: {

    }
  })
}