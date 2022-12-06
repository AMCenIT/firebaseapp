
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'tes', component: () => import('pages/IndexPage.vue') },
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'sign-in', component: () => import('pages/SignInPage.vue') },
      { path: 'feed', component: () => import('pages/FeedPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
