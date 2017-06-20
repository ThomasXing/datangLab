import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)
const state = {
    title: null,
    stuManagementQB: {},
    xuejiActive: null,
    courseActive: null,
    classActive: null,
    xueji: null,
    isXiugai: null,
    schoolList: "",
    professionList: "",
    sourceToggle: true,
    taskList: [],
    courseId:"",
    reLogin:false,
    catalogId:'',
    isCurrentRow: null,
    userId:""
   
}

const actions = {
    SET_TITLE: ({ commit }, val) => commit("set_title", val),
    GET_CURRENT: ({ commit }, val) => commit("get_current", val),
    GET_USERID: ({ commit }, val) => commit("get_userid", val),
    LoginFalse: ({ commit }) => commit("login_false"),
    GET_SCHOOLLIST: ({ commit }) => {
        axios.get("/api/369research/yzh/research/inter/getAllSchool?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
            let data = res.data.schoolList;
            commit("get_schoolList", data)

        }, err => console.log(err))

    },
    GET_PROFESSIONLIST: ({ commit }) => {
        axios.get("/api/369research/yzh/research/inter/getAllProfession?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
            let data = res.data.professionList;
            commit("get_professionList", data)

        }, err => console.log(err))
    },
    addXuJi: ({ commit }) => commit("add_xueji"),
    RE_LOGIN: ({ commit }) => commit("re_login"),
    xiugaiXuJi: ({ commit }) => commit("xiugaixueji"),
    SHOW_ACTIVECLASS: ({ commit }, val) => commit("show_activeClass", val),
    SOURCE_HIDE: ({ commit }) => commit("source_hide"),
    SOURCE_ShOW: ({ commit }) => commit("source_show"),
    GET_TASKLIST: ({ commit }, item) => {
        axios.get("/api/369education/yzh/education/inter/getTaskByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&catalogId=" + item).then(res => {
             let data="";
            if(res.data!==""){
                 data = res.data.taskList;               
                for (let val of data) {
                for (let list of val.taskFileList) {
                        Vue.set(list, 'fileActive', false)               
                    if (list.fileurl.slice(-3) === "ogg" || list.fileurl.slice(-3) === "pdf") {
                        Vue.set(list, 'playIcon', "http://www.369college.com/yzhcmnet/yzh_user1/static/img/play.png")
                         Vue.set(list, 'download', false)                        
                                              
                    } else {
                        Vue.set(list, 'playIcon', "http://www.369college.com/yzhcmnet/yzh_user1/static/img/download.png")
                        Vue.set(list, 'download', list.filename)                       
                    }
                    list.fileurl="http://115.182.107.198/"+list.fileurl.replace(/http:\/\/115.182.107.198\//g,"");
                    list.filethumbnail="http://115.182.107.198/"+list.filethumbnail.replace(/http:\/\/115.182.107.198\//g,"");
                }
            }
           }
            commit("get_taskList",data)
            commit("get_catalogId",item)
        })
    },
    GET_CURRENTCLASS:({commit},row)=>commit("get_currentClass",row)


}

const mutations = {
    set_title(state, val) {
        state.title = val
    },
      get_current(state, val) {
        state.courseId = val
    },
    get_userid(state,val){
        state.userId = val;
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
    re_login:(state)=>{
        state.reLogin = true;
    },
    login_false(state){
        state.reLogin = false;
    },
    get_schoolList: (state, data) => {
        state.schoolList = data;
    },
    get_professionList: (state, data) => {
        state.professionList = data;
    },
    source_hide: (state) => {
        state.sourceToggle = false;
    },
    source_show: (state) => {
        state.sourceToggle = true;
    },
    get_taskList: (state,data) => {
        state.taskList = data;
    },
    get_catalogId:(state,item)=>{
        state.catalogId = item;
    },
    get_currentClass:(state,data)=>{
        state.isCurrentRow =  data;
    }
    
}
const getters = {
    title: state => state.title,
    userId: state => state.userId,
    courseId:state=>state.courseId,
    stuManagementQB: state => state.stuManagementQB,
    xuejiActive: state => state.xuejiActive,
    courseActive: state => state.courseActive,
    classActive: state => state.classActive,
    isXiugai: state => state.isXiugai,
    schoolList: state => state.schoolList,
    professionList: state => state.professionList,
    sourceToggle: state => state.sourceToggle,
    taskList: state => state.taskList,
    reLogin: state => state.reLogin,
    catalogId: state => state.catalogId,
    isCurrentRow: state => state.isCurrentRow,
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations

})