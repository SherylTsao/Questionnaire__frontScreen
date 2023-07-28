<script>
import { RouterLink } from "vue-router";
import SliderBackView from "../components/SlideBack.vue";
import SearchView from "../components/Search.vue";
import ListRes from "./ListRes.vue";
import TableView from "../components/Table.vue";


export default {
  components: {
    SliderBackView,
    SearchView,
    ListRes,
    TableView,

  },
  data() {
    return {
      title: "",
      deleteList: [],

      column: [
        { key: `number`, column: "" },
        { key: `title`, column: "アンケートタイトル" },
        { key: `status`, column: "ステータス" },
        { key: `startAt`, column: "開始時間" },
        { key: `endAt`, column: "終了時間" }],
      dataList: [],


    }
  },

  mounted() {
    this.searchByBack()
  },
  methods: {
    searchByBack(title, startAt, endAt) {
      const body = {
        // "REQ名稱"
        title: title,
        startAt: startAt,
        endAt: endAt,

      }

      fetch("http://localhost:8080/find_projects", {
        method: "POST",
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
          // [增加倒敘號碼欄位:利用長度]
          let num = data.queList.length + 1;
          this.dataList = data.queList;
          // [遍歷list來加入'status'狀態列]
          this.dataList = this.dataList.map(element => {

            // [倒敘num]
            num--;

            // 獲取現在時間跟list裡的時間
            const currentTime = new Date();
            // 後端取出的值都是字串型態
            const startAtString = element.startAt;
            // 將字串轉LocalDate
            const startAtTime = new Date(startAtString);
            // 同startAt處理方式
            const endAtString = element.endAt;
            const endAtTime = new Date(endAtString);
            // 設狀態
            let status = "";

            console.log(currentTime + "now");
            console.log(startAtTime);
            console.log(endAtTime);

            // 比較時間來取得'status'的狀態
            if (currentTime < startAtTime) {
              status = "開始前";
            } else if (currentTime > startAtTime && currentTime < endAtTime) {
              status = "オープン中";
            } else if (currentTime > endAtTime) {
              status = "クローズ中";

            }
            console.log(status);
            return {
              ...element,
              status: status,
              // [倒敘number]
              number: num,
              checkBox: false
            }
          })
          console.log(data.queList);
        })
    },
    deleteQuestionnairePushList(deleteList) {
      this.deleteList = deleteList;
    },
    deleteQuestionnaire() {
      const body = {
        // "REQ名稱"
        questionnaire: this.deleteList

      }

      fetch("http://localhost:8080/delete_project", {
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
          this.searchByBack();

        })
    }
  }
}
</script>

<template>
  <main class="flex">

    <nav>
      <SearchView @search="searchByBack" />
      <a href="./ListRes.vue"></a>
      <!--用連結 -->

      <div class="table-area" style="width: 75%; margin: 0 auto;">
        <nav>
          <button class=" ps-1">
            <i class="fa-solid fa-trash-can" @click="deleteQuestionnaire()"></i>
          </button>
        </nav>
        <TableView :columns="column" :data="dataList" :showDelete="true" :showStatisticsButton="true" :showEdit="true"
          :seeWriteBtn="true" @deleteQuestionnaire="deleteQuestionnairePushList" />
      </div>

    </nav>

    <!-- <RouterLink to="/statistics">統計(要刪除)</RouterLink> -->


  </main>
</template>
