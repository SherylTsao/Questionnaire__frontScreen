<script>
export default {
     data() {
      return {
        title:"",
        startAt:"",
        endAt:"",


      }
     },
     methods:{
      forSearchFather(){
        this.$emit("search",this.title,this.startAt,this.endAt)
    
      }
     }
}
</script>
<template>
     <nav class="w-96 mx-auto pb-5 font-bold">
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
              <div class="time-area flex">
                <div class="start-area">
                  <p>開始時間</p>
                  <input class="rounded-l-lg text-gray-500" type="date" v-model="startAt">
                </div>
                <div class="end-area ml-1">
                  <p>終了時間</p>
                  <input class="rounded-l-lg text-gray-500" type="date" v-model="endAt">
                </div>
              </div>
            </nav>
          </div>
          <div class="search-btn flex justify-end  pt-5">
            <button class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center" @click="forSearchFather">
              <i class="fas fa-search"></i>
              <!-- けんさく -->
              検索
            </button>
          </div>
        </div>
      </div>

    </nav>
</template>

