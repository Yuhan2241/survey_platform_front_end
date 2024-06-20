<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
        barOptions: {
            emphasis: {
                focus: 'self'
            },
            title:{
                text:'',
                top:'5%',
                left:'5%'
            },
            tooltip: {
            trigger: 'item'
            },
            legend: {
            top: '15%',
            left: 'center'
            },
            
            
            label:{
                formatter:'{b}: {c}票 ({d}%) '
            },
            series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '80%'],
                startAngle: 180,
                endAngle: 360,
                data: [],
                stillShowZeroSum: false,
                itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            },
            ]
        }
        };
    },
    mounted() {
        //將物件轉為鍵值對的格式 {name:, value}並且以數量多到少排序
        this.barOptions.title.text = this.chartName
        this.barOptions.series[0].data = Object.entries(this.chartData)
        .sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
        let chartDom = this.$refs.chart
        let myChart = echarts.init(chartDom)
        myChart.setOption(this.barOptions)
    },
    props:[
        'chartData','chartName'
    ],
    resizeChart() {
        if (this.myChart) {
            this.myChart.resize();
        }
    }
};
</script>

<template>
    <div ref="chart" style="height: 50vh; width: 55vw;"><p></p></div>
</template>

<style scoped>
p{
    margin: auto;
    width: 75%;
    height: 0.5px;
    background: var(--grey);
}

div{
    background: white;
    border-radius: 15px;
}
</style>