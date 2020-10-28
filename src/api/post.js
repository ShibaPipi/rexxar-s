import request from '@/utils/request'

export function fetchList(page, perPage) {
  return request({
    url: '/posts',
    method: 'get',
    params: { page, perPage }
  })
}

export function store(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function show(id) {
  return request({
    url: '/posts/' + id,
    method: 'get'
  })
}
