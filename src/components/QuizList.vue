<script>
export default{
    data(){
        return{
            name: "",
            startDate : "",
            endDate : "",
            quizList: [],
            currentPage: 1,
            itemsPerPage: 10
        }

    },
    mounted(){
        //讓網頁載入同時抓取問卷列表
        this.search()

    },
    computed: {
        //取出該頁數所需要的項目
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.quizList.slice(start, end);
        },
        //計算總頁數
        totalPage() {
            return Math.ceil(this.quizList.length / this.itemsPerPage);//無條件進位
        },
        pagesNum(){
            let pageList = []
            for(let i = 1; i <= this.totalPage; i++){
                pageList.push(i)
            }
            return pageList
        }
    },
    methods:{
        //搜尋問卷
        search(){
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
                (this.quizList = data.quizList)
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
        }
    }
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
            
            <button type="submit" class="btn"><img src="./svg/search.svg" alt=""></button>
        </div>
    </div>
    <div class="container">
        <a href=""><img src="./svg/delete.svg" alt=""></a>
        <a href=""><img src="./svg/create.svg" alt=""></a>
        <table class="table">
            <tr>
                <td><input type="checkbox"></td>
                <td>NO.</td>
                <td>標題</td>
                <td>狀態</td>
                <td>開始日期</td>
                <td>結束日期</td>
                <td>統計</td>
            </tr>
            <tr class="tr" v-for="quiz in paginatedItems" :key="quiz.id">
                <td><input type="checkbox"></td>
                <td>{{ quiz.id }}</td>
                <td>{{quiz.name}}</td>
                <td><span>開放中</span> 還剩餘2天</td>
                <td>{{quiz.startDate}}</td>
                <td>{{quiz.endDate}}</td>
                <td><a href=""><img src="./svg/watch.svg" alt=""></a></td>
            </tr>
        </table>
        <div class="pages">
            <button v-if="currentPage > 1" @click="prevPage()">上一頁</button>
            <!-- 頁碼 -->
            <a href="#" class="pages" v-for="page in pagesNum" :key="page"
                @click="() => currentPage = page" :class="{'currentPage' : page === currentPage}">
                {{ page }}</a>
            <button @click="nextPage()">下一頁</button>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
table{  
    border-collapse: collapse;
}
td{
    border-top: 1px solid black;
}

.currentPage{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: var(--blue);
    border-radius: 50%;

}


</style>