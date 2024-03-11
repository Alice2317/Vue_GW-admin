import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/CouponsView.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'posts',
        name: 'posts',
        component: () => import('../views/PostsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'noFound',
    component: () => import('../views/NoFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
