<template>
    <view class="goods_list_item">
        <view class="goods_list_item_image"><image :src="item.goods_big_logo || defaultPic"></image></view>
        <view class="goods_list_item_context">
            <text class="goods_list_item_context_title">{{ item.goods_name }}</text>
            <text class="goods_list_item_context_base">商品数量:{{ item.goods_number }},商品重量:{{ item.goods_weight }}(kg)</text>
            <text class="goods_list_item_context_price">￥{{ item.goods_price }}</text>
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
        }
    },
    data() {
        return {
            defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        };
    }
};
</script>

<style lang="scss">
.goods_list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
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
}
</style>
