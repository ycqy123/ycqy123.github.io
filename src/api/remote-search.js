import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/kede_fe/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/kede_fe/transaction/list',
    method: 'get',
    params: query
  })
}
