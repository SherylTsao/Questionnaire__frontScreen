<script>

import ButtonPrimary from "./ButtonPrimary.vue"
export default{
    
}
</script>
<template>
    <div class="img-card">
        <ButtonPrimary />
    </div>
</template>
<style lang="scss" scoped>
    .img-card {
        width: 30%;
        height: 300px;
        border-radius: 8px;
        background-image: url(../assets/img/d1.png);
        display: flex;
        justify-content: center;
        align-items: end;
        padding-bottom: 1.5rem;
    }
</style>