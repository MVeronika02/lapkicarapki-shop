import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
// import Home from '../App.vue'

import Delivery from '../components/Delivery.vue'
import Contacts from '../components/Contacts.vue'
import AboutUs from '../components/AboutUs.vue'
import HomeProducts from '../views/HomeProducts.vue'
import DetailsProduct from '../components/DetailsProduct.vue'
import Basket from '../components/Basket.vue'
import FiltredProducts from '../views/FiltredProducts.vue'
import Sidebar from '../components/Sidebar.vue'
import Categories from '../components/Categories.vue'
import ProductsCategory from '../components/ProductsCategory.vue'
import Order from '../components/Order.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import MyInfo from '../components/MyInfo.vue'
import MyOrders from '../components/MyOrders.vue'
import middlewarePipeline from './middlewarePipeline'
import guest from './middleware/guest'
import auth from './middleware/auth'
import Slider from '../views/Slider.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'delivery',
        name: 'delivery',
        component: Delivery
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: Contacts
      },
      {
        path: 'aboutUs',
        name: 'aboutUs',
        component: AboutUs
      },
      {
        path: '',
        name: 'homeProducts',
        component: HomeProducts
      },
      {
        path: 'animal=:idAnimal',
        name: 'animal',
        component: Categories,
      },
      {
        path: 'animal=:idAnimal/category=:idCategory/page=:pageNumber',
        name: 'productsCategory',
        component: ProductsCategory
      },
      // {
      //   path: '/',
      //   name: 'Sidebar',
      //   component: Sidebar
      // },
      {
        path: 'filtred',
        name: 'filtredProducts',
        component: FiltredProducts
      },
      {
        path: 'details-product=:idProduct',
        name: 'detailsProduct',
        component: DetailsProduct,
      },
      {
        path: 'basket',
        name: 'Basket',
        component: Basket
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          middleware: [
            guest
          ]
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        children: [
          {
            path: 'my-info',
            name: 'MyInfo',
            component: MyInfo
          },
          {
            path: 'my-orders',
            name: 'MyOrders',
            component: MyOrders
          }
        ]
      },
      {
        path: 'slider',
        name: 'Slider',
        component: Slider
      },
    ]
  },
  // {
  //   path: '/',
  //   name: 'homeProducts',
  //   component: HomeProducts
  // },
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
