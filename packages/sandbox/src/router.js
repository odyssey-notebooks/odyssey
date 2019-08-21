import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'font-bold',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/fields/string/title',
      name: 'title-field',
      component: () => import(/* webpackChunkName: "title-field" */ './views/fields/string/TitleFieldSandbox.vue'),
      meta: {
        title: "Title Field"
      }
    },
    {
      path: '/fields/string/markdown',
      name: 'text-area-field',
      component: () => import(/* webpackChunkName: "markdown-field" */ './views/fields/string/MarkdownFieldSandbox.vue'),
      meta: {
        title: "Markdown Field"
      }
    }
  ]
})
