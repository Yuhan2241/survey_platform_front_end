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
                <tbody v-if="feedbackList > 0">
                    <tr v-for="feedback in feedbackList" :key="feedback.fillinDateTime">
                        <td>{{feedback.id}}</td>
                        <td>TANAKA{{ description }}</td>
                        <td>2024-06-20 23:09</td>
                        <td><a href=""><img src="./svg/watch.svg" alt=""></a></td>
                    </tr>
                </tbody>
                <span v-else>尚無回覆</span>
            </table>
            <span>{{ feedbackList }}</span>
        </div>
</template>

<style>
span{
    margin: auto;
}
</style>