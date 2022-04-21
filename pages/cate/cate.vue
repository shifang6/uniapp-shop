<template>
    <view class="scroll-view-context">
        <scroll-view class="scroll-view-context-left" scroll-y="true" :style="{ height: wh + 'px' }">
            <view
                :class="['scroll-view-context-left-item', item.cat_id == activeNum ? 'active' : '']"
                v-for="(item, index) in cateList"
                :key="item.cat_id"
                @click="handleChangeCateLogOne(item, index)"
            >
                {{ item.cat_name }}
            </view>
        </scroll-view>
        <scroll-view class="scroll-view-context-right" scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTopPx">
            <block v-for="(item2, index2) in secondCateTree" :key="item2.cat_id">
                <view class="scroll-view-context-right-title">/  {{ item2.cat_name }}  /</view>
                <view class="scroll-view-context-right-context">
                    <view class="scroll-view-context-right-context-box" v-for="(item3, index3) in item2.children" :key="index3" @click="handleGoodsListOpen(item3)">
                        <image :src="item3.cat_icon"></image>
                        <text>{{ item3.cat_name }}</text>
                    </view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
import { GetCategoriesDateApi } from '@/api/cate.js';
export default {
    data() {
        return {
            // 一级目录数据
            cateList: [],
            // 二级目录
            secondCateTree: [],
            // 点击一级目录的下标
            activeNum: 1,
            // 可用的显示区域
            wh: 0,
            // 一键置顶到顶部页面
            scrollTopPx: 0
        };
    },
    onLoad() {
        this.GetScrollWindowsHeight();
    },
    onReady() {
        this.GetCateLogDate();
    },
    methods: {
        GetScrollWindowsHeight() {
            // 获取当前系统的信息
            const sysInfo = uni.getSystemInfoSync();
            // 为 wh 窗口可用高度动态赋值
            this.wh = sysInfo.windowHeight;
        },
        GetCateLogDate() {
            GetCategoriesDateApi().then(res => {
                console.log(res, '获取的catelist');
                this.cateList = res.message;
                this.secondCateTree = res.message[0].children;
            });
        },
        // 点击操作一级目录
        handleChangeCateLogOne({ cat_id }, index) {
            console.log(cat_id);
            this.activeNum = cat_id;
            this.secondCateTree = this.cateList[index].children;
            this.scrollTopPx = this.scrollTopPx == 0 ? 1 : 0;
        },
        // 点击查看商品列表
        handleGoodsListOpen({cat_id}) {
            uni.navigateTo({
                url: `/subpkg/goods_lists/goods_lists?cat_id=${cat_id}`
            });
        }
    }
};
</script>

<style lang="scss">
.scroll-view-context {
    display: flex;
    &-left {
        width: 228rpx;
        display: flex;
        flex-direction: column;
        &-item {
            width: 228rpx;
            height: 150rpx;
            font-size: 26rpx;
            text-align: center;
            line-height: 150rpx;
            position: relative;
            background-color: #f7f7f7;
            color {
                color: #666666;
            }
            &.active {
                color: #000000;
                background-color: white;
                &::before {
                    content: ' ';
                    display: block;
                    width: 8rpx;
                    height: 76rpx;
                    background-color: #c00000;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    &-right {
        width: calc(100vw - 228rpx);
        background-color: white;
        &-title {
            text-align: center;
            padding: 44rpx 0;
            font-size: 28rpx;
            font-weight: 600;
        }
        &-context {
            display: flex;
            flex-wrap: wrap;
            &-box {
                width: 33.33%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 20rpx;
                image {
                    width: 120rpx;
                    height: 120rpx;
                }
                text {
                    font-size: 24rpx;
                }
            }
        }
    }
}
</style>
