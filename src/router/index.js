import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    name: 'home',
    meta: { title: 'home' }
  },
  {
    path: '/index',
    redirect: '/index/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'index',
        meta: { title: 'index' }
      }
    ]
  },
  {
    path: '/posts',
    redirect: '/posts/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/posts'),
        name: 'posts',
        meta: { title: 'posts' }
      },
      {
        path: 'create',
        component: () => import('@/views/posts/profile'),
        name: 'posts.create',
        meta: { title: 'post.create' }
      },
      {
        path: ':id',
        component: () => import('@/views/posts/show'),
        name: 'posts.show',
        meta: { title: 'posts.show' }
      }
    ]
  },
  {
    path: '/my',
    component: Layout,
    children: [
      {
        path: 'notices',
        component: () => import('@/views/my/notices'),
        name: 'my.notices',
        meta: { title: 'my.notices' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'login',
    meta: { title: 'login' }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
