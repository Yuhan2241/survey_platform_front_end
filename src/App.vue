<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav >
      <RouterView :key="$route.fullPath"/> </nav>
      <h3>問卷平台</h3>
      <RouterLink  to="/frontPage" :key="$route.fullPath">填寫問卷</RouterLink>
      <RouterLink to="/manageQuizPage" :key="$route.fullPath">後台管理</RouterLink>
      <RouterLink to="/addQuiz">新增問卷</RouterLink>
      <RouterLink to="/navBar">navTest</RouterLink>
   
  </header>
  
</template>

<style scoped lang="scss">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
nav {
  width: 15vw;
  height: 100dvh;
  text-align: center;
  // position: fixed;
  left: 0;
  background: var(--blue-dark);
}
// .right{
//   width: 75dvw;
//   position: absolute;
//   right: 0;
// }
h3{
  padding: 1rem;
  color: #fff;
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
  padding: 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
