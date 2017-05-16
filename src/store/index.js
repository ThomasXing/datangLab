import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import qs from 'qs'
Vue.use(Vuex)
const state = {
    userid: null,
    title: null,
    stuManagementQB: null,
    xuejiActive: null,
    courseActive: null,
    classActive: null
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
    Modify_XuJi({ commit }, stuId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit("modify_xuJi", stuId)
                resolve()
            }, 1000)
        })
    },
    SHOW_ACTIVECLASS: ({ commit }, val) => commit("show_activeClass", val)
}

const mutations = {
    set_title(state, val) {
        state.title = val
    },
    modify_xuJi(state, stuId) {
        axios.get("/api/yzh/research/inter/getStuManagementByStuId?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&stuId=" + stuId).then(res => {
            state.stuManagementQB = res.data.stuManagementQB
        }, err => console.log(err))
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
    }
    // set_userid(state,val){
    //     state.userid = val
    // }
}
const getters = {
    title: state => state.title,
    // userid:state=>state.userid
    stuManagementQB: state => state.stuManagementQB,
    xuejiActive: state => state.xuejiActive,
    courseActive: state => state.courseActive,
    classActive: state => state.classActive
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations

})