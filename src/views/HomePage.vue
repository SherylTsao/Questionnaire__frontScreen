<script>
import Carousel from '../components/Carousel.vue';
import HomeView from '../components/HomeView.vue';
import ImgCard from '../components/ImgCard.vue';
import ImfoCard from '../components/InfoCard.vue';
import NewArrival from '../components/NewArrival.vue';
import NewsView from '../components/NewsView.vue';
import OnSale from '../components/OnSale.vue';

export default {
     data() {

          return {

          }
     }, components: {
          // 元件要放在components而不是datareturn
          Carousel,
          HomeView,
          ImgCard,
          ImfoCard,
          NewArrival,
          NewsView,
          OnSale,

     },
}
</script>
<template>
     <div class="">
          
          <Carousel />
          <HomeView />
          <!-- <ImgCard /> -->
          <ImfoCard />
          <!-- <OnSale /> -->
          <!-- <NewsView /> -->
          <NewArrival />
     </div>
</template>