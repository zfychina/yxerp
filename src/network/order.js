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