import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

//避免报错 Avoided redundant navigation to current location
// const originalPush = Router.prototype.push;
// Router.prototype.push = function(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    meta:{code:'home'},
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/home/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', code: 'home',affix:true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/article',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'component',
      hasMenu:true
     
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/article-manager/create'),
        name: 'CreateArticle',
        meta: { title: '创建文章', icon: 'edit' }
      },
     
    ]
  },


]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),//当转到一个新的页面时，定位到最顶端。
  routes: constantRoutes
})

const router = createRouter()
//重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  router.addRoutes([])
}
export default router
