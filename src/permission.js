import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/users/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('permission.js 1', hasToken)
  if (hasToken) {
    console.log('permission.js 2', to.path)
    if (to.path === '/users/login') {
      console.log('permission.js 3')
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('permission.js 4 ', store.getters)
      const hasGetUserInfo = store.getters.display_name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          console.log('permission.js 5')

          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          console.log('permission.js 6', error)

          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/users/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
