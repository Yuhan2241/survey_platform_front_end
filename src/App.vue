<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/backEndPage">後台首頁</RouterLink>
      <RouterLink to="/editQuiz">新增問卷</RouterLink>
      <RouterLink to="/quizPage">問卷</RouterLink>
    </nav>
    
  </header>
<div class="right">
  <RouterView :key="$route.fullPath"/>
</div>
</template>

<style scoped lang="scss">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.right{
  width: 75dvw;
  position: absolute;
  right: 0;
}



nav a.router-link-exact-active {
  color: var(--black);
  background-color: var(--blue);
}

nav a:hover {
  color: var(--color-text);
  background-color: var(--blue);
}

nav a {
  display: block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
