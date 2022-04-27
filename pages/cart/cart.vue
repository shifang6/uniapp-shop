<template>
  <view
    ><my-goods-list
      v-for="item in cart"
      :key="item.goods_id"
      :item="item"
      :ShowRadio="true"
      :ShowNumberBox="true"
      @changeRadioStatus="changeRadioStatus"
      @changeNumBoxCount="changeNumBoxCount"
  /></view>
</template>

<script>
import CateMixins from "@/mixins/cate.js";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  mixins: [CateMixins],
  data() {
    return {};
  },
  computed: {
    // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
    // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
    ...mapState("m_cate", ["cart"]),
    ...mapGetters("m_cate", ["shop_total"]),
  },
  methods: {
    ...mapMutations("m_cate", ["CHANGE_GOODS_STATUS", "CHANGE_GOODS_NUMBOX"]),
    changeRadioStatus(obj) {
    //   console.log(obj);
      this.CHANGE_GOODS_STATUS(obj);
    },
    changeNumBoxCount(obj) {
    //   console.log(obj);
      this.CHANGE_GOODS_NUMBOX(obj);
    },
  },
};
</script>

<style lang="scss"></style>
