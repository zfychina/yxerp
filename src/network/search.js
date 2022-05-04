import { request } from './request'

export function Search(data) {
  return request({
    url: '/search/',
    method: 'post',
    data
  })
}
