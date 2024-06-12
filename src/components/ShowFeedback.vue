<script>
export default{
    data(){

    },
    methods:{
        // showFeedback(){
        //     let Obj = {
        //         quizId : this.quizId
        //     }
        //     fetch("http://localhost:8080/quiz/feedback",{
        //         method:'POST',
        //         headers:{
        //             "Content-Type":"application/json"
        //         },
        //         body:JSON.stringify(Obj)
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     })
        // },
    }
}
</script>

<template>
    <div class="response" >
            <table class="table" >
                <tr class="tr-first">
                    <td><input type="checkbox"></td>
                    <td>編號</td>
                    <td>姓名</td>
                    <td>填答時間</td>
                    <td>填答內容</td>
                </tr>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>1</td>
                    <td>TANAKA</td>
                    <td>2024-06-20 23:09</td>
                    <td></td>
                </tr>
            </table>
        </div>
</template>