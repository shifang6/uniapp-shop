<template>
    <view>
        <view class="goods_list">
            <block v-for="item in goodsListDate" :key="item.goods_id"><my-goods-list :item="item"></my-goods-list></block>
        </view>
    </view>
</template>

<script>
import { GetGoodsListApi } from '@/api/goods_list.js';
export default {
    data() {
        return {
            queryParams: {
                query: '',
                cid: '',
                pagenum: 1,
                pagesize: 20
            },
            goodsListDate: [],
            total: 0,
            isLoading: false
        };
    },
    onLoad({ cid, query }) {
        // console.info(cid, query);
        this.queryParams.query = query;
        this.queryParams.cid = cid;
    },
    onReady() {
        this.getList();
    },
    methods: {
        async getList(insertFunction = null) {
            this.isLoading = true;
            insertFunction && insertFunction();
            await GetGoodsListApi(this.queryParams).then(res => {
                console.log(res, '查看list');
                this.goodsListDate = [...this.goodsListDate, ...res.message.goods];
                this.total = res.total;
                this.isLoading = false;
            });
        }
    },
    onPullDownRefresh() {
        this.queryParams.pagenum = 1;
        this.queryParams.pagesize = 20;
        this.goodsListDate = [];
        this.total = 0;
        this.getList();
    },
    onReachBottom() {
        const { pagesize, pagenum } = this.queryParams;
        if (pagesize * pagenum >= this.total) return;
        if (this.isLoading) return;
        this.queryParams.pagenum++;
        this.getList(() => uni.stopPullDownRefresh());
    }
};
</script>

<style lang="scss">
.goods_list {
}
</style>
