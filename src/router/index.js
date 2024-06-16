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
      path: '/QuizPage/:id',
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
        
  ]
})

export default router
