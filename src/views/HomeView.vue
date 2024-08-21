<script >

</script>

<template>
    <div class="container">
        <h1>動態問卷平台</h1>
        <div class="button">
            <router-link to="/manageQuizPage"><img src="../components/svg/backStage.png" alt=""></router-link>
            <router-link to="/frontPage"><img src="../components/svg/frontStage.png" alt=""></router-link>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    h1{
        color: #fff;
        text-shadow: 0 0 5px #5b947f, 0 0 5px #5b947f, 0 0 5px #5b947f; font-weight: bold;
    }
    .button{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img{
        margin: 50px;
        width: 250px;
        height: 250px;
        border: none;
        border-radius: 50%;
        box-shadow: 2px 2px 5px#ca9a5b;
    }
    .container{
        padding: 5rem;
        background-image: url(../components/svg/servey.jpg);
        background-position: 0;
        background-size: cover;
    }
</style>
