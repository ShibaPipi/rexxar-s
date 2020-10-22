import request from '@/utils/request'

export function fetchList(page, perPage) {
  return request({
    url: '/posts',
    method: 'get',
    params: { page, perPage }
  })
}
