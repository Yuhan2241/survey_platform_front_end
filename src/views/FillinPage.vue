<script>
import Swal from 'sweetalert2'
export default{
    data() {
        return {
            quiz: [],
            quizId:"",
            questionList:[],

            name: "",
            phone: "",
            email : "",
            age : "",
            fillin_list:[],
        };
    },
    mounted(){
        this.quizId = this.$route.params.id
        this.getQuiz()
    },

    methods:{
        // 取得問卷
        getQuiz(){
            let Obj={
                quizId : this.quizId
            }
            fetch("http://localhost:8080/quiz/search",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
                this.statusCode = data.statusCode
                this.quiz = data.quizList[0]
                // this.questions = data.quizList[0].questions
                this.questionList = data.quizList[0].questions
                this.questionList = JSON.parse(this.questionList)//將字串轉回陣列
                this.is_required = this.questionList[0].is_required
                console.log(this.questionList)
            })
        },
        fillin(){
            let Obj={
                "quiz_id": 16,
                "name": "ABC",
                "phone": "0906123456",
                "email" : "abc@gmail.com",
                "age" : 45,
                "fillin_list" : [ 
            {
                "question_id": 1,
                "question": "便當類吃什麼",
                "options":"雞腿;排骨;炸雞排;鱈魚",
                "answer": "排骨",
                "type": "radio",
                "required": true
            }]
            }
            fetch("http://localhost:8080/quiz/search",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
                this.statusCode = data.statusCode
                this.quiz = data.quizList[0]
                // this.questions = data.quizList[0].questions
                this.questionList = data.quizList[0].questions
                this.questionList = JSON.parse(this.questionList)//將字串轉回陣列
                this.is_required = this.questionList[0].is_required
                console.log(this.questionList)
            })
        },
    }
}

</script>
<template>
    <div class="container preview">
        <span>{{ quiz.startDate +"~"+ quiz.endDate }}</span>
        <h1>{{ quiz.name }}</h1>
        <p>問卷描述: {{ quiz.description }}</p>
        <div>
            <ul>
                <label for="userName" ><li>姓名</li></label>
                <input type="text" v-model="quiz.userName" class="input" id="userName" required readonly>
                <label for="phone"><li>手機</li></label>
                <input type="text" v-model="quiz.phone" class="input" id="phone" required readonly>
                <label for="email"><li>Email</li></label>
                <input type="email" v-model="quiz.email" class="input" id="email" readonly>
                <label for="age"><li>年齡</li></label>
                <input type="number" v-model="quiz.age" class="input" id="age" readonly>
            </ul>
        </div>
        <div v-for="question in questionList" :key="question.id">
            <h3>{{ question.id + ". " + question.title }}</h3><span v-if="question.is_required">必填</span>
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
                <textarea v-model="question.answer" :name="'question_' + index" disabled></textarea>
            </div>
        </div>

    </div>

</template>

<style scoped>
.preview{
    position: absolute;
    top: 0;
    z-index: 2;
}
</style>