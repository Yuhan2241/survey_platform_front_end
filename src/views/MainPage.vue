<script setup>
import searchItem from '../components/SearchItem.vue'
import quizList from '../components/QuizList.vue'
</script>

<template>
    <body>
        <div class="search">
        <searchItem/>
    </div>
    <div class="quizList">
        <quizList/>
    </div>
    </body>
    
    
</template>

<style scoped>
body{
    display: block;
}
.search{
    height: 20vh;
    display: flex;
    align-items: start;
}

</style>