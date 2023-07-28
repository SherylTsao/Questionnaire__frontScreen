<script>
import { RouterView } from 'vue-router'
import HeaderView from './components/Header.vue'
import FooterView from './components/Footer.vue'
import HomePage from './views/HomePage.vue'



export default {
  components: {
    HeaderView,
    FooterView,
    HomePage,


  },
  data() {
    return {
      isShow: true,


    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.showContent = to.path === "/home-page"; // 根据路由判断是否显示内容
  //   });
  // },
  mounted() {

  },
}
</script>

<template>
  <!-- <header class="flex justify-center items-center font-bold"> -->

  <div class="wrapper">
    <HeaderView />

    <div class="main-area">
      <RouterView />
    </div>
    <HomePage v-if="this.$route.path == '/'" />

    <FooterView />

  </div>
  <!-- </header> -->
</template>

<style></style>
