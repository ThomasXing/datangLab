import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Lab from '@/components/Lab'
import Login from '@/components/Login'
import JingZheng from '@/components/JingZheng'
import LabMan from '@/components/LabMan'
import Course from '@/components/Course'
import Classs from '@/components/Classs'
import XueJi from '@/components/XueJi'
import StuBaseNews from '@/components/stuBaseNews'
import Cultivate from '@/components/Cultivate'
import Gaimi from '@/components/gaimi'
import NewCourse from '@/components/newCourse'
import NewClass from '@/components/newClass'
import NewXueJi from '@/components/newXueJi'
import SourceLab from '@/components/jy/SourceLab.vue'
import Source from '@/components/jy/Source.vue'
import Ability from '@/components/jy/Ability.vue'
import JobEval from '@/components/jy/JobEval.vue'
import Tree from '@/components/jy/Tree.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lab',
      name: 'lab',
      component: Lab
    },
    {
      path: '/login/:id',
      name: 'login',
      component: Login
    },
    {
      path: '/JingZheng/:userid',
      name: 'jingzheng',
      component: JingZheng
    },
    {
      path: '/labman',
      name: 'jw',
      component: LabMan,
      children:[
        {path:'course',component:Course},
        {path:'newCourse',name:'newCourse',component:NewCourse},
        {path:'classs',component:Classs},
        {path:'newclass',name:'newClass',component:NewClass},
        {path:'xueji',component:XueJi},
        {path:'newXueJi/:stuId',name:'newXuJi',component:NewXueJi}
      ]
    },
    {
      path:'/sourceLab',
      name:'jy',
      component:SourceLab,
      children:[
        {path:'source',component:Source},
        {path:'ability',component:Ability},
        {path:'jobeval',component:JobEval},
        {path:'tree',component:Tree}
      ]
    },
    {path:'/cultivate',component:Cultivate,
      children:[
        {path:'stuBaseNews',component:StuBaseNews},
        {path:'gaimi',component:Gaimi},
      ]
    }
  ]
})
