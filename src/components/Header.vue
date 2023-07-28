<script>
import BackSearch from '../views/BackSearch.vue';
export default {
  components: {
    BackSearch
  },
  data() {
    return {

    }
  },
}
</script>

<template>
  <!-- bg-gray-500 -->
  <div class="greetings  font-bold" style="background-color: rgb(105, 35, 35); ">
    <div class="wrap flex justify-center items-center">
      <img alt="Vue logo" class="logo " src="../../public/logo.png" width="125" height="125" />

      <nav class="text-white">
        <h1 class="text-3xl	text-center">
          <RouterLink to="/home-page">太陽株式会社</RouterLink>
        </h1>
        <h3 class="text-sm text-center ">
          <RouterLink to="/home-page">最も包括的なオンライン調査ツールおよびエクスペリエンス管理プラットフォーム</RouterLink>
        </h3>
      </nav>
    </div>

    <!-- 大項連結 -->
    <div class="link-area flex justify-evenly text-white">

      <RouterLink to="/front">アンケート回答</RouterLink>

      <RouterLink to="/back">アンケート管理</RouterLink>
    </div>
  </div>
  
</template>

<style scoped></style>
