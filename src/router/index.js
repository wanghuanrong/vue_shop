import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/components/login')
const Home = () => import('@/components/home')
const Welcome = () => import('@/components/welcome')
const User = () => import('@/components/user/user')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,

    children: [
      {
        path: '',
        // home子路由的重定向
        redirect: 'welcome',
      },
      {
        path: 'welcome',
        component: Welcome
      },{
        path: 'users',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login') return next();

  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }

})
export default router
