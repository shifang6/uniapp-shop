<template>
    <view>home</view>
</template>

<script>
import { GetSwiperApi } from '@/api/home.js';
export default {
    data() {
        return {};
    },
    onLoad() {
        GetSwiperApi().then(res=>{
            console.log(res)
        })
    }
};
</script>

<style lang="scss"></style>
