import { request } from './request'

export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}