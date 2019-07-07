import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/login',
    component: () => import('@/views/login/index'),
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
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/list',
    name: 'PublishManager',
    meta: {
      title: 'publishManager',
      icon: 'list'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/publish/create'),
        name: 'CreatePublish',
        meta: {
          title: 'createPublish',
          icon: 'edit',
          roles: ['admin']
        }
      },
      {
        path: 'list',
        component: () => import('@/views/publish/list'),
        name: 'PublishList',
        meta: {
          title: 'publishList',
          icon: 'list',
          noCache: true
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/publish/edit'),
        name: 'EditPublish',
        meta: {
          title: 'editPublish',
          noCache: true,
          roles: ['admin']
        },
        hidden: true
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/users/list',
    name: 'Settings',
    meta: {
      title: 'settings',
      icon: 'settings'
    },
    children: [
      {
        path: 'users/list',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: {
          title: 'userManager',
          icon: 'user'
        }
      },
      {
        path: 'bangumi/accounts',
        component: () => import('@/views/bangumi/account'),
        name: 'BangumiAccounts',
        meta: {
          title: 'bangumiAccounts',
          icon: 'star',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    meta: {
      // title: 'profile',
      roles: ['admin']
    },
    children: [
      {
        path: '/',
        name: 'Profile',
        component: () => import('@/views/profile'),
        meta: {
          title: 'profile'
        }
      }
    ],
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
