import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts/admin',
    method: 'get',
    params: query
  })
}

export function fetchPublish(id) {
  return request({
    url: `/post/${id}/admin`,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createPublish(data) {
  return request({
    url: '/post/admin',
    method: 'post',
    data
  })
}

export function updatePublish(id, data) {
  return request({
    url: `/post/${id}/admin`,
    method: 'post',
    data
  })
}

export function changeStatus(id, status) {
  return request({
    url: `/post/${id}/admin/status`,
    method: 'post',
    data: { status: status }
  })
}

export function deletePublish(id) {
  return request({
    url: `/post/${id}/admin`,
    method: 'delete'
  })
}

export function getQueues() {
  return request({
    url: '/post/queues/admin',
    method: 'get'
  })
}

export function getTransferLogs(postId) {
  return request({
    url: `/bangumi/${postId}/transfer-log/admin`,
    method: 'get'
  })
}

export function getTransferLogsContents(logId) {
  return request({
    url: `/bangumi/${logId}/transfer-log-raw/admin`,
    method: 'get'
  })
}
