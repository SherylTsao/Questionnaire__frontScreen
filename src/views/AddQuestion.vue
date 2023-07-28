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
               showUpdateBtn: false,
               showCreatQBtn: true,
               uuidNum: 1,
               question: "",
               options: "",
               required: false,
               onlyOrMany: "",
               title: "",
               column: [
                    { key: `id`, column: "#" }, { key: `question`, column: "question" },
                    { key: `options`, column: "options" }, { key: `required`, column: "required" },
                    { key: `onlyOrMany`, column: "onlyOrMany" }
               ],
               dataList: [],


          }
     },
     mounted() {

     },
     methods: {
          addQuestionnaire() {
               //將問卷資訊get
               let title = sessionStorage.getItem("title")
               console.log(title);
               let description = sessionStorage.getItem("description")
               let startAt = sessionStorage.getItem("startAt")
               let endAt = sessionStorage.getItem("endAt")
               let dataList = this.dataList;
               // 將問題跟選項取出來
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
                    title: title,
                    description: description,
                    startAt: startAt,
                    endAt: endAt,
                    questionAndQoptionsVoList: questionAndQoptionsVoList
               }

               fetch("http://localhost:8080/add_project", {
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
                         if (data.message == "成功した") {
                              alert(data.message)
                              window.location.href = "http://localhost:5173/back"
                         } else {
                              alert("新增失敗")
                         }
                    })
          },
          addList() {
               console.log("addList");
               // 防呆null
               if (this.question == null || this.options == null || this.required == null || this.onlyOrMany == null) {
                    alert("エラーメッセージ")
                    return;
               }
               this.dataList.push({
                    id: this.uuidNum,
                    question: this.question,
                    options: this.options,
                    required: this.required,
                    onlyOrMany: this.onlyOrMany
               });
               this.uuidNum++;
               console.log(this.dataList);
          },
          updateList() {

          },
          deleteList() {

          },
          updateQInfoList(itemNum) {
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
          deleteQinfo(itemNum) {
               console.log(itemNum);
               for (let i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i].id == itemNum.id) {
                         console.log(this.dataList[i]);
                         this.dataList.splice(i, 1); // 从列表中移除匹配的元素
                         break; // 停止循环
                    }
               }

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
                                   <button
                                        class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                        @click="addList()" v-if="showCreatQBtn">
                                        <i class="fas fa-search "></i>
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
               <nav class="table-area" style="width: 75%; margin: 0 auto;">
                    <TableView :columns="column" :data="dataList" :showDeleteQuestionBtn="true"
                         :showEditByUpdateQuestion="true" @updateQInfo="updateQInfoList" @delete="deleteQinfo" />
               </nav>

               <div class="search-btn flex justify-between pt-5 pb-5">
                    <button
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search "></i>
                         キャンセル
                    </button>
                    <button @click="addQuestionnaire()"
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search"></i>
                         送信
                    </button>
               </div>
          </nav>


     </main>
</template>
