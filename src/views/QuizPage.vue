<script>
import AddOrEditQuizVue from '@/components/AddOrEditQuiz.vue'
import ShowFeedback from '@/components/ShowFeedback.vue';
import QuizReview from '@/components/QuizPreview.vue';
import Statistics from '@/components/Statistics.vue';
export default{
    data(){
        return{
            changeForm:"quizContext",
            //問卷內容
            quizId: "",         
            
        }
    },
    components:{
        AddOrEditQuizVue, ShowFeedback, QuizReview, Statistics
    },
    props:[
        'id'
    ],
    
    
}
</script>

<template>
    <div class="options" v-if="this.$route.params.id">
        <!-- 前往問卷編輯頁 -->
        <label class="label" for="change" :class="{checked : changeForm === 'quizContext'}">問卷編輯</label>
        <input type="radio" v-model="changeForm" value="quizContext" id="change" >
        <label class="label" for="feedback" :class="{checked : changeForm === 'feedback'}">問卷回覆</label>
        <input type="radio" v-model="changeForm" value="feedback" id="feedback" >
        <label class="label" for="statistics" :class="{checked : changeForm === 'statistics'}">統計</label>
        <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
    </div>
    <div v-show="changeForm == 'quizContext'">
        <AddOrEditQuizVue/>
    </div>
    <div v-show="changeForm == 'feedback'">
        <ShowFeedback/>
    </div>
    <div v-show="changeForm == 'statistics'" class="container">
        <Statistics/>
    </div>
</template>

<style scoped lang="scss">
input{
        display: none;
    }
.label{
        border-radius: 5px 20px 0 0;
        background: #86BBD8;
        margin-right:  1px;
        padding: 10px 3%;
        color: #fff;
        display: inline-block;
    }
    .checked{
        background: #fff;
        border-bottom: none;
        color: var(--color-text);
    }
    
</style>