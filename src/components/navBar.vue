<script>
export default {
    data() {
        return{

        }
    },
    
}
</script>

<template>
    <nav >
        <h3>問卷平台</h3>
        <RouterLink  to="/" :key="$route.fullPath">Home</RouterLink>
        <RouterLink  to="/frontPage" :key="$route.fullPath">填寫問卷</RouterLink>
        <RouterLink to="/manageQuizPage" :key="$route.fullPath">後台管理</RouterLink>
        <RouterLink to="/addQuiz">新增問卷</RouterLink>
        <slot></slot>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    width: 15vw;
    height: 100dvh;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    background: var(--blue-dark);
}

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