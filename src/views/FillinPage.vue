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
            
            isDisabled: false,
            
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
        //送出問卷
        fillin(){
            let Obj={
                "quiz_id": 16,
                "name": this.name,
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
        //鎖定作答內容
        disableInputs() {
            const inputElements = this.$refs.inputContainer.querySelectorAll('input')
            inputElements.forEach(input => {
                input.setAttribute('readonly', 'true') //設定成唯讀
                input.classList.add('form-control-plaintext')//移除input外框
            });
        },
        enableInputs() {
        this.isDisabled = false;
        this.removeClassFromInputs();
        },
        clearInputs() {
            this.name = "",
            this.phone = "",
            this.email = "",
            this.age = "",
            this.fillin_list = []
        },
        addClassToInputs() {
        const inputElements = this.$refs.inputContainer.querySelectorAll('input');
        inputElements.forEach(input => {
            input.classList.add('form-control-plaintext');
        });
        },
        removeClassFromInputs() {
        const inputElements = this.$refs.inputContainer.querySelectorAll('input');
        inputElements.forEach(input => {
            input.classList.remove('form-control-plaintext');
        });
        }
    }
            
}

</script>
<template>
    <div class="container" ref="inputContainer">
        <span>{{ quiz.startDate +"~"+ quiz.endDate }}</span>
        <h1>{{ quiz.name }}</h1>
        <p>問卷描述: {{ quiz.description }}</p>
        <div class="mb-3">
            <label for="userName" class="form-label ">姓名</label>
            <input type="text" v-model="name" class="form-contral" id="userName" required>
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">手機</label>
            <input type="text" v-model="phone" class="form-contral" id="phone" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-contral" id="email">
        </div>
        <div class="mb-3">
            <label for="age" class="form-label">年齡</label>
            <input type="number" v-model="age" class="form-contral" id="age">
        </div>
        <div v-for="question in questionList" :key="question.id">
            <h3>{{ question.id + ". " + question.title }}<span v-if="question.is_required" class="required">必填</span></h3>
            <div v-if="question.type === '單選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="radio"  :value="option" class="form-contral" name="'question_' + index" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}">
                <label for="'question_' + index">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.type === '多選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input type="checkbox" :value="option" class="form-contral" :name="'question_' + index" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}">
                <label for="'question_' + index">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.type === '簡述題'">
                <textarea v-model="question.fillin_list" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}" class="form-contral"></textarea>
            </div>
        </div>
        <button @click="enableInputs">修改作答</button>
        <button @click="clearInputs">清除重填</button>
        <button @click="disableInputs">作答預覽</button>
    </div>

</template>

<style scoped>
.container{
    padding: 5%;
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