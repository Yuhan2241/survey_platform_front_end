<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/frontPage" :key="$route.fullPath">前台首頁</RouterLink>
      <!-- <RouterLink to="/fillinPage">填寫問卷</RouterLink> -->
      <RouterLink to="/manageQuizPage" :key="$route.fullPath">後台首頁</RouterLink>
      <RouterLink to="/addQuiz">新增問卷</RouterLink>
      <RouterLink to="/Statistics/20">測試統計</RouterLink>
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
