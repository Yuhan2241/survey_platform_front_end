// import { defineStore } from 'pinia';

// export default defineStore("QuizStore",{

//     state(){
//         return{
//             quizId: 1,
//             name: "",
//             description: "",
//             startDate : "",
//             endDate : "",
//             questionList : [],
//             isPublished : false,
//         }
//     },
//     actions: {
//         addQuestion(question) {
//             this.questionList.push({ ...question, id: this.questionList.length + 1 });
//         },
//         removeQuestion(index) {
//             this.questionList.splice(index, 1);
//         },
//         publishQuiz() {
//             this.isPublished = true;
//         },
//         setQuiz(data) {
//             this.quizId = data.quizId;
//             this.name = data.name;
//             this.description = data.description;
//             this.startDate = data.startDate;
//             this.endDate = data.endDate;
//             this.questionList = data.questionList;
//             this.isPublished = data.isPublished;
//         }
//     }
// })