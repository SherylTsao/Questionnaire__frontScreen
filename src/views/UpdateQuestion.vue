<script>
import { RouterLink } from "vue-router";
import SliderBackView from "../components/SlideBack.vue";
import SearchView from "../components/Search.vue";
import TableView from "../components/Table.vue";
export default {
     components: {
          SliderBackView,
          SearchView,
          TableView,

     },
     data() {
          return {

               uuidNum: 1,
               question: "",
               options: "",
               required: false,
               onlyOrMany: "",
               title: "",
               questionObj: "",
               showUpdateBtn: false,
               showCreatQBtn: true,
               column: [
                    { key: `id`, column: "#" }, { key: `question`, column: "question" },
                    { key: `options`, column: "options" }, { key: `required`, column: "required" },
                    { key: `onlyOrMany`, column: "onlyOrMany" }
               ],
               dataList: [],
               item: null


          }
     },
     mounted() {
          const itemList = JSON.parse(this.$route.query.item);
          console.log(itemList);
          this.uuidNum = itemList.length;
          for (let item of itemList) {
               this.dataList.push({
                    id: this.uuidNum,
                    question: item.text,
                    options: item.qOptions,
                    required: item.required,
                    onlyOrMany: item.type
               });
               this.uuidNum--;
          }
     },
     methods: {
          updateQuestionnaire() {

               let title = sessionStorage.getItem("title")
               let questionaireId = sessionStorage.getItem("questionaireId")
               console.log(questionaireId);
               let description = sessionStorage.getItem("description")
               let startAt = sessionStorage.getItem("startAt")
               let endAt = sessionStorage.getItem("endAt")
               let dataList = this.dataList;
               let questionAndQoptionsVoList = [];
               for (let item of dataList) {
                    questionAndQoptionsVoList.push({
                         text: item.question,
                         type: item.onlyOrMany,
                         required: item.required,
                         qOptions: item.options
                    }
                    )
               }
               const body = {
                    // "REQ名稱"
                    questionaireId: questionaireId,
                    title: title,
                    description: description,
                    startAt: startAt,
                    endAt: endAt,
                    questionAndQoptionsVoList: questionAndQoptionsVoList
               }

               fetch("http://localhost:8080/renew_project", {
                    method: "POST",//預設是get
                    headers: {
                         'Content-Type':
                              'application/json',
                    },
                    body: JSON.stringify(body),

               })
                    .then(function (response) {
                         return response.json()
                    })
                    .then((data) => {
                         console.log(data);
                         if(data.message=="成功した"){
                              alert(data.message)
                              window.location.href ="http://localhost:5173/back"
                         }else{
                              alert("新增失敗")
                         }
                    })
          },
          addList() {
               console.log("addList");

               this.uuidNum = this.dataList.length + 1;
               this.dataList.push({
                    id: this.uuidNum,
                    question: this.question,
                    options: this.options,
                    required: this.required,
                    onlyOrMany: this.onlyOrMany
               });
               this.uuidNum--;

          },
          updateList() {

          },
          deleteList() {

          },

          updateQInfoList(itemNum) {
               console.log("~~~~~~~~");
               this.showUpdateBtn = true
               this.showCreatQBtn = false
               console.log(itemNum.id);
               for (let item of this.dataList) {
                    if (item.id == itemNum.id) {
                         console.log(item);
                         this.questionObj = item;
                    }
               }
               this.question = this.questionObj.question;
               this.options = this.questionObj.options;
               this.required = this.questionObj.required;
               this.onlyOrMany = this.questionObj.onlyOrMany;
          },
          checkUpdateQInfo() {
               this.showUpdateBtn = false
               this.showCreatQBtn = true
               this.questionObj.question = this.question
               this.questionObj.options = this.options
               this.questionObj.required = this.required
               this.questionObj.onlyOrMany = this.onlyOrMany
               this.question = ""
               this.options = ""
               this.required = false
               this.onlyOrMany = ""

          },
          deleteQinfo(itemNum) {
               console.log(itemNum);
               for (let i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i].id == itemNum.id) {
                         console.log(this.dataList[i]);
                         this.dataList.splice(i, 1); // 从列表中移除匹配的元素
                         break; // 停止循环
                    }
               }

          }

     }
}
</script>

<template>
     <main class="flex">

          <nav>

               <nav class="w-96 mx-auto font-bold pb-5">
                    <div>


                         <div class="search-area border-2 border-gray-300 rounded-lg p-6">
                              <div class="search-items flex justify-center">
                                   <nav>
                                        <div class="">
                                             <h2 class="text-center text-gray-600 mb-2">プロジェクトの詳細を入力します</h2>

                                        </div>

                                        <div class="mb-2">
                                             <p>質問</p>
                                             <input
                                                  class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                                  placeholder="質問を入力してください" v-model="question">
                                        </div>
                                        <div class="flex mb-2">
                                             <p class="mr-2">タイプ</p>
                                             <select name="" id="" v-model="onlyOrMany"
                                                  style="border: 1px solid gray; border-radius: 5px;">

                                                  <option value="單">単一選択</option>
                                                  <option value="複">複数選択</option>

                                             </select>
                                             <div class="ms-5">
                                                  <input type="checkbox" name="required" id="required" v-model="required">
                                                  <label for="required">必須</label>
                                             </div>
                                        </div>

                                        <div class="title-area">
                                             <p>選択肢</p>
                                             <input
                                                  class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                                  placeholder="選択肢を入力してください" v-model="options">
                                             <p class="text-sm text-gray-500">区別するためにセミコロンを使用してください</p>
                                        </div>

                                   </nav>
                              </div>
                              <div class="search-btn flex justify-end  pt-5">
                                   <button v-if="showCreatQBtn"
                                        class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                        @click="addList()">
                                        <i class="fas fa-search"></i>
                                        追加
                                   </button>
                                   <button
                                        class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                        v-if="showUpdateBtn" @click="checkUpdateQInfo()">
                                        <i class="fas fa-search"></i>
                                        修改確認
                                   </button>
                              </div>
                         </div>
                    </div>

               </nav>
               <TableView :columns="column" :data="dataList" :showDeleteQuestionBtn="true" :showEditByUpdateQuestion="true"
                    @updateQInfo="updateQInfoList" @delete="deleteQinfo" />
               <div class="search-btn flex justify-between pt-5 pb-5">
                    <button
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search "></i>
                         キャンセル
                    </button>
                    <button
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search" @click="updateQuestionnaire()"></i>
                         送信
                    </button>
               </div>
          </nav>


     </main>
</template>
