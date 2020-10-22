import request from '@/utils/request'

export function fetch() {
  return request({
    url: '/index',
    method: 'get'
  })
}
