<script>
export default {
  data() {
    return {
      questionaireId: "",
      participantId: "",
      writeTime: "",
      address: "",
      age: "",
      email: "",
      gender: "",
      name: "",
      phone: "",
      optionIntList: [],
      question: [],
      qOptions: []

    }
  },
  mounted() {
    const item = this.$route.query.item;
    console.log(item);
    this.participantId = item
    let writeTimeList = JSON.parse(sessionStorage.getItem("writeTime"));
    for (let writeTimeitem of writeTimeList) {
      console.log(writeTimeitem.participantId);
      if (writeTimeitem.participantId == item) {
        console.log(writeTimeitem.filling_time + "時間");
        this.writeTime = writeTimeitem.filling_time
      }
      console.log(this.writeTime + "時間");
    }

    this.showAns();
  },
  methods: {
    showAns() {
      // get出問題
      let questionaireId = sessionStorage.getItem("questionaireId")

      const body = {
        // "REQ名稱"
        participantId: this.participantId,
        questionaireId: questionaireId
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
          console.log(data);
          // 從後端取出個人資訊&問題&選項
          this.address = data.respondents.address
          this.name = data.respondents.name
          this.age = data.respondents.age
          this.email = data.respondents.email
          this.gender = data.respondents.gender
          this.phone = data.respondents.phone
          let ansList = data.answerList
          for (let ansItem of ansList) {
            this.optionIntList.push(ansItem.optionId)
          }
          this.question = data.questionList
          this.qOptions = data.qoptionList
          console.log(this.optionIntList);
          console.log(this.question);
          console.log(this.qOptions);

        })
    },
  }
}
</script>
<template>
  <main>

    <hr>
    <nav class="w-96 mx-auto pt-3.5 pb-5 font-bold">
      <div class="fillout-time">
        <!-- <div style="display: flex; justify-content: flex-end;"> -->
        <p>時間の記入</p>
        <input class="border-b border-black focus:border-primary focus:outline-none w-96" v-model="writeTime" disabled>

        <!-- </div> -->
      </div>
      <nav class="person-info mt-3">
        <button class="link rounded-t-lg border-2 border-gray-300 ms-2" style="border-bottom: none;">個人情報</button>
        <nav class="search-area border-2 border-gray-300 rounded-lg p-6 w-96">
          <div class="title-area mb-2">
            <p>名前</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="name"
              disabled>
          </div>
          <div class="title-area mb-2">
            <p>メール</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="email"
              disabled>
          </div>
          <div class="title-area mb-2">
            <p>年齢</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="age"
              disabled>
          </div>
          <div class="title-area mb-2">
            <p>性別</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="gender"
              disabled>
          </div>
          <div class="title-area mb-2">
            <p>住所</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="address"
              disabled>
          </div>
          <div class="title-area mb-2">
            <p>電話番号</p>
            <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72" v-model="phone"
              disabled>
          </div>
        </nav>
      </nav>
    </nav>

    <nav class="questions mt-3 mb-3 flex justify-center">
      <nav>
        <button class="link rounded-t-lg border-2 border-gray-300 ms-2" style="border-bottom: none;">問題</button>
        <nav class="border-2 border-gray-300 rounded-lg p-6" style="width: 700px;">

          <!-- for迴圈印出問題 -->
          <div class="question" v-for="(questionItem, index) of question">
            <!-- 顯示面板 -->
            <h2>{{ (index + 1) + questionItem.text }}</h2>
            <!-- for迴圈印出選項 -->
            <div class="qOption" v-for="(qOptionsItem, index) of qOptions">
              <!-- 顯示面板(不能填寫) -->
              <h4 v-if="questionItem.questionId == qOptionsItem.questionId">{{ qOptionsItem.content }}
                <input type="checkbox" name="" id="" v-if="optionIntList.includes(qOptionsItem.optionId)" checked
                  disabled>
              </h4>
            </div>
          </div>
        </nav>
      </nav>
    </nav>

  </main>
</template>

