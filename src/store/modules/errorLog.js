const state = {
  logs: []
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  }
}

const actions = {
  addErrorLog({ commit }, log) {
    console.log('Error Log', log)
    commit('ADD_ERROR_LOG', log)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
