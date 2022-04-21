<template>
    <view>
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
            <swiper-item v-for="item in swipersDate" :key="item.id">
                <navigator class="swiper-item" :url="'/subpkg/goods_details/goods_details? goods_id=' + item.goods_id"><image :src="item.image_src"></image></navigator>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import { GetSwiperApi } from '@/api/home.js';

export default {
    data() {
        return {
            swipersDate: []
        };
    },
    onReady() {
        this.GetSwipersDate();
    },
    methods: {
        // 获取轮播图数据
        async GetSwipersDate() {
            await GetSwiperApi().then(res => {
                console.log(res, '查看轮播图');
                this.swipersDate = res.message;
            });
        }
    }
};
</script>

<style lang="scss">
swiper {
    height: 412rpx;
    .swiper-item,
    image {
        width: 100%;
        height: 100%;
    }
}
</style>
