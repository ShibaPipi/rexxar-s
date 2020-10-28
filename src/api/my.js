import request from '@/utils/request'

export function fetchNoticeList(page) {
  return request({
    url: '/my/notices',
    method: 'get',
    params: { page }
  })
}
