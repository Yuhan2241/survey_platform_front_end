<script>
export default{
    data(){
        return{ 

        }
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <body>
        <div>
            <span>搜尋問卷</span>
            <input type="text" placeholder="請輸入問卷名稱">
    </div>
        <div>
            <span>開始時間</span>
            <input type="date" name="" id="">

            <span> ~ 結束時間</span>
            <input type="date" name="" id="">
            
        </div>
        <button type="submit"><img src="./svg/search.svg" alt="">搜尋</button>
    </body>
        
    

</template>

<style scoped lang="scss">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    width: 100dvw;
    height: 10dvh;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>