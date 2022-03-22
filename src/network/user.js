import { request } from './request'

export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}

export function updateuser(data) {
  return request({
    url: '/updateuser/',
    method: 'put',
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

// 更改用户头像
export function updateavatar(data) {
  return request({
    url: '/updateavatar/',
    method: 'post',
    timeout: 30000,
    data
  })
}