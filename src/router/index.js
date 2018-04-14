import Vue from 'vue'
import Router from 'vue-router'
import Sort from '@/components/Sort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sort',
      component: Sort
    }
  ]
})
