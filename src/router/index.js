import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import ContentProduct from '../views/ContentProduct.vue'
import DetailsProduct from '../components/DetailsProduct.vue'
import Basket from '../components/Basket.vue'
import FiltredProducts from '../views/FiltredProducts.vue'
import Sidebar from '../components/Sidebar.vue'
import Categories from '../components/Categories.vue'
import Order from '../components/Order.vue'
import Login from '../components/Login'
import middlewarePipeline from './middlewarePipeline'
import guest from './middleware/guest'
import auth from './middleware/auth'

// import isSubscribed from './middleware/isSubscribed'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {

        path: '/',
        name: 'Content',
        component: ContentProduct
      },
      {
        path: 'categories/:Pid',
        name: 'categories',
        component: Categories
      },
      {
        path: '/',
        name: 'Sidebar',
        component: Sidebar
      },
      {
        path: '/filtred',
        name: 'filtredProducts',
        component: FiltredProducts
      },
      {
        path: 'detailsProduct/:Pid',
        name: 'detailsProduct',
        component: DetailsProduct,
        meta: {
          middleware: [
            auth
          ]
        }
      },
      {
        path: '/basket',
        name: 'Basket',
        component: Basket
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          middleware: [
            guest
          ]
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
