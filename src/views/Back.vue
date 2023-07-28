<script>
import { RouterView } from "vue-router";
import SliderBackView from "../components/SlideBack.vue";
import BackSearch from "./BackSearch.vue";



export default {
  components: {
    SliderBackView,
    BackSearch,
   

  },
  data() {
    return {

      showContent: true
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.showContent = to.path == "/back"; // 根據路由判断是否隐藏内容
    next();
  },
  methods: {

  }
}
</script>

<template>
  <main>
    <nav>
      <SliderBackView />
    </nav>
    <nav>
      <RouterView />
    </nav>

    <BackSearch v-if="showContent" />
  </main>
</template>




