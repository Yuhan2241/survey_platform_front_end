<script>
export default{
    data(){
        return{ 

        }
    }
}
</script>

<template>
    <div class="search container">
        <div>
            <span>搜尋問卷</span>
            <input type="search" class="input" placeholder="請輸入問卷名稱">
        </div>
        <div >
            <span>開始時間</span>
            <input type="date" class="input" name="" id="">

            <span> ~ 結束時間</span>
            <input type="date" class="input" name="" id="">
            
            <button type="submit" class="btn"><img src="./svg/search.svg" alt=""></button>
        </div>
    </div>
        
    

</template>

<style scoped lang="scss">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
// .search{
//     height: 20vh;
//     border: 2px solid black;
//     display: flex;
//     flex-direction: column;
//     align-items: start;
//     justify-content: center;
//     padding: 5%;
// }
</style>