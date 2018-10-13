import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login';
import msite from '@/pages/msite/MSite'
import order from '@/pages/order/Order'
import search from '@/pages/search/Search';
import profile from '@/pages/Profile/Profile';
import shop from '@/pages/shop/shop'
import shopgoods from '@/pages/Shop/ShopGoods/ShopGoods'
import shopinfo from '@/pages/Shop/shopInfo/shopInfo'
import shopratings from '@/pages/Shop/ShopRatings/ShopRatings'

Vue.use(Router)

export default new Router({
  linkActiveClass:'on',
  // 记录当前位置
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'msite',
      component: msite,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/search',
      name: "search",
      component: search,
      meta: {
        showFooter: true
      }
    },
    {
      path:'/order',
      name: "order",
      component: order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: "login",
      component: login,
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/profile',
      name:'profile',
      component: profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/shop',
      component: shop,
      children: [
        {
          path: '/shop/goods',
          component: shopgoods
        },
        {
          path: '/shop/ratings',
          component: shopratings
        },
        {
          path: '/shop/info',
          component: shopinfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
