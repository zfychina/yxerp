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
export function getorderSCRE(page, ordering) {
  return request({
    url: "/orders/orderscre/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

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


//获取生产线信息
export function productlinelist() {
  return request({
    url: '/productline/',
    method: 'get',
    params: {

    }
  })
}

// 校验生产订单号是否重复
export function countOrderSC(order) {
  return request({
    url: "/orderssc/" + order + '/count/',
    method: 'get',
    params: {

    }
  })
}

//获取生产订单详情信息
export function getOrderSCdetail(orderhao) {
  return request({
    url: "/orderssc/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 创建生产订单
export function createorderSC(data) {
  return request({
    url: '/orderssc/action/',
    method: 'post',
    data
  })
}

// 更新生产订单
export function updateorderSC(data) {
  return request({
    url: '/orderssc/action/',
    method: 'put',
    data
  })
}

// 删除生产订单
export function deleteorderSC(data) {
  return request({
    url: '/orderssc/action/',
    method: 'delete',
    data
  })
}



//获取供应商信息
export function supplierlist() {
  return request({
    url: '/supplier/',
    method: 'get',
    params: {

    }
  })
}

// 校验采购订单号是否重复
export function countOrderCG(order) {
  return request({
    url: "/orderscg/" + order + '/count/',
    method: 'get',
    params: {

    }
  })
}

//获取采购订单详情信息
export function getOrderCGdetail(orderhao) {
  return request({
    url: "/orderscg/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 创建采购订单
export function createorderCG(data) {
  return request({
    url: '/orderscg/action/',
    method: 'post',
    data
  })
}

// 更新采购订单
export function updateorderCG(data) {
  return request({
    url: '/orderscg/action/',
    method: 'put',
    data
  })
}

// 删除采购订单
export function deleteorderCG(data) {
  return request({
    url: '/orderscg/action/',
    method: 'delete',
    data
  })
}


