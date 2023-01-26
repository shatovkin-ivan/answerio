import MasonryWall from '@yeger/vue-masonry-wall'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(MasonryWall)
app.mount('#app')
