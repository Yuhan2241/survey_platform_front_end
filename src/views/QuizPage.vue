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
            name: "",
            description: "",
            startDate : "",
            endDate : "",
            questionList : [],
            isPublished : false,
            qid:1,

            question:{
                id : 1,
                title : "",
                options : "",
                type : "",
                isRequired : false
            },
            types: ["單選題", "多選題", "簡述題"],
            //正在編輯的題目
            editItem:[],
            //現在時間
            currentTime: new Date()
        }
    },
    // created(){
    //     if (this.$route.params.id) {
    //         // this.quizId = this.$route.params.id
    //     this.getQuiz
    //     this.showFeedback
    //     }else {
    //         // 如果沒有id就初始化一個新的問卷物件
    //         this.quiz = {
    //             id: 1,
    //             title: "",
    //             options: "",
    //             type: "",
    //             is_required: false
    //         }
    //     }
    // },
    methods:{
    },
    components:{
        AddOrEditQuizVue, ShowFeedback, QuizReview, Statistics
    },
    props:[
        'id'
    ]
    
}
</script>

<template>
    <div class="options" v-if="this.$route.params.id">
        <!-- 前往問卷編輯頁 -->
        <label class="label" for="change" :class="{checked : changeForm === 'quizContext'}">問卷編輯</label>
        <input type="radio" v-model="changeForm" value="quizContext" id="change" >
        <label class="label" for="response" :class="{checked : changeForm === 'response'}">問卷答覆</label>
        <input type="radio" v-model="changeForm" value="response" id="response" >
        <label class="label" for="statistics" :class="{checked : changeForm === 'statistics'}">統計</label>
        <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
    </div>
    <div v-show="changeForm == 'quizContext'">
        <AddOrEditQuizVue/>
    </div>
    <div v-show="changeForm == 'response'">
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