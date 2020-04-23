import Vue from 'vue'
import Router from 'vue-router'
import boardNotice from "../components/boardNotice"
import boardWrite from "../components/boardWrite";
import boardDetail from "../components/boardDetail";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'boardNotice',
      component: boardNotice
    },
    {
      path: '/boardWrite',
      name: 'boardWrite',
      component: boardWrite
    },
    {
      path: '/boardDetail',
      name: 'boardDetail',
      component: boardDetail,
      props: true
    },
  ]
})
