import {request} from "./request";

// 上传并增加基础物料数据
export function upShortmold(data) {
  return request({
    url: '/shortmold/',
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