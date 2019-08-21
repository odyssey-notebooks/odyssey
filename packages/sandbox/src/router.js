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
      path: '/fields/string/text-area',
      name: 'text-area-field',
      component: () => import(/* webpackChunkName: "text-area-field" */ './views/fields/string/TextAreaFieldSandbox.vue'),
      meta: {
        title: "Text Area Field"
      }
    }
  ]
})
