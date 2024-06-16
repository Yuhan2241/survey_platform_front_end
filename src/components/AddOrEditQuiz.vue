<script>
import Swal from 'sweetalert2'
import QuizPreview from './QuizPreview.vue';

// import { useQuizStore } from '../stores/QuizStore'
export default{
    data(){
        return{
            previewVisible: false,
            //正在編輯的題目
            editItem:[],
            showEditItem: false,
            //預覽
            preview:false,
            // quizStore : useQuizStore(),
            //問卷內容
            quizId: "",
            quizDetail:{
                name: "",
                description: "",
                startDate : "",
                endDate : "",
            },
            
            questionList : [],
            isPublished : false,
            qid:1,
            

            question:{
                id : 1,
                title : "",
                options : "",
                type : "",
                is_required : false
            },
            types: ["單選題", "多選題", "簡述題"],
            //正在編輯的題目
            editItem:[],
            showEditItem: false,
            //現在時間
            currentTime: new Date(),
            preview:false,
            statusCode:'',
            previewVisible: false,
        }
    },
    components:{
        QuizPreview
    },
    created(){
        if (this.$route.params.id) {
            this.quizId = this.$route.params.id
            this.getQuiz()
            
        }else {
            // 如果沒有id就初始化一個新的問卷物件
            this.quiz = {
                id: 1,
                title: "",
                options: "",
                type: "",
                is_required: false
            }
        }
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
                let quizList = data.quizList[0]
                this.quizDetail.name = quizList.name
                this.quizDetail.description = quizList.description
                this.quizDetail.startDate = quizList.startDate 
                this.quizDetail.endDate = quizList.endDate 
                this.questionList = JSON.parse(quizList.questions) //將字串轉回陣列
                this.is_required = this.questionList[0].is_required
                console.log(this.questionList)
                // this.sentToQuizPage()//將題目描述起訖日傳給父層
            })
        },
        // 建立or修改問卷
        createOrUpdate(){
            let createObj = {
                "id" : this.quizId,
                "name": this.quizDetail.name,
                "description": this.quizDetail.description,
                "start_date" : this.quizDetail.startDate,
                "end_date" : this.quizDetail.endDate,
                "question_list" : this.questionList,
                "is_published" : this.isPublished
            }
            fetch("http://localhost:8080/quiz/create_update",{ //後端設定的地址
                method:'POST', //方法
                headers:{
                    "Content-Type":"application/json" //傳送的請求格式
                },
                body:JSON.stringify(createObj) //傳送過去的物件
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                })
        },
        
        //加入問題
        addQuestion() {
            let newQuestion = {...this.question}
            newQuestion.id = this.questionList.length +1
            this.questionList.push(newQuestion)
            this.question = {
                title : "",
                options : "",
                type : "",
                is_required : false
            }
        },
        //移除問題
        removeQuestion(questionId){
            let index = this.questionList.findIndex(q => q.id-1 === questionId-1)
            if(index != -1){
                this.questionList.splice(index, 1)
            }
            for (let i = 0; i < this.questionList.length; i++) {
                this.questionList[i].id = i ;
            }
        },
        //編輯問題
        editQuestion(questionId){
            let question = this.questionList[questionId-1]
            this.editItem = {...question}
            console.log(this.editItem)
        },
        //編輯完畢
        updateEdit(){
            if(this.editItem){
                this.questionList.splice(this.editItem.id-1, 1, this.editItem)
            }
        },
        //讓編輯區域可視化
        editItemVisible(){
            this.showEditItem = !this.showEditItem
        },
        //讓預覽區域可視化
        showPreview(){
            this.previewVisible = !this.previewVisible
            window.scrollTo(0, 0)//滾到頂端
        },
        //修改問卷彈出訊息
        saveQuizMsg(){
            if(this.statusCode == 200){
                Swal.fire("修改成功!")
                }else{
                Swal.fire("失敗，請再試一次!")
            }
            this.statusCode = ""
        },
        //發布問卷
        publishQuiz(){
            this.isPublished = true
            this.createOrUpdate()
            if(this.statusCode == 200){ //根據回傳狀態碼彈出訊息
                Swal.fire("發布成功!")
                }else{
                Swal.fire("發布失敗，請再試一次!")
            }
            this.statusCode = ""
        },
        sentToQuizPage(){
            this.$emit('quizVal', this.quizDetail)
        }
    },
    
}
</script>

<template>
    <!-- <div class="options">
        <router-link :to="`/editQuiz/${quizId}`"><label class="label" for="change">問卷編輯</label></router-link>
        <input type="radio" v-model="changeForm" value="quizContext" id="change" >
        <router-link :to="`/ShowFeedback/${quizId}`"><label class="label" for="response">問卷答覆</label></router-link>
        <input type="radio" v-model="changeForm" value="response" id="response" >
        <router-link :to="`/statistics/${quizId}`"><label for="statistics">統計</label></router-link>
        <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
    </div> -->

    <div v-if="!previewVisible">
        <div  class="container">
            <div class="quizSubject context">
                <ul>
                    <label for="quizTitle"><li>問卷名稱</li></label>
                    <input class="input" type="text" v-model="quizDetail.name" placeholder="請輸入問卷標題" id="quizTitle" required>
                    <label for="quizDetail"><li>問卷說明</li></label>
                    <textarea class="" v-model="quizDetail.description" placeholder="請輸入問卷說明" id="quizDetail" required></textarea>
                    <li>開始時間(須為今日之後)</li>
                    <input class="input" v-model="quizDetail.startDate" type="date" required>
                    <li>結束時間</li>
                    <input class="input" v-model="quizDetail.endDate" type="date" required>
                </ul>
            </div>
        </div>
    
    <div class="container">
        <div class="questions context" >
            <ul>
                <label for="quesTitle" required><li>編輯題目</li></label>
                <input class="input" type="text" v-model="question.title" id="quesTitle">
                <select v-model="question.type" name="quesType" id="quesType">
                    <option v-for="option in types" :value="option" :key="option">{{ option }}</option>
                </select>
                <input type="checkbox" v-model="question.is_required" id="isRequired">
                <label for="isRequired" >必填</label>
                <label for="options"><li>選項 (多個選項間請以分號;分隔，例:晴天;雨天)</li></label>
                <textarea class="" v-model="question.options" placeholder="" id="options"></textarea>
                <button class="btn" @click="addQuestion()">加入</button>
                <!-- 題目列表 -->
                <table class="table" id="itxst">
                        <tr class="tr-first">
                            <!-- <td><input type="checkbox"></td> -->
                            <td>NO.</td>
                            <td>題目</td>
                            <td>問題種類</td>
                            <td>必填</td>
                            <td>編輯</td>
                        </tr>
                    
                        <tr v-for="q in questionList" :key="q.id" class="tr">
                            <!-- <td><input type="checkbox"></td> -->
                            <td>{{q.id}}</td>
                            <td>{{q.title}}</td>
                            <td>{{q.type}}</td>
                            <td v-if="q.is_required">必填</td>
                            <td v-else></td>
                            <td>
                                <!-- 刪除問題 -->
                                <button type="button" @click="removeQuestion(q.id)" class="alert"><img src="@/components/svg/delete.svg" alt=""></button>
                                <!-- 編輯問題 -->
                                <button type="button" @click="editQuestion(q.id),editItemVisible()"><img src="@/components/svg/edit.svg" alt=""></button>
                            </td>
                        </tr>
                    
                </table>
                <div v-if="showEditItem == true">
                    <label for="quesTitle"  required><li>編輯題目</li></label>
                    <input class="input" type="text" v-model="editItem.title">
                    <select v-model="editItem.type" name="quesType" id="quesType">
                        <option value="單選題">單選題</option>
                        <option value="多選題">多選題</option>
                        <option value="簡述題">簡述題</option>
                    </select>
                    <input type="checkbox" v-model="editItem.is_required" id="isRequired2">
                    <label for="isRequired2">必填</label>
                    <label for="options"><li>選項</li></label>
                    <textarea class="" v-model="editItem.options"></textarea>
                    <button class="btn" @click="editItemVisible()">取消</button>
                    <button class="btn" @click="updateEdit(),editItemVisible()">確認修改</button>
                </div>
            </ul>
            
        </div>
            <router-link to="/backEndPage"><button class="btn">取消</button></router-link>
            <button class="btn" @click="createOrUpdate(),saveQuizMsg()">儲存修改</button>
            <button class="btn btn-submit" @click="showPreview()">問卷預覽</button>
    </div>
</div>
    <div v-else>
        <QuizPreview  @backToEdit="showPreview() " @publishQuiz="publishQuiz()" 
        :quizData="quizDetail" :questions="questionList"/>
    </div>
</template>

<style scoped lang="scss">

.options{
    width: 90%;
    border: 1px solid black;

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
}
textarea{
    resize: none;
}
</style>