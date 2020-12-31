import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import './plugins/ant-design-vue.js'

Vue.config.productionTip = false
// 页面刷新时，重新赋值token
if (localStorage.getItem('userInfo')) {
    let token = JSON.parse(localStorage.getItem('userInfo')).token;
    store.commit('set_token', JSON.stringify(token));
}

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next()
        }else {
            next({
                path: '/'
            })
        }
    }
    else {
        next();
    }
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
