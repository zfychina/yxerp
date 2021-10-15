import {request} from "./request";

//获取生产订单详情信息
export function getorderSC(page, ordering) {
  return request({
    url: "/orders/ordersc/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取生产提料详情信息


// 获取生产入库详情信息


// 获取采购订单详情信息
export function getorderCG(page, ordering) {
  return request({
    url: "/orders/ordercg/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取采购入库详情信息
export function getorderCGRE(page, ordering) {
  return request({
    url: "/orders/ordercgre/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}