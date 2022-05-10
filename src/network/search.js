import { request } from './request'

//销售订单
export function Searchxsorder(params) {
  return request({
    url: '/search/xsorder',
    method: 'get',
    params
  })
}
//生产订单
export function Searchscorder(params) {
  return request({
    url: '/search/scorder',
    method: 'get',
    params
  })
}
//采购订单
export function Searchcgorder(params) {
  return request({
    url: '/search/cgorder',
    method: 'get',
    params
  })
}
//生产入库
export function Searchscrk(params) {
  return request({
    url: '/search/scrk',
    method: 'get',
    params
  })
}
//生产领料
export function Searchscll(params) {
  return request({
    url: '/search/scll',
    method: 'get',
    params
  })
}
// 生产退料
export function Searchsctl(params) {
  return request({
    url: '/search/sctl',
    method: 'get',
    params
  })
}
//采购入库有订单
export function Searchcgrk(params) {
  return request({
    url: '/search/cgrk',
    method: 'get',
    params
  })
}
//采购入库无订单
export function Searchnotcgrk(params) {
  return request({
    url: '/search/notcgrk',
    method: 'get',
    params
  })
}
//采购退料
export function Searchcgth(params) {
  return request({
    url: '/search/cgth',
    method: 'get',
    params
  })
}
//销售出库有订单
export function Searchxsck(params) {
  return request({
    url: '/search/xsck',
    method: 'get',
    params
  })
}
//销售出库无订单
export function Searchnotxsck(params) {
  return request({
    url: '/search/notxsck',
    method: 'get',
    params
  })
}
//销售退货
export function Searchxsth(params) {
  return request({
    url: '/search/xsth',
    method: 'get',
    params
  })
}
//物料查询
export function Searchsku(params) {
  return request({
    url: '/search/sku',
    method: 'get',
    params
  })
}
//产品类别查询
export function Searchcategory(params) {
  return request({
    url: '/search/category',
    method: 'get',
    params
  })
}
//单位箱转换
export function Searchto_unity(params) {
  return request({
    url: '/search/to_unit',
    method: 'get',
    params
  })
}
//用户
export function Searchuser(params) {
  return request({
    url: '/search/user',
    method: 'get',
    params
  })
}
//供应商
export function Searchsupplier(params) {
  return request({
    url: '/search/supplier',
    method: 'get',
    params
  })
}

export function Search(data) {
  return request({
    url: '/search/',
    method: 'put',
    data
  })
}

