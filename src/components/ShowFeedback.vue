<script>
import QuizPreview from './QuizPreview.vue';

export default{
    data(){
        return{
            feedbackList: [],
            quiz:{},
            currentPage: 1,
            itemsPerPage: 6, //每頁問卷數量
            currentFillin: null, //當前的填寫內容
        }
    },
    created(){
        this.showFeedback()
        this.quiz = this.quizDetail
    },
    methods:{
        //列出回覆
        showFeedback(){
            let Obj = {
                "quiz_id" : this.$route.params.id
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
            this.feedbackList = data.feedbackList.sort((a,b) => 
            new Date(b.fillinDateTime) - new Date(a.fillinDateTime)) //照填寫時間倒序排列
            console.log(this.feedbackList)
            if (this.currentPage > this.totalPage) { //更新當前所在頁
                this.currentPage = this.totalPage > 0 ? this.totalPage : 1;
            }
            })
        },
        nextPage(){
            if(this.currentPage < this.totalPage){
                this.currentPage++
            }
        },
        prevPage(){
            if(this.currentPage > 1){
                this.currentPage--
            }
        },
        showFillin(feedback) {
        
    },
    },
    components:{
        QuizPreview
    },
    props:[
        'quizDetail'
    ],
    computed: {
        //取出每頁所需要的項目
        paginateFeedback(){
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.feedbackList.slice(start, end)
        },
        //計算總頁數
        totalPage() {
            let totalPages = Math.ceil(this.feedbackList.length / this.itemsPerPage)//無條件進位
            if (this.currentPage > totalPages && totalPages > 0) {
            console.log(this.currentPage)
            this.currentPage = totalPages
            }
            return totalPages

        },
        //列出現有頁數
        pagesNum(){
            let pageList = []
            for(let i = 1; i <= this.totalPage; i++){
                pageList.push(i)
            }
            return pageList
        },
    }
}
</script>

<template>
    <div class="container" >
            <table class="table" >
                <thead>
                    <tr class="tr-first">
                    <td>編號</td>
                    <td>姓名</td>
                    <td>填答時間</td>
                    <td>填答內容</td>
                </tr>
                </thead>
                <span v-if="feedbackList == ''">尚無回覆</span>
                <tbody v-else>
                    <tr v-for="(feedback, index) in paginateFeedback" :key="feedback.fillinDateTime">
                        <td>{{ feedbackList.length - ((currentPage - 1) * itemsPerPage + index) }}</td>
                        <td>{{ feedback.userName }}</td>
                        <td>{{ feedback.fillinDateTime.replace("T",", ") }}</td>
                        <td><a href="#" @click="showFillin(feedback)"><img src="./svg/watch.svg" alt=""></a></td>
                    </tr>
                </tbody>
                
            </table>
            <!-- <span>{{ feedbackList }}</span> -->
        <!-- 頁碼 -->
        <div class="pages">
            <button v-if="currentPage > 1" @click="prevPage()">上一頁</button>
            <a href="#" class="pages" v-for="page in pagesNum" :key="page"
                @click="() => currentPage = page" :class="{'currentPage' : page === currentPage}">
                {{ page }}</a>
            <button v-if="totalPage > 1 && currentPage < totalPage" @click="nextPage()">下一頁</button>
        </div>
        </div>
        <div>
            <!-- <QuizPreview :feedbackData="feedbackList"/> -->
        </div>
</template>

<style>
span{
    margin: auto;
}
</style>