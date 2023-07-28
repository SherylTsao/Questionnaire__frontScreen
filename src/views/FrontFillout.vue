<script>
export default {
     data() {
          return {
               questionaireId: "",
               title: "",
               startAt: "",
               endAt: "",
               description: "",
               question: [],
               qOptions: [],
               reqOptionList: [],
               isDisabled: false, // 添加一个表示是否禁用输入框的变量
               showCheckBtn: false,
               name: "", //宣告"名前",表示填寫者填的名字資訊
               email: "",
               age: "",
               gender: "",
               address: "",
               phone: "",
          }
     },
     mounted() {
          // 刷新要秀出問卷資訊
          const item = this.$route.query.item;
          console.log(item);
          this.questionaireId = item
          this.showQuestion();
     },

     methods: {
          showQuestion() {
               const body = {
                    questionaireId: this.questionaireId
               }

               fetch("http://localhost:8080/show_report", {
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
                         // f12看到確定接到後端的值
                         console.log(data);
                         this.title = data.questionnaire.title;
                         console.log(this.title);
                         this.startAt = data.questionnaire.startAt;
                         this.endAt = data.questionnaire.endAt;
                         this.description = data.questionnaire.description;

                         this.question = data.questionList
                         this.qOptions = data.qoptionList
                         console.log("--------------");
                         // [遍歷list來加入'status'狀態列]
                         this.qOptions = this.qOptions.map(element => {
                              return {
                                   ...element,
                                   checkBox: false
                              }
                         })
                         console.log(this.question);
                         console.log(this.qOptions);
                    })
          },
          fillout() {
               const body = {
                    questionaireId: this.questionaireId,
                    optionList: this.reqOptionList,
                    name: this.name,
                    email: this.email,
                    age: this.age,
                    gender: this.gender,
                    address: this.address,
                    phone: this.phone
               }

               fetch("http://localhost:8080/fillout_report", {
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
                         // f12看到確定接到後端的值
                         console.log(data);
                         if (data.message == "成功した") {
                              alert("成功")
                              this.$router.push("/front")
                         }



                    })
          },
          addQuestionId(opItem) {
               console.log(opItem);
               console.log(opItem.checkBox + "~~");

               if (opItem.checkBox) {
                    // 遍历同一题目下的选项，将除当前选项外的其他选项设置为未选中
                    this.qOptions.forEach((option) => {
                         if (option.questionId === opItem.questionId && option.optionId !== opItem.optionId) {
                              let existingIndex = this.reqOptionList.indexOf(option.optionId);
                              if (existingIndex !== -1) {
                                   this.reqOptionList.splice(existingIndex, 1);
                              }
                              option.checkBox = false;
                         }
                    });
                    this.reqOptionList.push(opItem.optionId);
                    console.log("選項list TTT");
                    console.log(this.reqOptionList);
               } else {
                    this.reqOptionList = this.reqOptionList.filter((id) => id !== opItem.optionId);
                    console.log("選項list FFF");
                    console.log(this.reqOptionList);
               }

          },
          disableInputsTrue() {
               this.isDisabled = true; // 将 isDisabled 设置为 true，禁用所有输入框
               this.showCheckBtn = true
          },
          disableInputsFalse() {
               this.isDisabled = false; // 将 isDisabled 设置为 true，禁用所有输入框
               this.showCheckBtn = false

          },
     }
}
</script>
<template>
     <main>
          <hr>
          <nav class="questionnaire-info-plus-person-info flex justify-evenly">
               <nav>

                    <button class="mt-3 link rounded-t-lg border-2 border-gray-300 ms-2"
                         style="border-bottom: none;">アンケート情報</button>

                    <nav class="border-2 border-gray-300 rounded-lg p-6 w-96">

                         <div style="display: flex; justify-content: flex-end;">
                              <!-- :value綁定 渲染到畫面 -->
                              <input class="border-b border-black focus:border-primary focus:outline-none w-24"
                                   :value="startAt" disabled>
                              <p>~</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-24"
                                   :value="endAt" disabled>
                         </div>


                         <div class="text-center mt-3">

                              <input class="border-b border-black focus:border-primary focus:outline-none w-full"
                                   :value="title" disabled>

                         </div>
                         <div class="text-center mt-3">
                              <textarea name="description" :value="description"
                                   style="border: 1px solid gray; border-radius: 5px; padding: 8px;" rows="4" cols="30"
                                   placeholder="説明内容" disabled></textarea>
                         </div>
                    </nav>
               </nav>

               <nav class="person-info mt-3">
                    <button class="link rounded-t-lg border-2 border-gray-300 ms-2"
                         style="border-bottom: none;">個人情報</button>
                    <nav class="search-area border-2 border-gray-300 rounded-lg p-6 w-96">
                         <div class="title-area mb-2">
                              <p>名前</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="プロジェクト名を入力でください" :disabled="isDisabled" v-model="name">
                         </div>
                         <div class="title-area mb-2">
                              <p>メール</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="メールを入力でください" :disabled="isDisabled" v-model="email">
                         </div>
                         <div class="title-area mb-2">
                              <p>年齢</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="年齢を入力でください" :disabled="isDisabled" v-model="age">
                         </div>
                         <div class="title-area mb-2">
                              <p>性別</p>
                              <select name="" id="" :disabled="isDisabled" v-model="gender" class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72">
                                   <option value=""></option>
                                   
                                   <option value="男">男</option>
                                   <option value="女">女</option>

                              </select>
                              <!-- <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="性別を入力でください" > -->
                         </div>
                         <div class="title-area mb-2">
                              <p>住所</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="住所を入力でください" :disabled="isDisabled" v-model="address">
                         </div>
                         <div class="title-area mb-2">
                              <p>電話番号</p>
                              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                                   placeholder="電話番号を入力でください" :disabled="isDisabled" v-model="phone">
                         </div>
                    </nav>
               </nav>

          </nav>
          <hr class="mt-3">

          <nav class="questions mt-3 mb-3 flex justify-center">

               <nav>
                    <button class="link rounded-t-lg border-2 border-gray-300 ms-2" style="border-bottom: none;">問題</button>
                    <nav class="border-2 border-gray-300 rounded-lg p-6" style="width: 700px;">
                         <div class="question" v-for="(questionItem, index) of question">
                              <!-- 顯示面板 -->
                              <h2>{{ (index + 1) + questionItem.text }}</h2>
                              <!-- for迴圈印出選項 -->
                              <div class="qOption" v-for="(qOptionsItem, opindex) of qOptions">
                                   <!-- 顯示面板-->
                                   <div
                                        v-if="questionItem.questionId == qOptionsItem.questionId && questionItem.type == '單'">
                                        {{ qOptionsItem.content }}

                                        <input type="checkbox" :name="'question_' + questionItem.questionId"
                                             @change="addQuestionId(qOptionsItem)" v-model="qOptionsItem.checkBox"
                                             :checked="qOptionsItem.checkBox" :disabled="isDisabled">
                                   </div>
                                   <div
                                        v-if="questionItem.questionId == qOptionsItem.questionId && questionItem.type == '多'">
                                        {{ qOptionsItem.content }}
                                        <input type="checkbox" :name="'question_' + questionItem.questionId"
                                             @change="addQuestionId(qOptionsItem)" v-model="qOptionsItem.checkBox"
                                             :disabled="isDisabled">
                                   </div>
                              </div>
                         </div>
                    </nav>
               </nav>
          </nav>

          <nav class="btns">
               <div class="search-btn flex justify-evenly pt-5 pb-5">
                    <button
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search "></i>
                         <RouterLink to="/back-search">キャンセル</RouterLink>

                    </button>
                    <button
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                         @click="disableInputsTrue()" v-if="showCheckBtn == false">
                         <i class="fas fa-search "></i>
                         確認頁面
                    </button>
                    <button v-if="showCheckBtn" @click="fillout()"
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                         <i class="fas fa-search "></i>
                         送信
                         <!-- <RouterLink to="/add-question">送信</RouterLink> -->
                    </button>
                    <button v-if="showCheckBtn"
                         class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                         @click="disableInputsFalse()">
                         <i class="fas fa-search "></i>
                         重新填寫

                    </button>
               </div>
          </nav>
     </main>
</template>

