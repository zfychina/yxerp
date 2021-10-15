import {request} from "./request";

//获取订单详情信息
export function getbomdetail(skuid) {
  return request({
    url: "/bom/" + skuid,
    method: 'get',
    params: {

    }
  })
}

// 创建更新BOM
export function bomcreate(data) {
  return request({
    url: '/bomcreate/',
    method: 'post',
    data
  })
}


//删除BOM
export function bomdelete(data) {
  return request({
    url: "/bomcreate/",
    method: 'delete',
    data
  })
}