import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/kede_fe/table/list',
    method: 'get',
    params
  })
}
