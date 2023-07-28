<script>
export default{
    
}
import ImgCard from "./ImgCard.vue";
</script>
<template>
    <div class="on-slae">
        <h2 class="text-center">On Sale</h2>

        <div class="card-area">
            <ImgCard />
            <ImgCard />
            <ImgCard />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.on-slae {
    margin-top: 4rem;

    h2 {
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .card-area {
        display: flex;
        justify-content: space-between;
    }
}
</style>