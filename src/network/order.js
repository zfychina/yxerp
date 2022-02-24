import {request} from "./request";

// 获取当月订单信息
export function getMonthOrderinfo(ordering) {
  return request({
    url: "/orders/month/?ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}

// 获取当月未完成订单数量
export function getMonthfinishinfo() {
  return request({
    url: "/orders/monthfinish/",
    method: 'get',
    params: {

    }
  })
}

//获取分类订单信息
export function getOrdergoodsinfo(category='',page=1, ordering="", orderby="") {
  return request({
    url: "/orders/all/?category="+category+"&page=" + page + "&orderby=" + orderby + "&ordering=" + ordering,
    method: 'get',
    params: {

    }
  })
}


//获取订单编号列表信息
export function orderhaolist(query='', su_query='') {
  return request({
    url: "/orders/?query=" + query + "&su_query=" + su_query,
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




// 创建订单
export function createorder(data) {
  return request({
    url: '/orders/create/',
    method: 'post',
    data
  })
}

// 更新订单
export function updateorder(data) {
  return request({
    url: '/orders/update/',
    method: 'put',
    data
  })
}

// 删除订单
export function deleteorder(data) {
  return request({
    url: '/orders/delete/',
    method: 'delete',
    data
  })
}


