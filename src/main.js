import MasonryWall from '@yeger/vue-masonry-wall'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'



const app = createApp(App)
app.use(store)
app.use(MasonryWall)
app.mount('#app')
