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
    xueji:null,
    isXiugai:false
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
    Modify_XuJi(context,stuId) {
          axios.get("/api/yzh/research/inter/getStuManagementByStuId?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&stuId=" + stuId).then(res => {
                context.commit("modify_xuJi",res.data.stuManagementQB)
        }, err => console.log(err))
    },
    addXuJi:({commit}) => commit("add_xueji"),
    SHOW_ACTIVECLASS: ({ commit }, val) => commit("show_activeClass", val)
}
const get_stuQualification = {
	A:'硕士及以上',
	B:'本科',
	C:'专科'
}
const mutations = {
    set_title(state, val) {
        state.title = val
    },
    modify_xuJi(state, data) {
            data.stuSex==="F"? data.stuSex="女" : data.stuSex="男";
            let stuQualification =  data.stuQualification;
            data.stuQualification=get_stuQualification[stuQualification] 
            state.stuManagementQB = data;
            console.log("state.stuManagementQB",state.stuManagementQB)
            state.isXiugai=true;
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
    add_xueji:(state)=>{
        state.isXiugai=false;
    }
}
const getters = {
    title: state => state.title,
    // userid:state=>state.userid
    stuManagementQB: state => state.stuManagementQB,
    xuejiActive: state => state.xuejiActive,
    courseActive: state => state.courseActive,
    classActive: state => state.classActive,
    isXiugai:state => state.isXiugai
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations

})