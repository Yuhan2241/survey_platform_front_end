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
            quizEditable: false,
            preview:false,
            statusCode:'',
            previewVisible: false,
            selectedDate: [],
            currentDate: new Date(),
            isDisabled:false
        }
    },
    components:{
        QuizPreview
    },
    created(){
        const startDate = new Date()
        startDate.setDate(startDate.getDate() + 1)
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
        this.selectedDate = [startDate, endDate]
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
            fetch("http://localhost:8080/quiz/search1",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
                let quizList = data.quizList[0]
                this.quizDetail.name = quizList.name
                this.quizDetail.description = quizList.description
                this.selectedDate[0] = quizList.startDate 
                this.selectedDate[1] = quizList.endDate 
                this.questionList = JSON.parse(quizList.questions) //將字串轉回陣列
                this.is_required = this.questionList[0].is_required
                if(quizList.published == true && this.selectedDate[0] < this.currentDate.getDate){
                    const inputElements = this.$refs.inputContainer.querySelectorAll('input, textarea, select, VueDatePicker')
                    inputElements.forEach(input => {
                        this.isDisabled = true
                        input.setAttribute('disabled', 'true') //設定成唯讀
                    });
                }
                console.log(quizList)
                // this.sentToQuizPage()//將題目描述起訖日傳給父層
            })
        },
        // 建立or修改問卷
        createOrUpdate(){
            let startDate
            let endDate
            if(this.selectedDate[0].length>10){
                startDate = this.selectedDate[0].toISOString().substring(0,10)
                endDate = this.selectedDate[1].toISOString().substring(0,10)
            }else{
                startDate = this.selectedDate[0]
                endDate = this.selectedDate[1]
            }
            
            let createObj = {
                id : this.quizId,
                name: this.quizDetail.name,
                description: this.quizDetail.description,
                start_date : startDate,
                end_date : endDate,
                question_list : this.questionList,
                is_published : this.isPublished
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
                this.statusCode = data.statusCode
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
                this.questionList[i].id = i+1 ;
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
            const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
            });
            Toast.fire({
            icon: "success",
            title: "修改成功!!"
            });
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
            this.createOrUpdate().then(() => {
            if (this.statusCode == 200) {
                Swal.fire("成功!已儲存至未發布問卷");
            } else {
                Swal.fire("失敗，請再試一次!");
            }
            this.statusCode = "";
            });
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
        disablePastDates(date) {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate()+1)
            return date < tomorrow
        }
    }
    
}
</script>

<template>
    <div v-if="!previewVisible" ref="inputContainer">
        <div  class="container">
            <p v-show="isDisabled" class="red">*無法編輯<strong>開放中</strong>或<strong>已結束</strong>的問卷</p>
            <form class="quizSubject context" disabled>
                <div class="mb-3 row">
                    <label for="quizTitle" class="col-form-label col-sm-3">問卷名稱</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="quizDetail.name" placeholder="請輸入問卷標題" 
                    id="quizTitle" class="form-control" required>
                    </div>
                    
                </div>
                <div class="mb-3 row">
                    <label for="quizDetail" class="col-form-label col-sm-3">問卷說明</label>
                    <div class="col-sm-8">
                        <textarea v-model="quizDetail.description" placeholder="請輸入問卷說明" id="quizDetail" class="form-control" required></textarea>
                    </div>
                </div>
                <div class="mb-3 row">
                    <p class="col-form-label col-sm-3">開始日期 - 結束日期</p>
                    <div class="col-sm-8">
                        <VueDatePicker v-model="selectedDate" format="yyyy/MM/dd" :multi-calendars="{ solo: true }" :disabled-dates="disablePastDates" 
                locale="zh-TW" class="col-sm-8" range />
                    </div>
                </div>

            </form>
        </div>
    
    <div class="container">
        <div class="questions context">
            <div class="mb-3 row">
                <label for="quesTitle" class="col-form-label col-3">編輯題目</label>
                <div class="col-sm-8">
                    <input type="text" v-model="question.title" id="quesTitle" class="form-control" required>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 col-form-label">
                題目類型
                </div>
                <div class="col-3">
                    <select v-model="question.type" name="quesType" id="quesType" class="form-select form-select-sm">
                    <option v-for="option in types" :value="option" :key="option">{{ option }}</option>
                </select>
                </div>
                
                <div class="col-auto">
                    <input type="checkbox" v-model="question.is_required" id="isRequired" class="form-check-input" >
                
                <label for="isRequired" class="form-label">必填</label>
                </div>
                <div v-show="question.type =='簡述題'" class="col-2">
                    <button class="btn add btn-outline-info" @click="addQuestion()">加入</button>
                </div>
            </div>

                
            <div v-if="question.type !=='簡述題'" class="row">
                <label for="options" class="col-form-label col-3">選項</label>
                <div class="col-5">
                    <textarea class="form-control" v-model="question.options" placeholder="(多個選項間請以分號;分隔，例:晴天;雨天)" id="options"></textarea>
                    </div>
                <button class="btn add btn-outline-info col-2" @click="addQuestion()">加入</button>
            </div>
                

            <!-- 題目列表 -->
            <table class="table" id="itxst">
                    <tr class="tr-first">
                        <td>NO.</td>
                        <td>題目</td>
                        <td>問題種類</td>
                        <td>必填</td>
                        <td>編輯</td>
                    </tr>
                
                    <tr v-for="q in questionList" :key="q.id" class="tr">
                        <td>{{q.id}}</td>
                        <td>{{q.title}}</td>
                        <td>{{q.type}}</td>
                        <td v-if="q.is_required">必填</td>
                        <td v-else></td>
                        <td>
                            <!-- 刪除問題 -->
                            <button type="button" @click="removeQuestion(q.id)" class="btn short btn-outline-danger"><img src="@/components/svg/delete.svg" alt=""></button>
                            <!-- 編輯問題 -->
                            <button type="button" @click="editQuestion(q.id),editItemVisible()" class="btn short btn-outline-info"><img src="@/components/svg/edit.svg" alt=""></button>
                        </td>
                    </tr>
                
            </table>
            <div v-if="showEditItem == true" class="editItem">
                <div class="mb-3 row">
                <label for="quesTitle" class="col-form-label col-3">編輯題目</label>
                <div class="col-sm-8">
                    <input type="text" v-model="editItem.title" id="quesTitle" class="form-control" required>
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 col-form-label">
                題目類型
                </div>
                <div class="col-3">
                    <select v-model="editItem.type" name="quesType" id="quesType" class="form-select form-select-sm">
                    <option v-for="option in types" :value="option" :key="option">{{ option }}</option>
                </select>
                </div>
                
                <div class="col-auto">
                    <input type="checkbox" v-model="editItem.is_required" id="isRequired" class="form-check-input" >
                
                <label for="isRequired" class="form-label">必填</label>
                </div>
            </div>
            <div class="row">
                
            </div>
            <div v-if="editItem.type !=='簡述題'" class="row">
                <label for="options" class="col-form-label col-3">選項</label>
                <div class="col-3">
                    <textarea class="form-control" v-model="editItem.options" placeholder="(多個選項間請以分號;分隔，例:晴天;雨天)" id="options"></textarea>
                </div>
                <div class="col-2">
                    <button class="btn-custom" @click="editItemVisible()">取消</button>
                </div>
                <div class="col-2">
                    <button class="btn-custom" @click="updateEdit(),editItemVisible()">確認修改</button>
                </div>
            </div>
                <!-- <label for="quesTitle"  required>編輯題目</label>
                <input type="text" v-model="editItem.title" class="form-control">
                <select v-model="editItem.type" name="quesType" id="quesType" class="form-select">
                    <option value="單選題">單選題</option>
                    <option value="多選題">多選題</option>
                    <option value="簡述題">簡述題</option>
                </select>
                <input type="checkbox" v-model="editItem.is_required" class="form-check-input" name="isRequired2">
                <label for="isRequired2">必填</label>
                <label for="options">選項</label>
                <textarea v-model="editItem.options" class="form-control" name="options"></textarea> -->
                
            </div>
            
        </div>
                
        <div class="row justify-content-end">
            <div class="col-5">
                <router-link to="/manageQuizPage"><button class="btn-custom">取消</button></router-link>
            </div>
            <div class="col-5">
                <button v-show="!isDisabled" class="btn-custom" @click="saveQuizMsg()">儲存修改</button>
                <button class="btn-custom btn-submit " @click="showPreview()">問卷預覽</button>
            </div>
        </div>
    </div>
</div>
    <div v-else>
        <QuizPreview :quizData="quizDetail" :quizDate="selectedDate" :questions="questionList">
        <div class="flexbox">
            <button v-show="!isDisabled" type="button" @click="showPreview()" class="btn-custom">返回修改</button>
            <RouterLink v-show="isDisabled" to="/manageQuizPage"><button type="button" class="btn-custom">回後台管理</button></RouterLink>
            <button v-show="!isDisabled" type="button" @click="publishQuiz()" class="btn-custom btn-submit">發布</button>
        </div>
        
        </QuizPreview>
    </div>
</template>

<style scoped lang="scss">
h2{
    position: absolute;
    left: 1vw;
    top: 3vh;
}
table{
    width: 75%;
    margin: auto;
    margin-bottom: 15vh;
}
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
.add{
    margin-bottom: 30px;
}
textarea{
    resize: none;
}
.short{
    width: 50px;
    margin-left: 5px;
}

.flexbox{
    display: flex;
    justify-content: space-around;
}
.btn-submit{
    margin-left: 15px;
}
.red{
    color: var(--red);
    text-align: center;
}
.col-form-label{
    text-align: right;
}
.questions{
    position: relative;
}
.editItem{
    width: 100%;
    position: absolute;
    top: 0;
    background: #fff;
}

</style>