<script>
export default{
    data(){
        return{
            changeForm:"quizSubject",
        }
    }
}
</script>

<template>
    <body>
        <div class="box">

            <div class="options">
                <label for="change">主旨</label>
                <input type="radio" v-model="changeForm" value="quizSubject" id="change" >
                <label for="questions">題目</label>
                <input type="radio" v-model="changeForm" value="questions" id="questions" >
                <label for="response">問卷答覆</label>
                <input type="radio" v-model="changeForm" value="response" id="response" >
                <label for="statistics">統計</label>
                <input type="radio" v-model="changeForm" value="statistics" id="statistics" >
            </div>
            
            <div class="quizSubject context" v-show="changeForm == 'quizSubject'">
                <ul>
                    <label for="quizTitle"><li>問卷名稱</li></label>
                    <input type="text" placeholder="請輸入問卷標題" id="quizTitle" required>
                    <label for="quizDetail"><li>問卷說明</li></label>
                    <textarea placeholder="" id="quizDetail" required></textarea>
                    <li>開始時間</li>
                    <input type="date" required>
                    <li>結束時間</li>
                    <input type="date" required>
                </ul>
                <button>取消</button>
                <button @click="changeForm = 'questions'">下一步</button>
            </div>
            <div class="questions context" v-show="changeForm == 'questions'">
                <ul>
                    <label for="quesTitle" required><li>問題</li></label>
                    <input type="text" id="quesTitle">
                    <select name="" id="" required>
                        <option value="radio">單選題</option>
                        <option value="checkbox">多選題</option>
                        <option value="text">文字簡答</option>
                    </select>
                    <input type="checkbox" id="isRequired"><label for="isRequired">必填</label>
                    <label for="options"><li>選項 (多個選項間請以分號';'分隔)</li></label>
                    <textarea placeholder="" id="options"></textarea>
                </ul>
                <button @click="changeForm = 'quizSubject'">上一步</button>
                <button>問卷預覽</button>
            </div>
            <div class="response" v-show="changeForm == 'response'">
                <ul>
                    <li>編號</li>
                    <li>姓名</li>
                    <li>填答時間</li>
                    <li>填答內容</li>
                </ul>
            </div>
            <div class="statistics" v-show="changeForm == 'statistics'">
    
            </div>
        </div>
    </body>
</template>

<style scoped lang="scss">
body{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    padding: 10%;
}
.box{
    border: 1px solid black;
    width: 60dvw;
    height: auto;
    padding: 0 5% 10%;
    position: relative;
}
.context{
    input{

    }
}
.options{
    width: 100%;
    border: 1px solid black;

    input{
        display: none;
    }
    label{
        border: 1px solid black;
        margin: 2px;
        padding: 2%;
        display: inline-block;
    }
}
textarea{
    resize: none;
}
</style>