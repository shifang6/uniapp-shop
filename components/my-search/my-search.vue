<template>
    <view class="search" :style="{ 'background-color': bgcolor }">
        <view class="search-box" :style="{ 'border-radius': borderRadius }" @click="handleSearchPages">
            <uni-icons class="search-box-icons" type="contact" size="20"></uni-icons>
            <text class="search-box-text">搜索</text>
        </view>
    </view>
</template>

<script>
export default {
    name: 'my-search',
    props: {
        bgcolor: {
            type: String,
            default: '#C00000'
        },
        borderRadius: {
            type: String,
            default: '44rpx'
        }
    },
    data() {
        return {};
    },
    methods: {
        handleSearchPages() {
            uni.navigateTo({
                url: '/subpkg/search/search'
            });
            this.$emit('click', '可以对父页面进行操作');
        }
    }
};
</script>

<style lang="scss">
.search {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rpx 26rpx;
    &-box {
        background-color: white;
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        &-icons {
            margin-right: 20rpx;
        }
        &-text {
            font-size: 24rpx;
        }
    }
}
</style>
