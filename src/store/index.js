import { createStore } from 'vuex'
import auth from './modules/auth'
import messages from './modules/messages'

const store = createStore({
  modules: {
    auth,
    messages
  },
})

export default store
