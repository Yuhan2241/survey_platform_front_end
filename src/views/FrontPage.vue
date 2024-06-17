<script>
import Swal from 'sweetalert2'
export default{
    data(){
        return{
            quizId:"",
            name: "",
            startDate :"",
            endDate : "",
            published:false,
            quizList: [],
            currentQuiz:{},
            currentPage: 1,
            itemsPerPage: 5, //每頁問卷數量
            selectedIdList:[],
            allSelected:false,
            statuses: ["開放中", "尚未開始", "已結束"],
            selectedStatuses: ["開放中", "尚未開始", "已結束"],
        }
    },
    mounted(){
        //讓網頁載入同時抓取問卷列表
        this.getQuiz()
    },
    computed: {
        //根據狀態篩選問卷
        filteQuiz(){
            return this.quizList.filter(quiz => {
                let quizStatus = this.quizStatus(quiz).status
                this.selectedIdList = []
                return this.selectedStatuses.includes(quizStatus)
            })
        },
        //取出篩選後每頁所需要的項目
        filteAndPaginateQuiz(){
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.filteQuiz.slice(start, end)
        },
        //計算總頁數
        totalPage() {
            let totalPages = Math.ceil(this.filteQuiz.length / this.itemsPerPage)//無條件進位
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
        // selectedId(id){
        //     this.selectedIdList.push(id)
        // }
    },
    methods:{
        //搜尋問卷
        getQuiz(){
            let testObj = {
                name: this.name,
                start_date : this.startDate,
                end_date : this.endDate,
            }
            fetch("http://localhost:8080/quiz/search",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(testObj)
            })
            .then(res => res.json())
            .then(data => {
                this.quizList = data.quizList
                console.log(this.quizList)
                this.quizList.startDate = new Date(this.quizList.startDate)
                this.quizList.endDate = new Date(this.quizList.endDate)
            })
        },
        //刪除問卷
        deleteQuiz(){
            let testObj = {
                id_list: this.selectedIdList
            }
            fetch("http://localhost:8080/quiz/delete",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(testObj)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.selectedIdList=[]
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
        quizStatus(quiz){
            let startDate = new Date(quiz.startDate)
            let endDate = new Date(quiz.endDate)
            let today = new Date()
            let days, status, statusClass
            if(!quiz.published){
                status = "未發布"
                statusClass = "notPublished"
                return {status, class: statusClass}
            }
            if(startDate <= today && endDate > today){
                //因為開始結束時間為UTC+0 要減八小時轉換成UTC+8(台灣時間)
                //兩個日期相減會得到毫秒，所以要除以毫秒轉換成為天數
                days =  Math.ceil((endDate - today -1000*60*60*24)/ (1000*60*60*24)) 
                status = "開放中"
                statusClass = "open"
                if(days < 1){
                    let hours = Math.ceil((endDate - today -1000*60*60*8)/ (1000*60*60)) 
                    statusClass = "open"
                    hours = "距結束剩: " + hours + "小時"
                    return {status, hours, class: statusClass}
                }
                days =  "距結束還有: " + days + "天"
                return {status, days, class: statusClass}
            }
            if(startDate > today){
                days = Math.ceil((startDate - today)/ (1000*60*60*24))-1
                status = "尚未開始"
                statusClass = "notOpen"
                if(days < 1){
                    let hours = Math.ceil((startDate - today -1000*60*60*8)/ (1000*60*60))
                    statusClass = "notOpen"
                    hours = "距開放剩: " + hours + "小時"
                    return {status, hours, class: statusClass}
                }
                days =  "距開放還有: " + days + "天"
                return {status, days, class: statusClass}
            }
            if(endDate < today){
                let status = "已結束"
                statusClass = "ended"
                return {status, class: statusClass}
            }
        },
        showQuiz(quiz) {
            this.currentQuiz = quiz
            console.log(this.currentQuiz)
        },
    },
    watch:{
        allSelected(newVal) {
            if (newVal) {
                this.selectedIdList = this.filteQuiz.map(item => item.id);
            } else {
                this.selectedIdList = [];
            }
        }
    },
    // components:{
    //     FillinPage
    // }
}
</script>

<template>
    <div class="search container">
        <div>
            <label for="searchName">搜尋問卷</label>
            <input type="search" class="input" v-model="name" placeholder="請輸入問卷名稱" id="searchName">
        </div>
        <div >
            <label for="start">開始時間</label>
            <input type="date" class="input"  v-model="startDate" name="" id="start">

            <label for="end"> ~ 結束時間</label>
            <input type="date" class="input" v-model="endDate" name="" id="end">
            
            <button type="submit" @click="getQuiz()" class="btn"><img src="../components/svg/search.svg" alt=""></button>
        </div>
    
        <div>
            <div v-for="status in statuses" :key="status">
                <input type="checkbox" :id="status" :value="status" v-model="selectedStatuses">
                <label :for="status">{{ status }}</label>
            </div>
        </div>
    </div>
    <div class="container">
        <!-- <a @click="deleteAlert()"><img src="../components/svg/delete.svg" alt=""></a> -->
        <!-- <RouterLink to="/addQuiz"><img src="../components/svg/create.svg" alt=""></RouterLink> -->
        <table class="table">
            <thead>
                <tr>
                    <!-- <th><input type="checkbox" v-model="allSelected"></th> -->
                    <th>NO.</th>
                    <th>標題</th>
                    <th>狀態</th>
                    <th>開始日期</th>
                    <th>結束日期</th>
                    <th>統計</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tr" v-for="quiz in filteAndPaginateQuiz" :key="quiz.id">
                    <!-- <td><input type="checkbox" :value="quiz.id" v-model="selectedIdList" @change="checkAllSelected"></td> -->
                    <td>{{ quiz.id }}</td>
                    <td v-if="quizStatus(quiz).status == '開放中'"><router-link v-if="quizStatus(quiz).status == '開放中'" :to="`/fillinPage/${quiz.id}`" class="link-text">{{ quiz.name }}</router-link></td>
                    <td v-else>{{ quiz.name }}</td>
                    <td>
                        <span :class="quizStatus(quiz).class" class="status">{{ quizStatus(quiz).status}}</span> 
                        <span v-if="quizStatus(quiz).days">{{ quizStatus(quiz).days}}</span>
                        <span v-else-if="quizStatus(quiz).hours">{{ quizStatus(quiz).hours }}</span>
                    </td>
                    <td>{{quiz.startDate}}</td>
                    <td>{{quiz.endDate}}</td>
                    <td><a href=""><img src="../components/svg/watch.svg" alt=""></a></td>
                </tr>
            </tbody>
        </table>
        <div class="pages">
            <button v-if="currentPage > 1" @click="prevPage()">上一頁</button>
            <!-- 頁碼 -->
            <a href="#" class="pages" v-for="page in pagesNum" :key="page"
                @click="() => currentPage = page" :class="{'currentPage' : page === currentPage}">
                {{ page }}</a>
            <button v-if="totalPage > 1 && currentPage < totalPage" @click="nextPage()">下一頁</button>
        </div>
    </div>
    <!-- <FillinPage class="test" :quizData="currentQuiz"/> -->
</template>

<style scoped lang="scss">
.test{
    display: none;
}
    table{  
        border-collapse: collapse;
    }
    td{
        border-top: 1px solid black;
    }
    .tr:hover{
        background: var(--orange-soft);
    }
    .currentPage{
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: var(--orange-soft);
        color: white;
        border-radius: 50%;
    }

    .status{
        display: inline-block;
        color: white;
        margin-right: 5px;
        padding: 2px 5px;
        border-radius: 7px;
        }
    .notOpen{
        background-color: var(--yellow);
        scale: .8;
    }
    .open{
        background-color: var(--orange);
        scale: .9;
    }
    .ended{
        color: var(--grey);
    }
    .notPublished{
        background-color: var(--grey);
    }

</style>