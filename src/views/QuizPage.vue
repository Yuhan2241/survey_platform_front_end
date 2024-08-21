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
    methods:{
        goBack() {
            // 返回上一步
            return this.$router.go(-1);
        },
    }
    
}
</script>

<template>
    <div class="goback">
        <img src="../components/svg/back.svg" @click="goBack()" alt="">
    </div>
    <div class="options" v-if="this.$route.params.id">
        <!-- 前往問卷編輯頁 -->
        <label class="label" for="change" :class="{checked : changeForm === 'quizContext'}">問卷編輯</label>
        <input type="radio" v-model="changeForm" value="quizContext" id="change" >
        <label class="label" for="feedback" :class="{checked : changeForm === 'feedback'}">問卷回覆</label>
        <input type="radio" v-model="changeForm" value="feedback" id="feedback" >
        <label class="label" for="statistics" :class="{checked : changeForm === 'statistics'}">統計</label>
        <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
    </div>
    <div class="view">
        <div v-show="changeForm == 'quizContext'">
        <AddOrEditQuizVue/>
        </div>
        <div v-show="changeForm == 'feedback'">
            <ShowFeedback/>
        </div>
        <div v-show="changeForm == 'statistics'">
            <Statistics/>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
.goback{
    cursor: pointer;
    transition: .3s ease;
    position: absolute;
    left: -5vw;
    top: 5vh;
    :hover{
        // border: 1px solid black;
        transform: scale(1.1);
        transition: .3s;
    }
}
input{
        display: none;
    }

.label{
        border-radius: 5px 20px 0 0;
        background: #86BBD8;
        margin-right:  1px;
        padding: 10px 5%;
        color: #fff;
        display: inline-block;
    }
    .checked{
        background: #fff;
        border-bottom: none;
        color: var(--color-text);
    }
    .view{
        position: absolute;
        top: 10vh;
    }
    .options{
        width: 40vw;
    // margin-left: 10vw;
    margin-top: 10vh;
    position: relative;
    left: 3vh;
    z-index: 5;
    }
</style>