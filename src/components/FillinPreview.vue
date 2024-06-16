<script>
export default{
    data() {
        return {
            fillin: {},
        };
    },
    props:[
        'fillinData', //填答內容(1筆)from ShowFeedback
    ],
    mounted(){
        this.fillin = this.fillinData
    },
    watch:{
        fillinData(newFillinData){
            this.fillin = newFillinData
        },
        id(newVal){
            this.fillinId = newVal
        }
    },
}

</script>
<template>
    <div class="container preview">
        <span>{{ fillin.quizStartDate +"~"+ fillin.quizEndDate }}</span>
        <h1>{{ fillin.name }}</h1>
        <p>問卷描述: {{ fillin.description }}</p>
        <div>
            <ul>
                <label for="userName" ><li>姓名</li></label>
                <input type="text" v-model="fillin.userName" class="input" id="userName" required readonly>
                <label for="phone"><li>手機</li></label>
                <input type="text" v-model="fillin.phone" class="input" id="phone" required readonly>
                <label for="email"><li>Email</li></label>
                <input type="email" v-model="fillin.email" class="input" id="email" readonly>
                <label for="age"><li>年齡</li></label>
                <input type="number" v-model="fillin.age" class="input" id="age" readonly>
            </ul>
        </div>
        <div v-for="(question, index) in fillin.fillinList" :key="index" readonly>
            <h3>{{ question.question_id + ". " + question.question }}</h3><span v-if="question.required == true">必填</span>
            <div v-if="question.type === '單選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="radio" :checked="question.answer === question.option" :name="'question_' + index" :value="option" disabled>{{ option }}
                </div>
            </div>
            <div v-else-if="question.type === '多選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="checkbox" :checked="question.answer.includes(option)" :name="'question_' + index" :value="option" disabled>{{ option }}
                </div>
            </div>
            <div v-else-if="question.type === '簡述題'">
                <textarea v-model="question.answer" :name="'question_' + index" disabled></textarea>
            </div>
        </div>
        <slot></slot>
    </div>

</template>

<style scoped>
.preview{
    position: absolute;
    top: 0;
    z-index: 2;
}
</style>