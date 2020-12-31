import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userName:'',
        avatar:'',
        
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.token = token
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        },
        set_user(state,user){
            state.userName = user
            localStorage.userName = user
        },
        set_avatar(state,headimgurl){
            localStorage.avatar = headimgurl
            state.avatar = headimgurl
        },
    }
}) 