<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
        barOptions: {
            tooltip: {
            trigger: 'item'
            },
            legend: {
            top: '15%',
            left: 'center'
            },
            series: [
            {
                name: '便當',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '80%'],
                startAngle: 180,
                endAngle: 360,
                data: []
            }
            ]
        }
        };
    },
    mounted() {
        //將物件轉為鍵值對的格式 {name:, value}並且過濾掉空值
        this.barOptions.series[0].data = Object.entries(this.chartData)
        .sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
        let chartDom = this.$refs.chart
        let myChart = echarts.init(chartDom)
        myChart.setOption(this.barOptions)
    },
    props:[
        'chartData'
    ]
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
</style>