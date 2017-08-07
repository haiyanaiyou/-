import Vue from 'vue'
import Router from 'vue-router'
import Guide from '../views/guide/Guide.vue'
import Home from '../views/home/Home.vue'

import Tool from '../assets/lib/Tool'

Vue.use(Router)

const router = new Router({
  routes:[
    /* 引导页 */
    {
      path: '/guide',
      name: 'guide',
      component: Guide,
      meta: {
        status: 0
      }

    },
    /* 首页 */
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        status: 1
      }

    }
  ]
});

/* 判断用户是否是第一次打开App页面 根据具体情况判断是否显示引导页面
  *设置路由之间的跳转动画

*/
router.beforeEach((to, from, next) => {
  let store = this.a.app.$store;
  if (store) {
    if (from.meta.status > to.meta.status) store.commit('SET_ANIMATE_NAME', 'vux-pop-out');
    else store.commit('SET_ANIMATE_NAME', 'vux-pop-in');
  }
    let is_not_first = Tool.dataToLocalStorageOperate.achieve('is_not_first');
    if ( !is_not_first && to.path != '/guide' ) next ('/guide');
    else if ( is_not_first && to.path == '/guide' ) next('/');
    else next();

});

export default router
