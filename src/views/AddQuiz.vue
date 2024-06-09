<script>
export default{
    data(){
        return{
            
            changeForm:"quizContext",
            //問卷內容
            name: "",
            description: "",
            startDate : "",
            endDate : "",
            questionList : [],
            isPublished : false,
            qid:0,

            question:{
                id : 0,
                title : "",
                options : "",
                type : "",
                isRequired : false
            },
            //正在編輯的題目
            editItem:[],
            //現在時間
            currentTime: new Date()
        }

    },
    computed:{
        
    },
    methods:{
        //建立問卷
        create(){
            let createObj = {
                name: this.name,
                description: this.description,
                start_date : this.startDate,
                end_date : this.endDate,
                question_list : this.questionList,
                is_published : false
            }
            fetch("http://localhost:8080/quiz/create_update",{ //後端設定的地址
                method:'POST', //方法
                headers:{
                    "Content-Type":"application/json" //傳送的請求格式
                },
                body:JSON.stringify(createObj) //傳送過去的資料
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        },

        
        showFeedback(){
            let Obj = {
                quizId : this.quizId
            }
            fetch("http://localhost:8080/quiz/feedback",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        },
        //加入問題
        addQuestion() {
        let newQuestion = {...this.question}
        newQuestion.id = this.questionList.length 
        this.questionList.push(newQuestion)
        this.question = {
            title : "",
            options : "",
            type : "",
            isRequired : false
        }
        },
        //移除問題
        removeQuestion(questionId){
            let index = this.questionList.findIndex(q => q.id === questionId)
            if(index != -1){
                this.questionList.splice(index, 1)
            }
            for (let i = 0; i < this.questionList.length; i++) {
                this.questionList[i].id = i ;
            }
        },
        //編輯問題
        editQuestion(questionId){
            let question = this.questionList[questionId]
            this.editItem = {...question}
            console.log(this.editItem)
        },
        //編輯完畢
        updateEdit(){

        }
    }
}
</script>

<template>
    <div class="options">
        <label class="label" for="change" :class="{checked : changeForm == 'quizContext'}">問卷編輯</label>
        <input type="radio" v-model="changeForm" value="quizContext" id="change" >
        <label class="label" for="response" :class="{checked : changeForm == 'response'}" @Click="showFeedback()">問卷答覆</label>
        <input type="radio" v-model="changeForm" value="response" id="response" >
        <label class="label" for="statistics" :class="{checked : changeForm == 'statistics'}">統計</label>
        <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
    </div>
    <div class="container">
        <div class="quizSubject context" v-show="changeForm == 'quizContext'">
            <ul>
                <label for="quizTitle"><li>問卷名稱</li></label>
                <input class="input" type="text" v-model="name" placeholder="請輸入問卷標題" id="quizTitle" required>
                <label for="quizDetail"><li>問卷說明</li></label>
                <textarea class="" v-model="description" placeholder="請輸入問卷說明" id="quizDetail" required></textarea>
                <li>開始時間(需為今日以後)</li>
                <input class="input" v-model="startDate" type="date" required>
                <li>結束時間</li>
                <input class="input" v-model="endDate" type="date" required>
            </ul>
        </div>
        <div class="response" v-show="changeForm == 'response'">
            <table class="table" >
                <tr class="tr-first">
                    <td><input type="checkbox"></td>
                    <td>編號</td>
                    <td>姓名</td>
                    <td>填答時間</td>
                    <td>填答內容</td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>1</td>
                    <td>TANAKA</td>
                    <td>2024-06-20 23:09</td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="statistics" v-show="changeForm == 'statistics'">
        </div>
    </div>
    <div class="container" v-show="changeForm == 'quizContext'">
            <div class="questions context" >
            <ul>
                <label for="quesTitle" required><li>編輯題目</li></label>
                <input class="input" type="text" v-model="question.title" id="quesTitle">
                <select v-model="question.type" name="quesType" id="quesType" selected>
                    <option value="單選題">單選題</option>
                    <option value="多選題">多選題</option>
                    <option value="簡述題">簡述題</option>
                </select>
                <input type="checkbox" v-model="question.isRequired" id="isRequired">
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
                            <td >必填</td>
                            <td>編輯</td>
                        </tr>
                    
                        <tr v-for="q in questionList" :key="q.id">
                            <!-- <td><input type="checkbox"></td> -->
                            <td>{{q.id+1}}</td>
                            <td>{{q.title}}</td>
                            <td>{{q.type}}</td>
                            <td v-if="q.isRequired">必填</td>
                            <td v-else></td>
                            <td><button type="button" @click="removeQuestion(q.id)"><img src="@/components/svg/delete.svg" alt=""></button>
                            <button type="button" @click="editQuestion(q.id)"><img src="@/components/svg/edit.svg" alt=""></button></td>
                        </tr>
                    
                </table>
                <span>{{ questionList }}</span>
                <div>
                    <label for="quesTitle"  required><li>編輯題目</li></label>
                    <input class="input" type="text" v-model="editItem.title">
                    <select v-model="question.type" name="quesType" id="quesType" selected>
                        <option value="單選題">單選題</option>
                        <option value="多選題">多選題</option>
                        <option value="簡述題">簡述題</option>
                    </select>
                    <input type="checkbox"  >
                    <label for="isRequired">必填</label>
                    <label for="options"><li>選項 (多個選項間請以分號;分隔，例:晴天;雨天)</li></label>
                    <textarea class="" v-model="question.options" placeholder="" ></textarea>
                    <button class="btn" @click="addQuestion()">加入</button>
                </div>
            </ul>
            
        </div>
            <button class="btn">取消</button>
            <button class="btn" @click="create()">儲存修改</button>
            <RouterLink to="/quizReview"><button class="btn btn-submit" @click="create()">問卷預覽</button></RouterLink>
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
        margin: 0 1px;
        padding: 10px 3%;
        
        display: inline-block;
    }
    .checked{
        background: #fff;
        border-bottom: none;
    }
}
textarea{
    resize: none;
}
</style>