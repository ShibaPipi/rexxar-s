import request from '@/utils/request'

export function fetchList(page) {
  return request({
    url: '/user/notices',
    method: 'get',
    params: { page }
  })
}
