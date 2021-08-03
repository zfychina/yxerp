import {request} from "./request";

export function shortmoldDate(params) {
  return request({
    url: '/shortmold',
    params,

  })
}