export default {
    state: {
        isVisible: false,
        message: null,
        pageNotFound: false,
    },
    actions: {
        openModal(ctx, message) {
            ctx.commit('updateVisibility', true)
            ctx.commit('updateMessage', message)
        },
        closeModal(ctx) {
            ctx.commit('updateVisibility', false)
            ctx.commit('updateMessage', null)
        },
        pageNotFound(ctx) {
            ctx.commit('updatePageInfo', true)
        },
        pageFound(ctx) {
            ctx.commit('updatePageInfo', false)
        }
    },
    mutations: {
        updateVisibility(state, data) {
            state.isVisible = data
        },
        updateMessage(state, message) {
            state.message = message
        },
        updatePageInfo(state, data) {
            state.pageNotFound = data
        }
    },
    getters: {
        getModalVisibility(state) {
            return state.isVisible
        },
        getModalMessage(state) {
            return state.message
        },
        getPageInfo(state) {
            return state.pageNotFound
        }
    }
}