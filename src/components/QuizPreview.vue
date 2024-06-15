<script>
export default{
    data() {
        return {
        quiz: null
        };
    },
    props:[
        'quizData'
    ],
}

</script>

<template>
    <div class="container">
        <span>{{ quizData.startDate +"~"+ quizData.endDate }}</span>
        <p>問卷標題: {{ quizData.name }}</p>
        <p>問卷描述: {{ quizData.description }}</p>
        <div>
            <ul>
                <label for="userName"><li>姓名</li></label>
                <input type="text" class="input" id="userName" required>
                <label for="phone"><li>手機</li></label>
                <input type="text" class="input" id="phone" required>
                <label for="email"><li>Email</li></label>
                <input type="email" class="input" id="email">
                <label for="age"><li>年齡</li></label>
                <input type="number" class="input" id="age">
            </ul>
        </div>
        <div v-for="(question, index) in quizData.questionList" :key="index">
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
.container{
    position: absolute;
    top: 0;
    z-index: 2;
}
</style>