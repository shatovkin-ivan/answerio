export default {
  state: {
    authenticated: null,
  },
  actions: {
    isAuthenticated(ctx) {
      if (localStorage.getItem('isAuthenticated')) {
        ctx.commit('updateAuthenticated', true)
      } else {
        ctx.commit('updateAuthenticated', false)
      }
    },
    setAuthenticated(ctx) {
      localStorage.setItem('isAuthenticated', true)
      ctx.commit('updateAuthenticated', true)
    },
    removeAuthenticated(ctx) {
      localStorage.removeItem('isAuthenticated', true)
      ctx.commit('updateAuthenticated', false)
    },
  },
  mutations: {
    updateAuthenticated(state, data) {
      state.authenticated = data
    },
  },
  getters: {
    getAuthenticated(state) {
      return state.authenticated
    },
  },
}
