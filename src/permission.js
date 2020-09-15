import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // get token from cookie

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


router.beforeEach(async (to, from, next) => {

  NProgress.start()

  //确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    next()
    NProgress.done()

  } else {
    if (to.path === '/login') {
      next()
      return
    }
    next('/login')
    NProgress.done()
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
