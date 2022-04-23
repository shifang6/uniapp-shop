<template>
    <view class="search">
        <!-- 搜索栏区域 -->
        <view class="search-input">
            <uni-search-bar
                radius="20"
                @confirm="search"
                cancelButton="none"
                clearButton="auto"
                :focus="true"
                @input="seachInputChange"
                @cancel="cancel"
                @clear="clear"
            ></uni-search-bar>
        </view>
        <!-- 搜索历史区域 -->
        <view class="search-history" v-if="searchValueListDate.length == 0">
            <view class="search-history-title">
                <text>搜索历史</text>
                <uni-icons type="trash-filled" size="20" @click="handleClearHistories"></uni-icons>
            </view>
            <view class="search-history-tags">
                <block v-for="(item, index) in reverseHistoryList" :key="index">
                    <uni-tag :text="item" @click="handleGoodsList(item)"></uni-tag></block>
            </view>
        </view>
        <!-- 搜索列表区域 -->
        <view class="search-list" v-else>
            <view class="search-list-item" v-for="item in searchValueListDate" :key="item.goods_id" @click="handleGoodsDetails(item)">
                <text>{{ item.goods_name }}</text>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
        </view>
    </view>
</template>

<script>
import { searchQueryParams } from '@/api/search.js';
export default {
    data() {
        return {
            queryParams: {
                query: '',
                total: 0
            },
            timer: null,
            searchValueListDate: [],
            histrories: [],
            historySearchList: []
        };
    },
    computed: {
        reverseHistoryList() {
            return [...this.historySearchList].reverse();
        }
    },
    onLoad() {
        this.historySearchList = JSON.parse(uni.getStorageSync('searchValue') || '[]');
    },
    methods: {
        seachInputChange(e) {
            clearInterval(this.timer);
            this.timer = setTimeout(() => {
                this.queryParams.query = e;
                this.historySearchList.push(e);
                this.SetStorage(e);
                this.GetSearchList();
            }, 500);
        },
        GetSearchList() {
            const { query } = this.queryParams;
            searchQueryParams(query).then(res => {
                console.log(res, '查看查询数据');
                this.searchValueListDate = res.message;
            });
        },
        // 存入sessionstorage
        SetStorage(value) {
            //去重处理
            const SetArrays = new Set(this.historySearchList);
            SetArrays.delete(value);
            SetArrays.add(value);
            this.historySearchList = Array.from(SetArrays);
            uni.setStorageSync('searchValue', JSON.stringify(this.historySearchList));
        },
        handleClearHistories() {
            this.historySearchList = [];
            uni.setStorageSync('searchValue', []);
        },
        cancel() {},
        clear() {
            this.searchValueListDate = [];
        },
        // 跳转到商品详情
        handleGoodsDetails({ goods_id }) {
            uni.navigateTo({
                url: '/subpkg/goods_details/goods_details?goods_id=' + goods_id
            });
        },
        handleGoodsList(items) {
            uni.navigateTo({
                url: '/subpkg/goods_lists/goods_lists?query=' + items
            });
        }
    }
};
</script>

<style lang="scss">
.search {
    &-input {
        background-color: #c00000;
    }
    &-history {
        padding: 0px 6px;
        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 6px 0px;
            border-bottom: 1px solid #efefef;
        }
        &-tags {
            display: flex;
            padding: 6px 0px;
            .uni-tag {
                margin-right: 10px;
            }
        }
    }
    &-list {
        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px;
            border-bottom: 1px solid #efefef;
            text {
                overflow: hidden; //溢出隐藏
                white-space: nowrap; //禁止换行
                text-overflow: ellipsis;
            }
        }
    }
}
</style>
