<script>
export default{
    

}

</script>

<template>
    <AddQuiz>
        <div class="container">
            <span>問卷起訖日{{ this.startDate }}</span>
            <div>
                <h1>問卷主題</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quasi iure praesentium ullam dolore dolor. Maiores non magnam quos recusandae explicabo, laudantium itaque, obcaecati animi reprehenderit accusamus, iusto impedit ad.</p>
            </div>
            <div>
                <ul>
                    <label for="userName"><li>姓名</li></label>
                    <input type="text" class="input" id="userName" required>
                    <label for="phone"><li>手機</li></label>
                    <input type="text" class="input" id="phone" required>
                    <label for="email"><li>Email</li></label>
                    <input type="email" class="input" id="email">
                    <label for="age"><li>年齡</li></label>
                    <input type="number" class="input" id="age">
                </ul>
            </div>
            <!-- 暫時導向新增問卷 之後改成修改問卷(有帶入DB資料) -->
            <RouterLink to="/AddQuiz"><button class="btn">上一頁</button></RouterLink>
            <button type="submit" class="btn">發布</button>
        </div>
    </AddQuiz>
</template>

<style scoped>

</style>