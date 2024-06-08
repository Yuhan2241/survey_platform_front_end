<template>
    <div class="container">
        <span>問卷起訖日</span>
        <div>
            <h1>問卷主題</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quasi iure praesentium ullam dolore dolor. Maiores non magnam quos recusandae explicabo, laudantium itaque, obcaecati animi reprehenderit accusamus, iusto impedit ad.</p>
        </div>
        <div>
            <label for="userName">姓名</label>
            <input type="text" class="input" id="userName" required>
            <label for="phone">手機</label>
            <input type="text" class="input" id="phone" required>
            <label for="email">Email</label>
            <input type="email" class="input" id="email">
            <label for="age">年齡</label>
            <input type="number" class="input" id="age">
        </div>
        <RouterLink to="/AddQuiz"><button class="btn">上一頁</button></RouterLink>
        <button type="submit" class="btn">發布</button>
    </div>
</template>

<style scoped>

</style>