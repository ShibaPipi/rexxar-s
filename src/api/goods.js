import request from '@/utils/request'

export function fetchList(optId, goodsFactPriceMax, goodsFactPriceMin, page) {
  return request({
    url: '/goods',
    method: 'get',
    params: { optId, goodsFactPriceMax, goodsFactPriceMin, page }
  })
}
