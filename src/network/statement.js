import {request} from "./request";

// 获取订单产品分类数据
export function getReportsku(year, goodcustomer) {
  return request({
    url: "/orders/report/" + year + "/" + goodcustomer,
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取订单交货期年份
export function getYearList() {
  return request({
    url: "/orders/yearlist/",
    method: 'get',
    params: {

    }
  })
}


// 获取锁体锁芯面板保护器配件产品数据-年-new
export function getSTReportsku(year) {
  return request({
    url: "/orders/streport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取锁体锁芯面板保护器配件产品数据-年-new    option 查询详情
export function getCateReportsku(year) {
  return request({
    url: "/orders/streport/" + year + "/" + 'category',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}