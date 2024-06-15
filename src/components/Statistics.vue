<script>
import * as echarts from 'echarts'

export default {
    data(){
        return{
            chart:null,
            charts:{},
            chartData:{"question_1": { "option_1": 10, "option_2": 20 }},
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
            
        }
    },
    mounted(){
        // this.getStatistics()
        this.$nextTick(() => {
            this.chartData = { ...this.chartData };
        });
        // this.counts.forEach((count, index) => { //foreach陣列
            // count = Object.entries(count[index]).map(([name, value]) => ({ name, value }))
            // count.forEach(option => {
                // // option = this.barOptions.series[0].data
                // const chart = echarts.init(this.$refs.charts) //初始化一個圖表 
                // chart.setOption(this.barOptions) //設定圖表選項
                // this.charts.push(chart) //建立一個新的圖表
            // })        
        // });
    },
    methods:{
        getStatistics(){
                let statisticsObj = {
                    "quiz_id" : this.$route.params.id,
                }
                fetch("http://localhost:8080/quiz/statistics",{ 
                    method:'POST', 
                    headers:{
                        "Content-Type":"application/json" 
                    },
                    body:JSON.stringify(statisticsObj) 
                })
                .then(res => res.json())
                .then(data => {
                    this.chartData = data.countMap
                    this.$nextTick(() => {
            this.chartData = { ...this.chartData };
        });
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
        
        getChartOptions(data, questionId) {
            return {
                title: {
                text: questionId
                },
                tooltip: {},
                xAxis: {
                type: 'category',
                data: Object.keys(data)
                },
                yAxis: {
                type: 'value'
                },
                series: [{
                type: 'bar',
                data: Object.values(data)
                }]
            };
        }
    },
}
</script>

<template>
    <!-- <div class="container">
        <div ref="charts" class="charts"></div>
    </div> -->
    <div v-for="(data, questionId) in chartData" :key="questionId" class="charts">
    <V-chart :options="getChartOptions(data, questionId)" style="height: 400px; width: 100%;"></V-chart>
    </div>
        
    
</template>

<style scoped>
.charts{
    width: 500px;
    height: 400px;
}


</style>