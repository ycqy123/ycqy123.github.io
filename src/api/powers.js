import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/kede_fe/permission/list',
    method: 'get',
    params: query
  })
}
