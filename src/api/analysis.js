import request from '@/utils/request'

export function fetchAudioText(id) {
  return request({
    url: 'kede_fe/analysis/get_audio_text',
    method: 'get',
    params: { id }
  })
}
export function fetchList(query) {
  return request({
    url: '/kede_fe/analysis/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/kede_fe/analysis/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/kede_fe/analysis/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/kede_fe/analysis/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/kede_fe/analysis/update',
    method: 'post',
    data
  })
}
