<script>
import FeedbackPreview from './FillinPreview.vue';

export default{
    data(){
        return{
            feedbackList: [],
            // quiz:{},
            currentPage: 1,
            itemsPerPage: 6, //每頁問卷數量
            currentFillin: {}, //當前的填寫內容
            fillinId:"",
            previewVisible: false,
        }
    },
    created(){
        this.showFeedback()
        
        // this.quiz = this.quizDetail
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
            if(data.feedbackList !== ''){
                this.currentFillin = this.feedbackList.details
            }
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
        //將currentFillin設為點選的內容
        showFillin(index) {
            let fillin = this.feedbackList[index].details
            this.currentFillin = fillin
            this.fillinId = index
            console.log(fillin)
        },
        //下一個回覆
        showNextFillin() { 
            this.fillinId = this.fillinId+1
            let fillin = this.feedbackList[this.fillinId].details
            this.currentFillin = fillin;
            console.log(fillin)
        },
        showPrevFillin() { 
            this.fillinId = this.fillinId-1
            let fillin = this.feedbackList[this.fillinId].details
            this.currentFillin = fillin;
            console.log(fillin)
        },
        //讓預覽區域可視化
        showPreview(){
            this.previewVisible = !this.previewVisible
            // window.scrollTo(0, 0)//滾到頂端
        },
    },
    components:{
        FeedbackPreview
    },
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
    },

}
</script>

<template>
    <div v-if="!previewVisible" class="container" >
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
                    <tr v-for="(feedback, index) in paginateFeedback" :key="feedback.fillinDateTime" class="tr">
                        <td>{{ feedbackList.length - ((currentPage - 1) * itemsPerPage + index) }}</td>
                        <td>{{ feedback.userName }}</td>
                        <td>{{ feedback.fillinDateTime.replace("T",", ") }}</td>
                        <td><a href="#" @click="showFillin(index),showPreview()"><img src="./svg/watch.svg" alt=""></a></td>
                    
                    </tr>
                </tbody>
            </table>
            <!-- <span>{{ feedbackList }}</span> -->
        <!-- 頁碼 -->
        <div class="pagination justify-content-center">
            <button class="page-link" v-if="currentPage > 1" @click="prevPage()">上一頁</button>
            <!-- 頁碼 -->
            <a href="#" class="page-link" v-for="page in pagesNum" :key="page"
                @click="() => currentPage = page" :class="{'active' : page === currentPage}">
                {{ page }}</a>
            <button  class="page-link" v-if="totalPage > 1 && currentPage < totalPage" @click="nextPage()">下一頁</button>
        </div>
        </div>

        <div v-else>
            <FeedbackPreview  @next="showNextFillin" @prev="showPrevFillin"
            :fillinData="currentFillin" :id="fillinId">
            <button v-show="fillinId>0" @click="showPrevFillin()" class="btn-custom">前一個</button>
            <span>{{ fillinId+1 }}/{{ feedbackList.length }}</span>
            <button v-show="fillinId<feedbackList.length-1" @click="showNextFillin()" class="btn-custom">後一個</button>
            <button type="button" @click="showPreview()" class="btn">返回列表</button>
            </FeedbackPreview>
        </div>
</template>

<style>
span{
    margin: auto;
}
textarea{
    resize:none;
}
.page-link.active{
        border: none;
        background-color: var(--blue);
        color: white;
    }
</style>