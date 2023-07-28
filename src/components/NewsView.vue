<script>
export default{
    
}
import ButtonPrimary from "./ButtonPrimary.vue";
import InfoCard from "./InfoCard.vue";
</script>
<template>
    <div class="news-area">
        <h2 class="my-5">News</h2>
        <div class="card-group">
            <InfoCard />
            <InfoCard style="margin: 0 3rem"/>
            <InfoCard />
        </div>
         <ButtonPrimary />
    </div>
</template>
<style lang="scss" scoped>
.news-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;

    .card-group {
        margin-bottom: 3rem;
    }
}
</style>