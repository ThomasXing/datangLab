import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import qs from 'qs'
Vue.use(Vuex)
const state = {
    userid:null,
    title:null
}

const actions = {
    SET_TITLE:({commit},val)=>commit("set_title",val),
    SET_USERID:({commit},val)=>commit("set_userid",val)
}

const mutations = {
    set_title(state,val){
        state.title = val
    },
    set_userid(state,val){
        state.userid = val
    }
}
const getters = {
    title:state=>state.title,
    userid:state=>state.userid
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
    
})