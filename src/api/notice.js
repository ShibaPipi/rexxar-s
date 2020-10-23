import request from '@/utils/request'

export function fetchList(page) {
  return request({
    url: '/notices',
    method: 'get',
    params: { page }
  })
}
