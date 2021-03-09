import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/components/login')
const Home = () => import('@/components/home')
const Welcome = () => import('@/components/welcome')
const User = () => import('@/components/user/user')
const Rights = () => import("@/components/power/rights")
const Roles = () => import("@/components/power/roles")
const Cate = () => import("@/components/goods/Cate")
const Params = () => import("@/components/goods/params")
const List = () => import("@/components/goods/List")
const Add = () => import("@/components/goods/add")
const Order = () => import("@/components/order/Order")


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
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: User
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/roles',
        component: Roles
      }, {
        path: '/categories',
        component: Cate
      }, {
        path: '/params',
        component: Params
      }, {
        path: '/goods',
        component: List
      }, {
        path: '/goods/add',
        component: Add
      }, {
        path: '/orders',
        component: Order
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
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
