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
        requiresAuth: true
      }
    },
    {
      path: "/task",
      name: "Task",
      component: () => import('../views/Tasks.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "editor/:id",
          name: "Editor",
          component: () => import('../views/Editor.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "editor",
          name: "EditorCreate",
          component: () => import('../views/Editor.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: "/teory",
      name: "TeoryInfo",
      component: () => import('../views/Teory.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "edit/:id",
          name: "TeoryEdit",
          component: () => import('../views/TeoryEdit.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "create",
          name: "TeoryCreate",
          component: () => import('../views/TeoryEdit.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: "/teory/:id",
      name: "TeoryView",
      component: () => import('../views/TeoryView.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/tests",
      name: "Test",
      component: () => import('../views/Test.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "edit/:id",
          name: "TestEdit",
          component: () => import('../views/TestEdit.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "create",
          name: "TestCreate",
          component: () => import('../views/TestEdit.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: "/test/:id",
      name: "TestView",
      component: () => import('../views/TestView.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import('../views/Profile.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },

  ],
  linkExactActiveClass: 'active'
};
const router = new VueRouter(opts);

export default router
