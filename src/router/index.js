import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/homePage.vue')
    },
    {
      path: '/home-page',
      name: 'home-page',
      component: () => import('../views/homePage.vue')
    },
    {
      path: '/front',
      name: 'front',
      component: () => import('../views/Front.vue'),
      children: [
        {
          path: '/front-search',
          name: 'front-search',
          component: () => import('../views/FrontSearch.vue') 
        },{
          path: '/fill-out',
          name: 'fill-out',
          component: () => import('../views/FrontFillout.vue') 
        }
      ]
    },
    {
      path: '/back',
      name: 'back',
      component: () => import('../views/Back.vue'),
      children: [
        {
          path: '/back-search',
          name: 'back-search',
          component: () => import('../views/BackSearch.vue') 
        },{
          path: '/add-questionnaire',
          name: 'add-questionnaire',
          component: () => import('../views/AddQuestionnaire.vue') 
        },{
          path: '/add-question',
          name: 'add-question',
          component: () => import('../views/AddQuestion.vue') 
        },{
          path: '/list-res',
          name: 'list-res',
          component: () => import('../views/ListRes.vue') 
        },{
          path: '/one-res',
          name: 'one-res',
          component: () => import('../views/OneRes.vue') 
        },{
          path: '/statistics',
          name: 'statistics',
          component: () => import('../views/Statistics.vue') 
        }
        ,{
          path: '/update-questionnaire',
          name: 'update-questionnaire',
          component: () => import('../views/UpdateQuestionnaire.vue') 
        },{
          path: '/update-question',
          name: 'update-question',
          component: () => import('../views/UpdateQuestion.vue') 
        }
      ]
    },
  ]
})

export default router
