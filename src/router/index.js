import Vue from 'vue'
import Router from 'vue-router'
import articleDetail from '../views/socity/articleDetail'
import App from '../App'
import home from '../views/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path: 'home',
          name: 'home',
          component: home,
          
        },
        {
          path: '/ariticle/:aId',
          name: 'article',
          component: articleDetail
        }
      ]
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
},
})
