<script>

import StatisticsChart from './StatisticsChart.vue';
export default {
    data(){
        return{
            quizId:'',
            quizName:'',
            chartData:{},
            textAnswer:{}
        }
    },
    components:{
        StatisticsChart
    },
    mounted() {
        this.getStatistics()
    },
    methods:{
        getStatistics(){
            let obj = {
                quiz_id : this.$route.params.id
            }
            fetch("http://localhost:8080/quiz/statistics",{ 
                method:'POST', 
                headers:{
                    "Content-Type":"application/json" 
                },
                body:JSON.stringify(obj) 
            })
            .then(res => res.json())
            .then(data => {
                this.chartData = data.countMap
                this.quizName = data.quizName
                this.textAnswer = data.textAnswer
                console.log(this.textAnswer)
            })
        },
        
    },
}
</script>

<template>
    <div class="container">
        <span>即時統計結果</span>
    <h1>{{ quizName }}</h1>
    <div v-for="(data, id) in chartData" :key="id" :chartData="data">
        <p class="h4"><strong>{{ id }}</strong></p>
        <StatisticsChart :chartData="data" :chartName="id">
        </StatisticsChart>
    </div>
    <div>
        <div v-for="(answers, question) in textAnswer" :key="question">
        <p class="h4"><strong>{{ question }}</strong></p>
        <p v-for="answer in answers" :key="answer" class="col-5 bg-light border rounded">{{ answer }}</p>
        </div>
        <!-- {{ Object.values(textAnswer) }} -->
    </div>
    
    </div>
    
</template>

<style scoped>
.row{
    width: 50%;
    margin-left: 2vw;
}
</style>