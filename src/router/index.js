import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../views/ladingpage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/platform/login.vue')
    },

    {
      path: '/login/password',
      name: 'login-change-password-step-1',
      component: () => import('../views/platform/change-password-step-1.vue')
    },
    {
      path: '/login/lost/password/step/2',
      name: 'login-change-password-step-2',
      component: () => import('../views/platform/change-password-step-2.vue')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/platform/register.vue')
    },

    {
      path: '/change/points',
      name: 'change-points',
      component: () => import('../views/platform/change-points.vue'),
      meta: {
        auth: true
      }
    },

    {
      path: '/platform/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/dashboard.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/platform/shared-with-me',
      name: 'compartidos-conmigo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/my-writings/shared-with-me.vue')
    },





    {
      path: '/platform/formar-parte',
      name: 'formar-parte',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/pages/formar-parte.vue')
    },


    {
      path: '/platform/como-funciona',
      name: 'como-funciona',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/pages/como-funciona.vue')
    },

    {
      path: '/platform/dejanos-tu-opinion',
      name: 'dejanos-tu-opinion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/pages/dejanos-tu-opinion.vue')
    },
    {
      path: '/platform/recompensas',
      name: 'recompensas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/pages/recompensas.vue')
    },






    {
      path: '/platform/document/automatic/:id',
      name: 'view-automatic-document',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/single-automatic.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },

    {
      path: '/platform/document/:id',
      name: 'view-document',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/single-document.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },





    {
      path: '/platform/librarie',
      name: 'librarie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/librarie/folders.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },

    {
      path: '/platform/librarie/tags',
      name: 'librarie-tags',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/librarie/tags.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },


    {
      path: '/platform/documents/new',
      name: 'document-new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/normal/create.vue'),
      meta: {
        auth: true,

        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },

    {
      path: '/platform/documents/edit/:id',
      name: 'document-edit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/normal/create.vue'),
      props: true,
      meta: {
        auth: true,
      }
    },

    {
      path: '/platform/documents/organize/:id',
      name: 'document-organize',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/normal/organize.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },







    {
      path: '/platform/documents/automatic/new',
      name: 'autowriting-new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/automatic/create.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },


    {
      path: '/platform/documents/automatic/organize/:id',
      name: 'autowriting-organize',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/automatic/organize.vue'),
      meta: {
        auth: true,
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },












    {
      path: '/platform/autowriting/new',
      name: 'autowriting-new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/automatic/create.vue'),
      props: true,
      meta: {
        auth: true,
      }
    },

    {
      path: '/platform/autowriting/edit/:id',
      name: 'autowriting-edit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/automatic/create.vue'),
      props: true,
      meta: {
        auth: true,
      }
    },
    {
      path: '/platform/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/search/results.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/platform/search/writings',
      name: 'search-writings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/search/results-writings.vue'),
      meta: {
        auth: true,
      }
    },
    // {
    //   path: '/platform/search/document',
    //   name: 'search',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/platform/search/document.vue')
    // },



    {
      path: '/platform/my-writings',
      name: 'my-writings-folders',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/my-writings/folders.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/platform/my-writings/migration',
      name: 'my-writings-migration',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/my-writings/migrated.vue'),
      meta: {
        auth: true,
      }
    },
    {
      path: '/platform/my-writings/tags',
      name: 'my-writings-tags',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/my-writings/tags.vue'),
      meta: {
        auth: true,
      }
    },


    {
      path: '/platform/my-writings/document/automatic/:id',
      name: 'my-writings-view-automatic-document',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/my-writings/single-automatic.vue'),
      meta: {
        auth: true,
      }
    },

    {
      path: '/platform/admin/activity',
      name: 'admin-activity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/activity.vue')
    },

    {
      path: '/platform/admin/comments/documents',
      name: 'admin-comments-documents',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/comments.vue')
    },





    {
      path: '/platform/admin/payments/suscriptions',
      name: 'admin-index',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/payments/remove-suscription.vue')
    },


    {
      path: '/platform/admin/payments',
      name: 'admin-payments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/payments/list.vue')
    },

    {
      path: '/platform/admin/payments/code',
      name: 'admin-payments-code',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/payments/codes.vue')
    },


    {
      path: '/platform/admin/users',
      name: 'admin-users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/users/users.vue')
    },

    {
      path: '/platform/admin/users/:id',
      name: 'admin-users-edit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/users/edit.vue')
    },
    {
      path: '/platform/admin/folders/documents',
      name: 'admin-categories',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/folders/documents/root.vue')
    },
    {
      path: '/platform/admin/folders/v2/documents',
      name: 'admin-categories-v2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/folders/documents/rootv2.vue')
    },

    {
      path: '/platform/admin/folders/writings',
      name: 'admin-folders-writings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/folders/writings/root.vue')
    },
    {
      path: '/platform/admin/folders/v2/writings',
      name: 'admin-folders-writings-v2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/folders/writings/rootv2.vue')
    },


    {
      path: '/platform/admin/tags',
      name: 'admin-tags',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/tags.vue')
    },



    {
      path: '/platform/admin/suggest/reports',
      name: 'admin-suggest-reports',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/reports.vue')
    },


    {
      path: '/platform/admin/suggest/reports/comments',
      name: 'admin-suggest-reports-comments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/reports-comments.vue')
    },




    {
      path: '/platform/admin/suggest/feedback',
      name: 'admin-suggest-feedback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/feedback.vue')
    },






    {
      path: '/platform/admin/suggest/tags',
      name: 'admin-suggest-tags',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/tags.vue')
    },


    {
      path: '/platform/admin/suggest/folders',
      name: 'admin-suggest-folders',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/folders.vue')
    },


    {
      path: '/platform/admin/suggest/points',
      name: 'admin-suggest-points',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/admin/suggest/points.vue')
    },

    {
      path: '/platform/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/account.vue')
    },







    {
      path: '/share/w/:id',
      name: 'view-automatic-document-share',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/share-single-automatic.vue'),
      meta: {
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },
    {
      path: '/share/d/:id',
      name: 'view-document-share',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/platform/documents/share-single-document.vue'),
      meta: {
        // progress: {
        //   func: [
        //     { call: "color", modifier: "temp", argument: "#ffb000" },
        //     { call: "fail", modifier: "temp", argument: "#6e0000" },
        //     { call: "location", modifier: "temp", argument: "top" },
        //     {
        //       call: "transition",
        //       modifier: "temp",
        //       argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
        //     },
        //   ],
        // },
      },
    },









  ]
})




export default router