import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, needLogin } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
  } else {
    if (needLogin(to.name)) {
      next(`/login?redirect=${to.path}`)
      Message.error({
        message: '抱歉，该页面需登录访问~',
        duration: 3 * 1000
      })
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
