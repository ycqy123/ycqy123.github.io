import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/kede_fe/customers/list',
    method: 'get',
    params: query
  })
}