<template>
    <view class="info_container">
        <view class="info-container_swiper">
            <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
                <swiper-item class="swiper-item" v-for="(item, index) in goods_info.pics" @click="clickPreviewBigImage(index)">
                    <image :src="item.pics_big_url" mode="heightFix"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="info_container_goods">
            <view class="info_container_goods_price">￥{{ goods_info.goods_price }}</view>
            <view class="info_container_goods_context">
                <view class="info_container_goods_context_title">{{ goods_info.goods_name }}</view>
                <view class="info_container_goods_context_collection">
                    <uni-icons type="star" size="18" color="#a8a2a6"></uni-icons>
                    <text>收藏</text>
                </view>
            </view>
            <view class="info_container_goods_express">快递：免邮费，次日达。</view>
            <view class="info_container_goods_info">
                <text>商品数量：{{ goods_info.goods_number }}件</text>
                <text>商品重量：{{ goods_info.goods_weight }}(kg)</text>
            </view>
        </view>
        <view class="info_container_richText_introduceTitle">商品详情</view>
        <view class="info_container_richText"><rich-text :nodes="goods_info.goods_introduce"></rich-text></view>
        <view class="info_container_goodsNav">
            <view class="goods-carts"><uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
        </view>
    </view>
</template>

<script>
import { GetGoodsDeatilsApi } from '@/api/goods_details.js';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    data() {
        return {
            queryParams: {},
            goods_info: {},
            options: [
                {
                    icon: 'shop',
                    text: '店铺',
                    infoColor: 'red'
                },
                {
                    icon: 'cart',
                    text: '购物车',
                    info: 2
                }
            ],
            buttonGroup: [
                {
                    text: '加入购物车',
                    backgroundColor: '#ff0000',
                    color: '#fff'
                },
                {
                    text: '立即购买',
                    backgroundColor: '#ffa200',
                    color: '#fff'
                }
            ]
        };
    },
    onLoad(options) {
        this.queryParams = options;
    },
    onReady() {
        this.getInfo();
    },
    watch: {
        shop_total: {
            handler(newValue) {
                console.log(newValue);
                this.options.forEach(item => {
                    if (item.text == '购物车') {
                        item.info = newValue;
                    }
                });
            },
            immediate: true
        }
    },
    computed: {
        // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
        // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
        ...mapState('m_cate', ['cart']),
        ...mapGetters('m_cate', ['shop_total'])
    },
    methods: {
        ...mapMutations('m_cate', ['ADDSHOPCARD']),
        clickPreviewBigImage(i) {
            uni.previewImage({
                current: i,
                urls: this.goods_info.pics.map(x => x.pics_big) //需要预览的图片链接列表
            });
        },
        getInfo() {
            GetGoodsDeatilsApi(this.queryParams).then(res => {
                console.log(res, '查看详情数据');
                res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg');
                this.goods_info = res.message;
            });
        },
        onClick(e) {
            if (e.content.text == '购物车') {
                console.log(e);
                uni.switchTab({
                    url: '/pages/cart/cart'
                });
            }
        },
        buttonClick(e) {
            console.log(e);
            if (e.content.text == '加入购物车') {
                const insertCart = {
                    ...this.goods_info,
                    goods_checked: false,
                    goods_counts: 1
                };
                this.ADDSHOPCARD(insertCart);
            }
        }
    }
};
</script>

<style lang="scss">
.info_container {
    padding-bottom: 60rpx;
    &_goods {
        padding: 24rpx;
        &_price {
            font-size: 36rpx;
            color: #c00000;
            margin: 24rpx 0rpx;
        }
        &_context {
            font-size: 28rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;
            &_title {
                width: 90%;
            }
            &_collection {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-wrap: nowrap;
                text {
                    font-size: 26rpx;
                    color: #a8a2a6;
                }
            }
        }
        &_express {
            font-size: 24rpx;
            color: #a8a2a6;
        }
        &_info {
            font-size: 24rpx;
            font-size: 24rpx;
            color: #a8a2a6;
            margin-top: 12rpx;
        }
    }
    &_richText {
        padding: 0;
        &_introduceTitle {
            font-size: 24rpx;
            text-align: center;
            color: #a8a2a6;
            margin: 24rpx 0;
        }
    }
    &_goodsNav {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
swiper {
    height: 750rpx;

    image {
        width: 100%;
        height: 100%;
    }
}
</style>
