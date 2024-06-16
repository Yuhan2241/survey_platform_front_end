<script>
export default{
    data() {
        return {
            quiz: {},
            questionList: {},

        };
    },
    props:[
        'quizData', //問卷資料from AddOrEditQuiz
        'questions', //問題列表from AddOrEditQuiz
        // 'fillinData' //填答內容(1筆)from ShowFeedback
    ],
    emits: ['backToEdit', 'publishQuiz'],
    created(){
        this.quiz = {...this.quizData},
        this.questionList = {...this.questions}
        // this.fillin = this.fillinData
    },
    // watch:{
    //     quizData(newVal) {
    //         this.quiz = newVal;
    //     },
    //     questionList(newVal) {
    //         this.questionList = newVal;
    //     },
    // fillinData(newVal) {
    // this.fillin = newVal;
    // }
    // },
    
}

</script>
<template>
    {{ quiz }}

    <div class="container preview">
        <span>{{ quiz.startDate +"~"+ quiz.endDate }}</span>
        <h1>{{ quiz.name }}</h1>
        <p>問卷描述: {{ quiz.description }}</p>
        <div>
            <ul>
                <label for="userName"><li>姓名</li></label>
                <input type="text"  class="input" id="userName" required readonly>
                <label for="phone"><li>手機</li></label>
                <input type="text" class="input" id="phone" required readonly>
                <label for="email"><li>Email</li></label>
                <input type="email" class="input" id="email" readonly>
                <label for="age"><li>年齡</li></label>
                <input type="number" class="input" id="age" readonly>
            </ul>
        </div>
        <div v-for="(question, index) in questionList" :key="index">
            <h3>{{ question.id + ". " + question.title }}</h3><span v-if="question.is_required == true">必填</span>
            <div v-if="question.type === '單選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="radio" :name="'question_' + index" :value="option">{{ option }}
                </div>
            </div>
            <div v-else-if="question.type === '多選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="checkbox" :name="'question_' + index" :value="option">{{ option }}
                </div>
            </div>
            <div v-else-if="question.type === '簡述題'">
                <textarea :name="'question_' + index"></textarea>
            </div>
        </div>
        <button type="button" @click="$emit('backToEdit')" class="btn">返回修改</button>
        <button type="button" @click="$emit('publishQuiz')" class="btn">發布</button>
    </div>

</template>

<style scoped>
/* .preview{
    position: absolute;
    top: 0;
    z-index: 2;
} */
</style>