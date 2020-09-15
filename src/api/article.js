import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'v1/article/list',
    method: 'get',
    params: query
  })
}




export function createArticle(data) {
  return request({
    url: 'v1/article/create',
    method: 'post',
    data
  })
}


