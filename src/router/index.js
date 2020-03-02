import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import analysisRouter from './modules/analysis_router'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/users/login',
    component: () => import('@/views/users/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '业务概览',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '业务概览', icon: 'dashboard' }
    }]
  },

  // analysisRouter,
  {
    path: '/analysis',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '复盘助手',
      icon: 'nested'
    },
    children: [
      {
        path: 'analysis/stragety',
        name: '战略分析',
        component: () => import('@/views/analysis/stragety/index'),
        meta: { title: '战略分析', icon: 'chart' }
      },
      {
        path: 'analysis/sales',
        name: '销售过程分析',
        component: () => import('@/views/analysis/sales/index'),
        meta: { title: '销售过程分析', icon: 'star' }
      },
      {
        path: 'analysis/marketing',
        name: '市场分析',
        component: () => import('@/views/analysis/marketing/index'),
        meta: { title: '市场分析', icon: 'documentation' }
      },
      {
        path: 'analysis/aftersale',
        name: '售后分析',
        component: () => import('@/views/analysis/aftersale/index'),
        meta: { title: '售后分析', icon: 'guide' }
      },
      {
        path: 'analysis/training',
        name: '培训管理',
        component: () => import('@/views/analysis/training/index'),
        meta: { title: '培训管理', icon: 'peoples' }
      },
      {
        path: 'analysis/product',
        name: '产品研发分析',
        component: () => import('@/views/analysis/product/index'),
        meta: { title: '产品研发分析', icon: 'form' }
      },
      {
        path: 'analysis/sales/detail/:id',
        component: () => import('@/views/analysis/sales/detail'),
        name: 'detail',
        meta: { title: '复盘', noCache: true, activeMenu: 'analysis/sales' },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/monitor',
  //   children: [{
  //     path: 'monitor',
  //     name: '服务监督',
  //     component: () => import('@/views/monitor/index'),
  //     meta: { title: '服务监督', icon: 'example' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/customer',
    children: [{
      path: 'customer',
      name: '客户管理',
      component: () => import('@/views/customers/index'),
      meta: { title: '客户管理', icon: 'people' }
    }]
  },
  {
    path: '/merchants',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '商户管理',
      icon: 'tree'
    },
    children: [
      {
        path: 'member',
        name: '员工管理',
        component: () => import('@/views/merchants/member/index'),
        meta: { title: '员工管理', noCache: true }
      },
      {
        path: 'permission',
        name: '权限管理',
        component: () => import('@/views/merchants/permission/index'),
        meta: { title: '权限管理', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
