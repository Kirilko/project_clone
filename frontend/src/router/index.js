import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

let opts = {
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/tests",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/teory",
      name: "TeoryInfo",
      component: () => import('../views/Teory.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: "edit/:id",
          name: "TeoryEdit",
          component: () => import('../views/TeoryEdit.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: "create",
          name: "TeoryCreate",
          component: () => import('../views/TeoryEdit.vue'),
          meta: {
            requiresAuth: false
          }
        },
      ]
    },
    {
      path: "/teory/:id",
      name: "TeoryView",
      component: () => import('../views/TeoryView.vue'),
      meta: {
        requiresAuth: false
      },
    },
    {
      path: "/tests",
      name: "Test",
      component: () => import('../views/Test.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: "edit/:id",
          name: "TestEdit",
          component: () => import('../views/TestEdit.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: "create",
          name: "TestCreate",
          component: () => import('../views/TestEdit.vue'),
          meta: {
            requiresAuth: false
          }
        },
      ]
    },
    {
      path: "/test/:id",
      name: "TestView",
      component: () => import('../views/TestView.vue'),
      meta: {
        requiresAuth: false
      },
    },
  ],
  linkExactActiveClass: 'active'
};
const router = new VueRouter(opts);

export default router
