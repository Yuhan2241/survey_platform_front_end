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
    <div class="container">
        <span>{{ fillin.quizStartDate +"~"+ fillin.quizEndDate }}</span>
        <h1>{{ fillin.quizName }}</h1>
        <p>問卷描述: {{ fillin.quizDescription }}</p>
        <div>
            <ul>
                <label for="userName" class="form-label">姓名</label>
                <input type="text" v-model="fillin.userName" class="form-control" id="userName"  required readonly>
                <label for="phone" class="form-label">手機</label>
                <input type="text" v-model="fillin.phone" class="form-control" id="phone" required readonly>
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="fillin.email" class="form-control" id="email" readonly>
                <label for="age" class="form-label">年齡</label>
                <input type="number" range v-model="fillin.age" class="form-control" id="age" readonly>
            </ul>
        </div>
        <div v-for="(question, index) in fillin.fillinList" :key="index" readonly>
            <h3>{{ question.question_id + ". " + question.question }}<span v-if="question.required == true" class="required">必填</span></h3>
            <div v-if="question.type === '單選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="radio" :checked="question.answer.includes(option)" :name="'question_' + index" :value="question.answer" disabled>{{ option }}
                </div>
            </div>
            <div v-else-if="question.type === '多選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="checkbox" :checked="question.answer.includes(option)" :name="'question_' + index" :value="question.answer" disabled>{{ option }}
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
</style>