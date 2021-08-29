import {request} from "./request";

//获取订单信息
export function goodslist(title='') {
  return request({
    url: '/goods/?title=' + title,
    method: 'get',
    params: {
    }
  })
}