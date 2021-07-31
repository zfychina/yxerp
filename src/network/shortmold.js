import {request} from "./request";

export function shortmoldDate() {
  return request({
    url: '/shortmold'
  })
}