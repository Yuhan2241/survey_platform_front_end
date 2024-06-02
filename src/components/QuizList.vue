<template>
    <header>
        <a href=""><img src="./svg/delete.svg" alt=""></a>
        <a href=""><img src="./svg/create.svg" alt=""></a>
    </header>
    <table>
        <tr class="first">
            <td>NO.</td>
            <td>標題</td>
            <td>狀態</td>
            <td>開始日期</td>
            <td>結束日期</td>
            <td>統計</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet</td>
            <td><span>開放中</span> 還剩餘2天</td>
            <td>2024.06.01</td>
            <td>2024.06.05</td>
            <td>前往</td>
        </tr>
    </table>
    
</template>

<style scoped lang="scss">
table{
    text-align: center;
    width: 100%;    
    border-collapse: collapse;
}
td{
    border-top: 1px solid black;
}

</style>