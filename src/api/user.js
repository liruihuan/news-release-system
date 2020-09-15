import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: '/v1/add',
    method: 'post',
    data
  })
}

export function getUserList() {
  return request({
    url: '/v1/find',
    method: 'get',
  })
}

export function updateUser(data) {
  return request({
    url: '/v1/update',
    method: 'post',
    data
  })
}

