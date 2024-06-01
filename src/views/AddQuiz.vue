<script>

</script>

<template>
    <body>
        <div class="options">
            <ul>
                <li>主旨</li>
                <li>題目</li>
                <li>問卷回饋</li>
                <li>統計</li>
            </ul>
        </div>
        
        <div class="QuizSubject">
            <ul>
                <li>問卷名稱</li>
                <input type="text" placeholder="請輸入問卷標題">
                <li>問卷說明</li>
                <textarea placeholder=""></textarea>
                
                <li>開始時間</li>
                <input type="date">
                <li>結束時間</li>
                <input type="date">
            </ul>
        </div>
        <div class="questions">
            <ul>
                <label for="quesTitle"><li>問題</li></label>
                <input type="text" id="quesTitle">
                <select name="" id="">
                    <option value="radio">單選題</option>
                    <option value="checkbox">多選題</option>
                    <option value="text">文字簡答</option>
                </select>
                <input type="checkbox" id="isRequired"><label for="isRequired">必填</label>
                <label for="options"><li>選項 (多個選項間請以分號';'分隔)</li></label>
                <textarea placeholder="" id="options"></textarea>
            </ul>
        </div>

    </body>
</template>

<style scoped lang="scss">
body{
    width: 100%;
    height: 100dvh;
}
ul{
    list-style: none;
}
textarea{
    resize: none;
}
</style>