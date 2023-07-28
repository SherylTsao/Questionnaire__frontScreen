<script>
export default {
  data() {
    return {
      // 自己宣告 ，用於雙向綁定
      title: null,
      description: null,
      startAt: "",
      endAt: "",
      // 跳出視窗
      isShow: false,
      message: "",
      item: null, // 添加item属性并进行初始化
      questionnaire:null,
      questionAndQoptionsVoList:[]
    }
  },
  mounted() {
    const item = this.$route.query.item;
    console.log(item);
    sessionStorage.setItem("questionaireId", item)
    this.item = item;
    this.findByQuestionnaireInfo();
  },
  components: {

  },
  methods: {
    // 開啟&關閉 插入的視窗方法
    change() {
      // false改成true!!!!
      this.isShow = !this.isShow;
      if (this.message = "成功した") {
        this.$router.push('/addQuestion');
      }
    },
    addQuestionnaire() {
      sessionStorage.setItem("title", this.title)
      sessionStorage.setItem("description", this.description)
      sessionStorage.setItem("startAt", this.startAt)
      sessionStorage.setItem("endAt", this.endAt)
    },
    findByQuestionnaireInfo(){
      const body = {
        // "REQ名稱"
        questionaireId: this.item

      }

      fetch("http://localhost:8080/showQuestionnaireInfo", {
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
          this.title=data.questionnaire.title
          this.description=data.questionnaire.description
          this.startAt=data.questionnaire.startAt
          this.endAt=data.questionnaire.endAt
          this.questionAndQoptionsVoList = data.questionAndQoptionsVoList
          console.log(this.questionAndQoptionsVoList);
        })
    }
  },
 
}
</script>
<template>
  <nav class="w-96 mx-auto  pb-5 font-bold">
    <div>


      <div class="search-area border-2 border-gray-300 rounded-lg p-6">

        <div class="search-items flex justify-center">
          <nav>
            <div class="">
              <h2 class="text-center text-gray-600 mb-2">プロジェクトの詳細を入力します</h2>

            </div>
            <div class="title-area mb-2">
              <p>名前</p>
              <input class="border-b border-black focus:border-primary focus:outline-none w-full md:w-72"
                placeholder="プロジェクト名を入力でください" v-model="title">
            </div>

            <div class="describe-area mb-2">
              <p>説明内容</p>
              <textarea name="description" v-model="description"
                style="border: 1px solid gray; border-radius: 5px; padding: 8px;" rows="4" cols="30"
                placeholder="説明内容を入力でください"></textarea>
            </div>



            <div class="time-area flex">
              <div class="start-area">
                <p>開始時間</p>
                <input class="rounded-l-lg text-gray-500" type="date" v-model="startAt">
              </div>
              <div class="end-area">
                <p>終了時間</p>
                <input class="rounded-l-lg text-gray-500" type="date" v-model="endAt">
              </div>
            </div>



          </nav>
        </div>

        <div class="search-btn flex justify-evenly pt-5">
          <button class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
            <i class="fas fa-search "></i>
            <RouterLink to="/back-search">キャンセル</RouterLink>

          </button>
          <button class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            @click="addQuestionnaire">
            <i class="fas fa-search "></i>
            <!-- <RouterLink to="/update-question">送信</RouterLink> -->
            <!-- <RouterLink :to="{path: '/update-question',query: { item: questionAndQoptionsVoList }}">送信</RouterLink> -->
            <RouterLink :to="{ path: '/update-question', query: { item: JSON.stringify(questionAndQoptionsVoList) } }">送信</RouterLink>

          </button>
        </div>
      </div>
    </div>

  </nav>
</template>

