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
            fillinList:[],
            
            // fillinObj:{
            //     answer: "",
            //     type: "",
            //     required: true
            // },
            isDisabled: false,
            statusCode:"200"
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
            const Obj = {
                quiz_id: this.quizId,
                name: this.name,
                phone: this.phone,
                email: this.email,
                age: this.age,
                fillin_list: this.answerList
            };
            
            fetch("http://localhost:8080/quiz/fillin",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.statusCode == 200){
                    Swal.fire({
                        title: "已送出",
                        text: "感謝您的填寫!",
                        icon: "success"
                    });
                }else{
                    Swal.fire({
                        title: "送出失敗",
                        text: "請檢查您的填寫內容!",
                        icon: "warning"
                    });
                }
            })
        },
        //鎖定作答內容
        disableInputs() {
            const inputElements = this.$refs.inputContainer.querySelectorAll('input')
            inputElements.forEach(input => {
                this.isDisabled = true
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
            this.fillinList = []
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
    },
    computed:{
        answerList(){
            return this.questionList.map((question, index) => ({
                question_id : question.id,
                question : question.title,
                options : question.options,
                answer : this.fillinList[index],
                type: question.type,
                required: question.is_required
            }));
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
            <label for="userName" class="form-label ">姓名 (必填)</label>
            <input type="text" v-model="name" class="form-control" id="userName" required :readonly="isDisabled">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">手機 (必填)</label>
            <input type="text" v-model="phone" class="form-control" id="phone" required :readonly="isDisabled">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" :readonly="isDisabled">
        </div>
        <div class="mb-3">
            <label for="age" class="form-label">年齡</label>
            <input type="number" v-model="age" min="13" class="form-control" id="age" :readonly="isDisabled">
        </div>
        <div v-for="(question,index) in questionList" :key="index">
            <h3>{{ question.id + ". " + question.title }}
                <span v-if="question.is_required" class="required">必填</span>
            </h3>
            <div v-if="question.type === '單選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input v-model="fillinList[index]" type="radio"  :value="option"   :name="'question_' + index" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}" class="form-check-input">
                <label :for="'question_' + index" class="form-check-label">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.type === '多選題'">
                <div v-for="(option, i) in question.options.split(';')" :key="i">
                <input v-model="fillinList[index]" type="checkbox" :value="option" class="form-check-input" :name="'question_' + index" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}">
                <label :for="'question_' + index" class="form-check-label">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.type === '簡述題'">
                <textarea v-model="fillinList[index]" :disabled="isDisabled" 
                :class="{'form-control-plaintext': isDisabled}" class="form-control"></textarea>
            </div>
            </div>
        <div class="flexbox">
            <div>
            <button @click="enableInputs" class="btn-custom">修改作答</button>
            <button @click="clearInputs(),enableInputs()" class="btn-custom">清除重填</button>
            </div>
        <div>
        <button v-if="!isDisabled" @click="disableInputs" class="btn-custom btn-submit">作答預覽</button>
        <button v-else @click="fillin()" class="btn-custom btn-submit">送出問卷</button>
            </div>
        </div>
        
        <!-- {{ fillinList }} -->
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
.btn:hover{
    background-color: var(--blue);
}
.flexbox{
    display: flex;
    justify-content: space-around;
    margin-top: 5vh;
}
.btn-submit{
    margin-left: 15px;
}
</style>