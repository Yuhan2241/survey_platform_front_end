import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/backEndPage',
      name: 'backEndPage',
      component: () => import('../views/BackEndPage.vue')
    },
    {
      path: '/editQuiz/:id?',
      name: 'addOrEditQuiz',
      props:true,
      component: () => import('../components/AddOrEditQuiz.vue')
    },
    {
      path: '/quizPage/:id?',
      name: 'quizPage',
      component: () => import('../views/QuizPage.vue')
    },
    {
      path: '/showFeedback/:id',
      name: 'showFeedback',
      props:true,
      component: () => import('../components/ShowFeedback.vue')
    },
        
  ]
})

export default router
