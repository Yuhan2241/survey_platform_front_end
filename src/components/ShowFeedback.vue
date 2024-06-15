<script>
import QuizList from './QuizList.vue';

export default{
    data(){
        return{
            feedbackList: null,
        }

    },
    created(){
        this.showFeedback()
    },
    computed(){
    },
    methods:{
        showFeedback(){
            let Obj = {
                "quiz_id" : this.$route.params.id
            }
            fetch("http://localhost:8080/quiz/feedback",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(Obj)
            })
            .then(res => res.json())
            .then(data => {
            this.feedbackList = data.feedbackList
            console.log(this.feedbackList)
            })
        },
    },
    props: ['description']
}
</script>

<template>
    <div class="container" >
            <table class="table" >
                <thead>
                    <tr class="tr-first">
                    <td>編號</td>
                    <td>姓名</td>
                    <td>填答時間</td>
                    <td>填答內容</td>
                </tr>
                </thead>
                <span v-if="feedbackList == ''">尚無回覆</span>
                <tbody v-else>
                    <tr v-for="feedback in feedbackList" :key="feedback.fillinDateTime">
                        <td>{{}}</td>
                        <td>{{ feedback.userName }}</td>
                        <td>{{ feedback.fillinDateTime.replace("T",", ") }}</td>
                        <td><a href=""><img src="./svg/watch.svg" alt=""></a></td>
                    </tr>
                </tbody>
                
            </table>
            <span>{{ feedbackList }}</span>
        </div>
</template>

<style>
span{
    margin: auto;
}
</style>