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
