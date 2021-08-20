import { request } from './request'

export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/authorizations/',
    method: 'post',
    data
  })
}

export function getuserinfo() {
  return request({
    url: '/user/',
    // headers:{
    //   'Authorization': 'JWT ' + window.localStorage.token
    // },
  })
}