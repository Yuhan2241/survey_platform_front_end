<script>
export default{
    data(){
        return{
            name: "",
            startDate : "",
            endDate : "",
            quizList: [],
        }

    },
    mounted(){
        // fetch("http://localhost:8080/quiz/search")
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)

        //     })
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
    search(){
            
        }
}
</script>

ScriptCompileContext

<template>
    <div class="search container">
        <div>
            
            <span>搜尋問卷</span>
            <input type="search" class="input" v-model="name" placeholder="請輸入問卷名稱">
        </div>
        <div >
            <span>開始時間</span>
            <input type="date" class="input"  v-model="startDate" name="" id="">

            <span> ~ 結束時間</span>
            <input type="date" class="input" v-model="endDate" name="" id="">
            
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
            <tr class="tr" v-for="quiz in quizList" :key="quiz.id">
                <td><input type="checkbox"></td>
                <td>{{ quiz.id }}</td>
                <td>{{quiz.name}}</td>
                <td><span>開放中</span> 還剩餘2天</td>
                <td>{{quiz.startDate}}</td>
                <td>{{quiz.endDate}}</td>
                <td><a href=""><img src="./svg/watch.svg" alt=""></a></td>
            </tr>
            <span>{{ jsonData }}</span>
        </table>
    </div>
    
</template>

<style scoped lang="scss">
table{  
    border-collapse: collapse;
}
td{
    border-top: 1px solid black;
}



</style>