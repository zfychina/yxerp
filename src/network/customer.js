import {request} from "./request";

//获取客户信息
export function customerslist(query='') {
  return request({
    url: '/customers/?query=' + query,
    method: 'get',
    params: {

    }
  })
}



export function customerscount(customer) {
  return request({
    url: "/customers/" + customer + '/count/',
    method: 'get',
    params: {

    }
  })
}