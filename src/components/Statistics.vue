<script>
import * as echarts from 'echarts'
import StatisticsChart from './StatisticsChart.vue';
export default {
    data(){
        return{
            // chart:null,
            // charts:{},
            quizId:'',
            quizName:'',
            chartData:{}
            // barOptions:{
            //     tooltip: {
            //         trigger: 'item'
            //     },
            //     legend: {
            //         top: '5%',
            //         left: 'center'
            //     },
            //     series: [
            //         {
            //         name: '便當',
            //         type: 'pie',
            //         radius: ['40%', '70%'],
            //         center: ['50%', '70%'],
            //         // adjust the start and end angle
            //         startAngle: 180,
            //         endAngle: 360,
            //         data: [
            //             { name: '鱈魚', value: 10 },
            //             { name: '雞腿', value: 3 },
            //             { name: '炸雞排', value: 6 },
            //             { name: '排骨', value: 3 }
            //         ]
            //         },
                
                    // {
                    // name: '飲料',
                    // type: 'pie',
                    // radius: ['40%', '70%'],
                    // center: ['50%', '70%'],
                    // // adjust the start and end angle
                    // startAngle: 180,
                    // endAngle: 360,
                    // data: [
                    //     { name: '烏龍茶', value: 6 },
                    //     { name: 'green tea', value: 4 },
                    //     { name: '紅茶', value: 0 }
                    // ]
                    // }
                // ]
                // }
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
                quiz_id : 20
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
                // for(let option in data.countMap){
                //     for(let name in data.countMap[option]){
                //         let value = data.countMap[option][name]
                //         this.counts.push({option, value})
                //     }
                // }
                //將物件轉為鍵值對的格式 {name:, value}
                // this.counts = Object.entries(data.countMap).map(([name, value]) => ({ name, value }));
                
                console.log(data.countMap)
            })
        },
    
    },

}
</script>

<template>
    {{chartData}}
    <span>即時統計結果</span>
<h1>{{ quizName }}</h1>
    <StatisticsChart v-for="(data, id) in chartData" :key="id+1" :chartData="data">
    </StatisticsChart>
        
    
</template>

<style scoped>

</style>