<template>
    <view class="search">
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
    </view>
</template>

<script>
import { searchQueryParams } from '@/api/search.js';
export default {
    data() {
        return {
            queryParams: {
                query: '',
                cid: '',
                pagenum: 1,
                pagesize: 20,
                total: 0
            },
            timer: null,
            searchValueListDate: []
        };
    },
    methods: {
        seachInputChange(e) {
            if (this.queryParams.query == '') {
                this.searchValueListDate = [];
            }
            clearInterval(this.timer);
            this.timer = setTimeout(() => {
                this.queryParams.query = e;
                this.GetSearchList();
            }, 500);
        },
        GetSearchList() {
            const { query, pagenum, pagesize } = this.queryParams;
            searchQueryParams(query, pagenum, pagesize).then(res => {
                console.log(res, '查看查询数据');
                this.searchValueListDate=res.message;
            });
        },
        cancel() {},
        clear() {}
    }
};
</script>

<style lang="scss">
.search {
    &-input {
        background-color: #c00000;
    }
}
</style>
