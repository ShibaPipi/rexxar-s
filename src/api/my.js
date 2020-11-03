import request from '@/utils/request'

export function fetchNoticeList(page) {
  return request({
    url: '/my/notices',
    method: 'get',
    params: { page }
  })
}

export function getInfo() {
  return request({
    url: '/my/info',
    method: 'get'
  })
}

export function updateInfo(data) {
  return request({
    url: '/my/update',
    method: 'put',
    data
  })
}
