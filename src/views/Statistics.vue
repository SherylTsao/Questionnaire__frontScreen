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
      title: "",
      column: [
        { key: `nullString`, column: "" }, { key: `questionaireId`, column: "#" },
        { key: `title`, column: "アンケートタイトル" }, { key: `status`, column: "ステータス" },

        { key: `startAt`, column: "開始時間" }, { key: `endAt`, column: "終了時間" }, { key: `statis`, column: "統計" }],
      dataList: [],


    }
  },
  mounted() {
    this.searchByBack()
  },
  methods: {
    searchByBack() {

      console.log("1");
      const body = {
        // "REQ名稱"
        title: this.title,
      }

      fetch("http://localhost:8080/show_all_report", {
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
          this.dataList = data.queList;
        })
    }
  }
}
</script>

<template>
  <main class="">
    <hr>
    <nav class="questions mt-3 mb-3 flex justify-center">
      <nav>
        <button class="link rounded-t-lg border-2 border-gray-300 ms-2" style="border-bottom: none;">問題</button>
        <nav class="border-2 border-gray-300 rounded-lg p-6" style="width: 700px;">
          <p class="question">-</p>
          <p class="options">-</p>
        </nav>
      </nav>
    </nav>


  </main>
</template>
