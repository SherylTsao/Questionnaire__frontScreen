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
      questionaireId: "",
      column: [
        { key: `number`, column: "#" },
        { key: `name`, column: "名前" },
        { key: `filling_time`, column: "時間の記入" },
      ],
      dataList: [],


    }
  },
  mounted() {
    const item = this.$route.query.item;
    sessionStorage.setItem("questionaireId", item)
    this.questionaireId = item;
    this.showWriteTime();

  },
  methods: {
    showWriteTime() {
      const body = {
        // "REQ名稱"
        questionaireId: this.questionaireId,
      }

      fetch("http://localhost:8080/show_write_time", {
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
          // [增加倒敘號碼欄位:利用長度]
          let num = data.fileList.length + 1;
          this.dataList = data.fileList;
          sessionStorage.setItem("writeTime", JSON.stringify(this.dataList));

          this.dataList = this.dataList.slice().reverse().map((element, index) => {
            // [倒敘num]
            num--;
            return {
              // [倒敘number]
              ...element,
              number: this.dataList.length - index,
            };
          });
        })
    },
    watchList(itemNum) {
      console.log("~~~~~~~~~~~~~~~~");
      console.log(itemNum);


    }
  }
}
</script>

<template>
  <main class="flex">

    <nav class="table-area" style="width: 75%; margin: 0 auto;">
      <TableView :columns="column" :data="dataList" :watchDetailsBtn="true" />
    </nav>


  </main>
</template>
