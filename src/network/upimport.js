import {request} from "./request";

// 上传并增加基础物料数据
export function upShortmold(data) {
  return request({
    url: '/shortmoldimport/',
    method: 'post',
    data
  })
}


// 上传并更新缺料数据
export function upSkuimport(data) {
  return request({
    url: '/skuimport/',
    method: 'post',
    data
  })
}

// 上传物料供应商更新数据
export function upSupplier(data) {
  return request({
    url: '/skuimport/',
    method: 'put',
    data
  })
}

// 上传销售订单数据
export function uporderimport(data) {
  return request({
    url: '/orderimport/',
    method: 'post',
    timeout: 30000,
    data
  })
}

// 上传供应商名录更新数据
export function upSupplierdir(data) {
  return request({
    url: '/supplierimport/',
    method: 'post',
    data
  })
}

// 上传客户名录更新数据
export function upCustomer(data) {
  return request({
    url: '/customerimport/',
    method: 'post',
    data
  })
}

// 上传产品表数据
export function upBOM(data) {
  return request({
    url: '/bomimport/',
    method: 'post',
    data
  })
}

