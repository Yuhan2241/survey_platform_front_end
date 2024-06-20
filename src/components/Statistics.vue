<script>

import StatisticsChart from './StatisticsChart.vue';
export default {
    data(){
        return{
            quizId:'',
            quizName:'',
            chartData:{}
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
                console.log(data.countMap)
            })
        },
        
    },
}
</script>

<template>
    <span>即時統計結果</span>
    <h1>{{ quizName }}</h1>
    <div v-for="(data, id) in chartData" :key="id" :chartData="data" >
        <!-- {{id}} -->
    <StatisticsChart :chartData="data" :chartName="id">
    </StatisticsChart>
    </div>
    <slot></slot>
    
</template>

<style scoped>

</style>