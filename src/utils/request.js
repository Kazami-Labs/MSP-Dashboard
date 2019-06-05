import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import i18n from '@/i18n'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => Promise.resolve(response),
  error => {
    const response = error.response

    if (response) {
      const code = response.status
      const data = response.data
      const message = data.message
      Message({
        message: message || i18n.t('common.error'),
        type: 'error',
        duration: 5 * 1000
      })

      if (code === 401 && getToken()) {
        removeToken()
        // to re-login
        MessageBox.confirm(
          i18n.t('auth.hasBeenLogout'),
          i18n.t('auth.confirmLogout'),
          {
            confirmButtonText: i18n.t('auth.reLoginBtn'),
            cancelButtonText: i18n.t('common.cancel'),
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(message || 'Error'))
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
