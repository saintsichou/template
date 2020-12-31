import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Login',
    component: resolve => require(["@/views/Login"], resolve),
    meta:{auth: false,title:'Login'}
  },
  {
      path: '*',
      redirect: '/'
  }
]

export default new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from) {
        return {x: 0, y: 0};
    },
    routes
});