import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage'
import PageWithAnswer from '@/pages/PageWithAnswer'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'IndexPage', component: IndexPage, alias: '/' },
		{ path: '/:url', name: 'PageWithAnswer', component: PageWithAnswer },
	]
})

export default router