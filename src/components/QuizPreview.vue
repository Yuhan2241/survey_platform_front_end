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
    <div class="container preview">
        <span>{{ quiz.startDate +"~"+ quiz.endDate }}</span>
        <h1>{{ quiz.name }}</h1>
        <p>問卷描述: {{ quiz.description }}</p>
        <div>
            <ul>
                <label for="userName" class="form-label">姓名</label>
                <input type="text"  class="form-control" id="userName" required readonly>
                <label for="phone" class="form-label">手機</label>
                <input type="text" class="form-control" id="phone" required readonly>
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" readonly>
                <label for="age" class="form-label">年齡</label>
                <input type="number" class="form-control" id="age" readonly>
            </ul>
        </div>
        <div v-for="(question, index) in questionList" :key="index">
            <h3>{{ question.id + ". " + question.title }}
                <span v-if="question.is_required" class="required">必填</span>
            </h3>
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
        <slot></slot>
    </div>

</template>

<style scoped>
.required{
    display: inline-block;
    color: white;
    margin-left: 5px;
    margin-top: 15px;
    padding: 2px 5px;
    border-radius: 7px;
    font-size: 18px;
    background: var(--orange);
}
textarea{
    resize: none;
}
</style>