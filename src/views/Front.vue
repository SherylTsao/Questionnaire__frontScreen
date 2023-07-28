<script>
import { RouterView } from "vue-router";
import SliderView from "../components/Slide.vue";
import FrontSearch from "./FrontSearch.vue";



export default {
  components: {
    SliderView,
    FrontSearch,

  },
  data() {
    return {
      // 一到頁面是否秀出
      showContent: true
    }
  },
  beforeRouteUpdate(to, from, next) {
          this.showContent = to.path == "/front"; // 根據路由判断是否隐藏内容
          next();
     },
  methods: {

  }
}
</script>

<template>
  <main class="">
    <nav class="">
      <SliderView />
    </nav>
    <nav class="">
      
      <RouterView />
    
    </nav>

    <FrontSearch v-if="showContent"/>
  </main>
</template>
