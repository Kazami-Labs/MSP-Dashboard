import { Message } from 'element-ui'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import i18n from '../../i18n'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    if (token) {
      setToken(token)
    } else {
      removeToken()
    }
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const params = {
      username: username.trim(),
      password: password
    }
    return login(params)
      .then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
      })
  },

  // get user info
  getInfo({ commit }) {
    return getInfo()
      .then(response => {
        const { data } = response
        const { name, avatar_addr } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar_addr)
      })
  },

  // user logout
  logout({ commit, state }) {
    return logout(state.token)
      .then(() => {
        Message({
          message: i18n.t('auth.logoutSuccessed'),
          type: 'success',
          duration: 5 * 1000
        })
        commit('SET_TOKEN', '')
        resetRouter()
      })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      resolve()
    })
  },

  setAvatar({ commit }, avatar) {
    return new Promise(resolve => {
      commit('SET_AVATAR', avatar)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

