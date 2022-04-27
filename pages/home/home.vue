<template>
    <view>
        <view class="search-top"><my-search></my-search></view>
        <!-- 轮播图部分 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
            <swiper-item v-for="item in swipersDate" :key="item.id">
                <navigator class="swiper-item" :url="'/subpkg/goods_details/goods_details?goods_id=' + item.goods_id"><image :src="item.image_src"></image></navigator>
            </swiper-item>
        </swiper>
        <!-- 顶部分类部分 -->
        <view class="catelog-list">
            <view class="catelog-list-item" v-for="(item, i) in cateLogDate" :key="i" @click="handleCateLogChannel(item)">
                <image :src="item.image_src" mode="widthFix"></image>
            </view>
        </view>
        <!-- 楼层数据渲染 -->
        <view class="floor-list">
            <view class="floor-list-item" v-for="(item, index) in floorList" :key="index">
                <image :src="item.floor_title.image_src" mode="widthFix"></image>
                <view class="floor-list-item-content">
                    <view class="floor-list-item-content-left" @click="handleGoodsList(item.product_list[0])">
                        <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
                    </view>
                    <view class="floor-list-item-content-right">
                        <image
                            v-for="(item2, index2) in item.product_list"
                            :key="index2"
                            v-if="index2 !== 0"
                            :src="item2.image_src"
                            :style="{ width: item2.image_width + 'rpx' }"
                            mode="widthFix"
                            @click="handleGoodsList(item2)"
                        ></image>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { GetSwiperApi, GetTopCatelogApi, GetFloorDateApi } from '@/api/home.js';
import CateMixins from '@/mixins/cate.js';
export default {
    mixins: [CateMixins],
    data() {
        return {
            swipersDate: [],
            cateLogDate: [],
            floorList: []
        };
    },
    onReady() {
        this.GetSwipersDate();
        this.GetCateLogDate();
        this.GetFloorList();
    },
    methods: {
        // 获取轮播图数据
        async GetSwipersDate() {
            await GetSwiperApi().then(res => {
                // console.log(res, '查看轮播图');
                this.swipersDate = res.message;
            });
        },
        // 获取栏目列表数据
        GetCateLogDate() {
            GetTopCatelogApi().then(res => {
                // console.log(res, '查看当前的TopCatelogs');
                this.cateLogDate = res.message;
            });
        },
        // 获取楼层数据值
        GetFloorList() {
            GetFloorDateApi().then(res => {
                console.log(res, '查看楼层数据');
                for (let floor = 0; floor < res.message.length; floor++) {
                    for (let item = 0; item < res.message[floor].product_list.length; item++) {
                        let labels = res.message[floor].product_list[item];
                        labels.routerUrl = '/subpkg/goods_lists/goods_lists?' + labels.navigator_url.split('?')[1];
                    }
                }
                this.floorList = res.message;
            });
        },
        // 打开栏目的页面
        handleCateLogChannel({ name }) {
            console.log(name);
            if (name == '分类') uni.switchTab({ url: '/pages/cate/cate' });
        },
        // 打开产品列表页面数据
        handleGoodsList({ routerUrl: url }) {
            uni.navigateTo({
                url
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
.catelog-list {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 44rpx 48rpx;
    &-item {
        width: 120rpx;
        image {
            width: 120rpx;
        }
    }
}
.floor-list {
    padding: 0rpx 12rpx;
    &-item {
        &-content {
            display: flex;
            justify-content: space-between;
            &-right {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
        }
    }
}
.search-top {
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>
