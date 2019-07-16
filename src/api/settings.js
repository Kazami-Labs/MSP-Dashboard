import request from '@/utils/request'

export function fetchBangumiAccounts(query) {
  return request({
    // url: '/article/list',
    url: '/bangumi-settings/admin',
    method: 'get',
    params: query
  })
}

export function updateBangumiAccount(id, data) {
  return request({
    url: `/bangumi-setting/${id}/admin`,
    method: 'post',
    data
  })
}

export function deleteBangumiAccount(id, data) {
  return request({
    url: `/bangumi-setting/${id}/admin`,
    method: 'delete',
    data
  })
}

export function changeBangumiAccountStatus(id, status) {
  return request({
    url: `/bangumi-setting/${id}/admin/status`,
    method: 'post',
    data: { status: status }
  })
}

export function fetchUsers(query) {
  return request({
    url: '/users/admin',
    method: 'get',
    params: query
  })
}

export function createBangumiAccount(data) {
  return request({
    url: '/bangumi-setting/admin',
    method: 'post',
    data
  })
}

export function fetchAllTags() {
  return request({
    url: '/bangumi-settings/all-tags/admin',
    method: 'get'
  })
}

export function fetchEchoSetting() {
  return request({
    url: '/setting/echo/admin',
    method: 'get'
  })
}
