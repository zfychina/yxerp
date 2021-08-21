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