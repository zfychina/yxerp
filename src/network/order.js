import {request} from "./request";

//获取订单信息
export function getOrderinfo(orderstatus, page, ordering) {
  return request({
    url: "/orders/?page=" + page + "&orderstatus=" + orderstatus + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

//获取订单详情信息
export function getOrderdetail(orderhao) {
  return request({
    url: "/orders/" + orderhao,
    method: 'get',
    params: {

    }
  })
}


// 校验订单编号是否重复
export function countOrderhao(orderhao) {
  return request({
    url: "/orders/" + orderhao + '/count/',
    method: 'get',
    params: {

    }
  })
}