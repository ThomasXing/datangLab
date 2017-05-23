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
    schoolList: "",
    professionList:"",
    menuHeight: ""
}

const actions = {
    SET_TITLE: ({ commit }, val) => commit("set_title", val),
    GET_SCHOOLLIST: ({ commit }) => {
        axios.get("/api/yzh/research/inter/getAllSchool?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
             let data = res.data.schoolList;
            commit("get_schoolList", data) 

        },err=> console.log(err))
       
    },
    GET_PROFESSIONLIST:({commit})=>{
         axios.get("/api/yzh/research/inter/getAllProfession?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
            let data = res.data.professionList;
            commit("get_professionList", data)

        },err=> console.log(err))
    },
    addXuJi: ({ commit }) => commit("add_xueji"),
    WH: ({ commit }, menuHeight) => commit('wh', menuHeight),
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
    get_schoolList: (state,data) => {
        state.schoolList = data;
    },
    get_professionList:(state,data)=>{
        state.professionList = data;
    },
    wh: (state, menuHeight) => {
        let labMenu = document.getElementById("lab-menu");

        //    
        // state.menuHeight = menuHeight;
        // labMenu.style.height = state.menuHeight;
        // console.log(labMenu.style.height)
        // console.log(state.wh)

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
    schoolList: state => state.schoolList,
    professionList: state => state.professionList,
    menuHeight: state => state.menuHeight
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations

})