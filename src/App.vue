<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/backEndPage">Back End Page</RouterLink>
      <RouterLink to="/addQuiz">Add Quiz</RouterLink>
    </nav>
    
  </header>
<div class="right">
  <RouterView />
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
  color: var(--color-text);
  background-color: var(--blue);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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
