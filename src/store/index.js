import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)
const state = {
    userid: null,
    title: null,
    stuManagementQB: {},
    xuejiActive: null,
    courseActive: null,
    classActive: null,
    xueji: null,
    isXiugai: null,
    wh: ""
}

const actions = {
    SET_TITLE: ({ commit }, val) => commit("set_title", val),
    // SET_USERID:({commit},val)=>commit("set_userid",val),
    /*loading*/
    // hideLoading:({commit})=>{
    // 	commit(types.HIDE_LOADING)
    // },
    // showLoading:({commit})=>{
    // 	commit(types.SHOW_LOADING)
    // },

    addXuJi: ({ commit }) => commit("add_xueji"),
    WH: ({ commit }) => commit("wh"),
    xiugaiXuJi: ({ commit }) => commit("xiugaixueji"),
    SHOW_ACTIVECLASS: ({ commit }, val) => commit("show_activeClass", val)
}

const mutations = {
    set_title(state, val) {
        state.title = val
    },
    xiugaixueji(state) {
        state.isXiugai = true;
    },
    show_activeClass: (state, val) => {
        state.xuejiActive = false;
        state.courseActive = false;
        state.classActive = false;
        switch (val) {
            case "xuejiActive":
                state.xuejiActive = true;
                break;
            case "courseActive":
                state.courseActive = true;
                break;
            case "classActive":
                state.classActive = true;
                break;
        }
    },
    add_xueji: (state) => {
        state.isXiugai = false;
    },
    wh: (state) => {
       
            let wh = document.body.scrollHeight
            state.wh = wh;
            let labMenu = document.getElementById("lab-menu");
            labMenu.style.height = wh;
            console.log(state.wh)

    }
}
const getters = {
    title: state => state.title,
    // userid:state=>state.userid
    stuManagementQB: state => state.stuManagementQB,
    xuejiActive: state => state.xuejiActive,
    courseActive: state => state.courseActive,
    classActive: state => state.classActive,
    isXiugai: state => state.isXiugai,
    wh: state => state.wh
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations

})