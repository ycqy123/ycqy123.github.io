import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/kede_fe/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/kede_fe/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/kede_fe/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/kede_fe/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/kede_fe/role/${id}`,
    method: 'delete'
  })
}
