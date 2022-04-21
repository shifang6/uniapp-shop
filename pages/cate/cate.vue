<template>
    <view class="scroll-view-context">
        <scroll-view class="scroll-view-context-left" scroll-y="true" :style="{ height: wh }">
            <view
                :class="['scroll-view-context-left-item', item.cat_id == activeNum ? 'active' : '']"
                v-for="item in cateList"
                :key="item.cat_id"
                @click="handleChangeCateLogOne(item)"
            >
                {{ item.cat_name }}
            </view>
        </scroll-view>
        <scroll-view class="scroll-view-context-right" scroll-y="true" :style="{ height: wh }">
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
            <view>YYYYYYYYYY</view>
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
            wh: 0
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
            });
        },
        // 点击操作一级目录
        handleChangeCateLogOne({ cat_id }) {
            console.log(cat_id);
            this.activeNum = cat_id;
        }
    }
};
</script>

<style lang="scss">
.scroll-view-context {
    display: flex;
    &-left {
        display: flex;
        flex-direction: column;
        &-item {
            width: 228rpx;
            height: 150rpx;
            font-size: 26rpx;
            text-align: center;
            line-height: 150rpx;
            position: relative;
            color {
                color: #666666;
            }
            &.active {
                color: #000000;
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
    }
}
</style>
