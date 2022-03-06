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

// 获取生产退料详情信息
export function getorderSCRETURN(page, ordering) {
  return request({
    url: "/orders/orderscreturn/?page=" + page + "&ordering=" + ordering,
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
// 获取采购无订单入库详情信息
export function getorderNOTCGRE(page, ordering) {
  return request({
    url: "/orders/ordercgrenot/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取采购退货详情信息
export function getorderCGRETURN(page, ordering) {
  return request({
    url: "/orders/ordercgreturn/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取销售出库详情信息
export function getorderXS(page, ordering) {
  return request({
    url: "/orders/orderxs/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取无订单销售出库详情信息
export function getorderNOTXS(page, ordering) {
  return request({
    url: "/orders/orderxsnot/?page=" + page + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

//获取生产线信息
export function productlinelist(query='') {
  return request({
    url: '/productline/?query=' + query,
    method: 'get',
    params: {

    }
  })
}

export function productlinecount(customer) {
  return request({
    url: "/productline/" + customer + '/count/',
    method: 'get',
    params: {

    }
  })
}

//获取生产订单编号列表信息
export function orderSClist(query='',su_query="") {
  return request({
    url: "/ordersc/?query=" + query+ "&su_query=" + su_query,
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

// 校验销售订单是否读取完
export function countOrderhaook(orderhao) {
  return request({
    url: "/orders/" + orderhao + '/countok/',
    method: 'get',
    params: {

    }
  })
}

// 获取生产订单详情信息
export function getOrderSCdetail(orderhao) {
  return request({
    url: "/orderssc/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 获取未完成的销售订单详情信息
export function getxsOrderokdetail(orderhao) {
  return request({
    url: "/xsordersok/" + orderhao,
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



// 获取供应商信息
export function supplierlist(query='') {
  return request({
    url: '/supplier/?query=' + query,
    method: 'get',
    params: {

    }
  })
}

export function supplierount(supplier) {
  return request({
    url: "/supplier/" + supplier + '/count/',
    method: 'get',
    params: {

    }
  })
}

//获取采购订单编号列表信息
export function orderCGlist(query='',su_query="") {
  return request({
    url: "/orderscg/?query=" + query+ "&su_query=" + su_query,
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

// 获取采购订单详情信息
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




// 校验生产入库单号是否重复
export function countOrderSCRK(order) {
  return request({
    url: "/ordersscrk/" + order + '/count/',
    method: 'get',
    params: {

    }
  })
}

// 获取生产入库单详情信息
export function getOrderSCRKdetail(orderhao) {
  return request({
    url: "/ordersscrk/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 校验生产订单是否读取完
export function countOrderSCok(orderhao) {
  return request({
    url: "/orderssc/" + orderhao + '/countok/',
    method: 'get',
    params: {

    }
  })
}

// 获取未完成的生产订单详情信息
export function getOrderSCokdetail(orderhao) {
  return request({
    url: "/ordersscok/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 创建生产订单
export function createorderSCRK(data) {
  return request({
    url: '/ordersscrk/action/',
    method: 'post',
    data
  })
}

// 更新生产订单
export function updateorderSCRK(data) {
  return request({
    url: '/ordersscrk/action/',
    method: 'put',
    data
  })
}

// 删除生产订单
export function deleteorderSCRK(data) {
  return request({
    url: '/ordersscrk/action/',
    method: 'delete',
    data
  })
}




// 校验采购入库单号是否重复
export function countOrderCGRK(order="") {
  return request({
    url: "/orderscgrkcount/?query=" + order,
    method: 'get',
    params: {

    }
  })
}

//获取采购入库订单编号列表信息
export function orderCGRKlist(query='',su_query="") {
  return request({
    url: "/orderscgrk/?query=" + query+ "&su_query=" + su_query,
    method: 'get',
    params: {

    }
  })
}

// 获取采购入库单详情信息
export function getOrderCGRKdetail(orderhao) {
  return request({
    url: "/orderscgrk/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 校验采购订单是否读取完
export function countOrderCGok(orderhao) {
  return request({
    url: "/orderscg/" + orderhao + '/countok/',
    method: 'get',
    params: {

    }
  })
}

// 获取未完成的采购订单详情信息
export function getOrderCGokdetail(orderhao) {
  return request({
    url: "/orderscgok/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 创建采购订单
export function createorderCGRK(data) {
  return request({
    url: '/orderscgrk/action/',
    method: 'post',
    data
  })
}

// 更新采购订单
export function updateorderCGRK(data) {
  return request({
    url: '/orderscgrk/action/',
    method: 'put',
    data
  })
}

// 删除采购订单
export function deleteorderCGRK(data) {
  return request({
    url: '/orderscgrk/action/',
    method: 'delete',
    data
  })
}


// 采购退货
//获取采购退货订单编号列表信息
export function orderCGRElist(query='',su_query="") {
  return request({
    url: "/orderscgre/?query=" + query+ "&su_query=" + su_query,
    method: 'get',
    params: {

    }
  })
}

// 校验采购退货单号是否重复
export function countOrderCGRE(order='') {
  return request({
    url: "/orderscgrecount/?query=" + order,
    method: 'get',
    params: {

    }
  })
}

// 获取采购退货单详情信息
export function getOrderCGREdetail(orderhao) {
  return request({
    url: "/orderscgre/" + orderhao,
    method: 'get',
    params: {

    }
  })
}

// 创建采购退货单
export function createorderCGRE(data) {
  return request({
    url: '/orderscgre/action/',
    method: 'post',
    data
  })
}

// 更新采购退货单
export function updateorderCGRE(data) {
  return request({
    url: '/orderscgre/action/',
    method: 'put',
    data
  })
}

// 删除采购退货单
export function deleteorderCGRE(data) {
  return request({
    url: '/orderscgre/action/',
    method: 'delete',
    data
  })
}


// 生产入库
// 生产入库单号列表
export function orderSCRKlist(query='',su_query="") {
  return request({
    url: "/orderscrk/?query=" + query+ "&su_query=" + su_query,
    method: 'get',
    params: {

    }
  })
}
