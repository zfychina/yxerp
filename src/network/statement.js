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


// 产量报表
// 获取锁体锁芯面板保护器配件产品数据-按月-new 入库
export function getSTReportsku(year) {
  return request({
    url: "/orders/streport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取锁体锁芯面板保护器配件产品数据-按产品类别-new 入库    option 查询详情
export function getCateReportsku(year) {
  return request({
    url: "/orders/streport/" + year + "/" + 'category',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取产品详情数据-按月-new  入库   option 查询详情
export function getGoodCateReport(year, category) {
  return request({
    url: "/orders/streport/" + year + "/" + category,
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}


// 销售报表
// 获取锁体锁芯面板保护器配件产品数据-按月-new 销售订单
export function getXSReportsku(year) {
  return request({
    url: "/orders/xsreport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取锁体锁芯面板保护器配件产品数据-按产品类别-new 销售订单    option 查询详情
export function getXSCateReportsku(year) {
  return request({
    url: "/orders/xsreport/" + year + "/" + 'category',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取产品详情数据-按月-new  销售订单   option 查询详情
export function getXSGoodCateReport(year, category) {
  return request({
    url: "/orders/xsreport/" + year + "/" + category,
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}


// 客户报表
// 获取锁体锁芯面板保护器配件产品数据-按月-new 销售订单
export function getXScustomerReportsku(year) {
  return request({
    url: "/orders/cureport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}
// 获取锁体锁芯面板保护器配件产品数据-按产品类别-new 销售订单    option 查询详情
export function getXScustomerCateReportsku(year) {
  return request({
    url: "/orders/cureport/" + year + "/" + 'category',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取产品详情数据-按月-new  销售订单   option 查询详情
export function getXScustomerGoodCateReport(year, customer) {
  return request({
    url: "/orders/cureport/" + year + "/" + customer,
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}



// 产能报表
// 获取锁体锁芯面板保护器配件产品数据-按月-new 未完成的销售订单
export function getPRReportsku(year) {
  return request({
    url: "/orders/prreport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取锁体锁芯面板保护器配件产品数据-按产品类别-new 未完成的销售订单    option 查询详情
export function getPRCateReportsku(year) {
  return request({
    url: "/orders/prreport/" + year + "/" + 'category',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}

// 获取产品详情数据-按月-new  未完成的销售订单   option 查询详情
export function getPRGoodCateReport(year, month, category) {
  return request({
    url: "/orders/prreport/" + year + "/" + category,
    method: 'get',
    timeout: 30000,
    params: {
      month:month,
    }
  })
}

// 产量与销量对比
export function getPRcontrastReportsku(year) {
  return request({
    url: "/orders/prcontrastreport/" + year + "/" + 'month',
    method: 'get',
    timeout: 30000,
    params: {

    }
  })
}