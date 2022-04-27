<template>
    <view class="goods_list_item">
        <radio v-if="ShowRadio" class="goods_list_item_radio" value="r1" :checked="item.goods_checked" color="#c00000" @click="changeRadioStatus(item)" />
        <view class="goods_list_item_image" @click="handleSeeGoodsDetails(item)"><image :src="item.goods_big_logo || defaultPic"></image></view>
        <view class="goods_list_item_context">
            <text class="goods_list_item_context_title" @click="handleSeeGoodsDetails(item)">{{ item.goods_name }}</text>
            <text v-if="ShowNumberBox" class="goods_list_item_context_select">当前选择: X{{ item.goods_counts }}</text>
            <view class="goods_list_item_context_bottom">
                <text class="goods_list_item_context_price">￥{{ item.goods_price }}</text>
                <uni-number-box v-if="ShowNumberBox" :min="1" :value="item.goods_counts" @change="changeNumBoxCount"></uni-number-box>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-goods-list',
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        ShowRadio: {
            type: Boolean,
            default: () => false
        },
        ShowNumberBox: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        };
    },
    methods: {
        handleSeeGoodsDetails({ goods_id }) {
            uni.navigateTo({
                url: '/subpkg/goods_details/goods_details?goods_id=' + goods_id
            });
        },
        changeRadioStatus({ goods_id, goods_checked }) {
            //   console.log(goods_id, goods_checked);
            this.$emit('changeRadioStatus', { goods_id, goods_checked });
        },
        changeNumBoxCount(e) {
            // console.log(e);
            this.$emit('changeNumBoxCount', {
                goods_id: this.item.goods_id,
                goods_counts: e
            });
        }
    }
};
</script>

<style lang="scss">
.goods_list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 10rpx 20rpx;
    margin-bottom: 8rpx;
    &_radio {
        margin-right: 12rpx;
    }
    &_image {
        margin-right: 8px;
        image {
            width: 100px;
            height: 100px;
        }
    }
}
.goods_list_item_context {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    &_title {
        font-size: 14px;
        display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        -webkit-line-clamp: 2; //限制行数
        overflow: hidden; //超出部分隐藏
        text-overflow: ellipsis; //用一个省略号代替超出的内容
    }
    &_base {
        font-size: 14px;
    }
    &_price {
        color: #c00000;
        font-size: 16px;
    }
    &_bottom {
        display: flex;
        justify-content: space-between;
    }
    &_select {
        color: gray;
        font-size: 12px;
    }
}
</style>
