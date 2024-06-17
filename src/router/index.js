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
      path: '/addQuiz',
      name: 'addQuiz',
      
      component: () => import('../components/AddOrEditQuiz.vue')
    },
    {
      path: '/quizPage/:id?',
      name: 'quizPage',
      props:true,
      component: () => import('../views/QuizPage.vue')
    },
    //前台首頁
    {
      path: '/frontPage',
      name: 'frontPage',
      props:true,
      component: () => import('../views/FrontPage.vue')
    },
    //後台首頁
    {
      path: '/manageQuizPage',
      name: 'manageQuizPage',
      props:true,
      component: () => import('../views/ManageQuizPage.vue')
    },
    {
      path: '/fillinPage/:id?',
      name: 'fillinPage',
      props:true,
      component: () => import('../views/FillinPage.vue')
    },
    {
      path: '/Statistics/20',
      name: 'Statistics',
      props:true,
      component: () => import('../components/Statistics.vue')
    }
        
  ]
})

export default router
