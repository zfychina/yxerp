import {request} from "./request";

// 获取订单产品分类数据
export function getReportsku(year) {
  return request({
    url: "/orders/report/" + year,
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}